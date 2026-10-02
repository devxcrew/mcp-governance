# MCP Governance

A read-only developer guidance service for all Codexsun repositories. It does not enforce approvals or block application work.

## Run

Use Node 26.10 or newer. Copy .env.example to .env and set a random MCP_SERVER_SECRET of at least 32 characters. Keep the secret in ignored files.

```powershell
npm install
npm run verify
npm run dev
# Or use npm run build followed by npm start.
```

The local endpoint is http://127.0.0.1:7310/mcp. The server accepts stateless MCP Streamable HTTP POST requests. It uses the official TypeScript SDK and native Node HTTP. It binds only to a loopback address. Remote hosting requires a separate HTTPS and access design.

## Connection

Configure MCP_SERVER_URL, MCP_SERVER_SECRET, APP_ID, and APP_USER in the consuming repository .env. Supply Authorization: Bearer <secret>, X-App-Id, and X-App-User headers in an HTTP MCP client. App ID and app user identify the request context. The shared secret authenticates the client connection. These headers do not provide business user authentication or tenant authorization.

Run npm run mcp:connect in any wired repository to initialize MCP and retrieve its working instructions. Network or configuration failures print the local fallback and exit successfully. Run npm run mcp:verify for a strict connection test that exits nonzero on failure. These commands are never connected to dev, build, check, or application startup.

## Resources and tools

Resources: governance://workspace, governance://ui, governance://code-standard, governance://repository, and governance://app-setup. Markdown source lives in assist/guides.

Tools: get_working_instructions, inspect_repository, and get_ui_catalog. Repository inspection reads only allowlisted package.json files in the sibling workspace. No environment values, filesystem writes, commits, or shell execution are available through MCP. Unknown app IDs can read common instructions. Repository inspection stays limited to known repositories.

The UI catalog reports current public imports. Read component source and UIUX examples for prop details. The older UI design-system MCP helper remains owned by UI.

## Workspace layout

Keep this checkout at shared/mcp-governance alongside shared/framework, shared/ui, shared/tools, projects/cxsun, and devkits/uiux. The server resolves this layout from its installation directory. Client probes are copied to assist/mcp-connect.mjs so they work without the server checkout and fall back offline. Update these copies when changing the common probe.

## Plan and verification

1. Define common guidance and allowlisted repository information.
2. Expose resources and read-only tools through authenticated Streamable HTTP.
3. Add independent advisory probes and environment examples to every repository.
4. Verify protocol initialization, resources, tools, identity metadata, authentication, and offline fallback.
5. Record releases and synchronize each GitHub repository.

Source: https://github.com/devxcrew/mcp-governance. SDK reference: https://github.com/modelcontextprotocol/typescript-sdk/tree/v1.x.
