# Changelog

## Version State

Current version: 0.1.9

Release tag: v-0.1.9

Changelog label: v 0.1.9

## v-0.1.9

### [v 0.1.9] 2026-10-05 10:28 am - Remove Veyrezio from managed governance

#### Database Changes

- Database update: No (manual).

#### App Codebase Changes

- Publish the 13-repository cloud inventory and verify the remaining connections.

## v-0.1.8

### [v 0.1.8] 2026-10-05 10:07 am - Cloud-only module contracts and reliable MCP checks

#### Database Changes

- Database update: No (manual).

#### App Codebase Changes

- Align canonical module guidance, verify cloud resources and metadata, and retry transient MCP failures.

## v-0.1.7

### [v 0.1.7] 2026-10-05 9:30 am - Strengthen module ownership guidance

#### Database Changes

- Database update: No (manual).

#### App Codebase Changes

- Require canonical module files and controller wiring in governance.

## v-0.1.6

### [v 0.1.6] 2026-10-05 8:37 am - Align workspace packages

#### Database Changes

- Database update: No (manual).

#### App Codebase Changes

- Align maintenance tooling and correct the published package installation example and inventory state.

## v-0.1.5

### [v 0.1.5] 2026-10-05 7:58 am - Adopt Framework and UI package names

#### Database Changes

- Database update: No (manual).

#### App Codebase Changes

- Use the public @devxcrew/framework and @devxcrew/ui packages. Preserve module ownership and existing behavior.

## v-0.1.4

### [v 0.1.4] 2026-10-04 5:00 pm - Deliver foundation governance source

#### Database Changes

- Database update: No (manual).

#### App Codebase Changes

- Update owner registrations, focused discovery and human-readable module guidance. Cloud snapshot deployment remains deferred.

## v-0.1.3

### [v 0.1.3] 2026-10-03 9:17 am - Consume devxcrew npm packages

#### Database Changes

- Database update: No (manual).

#### App Codebase Changes

- Use devxcrew Framework and UI names in live guidance and repository inspection verification.
- Add local npm connection and publishing notes, including device authentication and package development commands.

## v-0.1.2

### [v 0.1.2] 2026-10-03 8:58 am - Require audited cloud MCP guidance

#### Database Changes

- Database update: No (manual).

#### App Codebase Changes

- Deploy authenticated Cloudflare MCP, consolidate five shared guides, remove duplicate archived guidance from the active repository, enforce cloud-only clients, and verify five resources and three tools.

#### Verification

- Passed npm run verify and npm run cloud:check: eight tests, typechecks, versions, LF, build, Worker protocol checks, and deployment dry run.
- Authenticated live MCP retrieval passed. Configured-secret and Git whitespace scans passed.

## v-0.1.1

### [v 0.1.1] 2026-10-03 8:38 am - Use live governance for shared documentation and rules

#### Database Changes

- Database update: No (manual).

#### App Codebase Changes

- Made the Cloudflare MCP endpoint the default client target and documented it in every repository
  README, AGENTS, and skills notes. Local guides remain editable source and offline fallback; only
  explicit local server/testing paths retain loopback URLs. Updated app manifests and verified cloud
  connections.

### [v 0.1.1] 2026-10-03 8:30 am - Connect Cloudflare-hosted governance

#### Database Changes

- Database update: No (manual).

#### App Codebase Changes

- Configured the HTTPS governance endpoint at mcp.codexsun.com/mcp while keeping secrets in ignored
  environment files. Cloudflare Workers serves authenticated read-only MCP from a deployment
  snapshot; local listener remains optional and advisory offline behavior is preserved.

### [v 0.1.1] 2026-10-02 10:45 pm - Audit advisory governance and metadata safety

#### Database Changes

- Database update: No (manual).

#### App Codebase Changes

- Resolved mandatory-connectivity and foundation-scope wording conflicts, added validated
  allowlisted app manifests with safe advisory warnings, exposed capability limits, and blocked
  unsafe client URLs and redirects. Six tests, typecheck, build, formatting, version/LF checks, and
  all six authenticated live connections passed.

### [v 0.1.1] 2026-10-02 10:39 pm - Align isolated application foundation instructions

#### Database Changes

- Database update: No (manual).

#### App Codebase Changes

- Adapted the supplied new-app prompt to actual shared package paths, advisory MCP policy, isolated
  app ownership, provider composition, and three role-specific identity portal/desk contracts. Added
  audit/todo records. Application manifests describe current capabilities; real identity remains
  pending shared Platform Core. Preserved current changelog and environment contracts.

### [v 0.1.1] 2026-10-02 10:34 pm - Define resource routes and browser navigation contracts

#### Database Changes

- Database update: No (manual).

#### App Codebase Changes

- Set versioned Laravel-style API resources, browser-to-API mappings, validated URL filters and
  pagination, resource response contracts, and module-owned breadcrumbs that preserve list state.
  Create/edit APIs are optional read-only metadata extensions. Updated standards only; existing app
  routes and UI behavior are unchanged.

### [v 0.1.1] 2026-10-02 10:29 pm - Define frontend and backend validation standards

#### Database Changes

- Database update: No (manual).

#### App Codebase Changes

- Required module-owned TanStack Form with Zod for frontend forms and independent server-side Zod
  validation for untrusted input. Defined schema ownership, parsed controller input, safe field
  errors, domain checks, and queue payload validation. No application forms, endpoints, or package
  dependencies were changed.

### [v 0.1.1] 2026-10-02 10:27 pm - Define provider and controller module roles

#### Database Changes

- Database update: No (manual).

#### App Codebase Changes

- Replaced the module registration filename with <module>.provider.ts and defined injected public
  provider contracts as the communication boundary. Added optional module-owned controllers for
  request orchestration while keeping routes declarative and business rules in services. Applied
  matching frontend ownership without mandatory extra layers.

### [v 0.1.1] 2026-10-02 10:26 pm - Keep only active common governance documents

#### Database Changes

- Database update: No (manual).

#### App Codebase Changes

- Retained five shared MCP guides and the client template. Removed obsolete archives, completed
  audits, duplicate Tools guidance, legacy release notes, and gallery-specific documentation from
  the active repository. Preserved superseded files in an external local backup and placed current
  gallery instructions in UIUX.

### [v 0.1.1] 2026-10-02 10:21 pm - Define strict module ownership standards

#### Database Changes

- Database update: No (manual).

#### App Codebase Changes

- Set modular-monolith and practical DDD rules for matching frontend/backend modules, public
  contracts, owner-local persistence and UI, optional events and retryable queues, and a practical
  700–900-line source limit. Referenced the CXApp app module layout without changing application
  runtime.

### [v 0.1.1] 2026-10-02 10:02 pm - Improve Markdown readability

#### Database Changes

- Database update: No (manual).

#### App Codebase Changes

- Simplified active documentation, removed repeated wording, and organized instructions into clear
  sections, paragraphs, lists, and tables. Formatted Markdown with consistent spacing and LF while
  preserving historical content and release metadata.

### [v 0.1.1] 2026-10-02 9:56 pm - Consolidate root agent instructions

#### Database Changes

- Database update: No (manual).

#### App Codebase Changes

- Merged root agent instructions into AGENTS.md, removed the duplicate AGENT.md, and updated active
  documentation, MCP metadata, and fallback references. Historical logs and archives remain
  unchanged.

### [v 0.1.1] 2026-10-02 9:41 pm - Central governance and repository agent layout

#### Database Changes

- Database update: No (manual).

#### App Codebase Changes

- Centralized common guidance and archived prior assist records; added repository agent instructions
  to read-only MCP responses and shared maintenance routing. Four integration tests, typecheck,
  build, formatting, and six live repository connections passed.

## v-0.1.0

### [v 0.1.0] 2026-10-02 9:30 pm - Central governance and repository agent layout

#### Database Changes

- Database update: No (manual).

#### App Codebase Changes

- Moved common guidance and audits to mcp-governance, preserved repository changelog history in
  agent/CHANGELOG.md, added local task and plan records, and wired centralized maintenance commands
  with legacy tools compatibility.

### [v 0.1.0] 2026-10-02 8:53 pm - Shared read-only governance MCP server

#### Database Changes

- Database update: No (manual).

#### App Codebase Changes

- Added authenticated Streamable HTTP, common repository and UI guides, live public package
  inspection, advisory client connection, and protocol verification. Verified all six live MCP
  connections, four MCP protocol tests, common offline fallback, and repository checks. Cxsun
  production routes and UIUX builds passed.

## Cloud-only governance — 2026-10-03

- Require live authenticated MCP guidance. Remove local guide fallback and sibling client imports.
- Connection commands fail when cloud guidance is unavailable or another endpoint is configured.

## Live MCP audit — 2026-10-03

- Enforced the cloud endpoint for direct client imports and validated instruction identity.
- Extended cloud request timeouts to 15 seconds and verified all live resources and tools.

## npm package names — 2026-10-03

- Updated public imports, package manifests, local development commands, and common guidance.

## npm migration completion — 2026-10-03

- Passed: Cxsun installed both registry packages and records registry URLs and integrity hashes in its lockfile.
- Passed: UIUX typecheck and production build with the new UI package name. UIUX intentionally keeps its local source gallery dependency.
- Passed: Governance cloud checks, deployment, and authenticated connections from all six repositories.
- Passed: Tools source compatibility tests (21 tests). Tools npm publication was not part of this release.
- Untested: Real identity, RBAC, and tenancy; these remain outside this package migration.

## New application foundations — 2026-10-03

- Register billing, crm, and qcafe as isolated project applications with live repository metadata.
- Preserve Cxsun and the published package setup.

## Ecommerce foundation — 2026-10-03

- Add Ecommerce to the live repository registry. Each project retains its own configuration and public package dependencies.

## Standalone guidance update — 2026-10-03

- Define npm-only Tools maintenance and single-app CI checkout for project foundations.
- Document preserved environment initialization, required live MCP access, and optional shared source development.
- Deploy the updated snapshot and verify retrieval by all five project apps.
- Preserve release version. No Git commit or push was performed.

### 0.1.4 inventory completion

Include Veyrezio in the 14-repository governance snapshot. Verify local cloud preparation without deploying.

### Package migration verification - 2026-10-05

- Passed 9 tests, owner verification and applicable package checks.
- All six application lockfiles use exact Framework 0.1.8 and UI 0.2.0 registry artifacts.
- Two fresh registry apps passed 44 tests each, live SQLite and cross-app session denial.
- The gallery passed source and isolated registry verification with bundle budgets.
- Browser, real SMTP and production deployment acceptance remain separate.

### Package reference cleanup - 2026-10-05

- Remove superseded package identifiers from source, fixtures and current documents.
- Current release receipts use verified registry checksums for Framework and UI.
- Original publication records remain in Git history.
- No test suite, publication or deployment ran in this cleanup.

## Dependency alignment - 2026-10-05

- [x] Align consumed shared packages and common direct dependency versions.
- [x] Install dependencies with lifecycle scripts disabled.
- [x] Keep app dependency ownership and public peer ranges.
- [x] Exclude Veyrezio from this change.

Source version: 0.1.6. Published package archives retain their existing versions.
The baseline is recorded in projects/cxsun/agent/DEPENDENCY-BASELINE.json.
