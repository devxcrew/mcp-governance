import assert from "node:assert/strict";
import worker from "../cloud/worker.js";

const env: Env = {
  PUBLIC_ORIGIN: "https://mcp.codexsun.com",
  MCP_SERVER_SECRET: "test-secret-".repeat(5)
};
const headers = {
  "Content-Type": "application/json",
  Accept: "application/json, text/event-stream",
  Authorization: `Bearer ${env.MCP_SERVER_SECRET}`,
  "X-App-Id": "cxsun",
  "X-App-User": "developer"
};
async function rpc(id: number, method: string, params: object = {}) {
  const response = await worker.fetch(
    new Request(`${env.PUBLIC_ORIGIN}/mcp`, {
      method: "POST",
      headers,
      body: JSON.stringify({ jsonrpc: "2.0", id, method, params })
    }),
    env
  );
  assert.equal(response.status, 200);
  const message = (await response.json()) as {
    result: { resources?: unknown[]; tools?: { name: string }[]; content?: { text: string }[] };
    error?: unknown;
  };
  assert.equal(message.error, undefined);
  return message.result;
}
await rpc(1, "initialize", {
  protocolVersion: "2025-03-26",
  capabilities: {},
  clientInfo: { name: "test", version: "1" }
});
assert.equal((await rpc(2, "resources/list")).resources?.length, 5);
assert.deepEqual(
  (await rpc(3, "tools/list")).tools?.map((tool) => tool.name).sort(),
  ["find_guidance", "get_ui_catalog", "get_working_instructions", "inspect_repository"].sort()
);
const guidance = JSON.parse(
  (await rpc(5, "tools/call", {
    name: "find_guidance",
    arguments: { topic: "identity", repository: "cxsun" }
  })).content![0].text
);
assert.equal(guidance.guideResource, "governance://app-setup");
assert.deepEqual(guidance.owners, ["platform", "cxsun"]);
assert.equal(guidance.repository.appId, "cxsun");
assert.equal(guidance.repository.dataSource, "deployment-snapshot");
assert.ok(guidance.repository.generatedAt);
assert.ok(guidance.guidance.trim());
const instructions = JSON.parse(
  (await rpc(4, "tools/call", { name: "get_working_instructions", arguments: {} })).content![0].text
);
assert.equal(instructions.dataSource, "deployment-snapshot");
assert.equal(instructions.repository.appId, "cxsun");
assert.equal((await worker.fetch(new Request(`${env.PUBLIC_ORIGIN}/mcp`), env)).status, 401);
assert.equal(
  (
    await worker.fetch(
      new Request(`${env.PUBLIC_ORIGIN}/mcp`, {
        headers: { ...headers, Origin: "https://untrusted.example" }
      }),
      env
    )
  ).status,
  403
);
console.info("Cloud Worker protocol, resources, tools, authentication, and origin checks passed.");
