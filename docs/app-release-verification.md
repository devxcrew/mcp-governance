# Project app release verification

Verified on October 3, 2026.

All five apps were committed and pushed through npm run github:now.
Local HEAD matches remote main. All five working trees are clean.

| App | Version | Commit | Live MCP |
| --- | --- | --- | --- |
| billing | 0.1.1 | [b5e18da](https://github.com/devxcrew/billing/commit/b5e18da447213fae9adcb5aba0c80c9f309f1ad7) | GREEN |
| crm | 0.1.1 | [18ba856](https://github.com/devxcrew/crm/commit/18ba856a4eb6b6740a9b69e946633e2b42437daa) | GREEN |
| qcafe | 0.1.1 | [a55c2a8](https://github.com/devxcrew/qcafe/commit/a55c2a80e1e0a380f290f1fc5b40ed077df892cf) | GREEN |
| ecommerce | 0.1.1 | [802b478](https://github.com/devxcrew/ecommerce/commit/802b47861870b1cc307fa552cfafe799e7c1f586) | GREEN |
| cxsun | 0.1.9 | [197e779](https://github.com/devxcrew/cxsun/commit/197e7799c768c734876cdb8f0d5e1b9727da6e69) | GREEN |

## Verification

- Tools passed all 21 tests. Actual version-bump, LF, version checks, and GitHub commit/push commands completed.
- Each app passed full verification and direct package checks.
- GitHub workflows check out sibling maintenance repositories and create the environment file from its example.
- Git selects the authenticated devxcrew account in each project.
- Cxsun advanced from 0.1.8 to 0.1.9. The four new apps advanced from 0.1.0 to 0.1.1.
- Shared package repositories were not committed or published during this project release.

## GitHub CI

- billing: [passed](https://github.com/devxcrew/billing/actions/runs/37097908558) at b5e18da.
- crm: [passed](https://github.com/devxcrew/crm/actions/runs/37097974653) at 18ba856.
- qcafe: [passed](https://github.com/devxcrew/qcafe/actions/runs/37097917786) at a55c2a8.
- ecommerce: [passed](https://github.com/devxcrew/ecommerce/actions/runs/37098009884) at 802b478.
- cxsun: [passed](https://github.com/devxcrew/cxsun/actions/runs/37098017560) at 197e779.
