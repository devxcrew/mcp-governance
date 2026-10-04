# Application foundation

Use this guide when creating or extending an isolated CODEXSUN application. Read the supplied
application name, ID, and target path. Do not invent a target. These foundation instructions defer
business features to a separately requested task.

## Before work

1. Read workspace-root `AGENTS.md`.
2. Read application `README.md`, `AGENTS.md`, and the relevant records in `agent`.
3. Read `codexsun.governance.json` when present.
4. Confirm the current directory, Git root, and working status. Preserve unrelated changes.
5. Retrieve authenticated MCP instructions through `npm run mcp:connect` and record the result.

Retrieve shared documentation and rules only from `https://mcp.codexsun.com/mcp` using `npm run mcp:connect`.
A successful authenticated connection is required before repository work. Stop and report connection failures.
Do not use local guides or cached instructions as fallback. Instruction retrieval does not authorize actions.

## App isolation and shared packages

Each app owns its repository, version, environment, ports, routes, configuration, and runtime state.
Separate apps must not share identity sessions, browser storage keys, query caches, or tenant
context accidentally. Use public package exports. Never copy shared implementation code into an app.

| Owner                         | Responsibility                                       |
| ----------------------------- | ---------------------------------------------------- |
| Framework                     | Business-neutral runtime and transport primitives    |
| Platform Core, when available | Identity, sessions, authorization, RBAC, and tenancy |
| UI                            | Presentation components and MainWorkspace            |
| Tools                         | Development lifecycle and repository maintenance     |
| App provider/composition root | Connect public providers and configure the app       |

The workspace owners are Framework, UI, Platform Core, Tools and MCP Governance.
Platform Core lives in `shared/platform` and exports identity providers, migrations and seeds.
Cxsun composes these public packages. Do not import private sibling source files.
The current Platform development artifact is bundled in Cxsun. Registry publication remains pending.
Verify the consuming app's package manifest and audit before assuming a contract is available.

## Three identity portals and desks

| Identity            | Login route    | Desk route    | Shared presentation                       |
| ------------------- | -------------- | ------------- | ----------------------------------------- |
| User                | `/login`       | `/desk`       | `ClientLoginPage` and `MainWorkspace`     |
| Administrator       | `/admin/login` | `/admin/desk` | `AdminLoginPage` and `MainWorkspace`      |
| Super administrator | `/sa/login`    | `/sa/desk`    | `SuperAdminLoginPage` and `MainWorkspace` |

Public home pages stay outside MainWorkspace. Each flow is public page â†’ role-specific shared login
page â†’ authorized role-specific desk. UI components collect input and render the desk. Platform Core
verifies identity and resolves permissions and trusted scope. A role in a URL, dropdown, browser
storage, or frontend preview never authorizes access. Administrator login must not silently grant
super-administrator rights.

Platform sessions must bind app ID, portal identity, and trusted organization scope. Use
server-managed sessions and namespaced, HttpOnly cookies with appropriate Secure, SameSite, path,
and host settings. If JWTs are part of Platform's contract, enforce its issuer, audience, expiry,
and verification rules centrally in Platform. Do not implement app-local token, password, session,
or RBAC engines. Reject cross-app and cross-portal session reuse. Clear scoped caches on login
changes and logout. If simultaneous portals are supported, use distinct verified session scopes and
cookies. Otherwise explicitly replace the prior principal and clear its state. Do not claim
isolation from UI routes alone.

Single-client mode resolves one configured organization on the server. Multi-tenant mode resolves
authenticated membership on the server. RBAC checks apply to API operations and desk access. Hiding
a menu is presentation only.

## Environment

Group `.env.example` values by application, governance, identity, and development lifecycle. Use a
distinct app ID, app URL, and reserved port for every app. Keep secrets in ignored `.env` files and
outside source, logs, manifests, and frontend bundles.

Current apps use `APP_MODE` as the environment authority. New foundations may adopt
`APP_ENV=development|production` only when the runtime and validators support it. Do not create
conflicting authorities or silently change existing apps.

Automatic login requires both development mode and `AUTO_LOGIN=1`. `AUTO_LOGIN_MODE` may select
`user`, `admin`, or `super-admin` only through a real Platform development adapter. Production must
reject automatic login regardless of the flag. A frontend preview is not a seeded authenticated
login.

Current governance uses `MCP_SERVER_URL`, `MCP_SERVER_SECRET`, `APP_ID`, and `APP_USER`. Do not
generate cloud-approved secrets or introduce `MCP_CONNECTION_SECRET`, stack registries, or cloud
approval claims without that service. Any future cloud-issued connection secret remains empty until
issued by its authorized service.

## Repository records

Keep reusable application instructions here. Do not copy prompt documents into every app.

| File                 | Purpose                                                 |
| -------------------- | ------------------------------------------------------- |
| `AGENTS.md`          | Repository rules and central guidance link              |
| `agent/SKILLS.md`    | Owner capabilities and reminders                        |
| `agent/PLAN.md`      | Numbered build phases                                   |
| `agent/TASK.md`      | Current task and evidence                               |
| `agent/TODOS.md`     | Remaining work                                          |
| `agent/AUDIT.md`     | Passed, failed, blocked, partial, and untested findings |
| `agent/CHANGELOG.md` | Versioned changes in the format supported by Tools      |

Keep one changelog. Current Tools requires its existing version-state and versioned-entry format. Do
not add a root duplicate or switch to `## version - YYYY-MM-DD HH:mm` until Tools supports it
explicitly. An application manifest may describe app identity, contract version, connection policy,
and evidence requirements. It must not claim remote approval, enforcement, or capabilities that do
not exist.

## Build phases

1. Inspect the app, package contracts, and governance capabilities.
2. Prepare owner records, environment examples, and governance metadata.
3. Wire Tools port lifecycle commands through supported public contracts.
4. Register Framework, UI, and available Platform providers in the app composition root.
5. Build public pages and three shared login entry pages.
6. Connect role-specific MainWorkspace desks through verified Platform contracts.
7. Verify routes, permissions, session isolation, restart behavior, and production guards.
8. Record evidence and incomplete capabilities in TASK and AUDIT.

Development preflight may reclaim only verified listeners belonging to the same app. Provide
check/start/stop through supported Tools commands or a small app-owned adapter. Production must fail
on port conflicts without terminating another process. Do not claim unavailable `preflight --stop`,
governed CLI, or template-generation commands work.

This task creates a foundation only. Do not add business entities, APIs, workflows, or Frappe
DocTypes. Do not create backend business code during a frontend-only phase. When business modules
are separately requested, follow [module standards](code-standard.md): providers, optional
controllers, Zod validation, and resource routes.

## Acceptance evidence

Record each result as passed, failed, blocked, partial, or untested, with the command or observed
behavior. Verify typecheck, build, direct routes, refresh, login/logout, wrong-role denial,
cross-app/portal isolation, and port restart. Verify single-client and multi-tenant behavior only
when those modes are implemented. Never report browser or identity verification from a static build
alone.

Cxsun implements three authenticated identity portals through its Platform development package.
Identity administration resources and settings are tracked in the owner release plans.
UIUX is an independent developer gallery. Shared package checks do not establish app identity acceptance.
Read current owner audit evidence before claiming a flow is complete.

## File-backed database acceptance

Use Cxsun's configured SQLite file for normal final browser and API acceptance.
Use separate SQLite files for destructive, migration and concurrency tests.
Memory databases and mocks cannot establish release persistence evidence.
Verify UI, API and stored state, then restart the server and verify persistence.
Preserve existing users, settings and operational data during migrations and seeds.

## Focused contract discovery

Use find_guidance with a task topic and optional repository/package version.
Topics cover architecture, resources, identity, presentation, persistence, asynchronous work, setup and maintenance.
The response identifies authoritative resources and responsible owners.
A version mismatch fails explicitly. Snapshot metadata is evidence of its recorded source state.
Cloud consumers receive discovery changes only after the governance release is deployed.

## Published shared packages

Project applications consume `@devxcrew/core-framework` and `@devxcrew/react-ui` from npm. Do not add `file:` dependencies to project manifests.
Shared repositories remain development owners. Cxsun can explicitly install local packed snapshots with `npm run packages:local` and restore npm packages with `npm run packages:npm`.
UIUX remains the separate local source gallery. UI exports require a TypeScript-aware React bundler. Framework publishes compiled JavaScript and declarations.

## Standalone project development

Project apps consume @devxcrew/tools@0.1.7 or a verified newer release from npm.
Use installed package commands for maintenance. Do not route app scripts through sibling MCP Governance or Tools files.
App CI must check out only the app and run npm ci, tools:env, verify, and packages:check.
Keep agent/CHANGELOG.md configured in .devxcrew-tools.json.

Development setup requires Node/npm manifest versions, ignored environment configuration, live MCP credentials, and an available port.
Initialize configuration with tools:env. Set the cloud secret, then use setup or mcp:verify before dev.
No local guidance fallback is allowed.

Local shared-package snapshots are optional source development tools. They must not be required for normal npm installs or app startup.
UIUX remains a deliberate shared UI source gallery and is outside the registry-only project-app contract.
Remove advertised desktop or container scripts until their owner provides the required scaffold.

## Explicit module extension contracts

Cxsun source composes backend registrations through Framework composeModules and its neutral application provider.
A backend owner contributes its public provider, declared dependencies, lifecycle hooks and request handler.
Composition does not scan module folders or import private implementations.
Handlers receive cancellation. Browser-path dispatch also has a bounded handler deadline.
Readiness follows module startup. Failed startup closes started dependencies in reverse order.
The app owns the SQLite connection. Platform owns identity persistence and schema contracts.

Frontend owners contribute public routes and navigation through the frontend contributor contract.
identityProvider.workspace supplies the common authenticated shell, presentation, permissions and session handling.
An added module composes its pages inside that shell instead of copying identity screens.
Business fields, forms, validation and resource implementation remain in their owning module.
A hidden navigation item is not authorization. Backend requests independently enforce access.

Platform public registerPermissions accepts owner declarations with app-qualified permission IDs.
Declare IDs as <APP_ID>.<owner>.<action> and list supported portals.
Await declaration registration before readiness and permission-dependent routes.
Registration creates permission vocabulary. It does not grant permissions to users or roles.
Use public authenticateRequest for browser-cookie requests. It validates portal, trusted origin and cancellation.
Use public requirePermission for module actions after authentication.
Keep cookie parsing, session lookup and origin enforcement in Platform.
Map public IdentityError status, safe message and field errors into Framework HttpError at the app transport boundary.
Do not catch private Platform error files or expose raw database errors.

These extension contracts describe verified local source development.
Published package versions and deployed MCP guidance can predate the source contracts.
Check installed public exports and authenticated snapshot provenance before using a contract.
Independent registry release acceptance remains open.
Real email testing and production deployment are deferred by the user.
