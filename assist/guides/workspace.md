# Workspace ownership

| Repository     | Responsibility                                           |
| -------------- | -------------------------------------------------------- |
| Cxsun          | Base application and app composition                     |
| Framework      | Reusable runtime and HTTP primitives                     |
| UI             | React components, blocks, layouts, templates, and styles |
| UIUX           | Developer gallery at http://127.0.0.1:6102               |
| Tools          | Development and maintenance commands                     |
| MCP Governance | Developer instructions                                   |

Use public package exports. Keep business behavior in its owning app. Do not put app implementations
in shared tools or governance.

Keep the sibling directories: `projects`, `shared`, and `devkits`.

## Documentation and rules

Retrieve shared documentation and rules only from `https://mcp.codexsun.com/mcp` using `npm run mcp:connect`.
A successful authenticated connection is required before repository work. Stop and report connection failures.
Do not use local guides or cached instructions as fallback. Instruction retrieval does not authorize actions.
