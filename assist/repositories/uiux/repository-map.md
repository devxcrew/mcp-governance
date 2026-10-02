# CODEXSUN Repository Map

This map records the repositories that UIUX can reference. It does not grant permission to edit them.

## Ownership model

| Repository   | Git URL                                        | Summary                                                                                | UIUX access                                        |
| ------------ | ---------------------------------------------- | -------------------------------------------------------------------------------------- | -------------------------------------------------- |
| UIUX         | `https://github.com/CODEXSUN/uiux.git`         | Standalone gallery for public UI inspection and examples.                              | Own repository.                                    |
| UI           | `https://github.com/CODEXSUN/ui.git`           | Shared UI components, layouts, blocks, templates, tokens, and design-system contracts. | Read through `@codexsun/ui`.                       |
| Framework    | `https://github.com/CODEXSUN/framework.git`    | Shared framework contracts and reusable application foundations.                       | No direct source import.                           |
| Platform     | `https://github.com/CODEXSUN/platform.git`     | Platform services and runtime integration.                                             | No direct source import.                           |
| Core         | `https://github.com/CODEXSUN/core.git`         | Core application contracts and shared capabilities.                                    | No direct source import.                           |
| Composition  | `https://github.com/CODEXSUN/composition.git`  | Composition rules for connecting platform and application capabilities.                | No direct source import.                           |
| Sites        | `https://github.com/CODEXSUN/sites.git`        | Sites application and website development surface.                                     | No source import.                                  |
| Accounts     | `https://github.com/CODEXSUN/accounts.git`     | Accounts application for account and user operations.                                  | No source import.                                  |
| Auditor      | `https://github.com/CODEXSUN/auditor.git`      | Audit and review application.                                                          | No source import.                                  |
| Billing      | `https://github.com/CODEXSUN/billing.git`      | Billing application and billing workflows.                                             | No source import.                                  |
| Ecommerce    | `https://github.com/CODEXSUN/ecommerce.git`    | Ecommerce application and commerce workflows.                                          | No source import.                                  |
| Garments     | `https://github.com/CODEXSUN/garments.git`     | Garments application.                                                                  | No source import.                                  |
| HRMS         | `https://github.com/CODEXSUN/hrms.git`         | Human resource management application.                                                 | No source import.                                  |
| HIMSX        | `https://github.com/CODEXSUN/himsx.git`        | Healthcare information management application.                                         | No source import.                                  |
| LMS          | `https://github.com/CODEXSUN/lms.git`          | Learning management application.                                                       | No source import.                                  |
| CRM          | `https://github.com/CODEXSUN/crm.git`          | Planned customer relationship management application.                                  | Not confirmed reachable when this map was checked. |
| QCafe        | `https://github.com/CODEXSUN/qcafe.git`        | Planned cafe and point-of-sale application.                                            | Not confirmed reachable when this map was checked. |
| CODEXSUN CLI | `https://github.com/CODEXSUN/codexsun-cli.git` | Planned command-line app factory and repository scaffold tool.                         | Not confirmed reachable when this map was checked. |

## Dependency direction

UIUX depends on the public package surface of UI. UI does not depend on UIUX. Application
repositories may use UI, but they must not import UIUX source files or depend on the UIUX web package.

```text
framework, platform, core, composition
                  |
                  v
                 ui  <----- UIUX gallery
                  |
                  v
          application repositories
```

## Repository status

The confirmed repository list was checked with `git ls-remote` on 2026-09-27. Reachability does not
confirm branch policy, visibility, package publication, or application readiness.

## Boundary rule

Changes to UI belong in the UI repository. Changes to framework, platform, core, composition, or an
application belong in that repository. This repository may contain a local proposal only when the
proposal supports a gallery example and does not change an external repository.
