export interface GovernanceConfig {
  url: URL;
  secret: string;
}

export function readConfig(env: NodeJS.ProcessEnv): GovernanceConfig {
  const url = new URL(env.MCP_SERVER_URL ?? "http://127.0.0.1:7310/mcp");
  if (url.protocol !== "http:" || !["localhost", "127.0.0.1", "[::1]"].includes(url.hostname))
    throw new Error("This local server requires an HTTP loopback URL.");
  if (url.pathname !== "/mcp" || url.search || url.hash || url.username || url.password)
    throw new Error("MCP_SERVER_URL must use /mcp without credentials or query parameters.");
  if (!env.MCP_SERVER_SECRET || env.MCP_SERVER_SECRET.length < 32)
    throw new Error("Configure MCP_SERVER_SECRET with at least 32 characters.");
  return { url, secret: env.MCP_SERVER_SECRET };
}
