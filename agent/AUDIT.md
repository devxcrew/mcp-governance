# Governance audit — 2026-10-02

## Cloud-only governance and app connections - 2026-10-05

- Passed: authenticated cloud MCP connection before editing.
- Passed: source snapshot prepared with five guides and 14 repository records.
- Passed: client now retries transient network and HTTP 429/5xx failures and strict mode checks cloud metadata, resources, and tool discovery.
- Pending: source verification, Worker deployment, and live per-app strict connections.
- Veyrezio checkout is unavailable locally; its current metadata was read from GitHub for snapshot preparation.


## Strict module file contracts - 2026-10-05

- Passed: authenticated MCP connection before source edits.
- Passed: central code standard and workspace instructions now require every listed backend and frontend file.
- Passed: backend controller is mandatory and route wiring must follow controller → service.
- Partial: MCP remains advisory and its published snapshot predates this source change; remote consumers do not receive it until deployment.
- Untested: automated structural linting and repository test suite were not run.

## Package reference cleanup - 2026-10-05

- [x] Retrieve authenticated cloud governance.
- [x] Remove superseded package identifiers from source, fixtures and current documents.
- [x] Use Framework and UI names consistently.
- [x] Scan repository files for remaining superseded identifiers.

Static cleanup only. No test suite, publication or deployment ran in this step.

## Package migration - 2026-10-05

- [x] Retrieve authenticated cloud governance before this migration.
- [x] Update active package imports, helpers and manifests to the shorter public names.
- [x] Verify nine source tests, formatting, Worker smoke and deployment dry run.
- [x] Prepare new-name source metadata. Cloud deployment remains deferred.
- [x] Commit and push the reviewed migration.

## Independent review - 2026-10-04

Normalized owner record headings to place the document title first.
Ignored .cache/ because it contains local execution evidence and live connection output.
Inspected filenames and sizes only. No cache payload or credentials were printed.

Authenticated cloud connection passed before this review.
`npm run verify` passed nine tests, type checks, versions, LF, and build.
`npm run cloud:test` failed at tools/cloud-smoke.ts:38. Source exposes four tools, but the smoke test expects three.
Corrected the smoke test to assert exact tool names and execute identity discovery with snapshot provenance.
Repeated cloud:test and typecheck passed against local Worker source and its existing generated snapshot.
This check did not deploy the Worker or refresh the generated snapshot.
Task 06.06 still requires deployed discovery and freshness acceptance.
The deployed connection returned snapshot time 2026-10-03T05:58:28.638Z.
Deployed app-setup still describes Cxsun as a preview flow. Email repository metadata remains null.
Source registers Platform and Email and adds focused discovery. These changes are not deployed evidence.
Tasks 01.07, 05.03, 05.04, and 06.06 remain in-review or blocked by release integration.
Exact version equality describes recorded metadata. It does not prove an installed artifact matches unpublished source changes.
Prepare compatible release metadata and a fresh snapshot after owner acceptance. Deploy only within release authorization.
No deployment, publication, commit, or push occurred.

## Fixed

- Removed wording that made strict MCP connectivity a release prerequisite. Governance remains
  advisory.
- Clarified foundation-only scope and that frontend-only apps do not need unused backend layers.
- Rejected credential-bearing URLs, query strings, invalid paths, remote plain HTTP, and HTTP
  redirects in the client.
- Added an allowlisted manifest schema. Unknown fields and guidance paths are not returned through
  MCP.
- Invalid optional manifests return a safe warning while common instructions remain available.
- Published explicit capability flags: no action approval, shared commit reservation, or remote
  enforcement.

## Passed

- Six automated tests, including manifest filtering, invalid metadata fallback, URL safety,
  redirects, HTTP authentication, and offline behavior.
- Typecheck, production build, version alignment, LF, formatting, and Git whitespace checks.
- Authenticated live instruction retrieval in all six repositories after server restart.
- Current app manifests validate as advisory metadata with no enforcement.

## Limits

- A shared bearer secret authenticates the developer connection. App ID and app user are
  caller-provided context.
- Only six fixed repositories expose metadata. Other IDs receive common guidance without repository
  metadata.
- Static guide paths, not manifest fields, select the guidance documents. Returned text and scripts
  are reference data.
- Secrets must never be written in guide or agent records. Filtering metadata cannot make arbitrary
  Markdown secret-safe.
- Platform Core, authenticated identity desks, cloud approval, and new-app generation remain
  unimplemented.
- No business, browser, or database completion is implied by this audit.

## Release

Version remains 0.1.1. This audit is local and uncommitted. No push or npm publication occurred.

## Cloud deployment — 2026-10-03

- Deployed `codexsun-mcp-governance` on Cloudflare Workers with custom domain `mcp.codexsun.com`.
- Authenticated instructions passed for Cxsun, Framework, UI, UIUX, Tools, and Governance over
  HTTPS.
- Unauthenticated `/mcp` returned 401. Worker tests verified protocol, five resources, three tools,
  and origin denial.
- Six Node tests, cloud typecheck, deployment dry run, production build, formatting, and version/LF
  checks passed.
- Wrangler and its dependencies were updated to resolve the install audit findings. Npm audit
  reports zero vulnerabilities.
- Cloudflare stores the connection secret as a secret binding. Ignored app environments use the
  cloud URL; examples keep secrets blank.
- Cloud metadata is a deployment snapshot. It includes its generation timestamp and requires
  redeployment after source changes.
- The local Node listener uses `MCP_LISTEN_URL`. Apps use `MCP_SERVER_URL` for cloud connections.
- Source changes are local and uncommitted. Deployment does not imply a Git push or npm publication.

## Cloud-first documentation — 2026-10-03

- All repository READMEs, root agent rules, and skills notes identify live MCP as the documentation
  and rules source.
- The client and editor template default to `https://mcp.codexsun.com/mcp`. App environment examples
  use the same URL.
- Loopback addresses remain only in the optional local server configuration and isolated tests.
- Local guides are editable source and offline fallback. Historical logs remain unchanged.
- Seven Node tests include default cloud routing. Cloud Worker checks cover the deployed protocol
  contract.

## Cloud-only governance — 2026-10-03

- Passed: authenticated live instructions and required connection policy for this repository.
- Passed: local MCP endpoint rejected with exit code 1. No local guide fallback.
- Governance: seven protocol/client tests and cloud Worker checks passed.
- Cxsun: two development connection tests passed, including no process start on connection failure.
- Business features were not changed or tested. Source changes remain uncommitted.

## Live connection audit — 2026-10-03

- Passed: all six repositories retrieve five cloud guides with their configured app identities.
- Passed: environment secret files are ignored by Git.
- Fixed: imported clients reject every endpoint except https://mcp.codexsun.com/mcp.
- Fixed: clients validate returned app identity and reject missing instruction content.
- Fixed: request timeout is 15 seconds, including Cxsun development startup.
- Passed: official SDK initialization, five live resource reads, and all three live tools.
- Passed: missing/wrong secret, denied origin, and invalid identity HTTP checks.
- Passed: eight governance tests, two Cxsun failure tests, cloud checks, and successful live Cxsun startup.
- No current connection blocker was found. Network availability and valid secrets remain required.
- Cloud metadata is a deployment snapshot. Source changes require redeployment.
- App IDs identify caller context. The shared developer secret is not per-app authentication.
- Long-term uptime and external editor configuration were not tested. Source changes remain uncommitted.

## Release 0.1.2 — 2026-10-03

- Passed npm run verify and npm run cloud:check: eight tests, typechecks, versions, LF, build, Worker protocol checks, and deployment dry run.
- Passed authenticated live MCP connection, release metadata, LF, and configured-secret scans.
- Prepared commit subject: #2 - Require audited cloud MCP guidance.

## npm migration — 2026-10-03

- Passed public package preparation for Framework and UI version 0.1.7.
- Passed packed package consumption, Cxsun full verification, UIUX verification, and eight governance tests.
- npm CLI login and device authentication succeeded as devxcrew.
- Publication returned E409. Registry metadata records Framework unpublished at 2026-10-03 03:30:32 UTC and UI at 03:32:35 UTC.
- npm blocks the same package names for 24 hours. Both names should be eligible after October 4 at 09:03 IST.
- Blocked: registry publication, registry installation, and final project lockfile generation.
- Cxsun currently runs with explicitly installed local packed snapshots. Its manifest names the intended npm versions.
- Do not treat the current project lockfile as a completed registry migration.

## npm migration completion — 2026-10-03

- Passed: Cxsun installed both registry packages and records registry URLs and integrity hashes in its lockfile.
- Passed: UIUX typecheck and production build with the new UI package name. UIUX intentionally keeps its local source gallery dependency.
- Passed: Governance cloud checks, deployment, and authenticated connections from all six repositories.
- Passed: Tools source compatibility tests (21 tests). Tools npm publication was not part of this release.
- Untested: Real identity, RBAC, and tenancy; these remain outside this package migration.

## npm reference notes — 2026-10-03

- Passed: authenticated live MCP connection before documentation edits.
- Passed: registry queries confirm both public package versions at 0.1.7.
- Passed: README link, LF checks, and git diff --check.
- Reviewed: commands against repository scripts and verified release evidence. npm authentication and unpublishing references use official documentation.
- Not repeated: publication and application tests. This change only adds reference notes.

## New isolated applications — 2026-10-03

- Passed: nine governance tests, typecheck, build, Worker checks, and deployment.
- Passed: billing, crm, and qcafe retrieve their own live metadata and common guidance.
- Passed: all three apps complete full verification and browser preview flows. Their audits record the installation workaround.

## Ecommerce foundation — 2026-10-03

- Passed nine governance tests, build, typecheck, Worker checks, and dry run with Ecommerce registered.
- Ecommerce passed clean installation, full verification, startup, and browser preview checks.

## Live MCP access audit — 2026-10-03

- GREEN: authenticated live connection, matching repository metadata, five guidance resources, and all three MCP tools.
- Central evidence: shared/mcp-governance/docs/mcp-access-audit.md.

## Live guidance deployment — 2026-10-03

Standalone npm tooling and app setup guidance is deployed at https://mcp.codexsun.com/mcp.
Worker version: 9222e435-71a6-492b-bb32-3f2b2445f4d8.
Cloud checks passed. Each of the five apps retrieved the updated standalone guide with its authenticated identity.
Environment setup, version alignment, LF, configured-secret frontend scans, and ignored environment files passed for all five apps.
All isolated test ports were released. Git commits and pushes remain unperformed.

## Intergrid registration — 2026-10-03

- Added projects/intergrid to the allowlist and deployed its live instructions.
- Cloud checks passed. Intergrid authenticated and retrieved matching version 0.1.1 metadata.
- Intergrid local checks, browser flow, Tools push, and clean GitHub CI passed.
- Registration source remains part of the pending governance repository changes.

## Foundation owner planning — 2026-10-04

- Passed: governance authenticated cloud MCP access.
- Passed: Platform independent cloud identity connection, with repository metadata null.
- Passed: final npm run verify after Platform source registration: typecheck, nine tests, versions, LF, and build.
- Corrected: owner PLAN and TASK line endings from CRLF to LF.
- Pending: refreshed cloud registry deployment. Source registration does not claim deployed metadata.
- No deployment, publication, commit, or push occurred.

## Fresh local Worker acceptance - 2026-10-04

Authenticated MCP retrieval passed. cloud:check generated five guides and 13 repository records.
Worker type generation, TypeScript, authentication/origin/protocol/focused-discovery smoke checks and Wrangler dry-run passed.
cloud:drift uses authenticated live MCP and reports only safe provenance and tool availability.
The live comparison exited 1 as expected: deployed snapshot 2026-10-03T05:58:28.638Z lacks focused discovery.
The fresh local snapshot is 2026-10-04T07:55:41.327Z. Deployment remains required and was not performed.
Snapshot version remains 0.1.3. Proposed governance patch 0.1.4 awaits accepted release metadata.

## Final extension guidance snapshot - 2026-10-04

Authenticated MCP retrieval passed before source guidance changes.
app-setup and code-standard now describe explicit backend/frontend provider contributions and the common identity workspace.
Documented public namespaced permission declarations, no automatic grants, authenticateRequest and safe IdentityError mapping.
Source contracts remain local unpublished development. Mail tests and production deployment remain user-deferred.
Fresh snapshot: 2026-10-04T09:21:00.003Z, five guides and 13 owners.
cloud:check passed Worker types, local protocol/authentication/origin/discovery smoke and Wrangler dry run.
verify passed nine tests, TypeScript, version alignment, LF and build.
cloud:drift reports deployment-required: live 2026-10-03T05:58:28.638Z has no focused discovery.
No deployment or publication occurred. The initial root-level npm invocation failed because the workspace root has no package manifest; owner-root commands passed.

# Workspace GitHub release - 2026-10-04

npm run verify passed: nine tests, types, aligned metadata, LF and build. Cloud deployment remains deferred.
Configured-secret scan found no matches in Git release candidates.

User authorization: update versions and changelogs, then commit and push all workspace repositories.
Update owner registrations, focused discovery and human-readable module guidance. Cloud snapshot deployment remains deferred.
Authenticated MCP connection passed for this owner before release work.
This delivery covers GitHub source. Npm publication, production deployment and real email acceptance remain separate gates.

## CI repair - 2026-10-04

GitHub run 37199960244 rejected eight files on formatting. Applied the repository Prettier formatter. npm run format:check and npm run verify now pass locally, including nine tests. The repair preserves version 0.1.4 and changes no runtime behavior.

## Completion wave - 2026-10-04

Register Veyrezio in the repository inventory. Verify passes nine tests. Cloud preparation passes snapshot generation for 14 repositories, five guides, four-tool smoke checks, and Wrangler dry run. This is source preparation; the deployed snapshot remains unchanged.

After publication, cloud:check again prepared the current 14-repository snapshot, passed four-tool protocol smoke checks, and completed the Worker dry run. No live deployment was performed.

## Dependency alignment - 2026-10-05

- [x] Align consumed shared packages and common direct dependency versions.
- [x] Install dependencies with lifecycle scripts disabled.
- [x] Keep app dependency ownership and public peer ranges.
- [x] Exclude Veyrezio from this change.

Source version: 0.1.6. Published package archives retain their existing versions.
The baseline is recorded in projects/cxsun/agent/DEPENDENCY-BASELINE.json.
