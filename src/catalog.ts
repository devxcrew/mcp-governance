import { readFile } from "node:fs/promises";
import { resolve } from "node:path";

export const repositories = {
  cxsun: "projects/cxsun",
  framework: "shared/framework",
  ui: "shared/ui",
  uiux: "devkits/uiux",
  tools: "shared/tools",
  "mcp-governance": "shared/mcp-governance"
} as const;

export const guides = ["workspace", "ui", "code-standard", "repository", "app-setup"] as const;
export type Guide = (typeof guides)[number];
export type Repository = keyof typeof repositories;

export class GovernanceCatalog {
  constructor(
    private readonly workspace: string,
    private readonly directory: string
  ) {}

  guide(name: Guide) {
    return readFile(resolve(this.directory, "assist/guides", `${name}.md`), "utf8");
  }

  async inspect(name: Repository) {
    const manifest = JSON.parse(
      await readFile(resolve(this.workspace, repositories[name], "package.json"), "utf8")
    );
    return {
      appId: name,
      repository: repositories[name],
      name: manifest.name,
      version: manifest.version,
      scripts: manifest.scripts ?? {},
      exports: manifest.exports ?? {},
      dependencies: manifest.dependencies ?? {},
      devDependencies: manifest.devDependencies ?? {}
    };
  }

  async instructions(appId: string, appUser: string) {
    const repository = Object.hasOwn(repositories, appId)
      ? await this.inspect(appId as Repository)
      : null;
    const content = await Promise.all(
      guides.map(async (name) => `## ${name}\n\n${await this.guide(name)}`)
    );
    return {
      appId,
      appUser,
      mode: "advisory",
      repository,
      instructions: content.join("\n\n")
    };
  }
}
