# Governance server rules

Keep this server read-only and advisory. Do not read environment files through MCP resources. Read only allowlisted repository metadata and owned guidance files. Never add business APIs, authentication providers, or enforcement hooks. Run npm run verify and npm run mcp:verify before release.
