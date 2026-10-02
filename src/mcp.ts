import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { z } from "zod";
import { GovernanceCatalog, guides, repositories } from "./catalog.js";

export function createGovernanceMcp(
  catalog: GovernanceCatalog,
  appId: string,
  appUser: string,
  version: string
) {
  const server = new McpServer(
    { name: "codexsun-mcp-governance", version },
    {
      instructions:
        "Read governance://workspace and call get_working_instructions before repository work. Guidance is advisory and never blocks application startup."
    }
  );
  for (const name of guides) {
    server.registerResource(
      name,
      `governance://${name}`,
      { mimeType: "text/markdown", description: `Common ${name} guidance` },
      async (uri) => ({
        contents: [{ uri: uri.href, mimeType: "text/markdown", text: await catalog.guide(name) }]
      })
    );
  }
  server.registerTool(
    "get_working_instructions",
    {
      description:
        "Get common working instructions and the requesting repository's public package information.",
      inputSchema: {},
      annotations: {
        readOnlyHint: true,
        destructiveHint: false,
        idempotentHint: true,
        openWorldHint: false
      }
    },
    async () => text(await catalog.instructions(appId, appUser))
  );
  server.registerTool(
    "inspect_repository",
    {
      description:
        "Read an allowlisted repository's versions, scripts, dependencies, and public exports. Never reads environment files.",
      inputSchema: {
        repository: z.enum(
          Object.keys(repositories) as [keyof typeof repositories, ...(keyof typeof repositories)[]]
        )
      },
      annotations: {
        readOnlyHint: true,
        destructiveHint: false,
        idempotentHint: true,
        openWorldHint: false
      }
    },
    async ({ repository }) => text(await catalog.inspect(repository))
  );
  server.registerTool(
    "get_ui_catalog",
    {
      description: "Get live shared UI exports and their usage guide.",
      inputSchema: {},
      annotations: {
        readOnlyHint: true,
        destructiveHint: false,
        idempotentHint: true,
        openWorldHint: false
      }
    },
    async () => text({ ...(await catalog.inspect("ui")), guide: await catalog.guide("ui") })
  );
  return server;
}

function text(value: unknown) {
  return { content: [{ type: "text" as const, text: JSON.stringify(value, null, 2) }] };
}
