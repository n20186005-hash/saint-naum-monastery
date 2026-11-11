import assert from 'node:assert/strict';
import { readFileSync, existsSync, mkdirSync, writeFileSync, readdirSync } from 'node:fs';
import { resolve, dirname, relative, join } from 'node:path';
import { fileURLToPath } from 'node:url';
import { createHash } from 'node:crypto';
import { spawn, spawnSync } from 'node:child_process';

export const ROOT = resolve(dirname(fileURLToPath(import.meta.url)), '..');
export const PREVIEW = join(ROOT, 'preview');
export const TOOLS = join(PREVIEW, 'tools');
export const CACHE = join(PREVIEW, '.cache');
export const REMOTE_CONFIG = join(PREVIEW, 'wrangler.preview.jsonc');
export const LOCAL_CONFIG = join(PREVIEW, 'wrangler.local.jsonc');
export const OPEN_CONFIG = join(TOOLS, 'open-next.preview.config.mjs');
export const PINS = Object.freeze({ next: '15.5.29', react: '19.2.6', 'react-dom': '19.2.6', 'next-intl': '4.11.1', typescript: '5.9.3', '@opennextjs/cloudflare': '1.20.16', '@opennextjs/aws': '4.1.15', wrangler: '4.160.0' });
export const readJson = (path) => JSON.parse(readFileSync(path, 'utf8'));
export const hash = (bytes) => createHash('sha256').update(bytes).digest('hex');
export const reference = () => readJson(join(PREVIEW, 'reference.json'));
export function git(...args) {
  const p = spawnSync('git', args, { cwd: ROOT, encoding: 'utf8', env: { ...process.env, GIT_OPTIONAL_LOCKS: '0' } });
  if (p.status !== 0) throw new Error(`git ${args[0]} failed: ${p.stderr}`);
  return p.stdout.trimEnd();
}
export function validateConfigs(remote = readJson(REMOTE_CONFIG), local = readJson(LOCAL_CONFIG)) {
  const baseKeys = ['$schema', 'name', 'main', 'compatibility_date', 'compatibility_flags', 'assets'];
  const expected = { name: 'saint-naum-monastery', main: '../.open-next/worker.js', compatibility_date: '2026-09-26', compatibility_flags: ['nodejs_compat', 'global_fetch_strictly_public'], assets: { directory: '../.open-next/assets', binding: 'ASSETS' } };
  for (const [label, config, extra] of [['remote', remote, 'previews'], ['local', local, 'images']]) {
    assert.deepEqual(Object.keys(config).sort(), [...baseKeys, extra].sort(), `${label}: unexpected runtime/resource fields`);
    assert.equal(config.$schema, './tools/node_modules/wrangler/config-schema.json');
    for (const [k, value] of Object.entries(expected)) assert.deepEqual(config[k], value, `${label}: ${k}`);
    assert.equal(resolve(PREVIEW, config.main), join(ROOT, '.open-next/worker.js'));
    assert.equal(resolve(PREVIEW, config.assets.directory), join(ROOT, '.open-next/assets'));
  }
  assert.deepEqual(remote.previews, { images: { binding: 'IMAGES' } });
  assert.deepEqual(local.images, { binding: 'IMAGES' });
  return { noServicesOrProductionResources: true, IMAGES: 'remote previews / local top level', previewOnlyNodeCompatibility: true };
}
export function validateManifests() {
  const app = readJson(join(ROOT, 'package.json'));
  assert.equal(app.dependencies.next, PINS.next);
  assert.deepEqual(app.scripts, reference().rootScripts, 'Production/default commands must remain unchanged');
  const tools = readJson(join(TOOLS, 'package.json'));
  assert.equal(tools.private, true);
  assert.deepEqual(tools.dependencies, { '@opennextjs/cloudflare': PINS['@opennextjs/cloudflare'], wrangler: PINS.wrangler, next: PINS.next, react: PINS.react, 'react-dom': PINS['react-dom'] });
  return { appNext: app.dependencies.next, isolatedNext: tools.dependencies.next };
}
export function lockIssues() {
  const issues = [];
  for (const [label, base] of [['app', ROOT], ['tools', TOOLS]]) {
    const path = join(base, 'package-lock.json');
    if (!existsSync(path)) { issues.push(`${label}: package-lock.json must be normally generated`); continue; }
    const lock = readJson(path); const pkg = readJson(join(base, 'package.json'));
    try { assert.deepEqual(lock.packages?.['']?.dependencies, pkg.dependencies); } catch { issues.push(`${label}: root manifest/lock dependencies differ`); }
    const names = label === 'app' ? ['next', 'react', 'react-dom', 'next-intl', 'typescript'] : ['next', 'react', 'react-dom', '@opennextjs/cloudflare', '@opennextjs/aws', 'wrangler'];
    for (const name of names) if (lock.packages?.[`node_modules/${name}`]?.version !== PINS[name]) issues.push(`${label}: locked ${name} must be ${PINS[name]}`);
  }
  return issues;
}
export function assertLocks() { assert.deepEqual(lockIssues(), [], 'Dependency lock generation/review is incomplete'); }
export function assertInstalled() {
  for (const [label, base, names] of [['app', ROOT, ['next', 'react', 'react-dom', 'next-intl', 'typescript']], ['tools', TOOLS, ['next', 'react', 'react-dom', '@opennextjs/cloudflare', '@opennextjs/aws', 'wrangler']]]) {
    for (const name of names) assert.equal(readJson(join(base, 'node_modules', name, 'package.json')).version, PINS[name], `${label}: installed ${name}`);
  }
}
export function assertClean() { assert.equal(git('status', '--porcelain'), '', 'Freeze/review source changes before building or publishing'); }
export function assertToolchain() {
  assert.equal(process.version, 'v24.22.1', 'Reviewed Node runtime differs; stop rather than substituting a runtime');
  const p = spawnSync('npm', ['--version'], { cwd: ROOT, encoding: 'utf8' });
  assert.equal(p.status, 0); assert.equal(p.stdout.trim(), '10.9.2', 'Normally provision npm10.9.2; never fall back after a denied command');
}
export function imageSnapshot() {
  const images = reference().originalImages;
  assert.equal(images.length, 20);
  for (const item of images) {
    const bytes = readFileSync(join(ROOT, item.path));
    assert.equal(bytes.length, item.bytes, item.path); assert.equal(hash(bytes), item.sha256, item.path);
  }
  return images;
}
export function sourceSnapshot() {
  const tracked = git('ls-files', '-z').split('\0').filter(Boolean);
  const files = tracked.map((path) => {
    assert(!/(^|\/)\.(env|dev\.vars)(\.|$)/.test(path), 'Do not read credential files');
    const bytes = readFileSync(join(ROOT, path)); return { path, bytes: bytes.length, sha256: hash(bytes) };
  });
  return { candidate_commit: git('rev-parse', 'HEAD'), candidate_tree: git('rev-parse', 'HEAD^{tree}'), tracked_files: files, original_images: imageSnapshot() };
}
export function saveJson(name, value) { mkdirSync(CACHE, { recursive: true }); writeFileSync(join(CACHE, name), `${JSON.stringify(value, null, 2)}\n`); }
export async function runLogged(label, executable, args, options = {}) {
  mkdirSync(CACHE, { recursive: true });
  const logPath = join(CACHE, `${label}.log`); const record = { executable, args, cwd: ROOT, startedUTC: new Date().toISOString(), audit: true };
  writeFileSync(logPath, ''); saveJson(`${label}-command.json`, record);
  const p = spawn(executable, args, { cwd: ROOT, stdio: ['inherit', 'pipe', 'pipe'], env: { ...process.env, npm_config_audit: 'true', ...options.env }, detached: process.platform !== 'win32' });
  record.pid = p.pid; saveJson(`${label}-command.json`, record);
  for (const [stream, sink] of [[p.stdout, process.stdout], [p.stderr, process.stderr]]) stream.on('data', (data) => { sink.write(data); writeFileSync(logPath, data, { flag: 'a' }); });
  let interrupted;
  const forward = (sig) => { interrupted = sig; if (p.pid) { try { process.kill(process.platform === 'win32' ? p.pid : -p.pid, sig); } catch {} } };
  const term = () => forward('SIGTERM'); const intr = () => forward('SIGINT'); process.on('SIGTERM', term); process.on('SIGINT', intr);
  let status;
  try { status = await new Promise((ok, bad) => { p.once('error', bad); p.once('close', (code, signal) => ok({ code, signal })); }); }
  catch (error) { Object.assign(record, { error: String(error), finishedUTC: new Date().toISOString() }); saveJson(`${label}-command.json`, record); throw error; }
  finally { process.off('SIGTERM', term); process.off('SIGINT', intr); }
  Object.assign(record, status, { finishedUTC: new Date().toISOString(), interrupted }); saveJson(`${label}-command.json`, record);
  assert.equal(status.code, 0, `${label} failed (${status.code}/${status.signal}); stop this action, do not change entry or guard`);
  return record;
}
export function artifactSnapshot() {
  const files = []; const add = (path) => { const bytes = readFileSync(path); files.push({ path: relative(ROOT, path).split('\\').join('/'), bytes: bytes.length, sha256: hash(bytes) }); };
  const walk = (dir) => { for (const entry of readdirSync(dir, { withFileTypes: true })) { const path = join(dir, entry.name); if (entry.isDirectory()) walk(path); else if (entry.isFile()) add(path); } };
  walk(join(ROOT, '.open-next'));
  for (const name of ['.next/BUILD_ID', '.next/required-server-files.json', '.next/prerender-manifest.json', '.next/routes-manifest.json']) add(join(ROOT, name));
  return files;
}
export function selfReferences() {
  const found = []; const walk = (dir) => { for (const item of readdirSync(dir, { withFileTypes: true })) { const p = join(dir, item.name); if (item.isDirectory()) walk(p); else if (/\.(js|mjs|json)$/.test(item.name) && readFileSync(p, 'utf8').includes('WORKER_SELF_REFERENCE')) found.push(relative(ROOT, p)); } }; walk(join(ROOT, '.open-next')); return found;
}
export function assessSelfReferences() {
  validateConfigs();
  const found = selfReferences().sort();
  const adapterQueue = '.open-next/.build/durable-objects/queue.js';
  assert.deepEqual(found, [adapterQueue], 'Unexpected SELF consumer; stop and review rather than adding a binding');
  const bytes = readFileSync(join(ROOT, adapterQueue));
  // Pinned adapter exports this class even for dummy queue. No DO binding instantiates it.
  const queue = bytes.toString('utf8');
  assert.equal(hash(readFileSync(join(TOOLS, 'node_modules/@opennextjs/cloudflare/dist/api/durable-objects/queue.js'))), '9f49ae89752a4d38700405010b4e6bdc9f2bb7d022c8d5b61193a04e45821aeb', 'Pinned adapter queue source changed');
  assert.equal(queue.match(/WORKER_SELF_REFERENCE/g)?.length, 2);
  const constructor = queue.match(/constructor\(ctx, env\) \{[\s\S]*?\n  \}/)?.[0];
  assert(constructor, 'Reviewed queue constructor is missing');
  assert.equal(constructor.match(/WORKER_SELF_REFERENCE/g)?.length, 2, 'SELF must only occur twice inside the queue constructor');
  assert(constructor.includes('if (!env.WORKER_SELF_REFERENCE)')); assert(constructor.includes('this.service = env.WORKER_SELF_REFERENCE;'));
  assert(readFileSync(join(ROOT, '.open-next/worker.js'), 'utf8').includes('export { DOQueueHandler } from "./.build/durable-objects/queue.js"'));
  const config = readFileSync(join(ROOT, '.open-next/.build/open-next.config.mjs'), 'utf8');
  for (const key of ['incrementalCache', 'tagCache', 'queue', 'cachePurge']) assert(config.includes(`${key}: "dummy"`), `${key} must remain dummy`);
  assert(config.includes('enableCacheInterception: false')); assert(config.includes('routePreloadingBehavior: "none"'));
  return { literalReferences: found, unboundAdapterQueueSHA256: hash(bytes), artifactHashPolicy: 'Real bytes only; no normalization in build, receipt, verify or publish', selfUseOnlyInReviewedDOConstructor: true, servicesAndDOBindings: 0, activePageHandlerSELFReferences: 0, runtimeWithoutSELF: 'Requires current Worker HTTP gates; static classification alone is insufficient' };
}
export function assertReceipt() {
  const receipt = readJson(join(CACHE, 'build-receipt.json')); const source = sourceSnapshot();
  assert.equal(receipt.candidate_commit, source.candidate_commit); assert.equal(receipt.candidate_tree, source.candidate_tree);
  assert.deepEqual(receipt.tracked_files, source.tracked_files); assert.equal(readFileSync(join(ROOT, '.next/BUILD_ID'), 'utf8').trim(), receipt.BuildID);
  for (const item of receipt.artifacts) assert.equal(hash(readFileSync(join(ROOT, item.path))), item.sha256, item.path);
  assert.equal(receipt.supportedVersionsVerified, true); assert.deepEqual(receipt.selfAssessment, assessSelfReferences()); return receipt;
}
export function publicationBranch() {
  const supplied = process.env.WORKERS_CI_BRANCH;
  if (supplied) return supplied;
  const p = spawnSync('git', ['symbolic-ref', '--quiet', '--short', 'HEAD'], { cwd: ROOT, encoding: 'utf8' }); return p.status === 0 ? p.stdout.trim() : null;
}
export function assertPublicationBranch(branch = publicationBranch()) { assert.equal(branch, reference().approvedFeatureBranch, 'Only the approved row33 feature branch may publish a Preview'); }
