import { timingSafeEqual } from "node:crypto";
import { createServer, type IncomingMessage, type ServerResponse } from "node:http";
import { StreamableHTTPServerTransport } from "@modelcontextprotocol/sdk/server/streamableHttp.js";
import { GovernanceCatalog } from "./catalog.js";
import { type GovernanceConfig } from "./config.js";
import { createGovernanceMcp } from "./mcp.js";

export function createGovernanceServer(
  config: GovernanceConfig,
  catalog: GovernanceCatalog,
  version: string
) {
  return createServer((request, response) => {
    void handle(request, response, config, catalog, version).catch(() => {
      if (!response.headersSent) respond(response, 500, "Governance request failed.");
      else response.destroy();
    });
  });
}

async function handle(
  request: IncomingMessage,
  response: ServerResponse,
  config: GovernanceConfig,
  catalog: GovernanceCatalog,
  version: string
) {
  if (request.url !== "/mcp") return respond(response, 404, "Not found.");
  if (request.headers.origin && request.headers.origin !== config.url.origin)
    return respond(response, 403, "Origin is not allowed.");
  if (request.headers.host !== config.url.host)
    return respond(response, 403, "Host is not allowed.");
  const actual = Buffer.from(request.headers.authorization ?? "");
  const expected = Buffer.from(`Bearer ${config.secret}`);
  if (actual.length !== expected.length || !timingSafeEqual(actual, expected))
    return respond(response, 401, "A valid MCP server secret is required.");
  const appId = request.headers["x-app-id"];
  const appUser = request.headers["x-app-user"];
  if (!validIdentity(appId) || !validIdentity(appUser))
    return respond(response, 400, "Provide valid X-App-Id and X-App-User headers.");
  if (request.method !== "POST") {
    response.setHeader("Allow", "POST");
    return respond(response, 405, "This stateless endpoint accepts POST requests.");
  }
  const mcp = createGovernanceMcp(catalog, appId, appUser, version);
  const transport = new StreamableHTTPServerTransport({
    sessionIdGenerator: undefined,
    enableJsonResponse: true
  });
  response.once("close", () => {
    void mcp.close();
  });
  await mcp.connect(transport);
  await transport.handleRequest(request, response);
}

function validIdentity(value: unknown): value is string {
  return typeof value === "string" && /^[a-zA-Z0-9@._:-]{1,128}$/.test(value);
}

function respond(response: ServerResponse, status: number, message: string) {
  response.writeHead(status, { "Content-Type": "application/json" });
  response.end(JSON.stringify({ error: message }));
}
