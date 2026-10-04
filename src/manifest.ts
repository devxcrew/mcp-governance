import { z } from "zod";

const route = z.string().regex(/^\/[a-zA-Z0-9/_-]*$/);
const manifestSchema = z.object({
  contractVersion: z.literal(1),
  appId: z.string().regex(/^[a-zA-Z0-9._-]{1,128}$/),
  kind: z.enum(["foundation-preview", "foundation-authenticated", "developer-gallery"]),
  connection: z.object({
    urlEnvironment: z.literal("MCP_SERVER_URL"),
    defaultUrl: z.literal("https://mcp.codexsun.com/mcp").optional(),
    secretEnvironment: z.literal("MCP_SERVER_SECRET"),
    policy: z.literal("required-live-guidance"),
    offline: z.literal("stop-and-report")
  }),
  audit: z.object({
    required: z.boolean(),
    task: z.literal("agent/TASK.md"),
    evidence: z.literal("agent/AUDIT.md")
  }),
  actionClasses: z.array(
    z.enum(["inspect", "edit", "dependencies", "test", "release", "operations"])
  ),
  authorization: z.literal("user-instructions"),
  foundation: z.object({
    identityOwner: z.literal("platform-core").optional(),
    identityRequired: z.boolean().optional(),
    status: z.enum(["pending-shared-platform", "implemented-local-platform", "developer-gallery"]),
    identityPackage: z.literal("@devxcrew/platform").optional(),
    database: z.literal("sqlite-kysely").optional(),
    portals: z
      .array(
        z.object({
          identity: z.enum(["user", "admin", "super-admin"]),
          login: route,
          desk: route
        })
      )
      .optional(),
    businessFeatures: z.boolean().optional()
  })
});

export function publicGovernanceManifest(value: unknown, appId: string) {
  const result = manifestSchema.safeParse(value);
  if (!result.success || result.data.appId !== appId)
    return {
      status: "invalid",
      warning: "App manifest does not match the live guidance contract."
    };
  // Only typed descriptive metadata is returned, never arbitrary fields or executable guidance paths.
  return { ...result.data, enforcement: "none" as const };
}
