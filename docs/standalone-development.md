# Standalone development verification

Date: 2026-10-03

## Result

Cxsun, Billing, CRM, QCafe, and Ecommerce passed the isolated checks below.
No sibling Framework, UI, Tools, or MCP Governance checkout was needed during verification.
Development still requires the manifest Node/npm versions, configured live MCP credentials, network access, and a free port.

| App       | Isolated full verify | Browser flow | Port conflict | Stop/start | Test port |
| --------- | -------------------- | ------------ | ------------- | ---------- | --------- |
| cxsun     | Passed               | Passed       | Passed        | Passed     | 5183      |
| billing   | Passed               | Passed       | Passed        | Passed     | 5184      |
| crm       | Passed               | Passed       | Passed        | Passed     | 5185      |
| qcafe     | Passed               | Passed       | Passed        | Passed     | 5186      |
| ecommerce | Passed               | Passed       | Passed        | Passed     | 5187      |

Full verify includes installed maintenance checks, lint, frontend/server typechecks, three tests, production build, and production HTTP smoke.
Browser checks covered home, preview login, desk, refresh, logout, and direct desk redirect after logout.
Captured browser errors were empty. Cxsun hot reload also passed.

## Changes

- Published and installed @devxcrew/tools@0.1.7. Registry lock entries contain the public tarball and integrity.
- Replaced sibling maintenance wrappers with installed devxcrew-tools commands.
- Changed CI to one checkout, npm ci, tools:env, verify, and packages:check.
- Added setup for preserved environment initialization and live MCP verification.
- Removed unsupported desktop/Docker commands without removing dependencies.
- Added clear optional local source errors and CODEXSUN_SHARED_ROOT.
- Updated common MCP source guidance for standalone app setup.

## Installation method

Clean npm ci --prefer-offline --no-audit completed in the isolated Cxsun clone.
The five lockfiles had identical dependency graphs after excluding root app name and version.

Graph SHA-256: 662f203c6ed4d25f8e350d25a220f93a8ce7d8a0a2c3cc9aeb2feacde327dbf7.

The completed node_modules installation moved into each isolated app folder for sequential verification.
No symlinks, ancestor dependencies, or workspace dependency copies were used.
Each app had its own installed dependencies when tested. This is not five separate clean npm ci runs.
Earlier interrupted parallel installs are preserved as historical evidence, outside the tested repositories.
Two optional package install scripts remained blocked under the existing npm policy. Checks and dev flows still passed.

## Evidence locations

Independent Git clones and logs: D:\codexsun-standalone-verification\2026-10-03\<app>.

- standalone-install.log: clean Cxsun installation. Other apps retain earlier incomplete attempt logs.
- standalone-verify.log: each isolated full verification.
- standalone-dev.log: authenticated live guidance, Tools preflight, and server startup.
- standalone-conflict.log: occupied-port rejection.
- standalone-optional-source.log: clear missing optional source failure.
- standalone-version-show.log and standalone-github-now.log: safe maintenance checks.

Workspace verification and setup logs remain ignored under each app's .cache directory.
Test configuration and secrets were not printed or committed. Test servers were stopped after verification.
The completed dependency installation was returned to the isolated Cxsun clone after all tests.

## Remaining boundaries

UIUX remains the intentional shared UI source gallery.
The apps remain foundation previews. Real identity, RBAC, tenancy, and three authenticated desks need Platform Core.
The revised workflow has not run on GitHub. No commit or push was performed. App versions remain unchanged.

## Live guidance deployment — 2026-10-03

Standalone npm tooling and app setup guidance is deployed at https://mcp.codexsun.com/mcp.
Worker version: 9222e435-71a6-492b-bb32-3f2b2445f4d8.
Cloud checks passed. Each of the five apps retrieved the updated standalone guide with its authenticated identity.
Environment setup, version alignment, LF, configured-secret frontend scans, and ignored environment files passed for all five apps.
All isolated test ports were released. Git commits and pushes remain unperformed.
