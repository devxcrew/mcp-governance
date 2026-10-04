# Live MCP access audit

Audited: 3 October 2026 at 10:11 am IST.

Endpoint: https://mcp.codexsun.com/mcp

Result: GREEN for all 10 repositories.

| Repository     | Version | Live MCP | Guides | Tools | Development hook                |
| -------------- | ------- | -------- | ------ | ----- | ------------------------------- |
| cxsun          | 0.1.8   | GREEN    | 5/5    | 3/3   | Passed                          |
| billing        | 0.1.0   | GREEN    | 5/5    | 3/3   | Passed                          |
| crm            | 0.1.0   | GREEN    | 5/5    | 3/3   | Passed                          |
| qcafe          | 0.1.0   | GREEN    | 5/5    | 3/3   | Passed                          |
| ecommerce      | 0.1.0   | GREEN    | 5/5    | 3/3   | Passed                          |
| framework      | 0.1.7   | GREEN    | 5/5    | 3/3   | Not an application startup hook |
| ui             | 0.1.7   | GREEN    | 5/5    | 3/3   | Not an application startup hook |
| uiux           | 0.1.7   | GREEN    | 5/5    | 3/3   | Not an application startup hook |
| tools          | 0.1.6   | GREEN    | 5/5    | 3/3   | Not an application startup hook |
| mcp-governance | 0.1.3   | GREEN    | 5/5    | 3/3   | Not an application startup hook |

## Verified

- Authenticated instruction retrieval through each repository's MCP client.
- Matching app ID, app user, package name, and version in deployed metadata.
- Five readable live resources: workspace, ui, code-standard, repository, and app-setup.
- Three working tools: get_working_instructions, inspect_repository, and get_ui_catalog.
- Fresh live guidance through all five project development hooks.
- Missing or wrong credentials return 401. Missing app identity returns 400. An untrusted origin returns 403.
- Environment secrets were not written into this report.

## Scope

This audit verifies live MCP access and integration. It does not certify business authentication, tenancy, production readiness, or editor registration.
App identity headers describe developer context. MCP guidance is advisory and does not approve actions.
No failures or blockers were found in the MCP checks.
