# Agent layout audit

Common guidance, connection client, UI information, and audits are centralized in mcp-governance. Every repository owns agent/SKILLS.md, TASK.md, PLAN.md, and CHANGELOG.md. Existing changelog history and unique gallery documentation were preserved.

Updated tools support agent changelogs and validated custom paths while preserving the old changelog contract. Workspace commands delegate to this updated tools checkout; npm remains at 0.1.3 until an authorized release.

Verification: 21 tools tests and four MCP tests passed. All six MCP connections, version bump dry runs, GitHub dry runs, and LF checks passed. Cxsun and UIUX production builds passed. Removed assist folders are preserved as historical copies in assist/archive; they are not active MCP guidance.
