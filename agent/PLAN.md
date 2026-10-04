# MCP Governance foundation plan

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

This owner plan implements the Cxsun master plan at `../../projects/cxsun/agent/PLAN.md`.
Keep the master task IDs and phase order. Existing release history remains in CHANGELOG.

## Scope and boundaries

Own authenticated read-only guidance, repository metadata, focused resource discovery, and connection diagnostics.
Keep implementation and application permissions inside their owning packages.
Instruction retrieval does not approve edits, deployments, commits, or publication.
Use consistent human-readable guidance with one authoritative contract per topic.

## Phase 01 — Verified baseline

### 01.07 — Register required owners and reconcile cloud snapshots

Audit registered roots, package exports, identity claims, and current agent records.
Register Platform source metadata under its own `platform` ID.
Separate authenticated guidance access from deployed repository registration.
Prepare an accurate snapshot after all owner plans and evidence exist.
Deploy only within authorized release scope and verify the exact deployed snapshot afterward.
Acceptance: each required owner receives correct identity and current verified metadata.
Current status: partial. Cloud connection passes. Platform metadata registration is source-only.

## Phase 02 — Public contracts

### 02.06 — Focused resource discovery

Define resource lookup by owner, topic, package version, and task intent.
Each guide states purpose, owner, public entry point, required steps, example, and verification.
Keep protocol resources read-only and safe. Exclude secrets and database content.
Acceptance: agents find the correct public contract without private sibling imports.

## Phase 03 — Identity implementation support

Provide accepted identity contracts to Platform and Cxsun consumers.
Record actual implementation evidence before changing capability claims.
This owner does not implement identity modules or persistence.

## Phase 04 — Connected user interface support

Expose accepted navigation, forms, resource routes, and field-error contracts.
Keep shared presentation guidance consistent with verified UI and Cxsun behavior.
This owner does not implement product screens.

## Phase 05 — Guidance and diagnostics

### 05.03 — Publish concise foundation guidance

Cover setup, architecture, APIs, events, UI, SQLite, package releases, and application generation.
Explain intentional module ownership and practical DDD with concrete examples.
Use events for accepted asynchronous requirements and preserve owner contracts.
Distinguish implemented, planned, and historical capabilities.
Acceptance: documents use consistent names and reflect accepted public contracts.

### 05.04 — Detect connection and metadata drift

Report wrong identity, missing content, stale snapshots, and incompatible versions.
Keep required live connections fail-closed. Never use cached guidance as fallback.
Acceptance: failures identify the condition and recovery step without exposing credentials.

## Phase 06 — Verification

### 06.06 — Verify agent lookup and failure cases

Test representative owner, topic, version, and task lookups.
Verify authentication denial, invalid identity, missing content, timeout, and stale metadata behavior.
Run owner checks and protocol checks. Verify authenticated cloud resources after authorized deployment.
Acceptance: correct contracts return for concrete tasks and failures remain explicit.

## Phase 07 — Standard release

Support master task 07.04: deploy release contracts and supported upgrade instructions.
Publish exact compatibility and snapshot provenance after owner release evidence exists.
Verify fresh consumer connections and record the generated timestamp.
Acceptance: live guidance agrees with the released packages and the generated app contract.

## Dependencies and handoff

Receive contract and verification evidence from Framework, Platform, UI, UIUX, Tools, addons, and Cxsun.
Return focused public guidance and deployed snapshot evidence to the coordinating agent.
Review corrections and rerun affected checks before closing any phase.
No task is complete from documentation alone.

## Task checkbox tracking

Use [owner phase checklist](TASK.md) for current checkboxes and numbered substeps.
Use [master checklist](D:/codexsun/projects/cxsun/agent/CHECKLIST.md) for all owners and shared release gates.
Keep task IDs unchanged. Check a parent only after all its acceptance criteria pass.
