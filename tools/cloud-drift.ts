import { readFile } from "node:fs/promises";
import { parseEnv } from "node:util";
import { snapshot } from "../cloud/generated/snapshot.js";

const env = parseEnv(await readFile(new URL("../.env", import.meta.url), "utf8"));
if (!env.MCP_SERVER_SECRET) throw new Error("Authenticated MCP configuration is required.");
async function rpc(method: string, params: object = {}) {
  const response = await fetch("https://mcp.codexsun.com/mcp", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json, text/event-stream",
      Authorization: `Bearer ${env.MCP_SERVER_SECRET}`,
      "X-App-Id": "mcp-governance",
      "X-App-User": "developer"
    },
    body: JSON.stringify({ jsonrpc: "2.0", id: 1, method, params }),
    signal: AbortSignal.timeout(15000)
  });
  if (!response.ok) throw new Error(`Authenticated MCP request failed (${response.status}).`);
  const result = (await response.json()) as { result?: any; error?: unknown };
  if (result.error || !result.result) throw new Error("MCP protocol response failed.");
  return result.result;
}
const tools = await rpc("tools/list");
const live = JSON.parse(
  (await rpc("tools/call", { name: "get_working_instructions", arguments: {} })).content[0].text
);
const discovery = tools.tools.some((tool: { name: string }) => tool.name === "find_guidance");
const fresh = live.generatedAt === snapshot.generatedAt;
console.info(
  JSON.stringify(
    {
      localGeneratedAt: snapshot.generatedAt,
      deployedGeneratedAt: live.generatedAt,
      focusedDiscovery: discovery,
      snapshotMatches: fresh,
      status: fresh && discovery ? "aligned" : "deployment-required"
    },
    null,
    2
  )
);
if (!fresh || !discovery) process.exitCode = 1;
