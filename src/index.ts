import { readFileSync } from "node:fs";
import { fileURLToPath } from "node:url";
import { GovernanceCatalog } from "./catalog.js";
import { readConfig } from "./config.js";
import { createGovernanceServer } from "./server.js";

const directory = fileURLToPath(new URL("../", import.meta.url));
const workspace = fileURLToPath(new URL("../../", new URL("../", import.meta.url)));
const { version } = JSON.parse(readFileSync(new URL("../package.json", import.meta.url), "utf8"));
const config = readConfig(process.env);
const server = createGovernanceServer(config, new GovernanceCatalog(workspace, directory), version);
server.on("error", (error) => {
  console.error(error.message);
  process.exitCode = 1;
});
server.listen(Number(config.url.port || 80), config.url.hostname.replace(/^\[|\]$/g, ""), () => {
  console.info(`Governance MCP ${version}: ${config.url.href} (read-only, advisory)`);
});
function shutdown() {
  const timeout = setTimeout(() => process.exit(1), 5000).unref();
  server.closeAllConnections();
  server.close(() => {
    clearTimeout(timeout);
  });
}
process.once("SIGINT", shutdown);
process.once("SIGTERM", shutdown);
