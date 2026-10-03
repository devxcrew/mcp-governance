import { readFile } from "node:fs/promises";
import { resolve } from "node:path";
import { publicGovernanceManifest } from "./manifest.js";
import { repositories, guides, type Guide, type Repository } from "./contracts.js";
export { repositories, guides } from "./contracts.js";

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
      governance: await this.governanceManifest(name),
      agent: await this.agentNotes(name),
      exports: manifest.exports ?? {},
      dependencies: manifest.dependencies ?? {},
      devDependencies: manifest.devDependencies ?? {}
    };
  }

  private async agentNotes(name: Repository) {
    const files = [
      "AGENTS.md",
      "agent/SKILLS.md",
      "agent/TASK.md",
      "agent/PLAN.md",
      "agent/TODOS.md",
      "agent/AUDIT.md",
      "agent/CHANGELOG.md"
    ];
    const notes = await Promise.all(
      files.map(async (file) => {
        try {
          return [
            file,
            await readFile(resolve(this.workspace, repositories[name], file), "utf8")
          ] as const;
        } catch (error) {
          if ((error as NodeJS.ErrnoException).code === "ENOENT") return null;
          throw error;
        }
      })
    );
    return Object.fromEntries(notes.filter((note) => note !== null));
  }

  private async governanceManifest(name: Repository) {
    try {
      return publicGovernanceManifest(
        JSON.parse(
          await readFile(
            resolve(this.workspace, repositories[name], "codexsun.governance.json"),
            "utf8"
          )
        ),
        name
      );
    } catch (error) {
      if ((error as NodeJS.ErrnoException).code === "ENOENT") return null;
      if (error instanceof SyntaxError)
        return { status: "invalid", warning: "App manifest is not valid JSON." };
      throw error;
    }
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
      capabilities: { actionApproval: false, commitReservation: false, remoteEnforcement: false },
      repository,
      instructions: content.join("\n\n")
    };
  }
}
