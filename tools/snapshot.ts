import { mkdir, writeFile, readFile } from "node:fs/promises";
import { fileURLToPath } from "node:url";
import { parseEnv } from "node:util";
import { GovernanceCatalog } from "../src/catalog.js";
import { guides, repositories } from "../src/contracts.js";

const root = fileURLToPath(new URL("../", import.meta.url));
const workspace = fileURLToPath(new URL("../../../", import.meta.url));
const catalog = new GovernanceCatalog(workspace, root);
const metadata = Object.fromEntries(
  await Promise.all(
    Object.keys(repositories).map(async (name) => [
      name,
      await catalog.inspect(name as keyof typeof repositories)
    ])
  )
);
const content = Object.fromEntries(
  await Promise.all(guides.map(async (name) => [name, await catalog.guide(name)]))
);
const { version } = JSON.parse(await readFile(new URL("../package.json", import.meta.url), "utf8"));
const snapshot = {
  version,
  generatedAt: new Date().toISOString(),
  repositories: metadata,
  guides: content
};
const source = JSON.stringify(snapshot, null, 2);
for (const path of Object.values(repositories)) {
  let sourceEnv = "";
  try {
    sourceEnv = await readFile(`${workspace}/${path}/.env`, "utf8");
  } catch (error) {
    if ((error as NodeJS.ErrnoException).code !== "ENOENT") throw error;
  }
  const env = parseEnv(sourceEnv);
  for (const [key, value] of Object.entries(env)) {
    if (/SECRET|TOKEN|PASSWORD/i.test(key) && value.length >= 8 && source.includes(value))
      throw new Error(
        "Snapshot contains a configured secret. Remove it from documentation before deployment."
      );
  }
}
await mkdir(new URL("../cloud/generated/", import.meta.url), { recursive: true });
await writeFile(
  new URL("../cloud/generated/snapshot.ts", import.meta.url),
  `export const snapshot = ${source};\n`
);
console.info(
  `Prepared ${guides.length} guides and ${Object.keys(metadata).length} repositories for cloud deployment.`
);
