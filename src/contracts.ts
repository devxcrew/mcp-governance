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

export interface GovernanceReader {
  guide(name: Guide): Promise<string>;
  inspect(name: Repository): Promise<Record<string, unknown>>;
  instructions(appId: string, appUser: string): Promise<Record<string, unknown>>;
}
