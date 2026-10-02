# Working with repositories

Read AGENT.md, README.md, package.json, and relevant source before edits. Inspect git status and preserve existing user changes. Keep each repository independent. Use @devxcrew/tools for version, changelog, line ending, and GitHub commands.

Version updates align package.json, package-lock.json, and agent/CHANGELOG.md. Preserve historical entries. Commit references use the patch number, for example #4 for 0.1.4. Commit and push only within the requested scope. Publishing needs explicit user authorization.

Run npm run check. Cxsun and UIUX provide npm run verify for builds and verification. Framework is built through Cxsun preparation. Generic tools package:check requires dist/src exports and does not fit source-exported UI. Legacy clone/container commands do not fit the Cxsun layout.

Use npm run version-bump with --title and --note. Run npm run fix:line-endings and npm run lines:check. Run checks and review npm run github:now -- --dry-run. Commit messages use #<patch> - <release title>. Do not request an additional bump when the release is already prepared. Common guidance is centralized; local agent folders own task, plan, skills, and changelog records.
