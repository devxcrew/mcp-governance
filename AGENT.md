# mcp-governance agent notes

Own central developer guidance, read-only MCP resources, client connection, and workspace maintenance routing.

## Repository-specific rules

Keep this server read-only and advisory. Do not read environment files through MCP resources. Read only allowlisted repository metadata and owned guidance files. Never add business APIs, authentication providers, or enforcement hooks. Run npm run verify and npm run mcp:verify before release.

## Working instructions

Read agent/SKILLS.md, agent/TASK.md, agent/PLAN.md, and agent/CHANGELOG.md before work. Common standards live only in shared/mcp-governance/assist/guides. Use npm run mcp:connect for current instructions. If MCP is offline, read this AGENT.md and the central files when available. Continue development without a connection gate.

Use npm run version-bump with a title and note for a release. Maintain agent/CHANGELOG.md and preserve history. Use npm run fix:line-endings and npm run lines:check. Run npm run check:versions and the repository checks before npm run github:now. Review its changed files and commit subject. The subject uses #<patch> - <release title>. Commit, push, and publish only within user authorization.

Keep MCP_SERVER_SECRET in ignored .env and outside frontend code. App ID and app user are developer context only.
