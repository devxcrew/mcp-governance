# Repository workflow

## Before edits

1. Read `AGENTS.md`, `README.md`, `package.json`, and the relevant source.
2. Check Git status and preserve existing user changes.
3. Keep repository ownership and release versions independent.

Shared guidance lives in MCP Governance. Each repository owns its `agent` task, plan, skills, and
changelog records.

## Checks

Run `npm run check`. Cxsun and UIUX also provide `npm run verify`. Cxsun preparation builds
Framework.

The generic tools `package:check` expects `dist/src` exports. It does not fit source-exported UI.
Legacy clone and container commands do not fit the Cxsun layout.

## Release

Use `@devxcrew/tools` through the repository scripts:

1. Run `npm run version-bump` with `--title` and `--note`.
2. Keep `package.json`, `package-lock.json`, and `agent/CHANGELOG.md` aligned. Preserve history.
3. Run `npm run fix:line-endings` and `npm run lines:check`.
4. Run repository checks and review `npm run github:now -- --dry-run`.
5. Commit and push only within the requested scope.

Commit subjects use `#<patch> - <release title>`. For version `0.1.5`, the reference is `#5`. Do not
bump again when the release is prepared. Npm publication requires explicit authorization.

## Architecture review

Follow [code and module standards](code-standard.md). Review owner folders, public contracts,
frontend/backend separation, and event or queue scope before completing changes. Keep files below
700 lines when practical. Review 700–900 lines and split above 900 within the module.

## Installed maintenance tooling

Project apps use the public @devxcrew/tools npm package for repository maintenance.
Version 0.1.7 supports agent/CHANGELOG.md and current shared package names.
Use devxcrew-tools commands from npm scripts instead of ../../shared/mcp-governance/client/repository.mjs.
Project application CI must work with one repository checkout.
