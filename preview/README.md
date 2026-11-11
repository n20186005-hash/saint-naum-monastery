# Row33 isolated supported Preview tooling

This directory is only used by explicit Preview commands. Root production/default build scripts and default Wrangler configuration are unchanged. No SELF, storage, queue or production-resource binding is configured. Remote configuration binds the Images API under previews; local dev uses the equivalent top-level IMAGES binding. Actual transformation must be tested, not inferred from200.

Target app/tools Next15.5.29, React/DOM19.2.6, adapter1.20.16/AWS4.1.15, Wrangler4.160.0. Use normally provisioned Node24.22.1/npm10.9.2. Lockfiles are generated/reviewed only through normal audited npm; never hand-edit or use unsupported/force/legacy-peer/ignore-script flags. Do not bypass any rejection through CI or an alternate entry.

- `node preview/build.mjs --inspect`: read-only configuration/lock readiness, no install.
- `node preview/build.mjs`: separately authorized full audited clean installations and complete OpenNext build. Requires frozen clean source and both valid locks. Not run merely to inspect configuration.
- `node preview/verify.mjs [all|node|worker]`: separately authorized types and local HTTP/asset/original-image/full-decode checks; only one owned service at a time, finally cleanup. Requires existing Python3/Pillow; never installs a decoder or disables its guards. Real400CSS independent browser QA remains separate.
- `node preview/publish.mjs --inspect`: read-only branch/config readiness.
- `node preview/publish.mjs`: separately authorized remote Preview publication only for relay/row33-saintnaum-rebuild-20261111 and an exact matching build receipt. No Production/Base/route edits or deployment command.

Preview on workers.dev is public by default, with platform noindex. Local/Library review is private; noindex is not access control. If authenticated remote privacy is required, publication remains pending authorized existing Access verification. No Access/DNS/permission changes are performed here.

The OpenNext configuration uses.mjs and the explicitly supported custom config path so ordinary root Next typechecking does not import an uninstalled isolated build dependency. It has @ts-check and is independently typechecked by verify.mjs against Node/ES runtime types after tool dependencies exist. It imports the package’s supported config export. Wrangler independently generates actual Worker binding/runtime declarations; those are kept separate from the Node build configuration. It does not alter root TypeScript exclusions or skip missing generated types.

App canonical/hreflang remain the formal Saint Naum domain; the old Petrovaradin-spelled URL is a retained Saint Naum alias. Do not delete it or import Serbian attraction facts. All20 original image files, including giant17, must remain byte-identical. Cache uses explicit dummy implementations; stable WorkerMISS is not persistent cacheHIT proof.

The pinned adapter exports an unbound DO queue class containing SELF access in its constructor. Build verification inventories all SELF paths and both constructor uses, checks the original pinned adapter source and forbids DO/service bindings. Every generated .open-next file is recorded using its real SHA256 and rechecked unchanged by verification/publication. No BuildID normalization is used by those gates.

`node preview/compare-queue.mjs FIRST_METADATA.json SECOND_METADATA.json` is a standalone read-only diagnostic for two preserved original .open-next/.build/durable-objects/queue.js modules. It validates both raw SHA256 values and real BuildIDs before comparing exactly four embedded BuildID literals in memory. It does not write modules or receipts, is not called by any build/verify/publish entry, and cannot authorize publication. A missing original is a hard diagnostic gap, never reconstructed as an original.
