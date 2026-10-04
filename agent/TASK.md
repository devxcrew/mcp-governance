# Current task

## Completion wave - 2026-10-04

Source 0.1.4 and its formatting repair are committed. Ubuntu and Windows CI passed. The live deployment still returns the 2026-10-03 snapshot. Source guidance is prepared. Cloud freshness acceptance is deferred with deployment.

- [x] Reconcile current status with the GitHub source release and latest owner audit.
- [x] Retrieve fresh authenticated cloud governance before this wave.
- [x] Verify nine tests and cloud preparation for 14 repositories.
- [ ] Deploy and accept fresh cloud metadata within the approved deployment scope.

Use projects/cxsun/agent/REMAINING-WORK.md for ordered cross-owner dependencies.
Production deployment and real SMTP acceptance remain deferred. No pending external gate is marked complete.

## Prior records

<!-- foundation-checklist:start -->

## Numbered phase checklist

Master: [all foundation tasks](D:/codexsun/projects/cxsun/agent/CHECKLIST.md).

Updated: 2026-10-04. Checked steps have recorded evidence. External acceptance stays pending.

### Phase 01 - Baseline and ownership

- [ ] **01.07 Register owners and reconcile deployed metadata** - in-review. Owner: governance.
  - [x] 01.07.1 Source owner registrations and authenticated retrieval verified.
  - [x] 01.07.2 Prepare fresh local snapshot with 13 owners and five guides.
  - [ ] 01.07.3 Refresh deployed snapshot and verify Platform and Email metadata. Deferred by user.

### Phase 02 - Public contracts and release scope

- [ ] **02.06 Define focused guidance discovery contracts** - in-review. Owner: governance.
  - [x] 02.06.1 Owner/topic/version discovery and failure tests pass.
  - [x] 02.06.2 Verify authenticated freshness diagnostic reports actual deployment drift.
  - [ ] 02.06.3 Verify deployed focused discovery. Production deployment deferred by user.

### Phase 05 - Tools, guidance and delivery

- [ ] **05.03 Publish clear and accurate shared guidance** - in-review. Owner: governance.
  - [x] 05.03.1 Source guides revised and duplicated UIUX guidance corrected.
  - [x] 05.03.2 Verify fresh local Worker snapshot, types, smoke and deployment dry run.
  - [ ] 05.03.3 Deploy accepted guidance and verify live contracts. Deferred by user.
- [ ] **05.04 Add compatibility and drift diagnostics** - in-review. Owner: governance.
  - [x] 05.04.1 Source discovery validates repository/version metadata.
  - [x] 05.04.2 Verify live missing discovery and stale snapshot diagnostic.
  - [ ] 05.04.3 Verify deployed incompatible-version contract after production deployment.

### Phase 06 - Verification and operations

- [ ] **06.06 Verify discovery and protocol failures** - in-review. Owner: governance.
  - [x] 06.06.1 Nine tests and corrected four-tool local Worker smoke pass.
  - [x] 06.06.2 Verify local cloud:check, fresh snapshot and authenticated drift result.
  - [ ] 06.06.3 Verify deployed discovery and refreshed provenance. Deferred by user.

<!-- foundation-checklist:end -->

## Earlier task records

## Independent review - 2026-10-04

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

Connect workspace owners to cloud MCP and split the approved foundation roadmap.

## Current evidence

- Passed: authenticated `npm run mcp:connect` at the governance owner on 2026-10-04.
- Passed: independent Platform connection uses its own `platform` identity.
- Partial: Platform receives authenticated shared guidance, but deployed repository metadata is null.
- Pending: deploy refreshed source registry and owner evidence during authorized release work.
- Passed: npm run verify: typecheck, nine tests, versions, LF, and build.

## Active queue

| ID    | Status          | Next action                                                          |
| ----- | --------------- | -------------------------------------------------------------------- |
| 01.07 | Partial         | Verify source registration and reconcile all owner snapshot metadata |
| 02.06 | Planned         | Define focused discovery contracts with owners                       |
| 05.03 | Planned         | Refine guides after public contracts are accepted                    |
| 05.04 | Planned         | Implement freshness and compatibility diagnostics                    |
| 06.06 | Planned         | Verify representative lookups and protocol failures                  |
| 07.04 | Planned support | Deploy exact release contracts within release authorization          |

## Delivery limits

No cloud deployment, package publication, Git commit, or push occurred in this task.
The owner PLAN preserves the master phase IDs. Implementation starts from accepted owner contracts.
Existing working changes remain intact.

## Fresh local Worker acceptance - 2026-10-04

Authenticated MCP retrieval passed. cloud:check generated five guides and 13 repository records.
Worker type generation, TypeScript, authentication/origin/protocol/focused-discovery smoke checks and Wrangler dry-run passed.
cloud:drift uses authenticated live MCP and reports only safe provenance and tool availability.
The live comparison exited 1 as expected: deployed snapshot 2026-10-03T05:58:28.638Z lacks focused discovery.
The fresh local snapshot is 2026-10-04T07:55:41.327Z. Deployment remains required and was not performed.
Snapshot version remains 0.1.3. Proposed governance patch 0.1.4 awaits accepted release metadata.

## Workspace GitHub release - 2026-10-04

Release title: Deliver foundation governance source.
Update owner registrations, focused discovery and human-readable module guidance. Cloud snapshot deployment remains deferred.
Update version records, review release checks, then commit and push the current owner branch.
Preserve existing task history and incomplete acceptance gates.
