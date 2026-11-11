import assert from 'node:assert/strict';
import { join } from 'node:path';
import { mkdtempSync, readFileSync, rmSync, copyFileSync } from 'node:fs';
import { tmpdir } from 'node:os';
import { ROOT, CACHE, TOOLS, LOCAL_CONFIG, hash, validateConfigs, validateManifests, assertLocks, assertClean, assertInstalled, assertReceipt, runLogged, saveJson } from './common.mjs';
const args = process.argv.slice(2); const selected = args[0] ?? 'all';
assert(args.length <= 1 && ['all', 'node', 'worker'].includes(selected), 'Use verify.mjs [all|node|worker]');
assertLocks(); assertClean(); assertInstalled(); validateConfigs(); validateManifests(); const receipt = assertReceipt();
await runLogged('types', process.execPath, ['--max-old-space-size=1024', join(ROOT, 'node_modules/typescript/bin/tsc'), '--noEmit', '--incremental', 'false']);
const typesDir = mkdtempSync(join(tmpdir(), 'saint-naum-row33-types-'));
try {
  const typesPath = join(typesDir, 'cloudflare-env.d.ts');
  await runLogged('worker-types', process.execPath, [join(TOOLS, 'node_modules/wrangler/bin/wrangler.js'), 'types', typesPath, '--config', LOCAL_CONFIG, '--env-interface', 'CloudflareEnv', '--include-runtime=true', '--include-env=true']);
  copyFileSync(typesPath, join(CACHE, 'worker-generated-types.txt'));
  saveJson('worker-types-receipt.json', { bytes: readFileSync(typesPath).length, sha256: hash(readFileSync(typesPath)), generatedFrom: 'explicit local Preview bindings/runtime', handWrittenShim: false });
  await runLogged('preview-config-types', process.execPath, [join(ROOT, 'node_modules/typescript/bin/tsc'), '--allowJs', '--noEmit', '--module', 'esnext', '--moduleResolution', 'bundler', '--target', 'ES2022', '--lib', 'ES2022', '--types', 'node', '--esModuleInterop', join(TOOLS, 'open-next.preview.config.mjs')]);
} finally { rmSync(typesDir, { recursive: true, force: true }); }
const results = [];
for (const mode of selected === 'all' ? ['node', 'worker'] : [selected]) {
  await runLogged(`${mode}-http`, 'python3', [join(ROOT, 'preview/verify.py'), mode]);
  const { readJson } = await import('./common.mjs'); const result = readJson(join(CACHE, `${mode}-qa-results.json`));
  assert.equal(result.core_http_result, 'PASS'); assert.equal(result.BuildID, receipt.BuildID); assert.equal(result.owned_service_stopped, true); assert.equal(result.own_port_closed, true); results.push(result);
}
assertClean(); assertReceipt(); saveJson('local-verification.json', { commit: receipt.candidate_commit, tree: receipt.candidate_tree, BuildID: receipt.BuildID, modes: results.map(x => x.mode), noGUIOrRemoteAcceptance: true });
console.log('Selected local gates passed; independent real400CSS and official/production acceptance remain separate.');
