import assert from 'node:assert/strict';
import { join } from 'node:path';
import { TOOLS, REMOTE_CONFIG, validateConfigs, validateManifests, lockIssues, publicationBranch, assertPublicationBranch, assertLocks, assertClean, assertToolchain, assertInstalled, assertReceipt, runLogged } from './common.mjs';
const args = process.argv.slice(2);
assert(args.length === 0 || (args.length === 1 && args[0] === '--inspect'), 'Unknown publish arguments');
if (args[0] === '--inspect') { console.log(JSON.stringify({ branch: publicationBranch(), lockIssues: lockIssues(), manifests: validateManifests(), config: validateConfigs(), remoteAction: false, note: 'Remote workers.dev Previews are public by default; this is not an access-control tool' }, null, 2)); process.exit(0); }
// This command is a separate authorized remote action, never a build-failure fallback.
assertPublicationBranch(); assertLocks(); assertClean(); assertToolchain(); assertInstalled(); validateConfigs(); validateManifests(); assertReceipt();
await runLogged('official-preview', process.execPath, [join(TOOLS, 'node_modules/wrangler/bin/wrangler.js'), 'preview', '--config', REMOTE_CONFIG]);
// No --name override, deploy, Base/Production edit, resource provisioning or secrets-file command.
