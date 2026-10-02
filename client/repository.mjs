import { spawnSync } from "node:child_process";
import { fileURLToPath } from "node:url";

const command = process.argv[2];
const allowed = new Set([
  "github:now",
  "version:bump",
  "version:show",
  "check:versions",
  "changelog:append",
  "changelog:show",
  "lines:fix",
  "lines:check"
]);
if (!allowed.has(command)) {
  console.error("Unknown repository maintenance command.");
  process.exitCode = 1;
} else {
  const result = spawnSync(
    process.execPath,
    [
      fileURLToPath(new URL("../../tools/bin/tools.mjs", import.meta.url)),
      command,
      ...process.argv.slice(3)
    ],
    { cwd: process.cwd(), env: process.env, stdio: "inherit", windowsHide: true }
  );
  process.exitCode = result.status ?? 1;
}
