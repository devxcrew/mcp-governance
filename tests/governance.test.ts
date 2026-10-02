import assert from "node:assert/strict";
import { after, before, test } from "node:test";
import { fileURLToPath } from "node:url";
import { mkdtempSync, mkdirSync, writeFileSync, rmSync } from "node:fs";
import { tmpdir } from "node:os";
import { resolve } from "node:path";
import { Client } from "@modelcontextprotocol/sdk/client/index.js";
import { StreamableHTTPClientTransport } from "@modelcontextprotocol/sdk/client/streamableHttp.js";
import { GovernanceCatalog, repositories } from "../src/catalog.js";
import { readConfig } from "../src/config.js";
import { createGovernanceServer } from "../src/server.js";

const secret = "test-secret-".repeat(5);
const directory = fileURLToPath(new URL("../", import.meta.url));
const workspace = mkdtempSync(resolve(tmpdir(), "governance-test-"));
for (const [name, path] of Object.entries(repositories)) {
  const directory = resolve(workspace, path);
  mkdirSync(directory, { recursive: true });
  mkdirSync(resolve(directory, "agent"));
  writeFileSync(
    resolve(directory, "agent/TASK.md"),
    "# Current task\n\nFixture repository task.\n"
  );
  writeFileSync(
    resolve(directory, "package.json"),
    JSON.stringify({
      name: `@codexsun/${name}`,
      version: "0.1.0",
      scripts: { check: "verify" },
      exports: name === "ui" ? { "./components/*": "./src/components/*.tsx" } : {}
    })
  );
}
const config = { url: new URL("http://127.0.0.1:7310/mcp"), secret };
const server = createGovernanceServer(config, new GovernanceCatalog(workspace, directory), "0.1.0");
const headers = {
  Authorization: `Bearer ${secret}`,
  "X-App-Id": "cxsun",
  "X-App-User": "developer"
};

before(async () => {
  await new Promise<void>((resolve) => server.listen(0, "127.0.0.1", resolve));
  const address = server.address();
  if (!address || typeof address === "string") throw new Error("Missing test port.");
  config.url.port = String(address.port);
});
after(async () => {
  server.closeAllConnections();
  await new Promise<void>((resolve) => server.close(() => resolve()));
  rmSync(workspace, { recursive: true, force: true });
});

test("SDK client initializes and reads resources and repository/UI instructions", async () => {
  const client = new Client({ name: "test", version: "1.0.0" });
  await client.connect(new StreamableHTTPClientTransport(config.url, { requestInit: { headers } }));
  try {
    const resources = await client.listResources();
    assert.equal(resources.resources.length, 5);
    const guide = await client.readResource({ uri: "governance://ui" });
    assert.match(String(guide.contents[0].text), /@codexsun\/ui\/layouts\/main-workspace/);
    const tools = await client.listTools();
    assert.equal(tools.tools.length, 3);
    assert(tools.tools.every((tool) => tool.annotations?.readOnlyHint));
    const result = await client.callTool({ name: "get_working_instructions", arguments: {} });
    const data = JSON.parse((result.content as { text: string }[])[0].text);
    assert.equal(data.appId, "cxsun");
    assert.equal(data.appUser, "developer");
    assert.equal(data.repository.name, "@codexsun/cxsun");
    assert.match(data.repository.agent["agent/TASK.md"], /Fixture repository task/);
    assert.equal(data.mode, "advisory");
    const catalog = await client.callTool({ name: "get_ui_catalog", arguments: {} });
    assert.match((catalog.content as { text: string }[])[0].text, /\.\/components\/\*/);
    const rejected = await client.callTool({
      name: "inspect_repository",
      arguments: { repository: "../outside" }
    });
    assert.equal(rejected.isError, true);
  } finally {
    await client.close();
  }
});

test("HTTP requests require a valid secret, identity, origin and method", async () => {
  async function status(extra: Record<string, string>, method = "POST") {
    return (await fetch(config.url, { method, headers: { ...headers, ...extra } })).status;
  }
  assert.equal(await status({ Authorization: "Bearer wrong" }), 401);
  assert.equal(await status({ "X-App-Id": "../outside" }), 400);
  assert.equal(await status({ Origin: "https://untrusted.example" }), 403);
  assert.equal(await status({}, "GET"), 405);
});

test("client returns instructions and stays advisory when the server is offline", async () => {
  const { connectGovernance, runConnection } = await import("../client/connect.mjs");
  const env = {
    MCP_SERVER_URL: config.url.href,
    MCP_SERVER_SECRET: secret,
    APP_ID: "framework",
    APP_USER: "developer"
  };
  assert.equal((await connectGovernance(env)).repository.name, "@codexsun/framework");
  const offline = { ...env, MCP_SERVER_URL: "http://127.0.0.1:1/mcp" };
  assert.equal(await runConnection(offline, { timeout: 100 }), 0);
  assert.equal(await runConnection(offline, { strict: true, timeout: 100 }), 1);
});

test("server configuration rejects remote URLs, weak secrets and invalid paths", () => {
  assert.throws(() =>
    readConfig({ MCP_SERVER_URL: "http://example.com/mcp", MCP_SERVER_SECRET: secret })
  );
  assert.throws(() =>
    readConfig({ MCP_SERVER_URL: "http://127.0.0.1:7310/mcp", MCP_SERVER_SECRET: "weak" })
  );
  assert.throws(() =>
    readConfig({ MCP_SERVER_URL: "http://127.0.0.1:7310/other", MCP_SERVER_SECRET: secret })
  );
  assert.equal(readConfig({ MCP_SERVER_SECRET: secret }).url.port, "7310");
});
