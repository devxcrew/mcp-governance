import { timingSafeEqual } from "node:crypto";
import { WebStandardStreamableHTTPServerTransport } from "@modelcontextprotocol/sdk/server/webStandardStreamableHttp.js";
import { createGovernanceMcp } from "../src/mcp.js";
import { SnapshotCatalog } from "./catalog.js";
import { snapshot } from "./generated/snapshot.js";

export default {
  async fetch(request: Request, env: Env): Promise<Response> {
    const url = new URL(request.url);
    if (url.origin !== env.PUBLIC_ORIGIN) return error(403, "Host is not allowed.");
    if (url.pathname === "/" && request.method === "GET")
      return Response.json({
        service: "codexsun-governance",
        endpoint: `${env.PUBLIC_ORIGIN}/mcp`,
        mode: "advisory"
      });
    if (url.pathname !== "/mcp" || url.search) return error(404, "Not found.");
    const origin = request.headers.get("Origin");
    if (origin && origin !== env.PUBLIC_ORIGIN) return error(403, "Origin is not allowed.");
    if (!env.MCP_SERVER_SECRET || env.MCP_SERVER_SECRET.length < 32)
      return error(503, "Governance is not configured.");
    const actual = Buffer.from(request.headers.get("Authorization") ?? "");
    const expected = Buffer.from(`Bearer ${env.MCP_SERVER_SECRET}`);
    if (actual.length !== expected.length || !timingSafeEqual(actual, expected))
      return error(401, "Authentication required.");
    const appId = request.headers.get("X-App-Id") ?? "";
    const appUser = request.headers.get("X-App-User") ?? "";
    if (![appId, appUser].every((value) => /^[a-zA-Z0-9@._:-]{1,128}$/.test(value)))
      return error(400, "Valid app identity headers are required.");
    if (request.method !== "POST") return error(405, "POST required.", { Allow: "POST" });
    const server = createGovernanceMcp(new SnapshotCatalog(), appId, appUser, snapshot.version);
    const transport = new WebStandardStreamableHTTPServerTransport({
      sessionIdGenerator: undefined,
      enableJsonResponse: true
    });
    try {
      await server.connect(transport);
      const response = await transport.handleRequest(request);
      response.headers.set("Cache-Control", "no-store");
      return response;
    } catch {
      return error(500, "Governance request failed.");
    } finally {
      await server.close();
    }
  }
};

function error(status: number, message: string, headers: Record<string, string> = {}) {
  return Response.json(
    { error: message },
    { status, headers: { "Cache-Control": "no-store", ...headers } }
  );
}
