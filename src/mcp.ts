import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { z } from "zod";
import { type GovernanceReader, guides, repositories } from "./contracts.js";
import { findGuidance, guidanceTopics, type GuidanceTopic } from "./discovery.js";

export function createGovernanceMcp(
  catalog: GovernanceReader,
  appId: string,
  appUser: string,
  version: string
) {
  const server = new McpServer(
    { name: "codexsun-mcp-governance", version },
    {
      instructions:
        "Read governance://workspace and call get_working_instructions before repository work. Retrieve live guidance before repository work. Stop on connection failure; do not use local or cached fallback."
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
    "find_guidance",
    {
      description:
        "Find the authoritative guide and owners for a concrete task topic. Optionally verify repository package version. Never reads secrets.",
      inputSchema: {
        topic: z.enum(Object.keys(guidanceTopics) as [GuidanceTopic, ...GuidanceTopic[]]),
        repository: z
          .enum(Object.keys(repositories) as [RepositoryKey, ...RepositoryKey[]])
          .optional(),
        packageVersion: z
          .string()
          .regex(/^\d+\.\d+\.\d+(?:[-+][a-zA-Z0-9.-]+)?$/)
          .optional()
      },
      annotations: {
        readOnlyHint: true,
        destructiveHint: false,
        idempotentHint: true,
        openWorldHint: false
      }
    },
    async ({ topic, repository, packageVersion }) =>
      text(await findGuidance(catalog, topic, repository, packageVersion))
  );
  server.registerTool(
    "get_ui_catalog",
    {
      description: "Get shared UI exports and their usage guide from the configured catalog.",
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

type RepositoryKey = keyof typeof repositories;
