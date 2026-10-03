# Governance audit — 2026-10-02

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
