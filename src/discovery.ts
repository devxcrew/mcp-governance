import type { GovernanceReader, Guide, Repository } from "./contracts.js";

export const guidanceTopics = {
  architecture: {
    guide: "code-standard",
    owners: ["framework", "platform", "cxsun"],
    purpose: "Module ownership, public providers and practical DDD."
  },
  resources: {
    guide: "code-standard",
    owners: ["framework", "platform", "cxsun"],
    purpose: "Resource routes, validation, list queries and breadcrumbs."
  },
  identity: {
    guide: "app-setup",
    owners: ["platform", "cxsun"],
    purpose: "Identity providers, sessions, permissions and trusted organization scope."
  },
  presentation: {
    guide: "ui",
    owners: ["ui", "uiux", "cxsun"],
    purpose: "Public UI components and module-owned frontend composition."
  },
  persistence: {
    guide: "app-setup",
    owners: ["platform", "cxsun"],
    purpose: "File-backed SQLite setup and owner-managed persistence."
  },
  asynchronous: {
    guide: "code-standard",
    owners: ["framework", "platform", "cxsun"],
    purpose: "Owner events and jobs for concrete asynchronous needs."
  },
  setup: {
    guide: "app-setup",
    owners: ["tools", "cxsun"],
    purpose: "Environment, live governance, package setup and lifecycle."
  },
  maintenance: {
    guide: "repository",
    owners: ["tools", "mcp-governance"],
    purpose: "Checks, records, releases and compatibility."
  }
} satisfies Record<string, { guide: Guide; owners: Repository[]; purpose: string }>;

export type GuidanceTopic = keyof typeof guidanceTopics;

export async function findGuidance(
  catalog: GovernanceReader,
  topic: GuidanceTopic,
  repository?: Repository,
  packageVersion?: string
) {
  const contract = guidanceTopics[topic];
  if (packageVersion && !repository)
    throw new Error("Provide a repository when requesting a package version.");
  const metadata = repository ? await catalog.inspect(repository) : null;
  if (packageVersion && metadata?.version !== packageVersion)
    throw new Error(
      "Requested package version differs from available metadata. Inspect the repository before using this contract."
    );
  const guidance = await catalog.guide(contract.guide);
  if (!guidance.trim())
    throw new Error("Required guidance is unavailable. Restore the live source before continuing.");
  return {
    contractVersion: 1,
    topic,
    purpose: contract.purpose,
    owners: contract.owners,
    requestedRepository: repository ?? null,
    guideResource: `governance://${contract.guide}`,
    repository: metadata,
    guidance,
    limits:
      "Metadata describes its recorded source state. Instruction access does not authorize release actions or prove unverified implementation."
  };
}
