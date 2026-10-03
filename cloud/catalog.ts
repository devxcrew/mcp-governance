import { snapshot } from "./generated/snapshot.js";
import { guides, type Guide, type Repository, type GovernanceReader } from "../src/contracts.js";

export class SnapshotCatalog implements GovernanceReader {
  async guide(name: Guide) {
    return snapshot.guides[name];
  }

  async inspect(name: Repository) {
    return {
      ...snapshot.repositories[name],
      dataSource: "deployment-snapshot",
      generatedAt: snapshot.generatedAt
    };
  }

  async instructions(appId: string, appUser: string) {
    return {
      appId,
      appUser,
      mode: "advisory",
      capabilities: { actionApproval: false, commitReservation: false, remoteEnforcement: false },
      dataSource: "deployment-snapshot",
      generatedAt: snapshot.generatedAt,
      repository: Object.hasOwn(snapshot.repositories, appId)
        ? await this.inspect(appId as Repository)
        : null,
      instructions: (
        await Promise.all(guides.map(async (name) => `## ${name}\n\n${await this.guide(name)}`))
      ).join("\n\n")
    };
  }
}
