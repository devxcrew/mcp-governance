# Changelog

## Version State

Current version: 0.1.2

Release tag: v-0.1.2

Changelog label: v 0.1.2

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
