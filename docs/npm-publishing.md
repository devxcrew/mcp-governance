# npm connection and publishing notes

Verified on October 5, 2026. Check current npm requirements before the next release.

## Packages and owners

| Package               | Source repository              | Verified version | Published content                                   |
| --------------------- | ------------------------------ | ---------------- | --------------------------------------------------- |
| `@devxcrew/framework` | `D:\codexsun\shared\framework` | `0.1.8`          | Compiled ESM JavaScript and TypeScript declarations |
| `@devxcrew/ui`        | `D:\codexsun\shared\ui`        | `0.2.0`          | TypeScript, TSX, and CSS for React bundlers         |

The npm account is `devxcrew`. GitHub repository names remain `framework` and `ui`.
The shorter npm names match their GitHub repository names.
Old core-framework and react-ui releases remain available for existing consumers.

UI requires a TypeScript-aware React bundler, such as Vite. React and React DOM are peer dependencies.
Use supported public exports. Native Node cannot execute UI TSX exports directly.

## Connect the developer machine

Check the versions required by each repository's `engines` and `packageManager` fields.
The verified release used Node 26 and npm 12.

```powershell
node --version
npm --version
npm config get registry
npm whoami
```

The public registry is `https://registry.npmjs.org/`. A browser login does not establish CLI authentication.
If `npm whoami` fails, start a CLI login from an interactive terminal:

```powershell
npm login --auth-type=web --registry=https://registry.npmjs.org/
```

Open the fresh URL that npm provides. Complete account authentication in the browser.
Use the registered security key or device when npm offers that method.
Wait for CLI confirmation. Then run `npm whoami` again and confirm the intended publisher account.

Keep credentials in npm's user configuration. Never copy tokens, passwords, recovery codes, or authentication URLs into repository documents.

## Prepare a release

1. Read the package repository's `AGENTS.md` and `agent` records.
2. Run `npm run mcp:connect` to retrieve live guidance.
3. Confirm the repository path, Git root, and working changes.
4. Check whether the target package version already exists with `npm view <package>@<version> version`.
5. Use `npm run version-bump` when a new release version is required.
6. Record the changes and verification in `agent/CHANGELOG.md`.
7. Run the maintenance and release checks below from the package repository.

```powershell
npm run fix:line-endings
npm run lines:check
npm run check:versions
npm run release:check
```

Framework builds its compiled output during release checks and `prepack`.
UI checks its source package and pack contents.
Both packages run release checks through `prepublishOnly`.

Review the pack listing. Framework includes `dist` and its README. UI includes `src` and its README.
Keep environment files, credentials, caches, and developer records outside the published files.
Public packages must not have `private: true`.

## Publish with device authentication

Publish each package from its own repository. Finish one package before starting the next.

```powershell
Set-Location D:\codexsun\shared\framework
npm publish --access public

Set-Location D:\codexsun\shared\ui
npm publish --access public
```

Complete the fresh browser security-key prompt associated with each command.
CLI login and package publication can require separate authentication checks.
Leave the terminal open until the command returns.

npm requires strong authentication for publishing. Package settings determine which authentication methods are allowed.
See [npm publishing authentication](https://docs.npmjs.com/requiring-2fa-for-package-publishing-and-settings-modification/).

## Verify publication

Do not rely only on the browser success page or CLI success message.
Check the registry, then install the packages in the consumer app.

```powershell
npm view @devxcrew/framework version
npm view @devxcrew/ui version
```

For a specific release, use `npm view <package>@<version> version`.
After a brief registry delay, retry the checks. Confirm the package and version before changing consumer dependencies.

## Connect project apps

Run these commands from the project app. The versions below reproduce the verified release.
Choose the intended versions for future releases.

```powershell
Set-Location D:\codexsun\projects\cxsun
npm install @devxcrew/framework@^0.1.7 @devxcrew/ui@^0.1.7
npm ci
npm run verify
```

Project manifests use npm version ranges. Project lockfiles record registry tarball URLs and integrity hashes.
Remove old package imports and obsolete sibling build hooks when migrating an app.
Do not use `file:` dependencies for these packages in project release manifests.

Import UI styles through `@devxcrew/ui/styles`.
Keep Tailwind source scanning configured for the installed UI package.
Cxsun's `src/web/styles.css` scans `../../node_modules/@devxcrew/ui/src`.
Adjust that relative path when the stylesheet location differs.

## Develop packages beside the app

Cxsun provides these explicit development commands:

```powershell
npm run packages:local
npm run verify
npm ci
```

`packages:local` builds Framework and packs both sibling packages into an ignored cache.
It installs snapshots without changing the app manifest or lockfile. Run it again after shared source changes.

`npm ci` restores the exact registry versions in the lockfile.
`npm run packages:npm` restores packages using the manifest ranges without rewriting the lockfile.
Use `npm ci` for reproducible release verification.

UIUX remains the separate live source gallery. Its local UI dependency supports package development.
That gallery exception does not apply to project release manifests.

## Problems encountered in this release

| Symptom                                      | Action                                                                                                       |
| -------------------------------------------- | ------------------------------------------------------------------------------------------------------------ |
| Browser login works, but `npm whoami` fails  | Complete a fresh CLI web login.                                                                              |
| Email OTP does not arrive                    | Use the registered device or security key when npm offers it. Otherwise use npm account recovery.            |
| `EOTP` or a publishing security-key prompt   | Complete the fresh device check for that publish command.                                                    |
| Authentication URL expires                   | Restart the command and use its new URL. Do not reuse an old browser challenge.                              |
| Publish succeeds, but registry returns `404` | Retry registry checks after a short delay. Inspect account package and staged-package status if it persists. |
| `E409` after a package was unpublished       | Respect npm's name hold. Select another name only with owner authorization.                                  |
| App resolves sibling files after migration   | Install registry versions and review the manifest, lockfile, imports, and build hooks.                       |

On October 3, `@devxcrew/framework` and `@devxcrew/ui` were temporarily unavailable after unpublishing.
The owner selected `@devxcrew/framework` and `@devxcrew/ui` instead.
Both new names published successfully at `0.1.7`.
See [npm's unpublishing rules](https://docs.npmjs.com/unpublishing-packages-from-the-registry/).

The package list briefly showed a staged placeholder. The staged-package page showed no pending review.
Later registry checks returned both published versions. No manual promotion was required for this release.

## Record the result

Record the published names, versions, commands, and verification in `agent/TASK.md` and `agent/AUDIT.md`.
Keep release notes in `agent/CHANGELOG.md`. Preserve failed attempts as historical evidence and mark resolved blockers clearly.

Use `github:now` only when commit and push are authorized. Commit subjects follow `#<patch> - <release title>`.
npm publication and GitHub updates are separate operations.

When shared guidance or package metadata changes, verify and redeploy the live MCP snapshot.
This document is a local operations reference. It does not replace the live governance connection requirement.
