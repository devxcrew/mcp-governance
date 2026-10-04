import assert from "node:assert/strict";
import { after, before, test } from "node:test";
import { fileURLToPath } from "node:url";
import { mkdtempSync, mkdirSync, writeFileSync, rmSync, readFileSync } from "node:fs";
import { createServer } from "node:http";
import { tmpdir } from "node:os";
import { resolve } from "node:path";
import { Client } from "@modelcontextprotocol/sdk/client/index.js";
import { StreamableHTTPClientTransport } from "@modelcontextprotocol/sdk/client/streamableHttp.js";
import { GovernanceCatalog, repositories } from "../src/catalog.js";
import { readConfig } from "../src/config.js";
import { createGovernanceServer } from "../src/server.js";
import { publicGovernanceManifest } from "../src/manifest.js";

const secret = "test-secret-".repeat(5);
const directory = fileURLToPath(new URL("../", import.meta.url));
const workspace = mkdtempSync(resolve(tmpdir(), "governance-test-"));
for (const [name, path] of Object.entries(repositories)) {
  const directory = resolve(workspace, path);
  mkdirSync(directory, { recursive: true });
  mkdirSync(resolve(directory, "agent"));
  writeFileSync(resolve(directory, "agent/AUDIT.md"), "# Audit\n\nFixture evidence.\n");
  writeFileSync(resolve(directory, "agent/TODOS.md"), "# Remaining work\n\nFixture todo.\n");
  if (path.startsWith("projects/")) {
    writeFileSync(
      resolve(directory, "codexsun.governance.json"),
      JSON.stringify({
        contractVersion: 1,
        appId: name,
        kind: "foundation-preview",
        connection: {
          urlEnvironment: "MCP_SERVER_URL",
          secretEnvironment: "MCP_SERVER_SECRET",
          policy: "required-live-guidance",
          offline: "stop-and-report"
        },
        audit: { required: true, task: "agent/TASK.md", evidence: "agent/AUDIT.md" },
        actionClasses: ["inspect", "edit"],
        authorization: "user-instructions",
        foundation: { status: "pending-shared-platform", businessFeatures: false }
      })
    );
  }
  writeFileSync(
    resolve(directory, "AGENTS.md"),
    "# Repository instructions\n\nFixture agent rules.\n"
  );
  writeFileSync(
    resolve(directory, "agent/TASK.md"),
    "# Current task\n\nFixture repository task.\n"
  );
  writeFileSync(
    resolve(directory, "package.json"),
    JSON.stringify({
      name:
        name === "framework"
          ? "@devxcrew/core-framework"
          : name === "ui"
            ? "@devxcrew/react-ui"
            : `@codexsun/${name}`,
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
    assert.match(String(guide.contents[0].text), /@devxcrew\/react-ui\/layouts\/main-workspace/);
    const tools = await client.listTools();
    assert.equal(tools.tools.length, 4);
    assert(tools.tools.every((tool) => tool.annotations?.readOnlyHint));
    const result = await client.callTool({ name: "get_working_instructions", arguments: {} });
    const data = JSON.parse((result.content as { text: string }[])[0].text);
    assert.equal(data.appId, "cxsun");
    assert.equal(data.appUser, "developer");
    assert.equal(data.repository.name, "@codexsun/cxsun");
    assert.match(data.repository.agent["AGENTS.md"], /Fixture agent rules/);
    assert.equal(Object.hasOwn(data.repository.agent, "AGENT.md"), false);
    assert.match(data.repository.agent["agent/TASK.md"], /Fixture repository task/);
    assert.match(data.repository.agent["agent/AUDIT.md"], /Fixture evidence/);
    assert.match(data.repository.agent["agent/TODOS.md"], /Fixture todo/);
    assert.equal(data.repository.governance.connection.policy, "required-live-guidance");
    assert.equal(
      (await new GovernanceCatalog(workspace, directory).inspect("framework")).governance,
      null
    );
    assert.equal(data.mode, "advisory");
    const focused = await client.callTool({
      name: "find_guidance",
      arguments: { topic: "identity", repository: "platform", packageVersion: "0.1.0" }
    });
    const focusedData = JSON.parse((focused.content as { text: string }[])[0].text);
    assert.deepEqual(focusedData.owners, ["platform", "cxsun"]);
    assert.equal(focusedData.guideResource, "governance://app-setup");
    const incompatible = await client.callTool({
      name: "find_guidance",
      arguments: { topic: "identity", repository: "platform", packageVersion: "99.0.0" }
    });
    assert.equal(incompatible.isError, true);
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

test("client returns matching instructions and fails when the cloud is unavailable", async () => {
  const { connectGovernance, runConnection } = await import("../client/connect.mjs");
  const env = { MCP_SERVER_SECRET: secret, APP_ID: "framework", APP_USER: "developer" };
  const originalFetch = globalThis.fetch;
  globalThis.fetch = (input, init) => originalFetch(config.url, init);
  try {
    assert.equal((await connectGovernance(env)).repository.name, "@devxcrew/core-framework");
    globalThis.fetch = async () => {
      throw new Error("Cloud unavailable.");
    };
    assert.equal(await runConnection(env, { timeout: 100 }), 1);
  } finally {
    globalThis.fetch = originalFetch;
  }
});

test("clients without a URL use the cloud endpoint instead of a local listener", async () => {
  const { connectGovernance } = await import("../client/connect.mjs");
  const originalFetch = globalThis.fetch;
  let requestedUrl = "";
  globalThis.fetch = async (input) => {
    requestedUrl = String(input);
    throw new Error("Test network unavailable.");
  };
  try {
    await assert.rejects(
      connectGovernance({ MCP_SERVER_SECRET: secret, APP_ID: "cxsun", APP_USER: "developer" })
    );
    assert.equal(requestedUrl, "https://mcp.codexsun.com/mcp");
  } finally {
    globalThis.fetch = originalFetch;
  }
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

test("manifest metadata is validated, filtered, and never claims enforcement", async () => {
  const file = resolve(workspace, repositories.cxsun, "codexsun.governance.json");
  const source = readFileSync(file, "utf8");
  const manifest = JSON.parse(source);
  manifest.secret = "must-not-be-exposed";
  manifest.connection.secret = "must-not-be-exposed";
  manifest.guidance = "../../.env";
  const result = publicGovernanceManifest(manifest, "cxsun");
  assert.equal(JSON.stringify(result).includes("must-not-be-exposed"), false);
  assert.equal(Object.hasOwn(result, "guidance"), false);
  assert.equal(result.enforcement, "none");
  assert.equal(publicGovernanceManifest(manifest, "uiux").status, "invalid");
  const authenticated = {
    ...manifest,
    kind: "foundation-authenticated",
    foundation: {
      ...manifest.foundation,
      status: "implemented-local-platform",
      identityOwner: "platform-core",
      identityPackage: "@devxcrew/platform",
      database: "sqlite-kysely"
    }
  };
  const current = publicGovernanceManifest(authenticated, "cxsun");
  assert.equal(current.foundation?.status, "implemented-local-platform");
  assert.equal(current.foundation?.database, "sqlite-kysely");
  manifest.connection.policy = "mandatory";
  assert.equal(publicGovernanceManifest(manifest, "cxsun").status, "invalid");
  try {
    writeFileSync(file, "{invalid");
    const data = await new GovernanceCatalog(workspace, directory).instructions(
      "cxsun",
      "developer"
    );
    assert.equal(data.repository?.governance?.status, "invalid");
    assert.match(data.instructions, /Workspace ownership/);
  } finally {
    writeFileSync(file, source);
  }
});

test("client rejects unsafe URLs and does not follow credential-bearing redirects", async () => {
  const { connectGovernance } = await import("../client/connect.mjs");
  const env = { MCP_SERVER_SECRET: secret, APP_ID: "cxsun", APP_USER: "developer" };
  for (const url of [
    "http://example.com/mcp",
    "http://127.0.0.1:7310/mcp",
    "https://other.example/mcp",
    "http://user:pass@127.0.0.1/mcp",
    "http://127.0.0.1/mcp?secret=x"
  ])
    await assert.rejects(connectGovernance({ ...env, MCP_SERVER_URL: url }));
  let redirected = false;
  const redirectServer = createServer((request, response) => {
    if (request.url === "/target") redirected = true;
    response.writeHead(307, { Location: "/target" });
    response.end();
  });
  await new Promise<void>((resolve) => redirectServer.listen(0, "127.0.0.1", resolve));
  const originalFetch = globalThis.fetch;
  try {
    const address = redirectServer.address();
    if (!address || typeof address === "string") throw new Error("Missing redirect port.");
    globalThis.fetch = (input, init) => originalFetch(`http://127.0.0.1:${address.port}/mcp`, init);
    await assert.rejects(connectGovernance(env));
    assert.equal(redirected, false);
  } finally {
    globalThis.fetch = originalFetch;
    redirectServer.closeAllConnections();
    await new Promise<void>((resolve) => redirectServer.close(() => resolve()));
  }
});

test("new project apps receive their own repository metadata", async () => {
  const catalog = new GovernanceCatalog(workspace, directory);
  for (const name of ["billing", "crm", "qcafe", "ecommerce"] as const) {
    const result = await catalog.instructions(name, "developer");
    assert.equal(result.appId, name);
    assert.equal(result.repository?.repository, `projects/${name}`);
    assert.equal(result.repository?.governance?.appId, name);
  }
});

test("client rejects instructions returned for a different app", async () => {
  const { connectGovernance } = await import("../client/connect.mjs");
  const originalFetch = globalThis.fetch;
  globalThis.fetch = async (input, init) => {
    const message = JSON.parse(String(init?.body));
    if (message.method === "notifications/initialized") return new Response(null, { status: 202 });
    const result =
      message.method === "initialize"
        ? { protocolVersion: "2025-03-26" }
        : {
            content: [
              {
                type: "text",
                text: JSON.stringify({
                  appId: "other",
                  appUser: "developer",
                  instructions: "wrong app"
                })
              }
            ]
          };
    return Response.json({ jsonrpc: "2.0", id: message.id, result });
  };
  try {
    await assert.rejects(
      connectGovernance({ MCP_SERVER_SECRET: secret, APP_ID: "cxsun", APP_USER: "developer" }),
      /requesting app/
    );
  } finally {
    globalThis.fetch = originalFetch;
  }
});
