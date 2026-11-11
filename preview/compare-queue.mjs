import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { resolve, dirname, basename } from 'node:path';
import { createHash } from 'node:crypto';
const inputs = process.argv.slice(2);
assert.equal(inputs.length, 2, 'Read-only diagnostic: compare-queue.mjs FIRST_METADATA.json SECOND_METADATA.json');
function original(metadataPath) {
  const meta = JSON.parse(readFileSync(metadataPath, 'utf8'));
  assert.equal(meta.runtimeModule, '.open-next/.build/durable-objects/queue.js');
  assert.equal(meta.rawOriginalAvailable, true, 'Original module is unavailable; do not reconstruct it');
  assert(/^[a-f0-9]{40}$/.test(meta.compiledAgainstCommit));
  assert(/^[A-Za-z0-9_-]+$/.test(meta.BuildID));
  assert(/^[a-f0-9]{64}$/.test(meta.sha256));
  const path = resolve(dirname(metadataPath), meta.module);
  assert.equal(basename(path), 'queue.js');
  const bytes = readFileSync(path); const rawSHA256 = createHash('sha256').update(bytes).digest('hex');
  assert.equal(rawSHA256, meta.sha256, 'Raw original module differs from its saved manifest');
  const text = bytes.toString('utf8'); const literal = JSON.stringify(meta.BuildID);
  assert.equal(text.split(literal).length - 1, 4, 'Exactly four real BuildID literals are required');
  return { meta, rawSHA256, comparison: text.split(literal).join('"<DIAGNOSTIC_CURRENT_BUILD_ID>"') };
}
const [a,b] = inputs.map(original); assert.notEqual(a.meta.BuildID, b.meta.BuildID);
console.log(JSON.stringify({ diagnosticOnly: true, runtimeModule: a.meta.runtimeModule, first: { compiledAgainstCommit:a.meta.compiledAgainstCommit, BuildID:a.meta.BuildID, rawSHA256:a.rawSHA256 }, second: { compiledAgainstCommit:b.meta.compiledAgainstCommit, BuildID:b.meta.BuildID, rawSHA256:b.rawSHA256 }, identicalExceptExactlyFourBuildIDLiterals: a.comparison === b.comparison, artifactWrites: false, receiptsWritten: false, deploymentAcceptance: false }, null, 2));
if (a.comparison !== b.comparison) process.exitCode = 1;
