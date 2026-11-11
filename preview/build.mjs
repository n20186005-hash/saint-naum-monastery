import assert from 'node:assert/strict';
import { readFileSync, existsSync } from 'node:fs';
import { join } from 'node:path';
import { ROOT, TOOLS, OPEN_CONFIG, REMOTE_CONFIG, PINS, readJson, validateConfigs, validateManifests, lockIssues, assertLocks, assertClean, assertToolchain, assertInstalled, imageSnapshot, sourceSnapshot, artifactSnapshot, assessSelfReferences, saveJson, runLogged } from './common.mjs';
const args = process.argv.slice(2);
assert(args.length === 0 || (args.length === 1 && args[0] === '--inspect'), 'Unknown build arguments');
const inspect = { manifests: validateManifests(), configs: validateConfigs(), originalImages: imageSnapshot().length, lockIssues: lockIssues(), installationPerformed: false };
if (args[0] === '--inspect') { console.log(JSON.stringify(inspect, null, 2)); process.exit(inspect.lockIssues.length ? 2 : 0); }
assertLocks(); assertClean(); assertToolchain();
assert(existsSync(OPEN_CONFIG), 'Explicit OpenNext configuration must exist; never auto-migrate or provision resources');
const before = sourceSnapshot();
try {
  await runLogged('app-ci', 'npm', ['ci', '--audit=true']);
  await runLogged('tools-ci', 'npm', ['--prefix', 'preview/tools', 'ci', '--audit=true']);
  assertInstalled(); assertClean();
  await runLogged('opennext-build', process.execPath, [join(TOOLS, 'node_modules/@opennextjs/cloudflare/dist/cli/index.js'), 'build', '--config', REMOTE_CONFIG, '--openNextConfigPath', OPEN_CONFIG], { env: { NODE_OPTIONS: '--max-old-space-size=2048' } });
  assertClean(); const after = sourceSnapshot(); assert.deepEqual(after, before, 'Tracked build changes must be reviewed, not silently committed');
  const config = readJson(join(ROOT, '.next/required-server-files.json')).config;
  assert.notEqual(config.images?.unoptimized, true, 'IMAGES optimization must stay enabled');
  const selfAssessment = assessSelfReferences();
  const receipt = { ...after, BuildID: readFileSync(join(ROOT, '.next/BUILD_ID'), 'utf8').trim(), versions: PINS, supportedVersionsVerified: true, selfAssessment, imagesUnoptimized: config.images?.unoptimized ?? false, artifacts: artifactSnapshot(), generatedUTC: new Date().toISOString(), scope: 'Current local/CI build only; no UI, official Preview or production acceptance implied' };
  saveJson('build-receipt.json', receipt); console.log(JSON.stringify({ result: 'BUILD COMPLETE', BuildID: receipt.BuildID, commit: receipt.candidate_commit }));
} catch (error) { saveJson('build-failure.json', { message: String(error), trackedStatus: (await import('./common.mjs')).git('status', '--porcelain'), noAutomaticCommit: true }); throw error; }
