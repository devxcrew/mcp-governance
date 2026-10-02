# UIUX Development Plan

This plan keeps the standalone UIUX gallery independently buildable and reviewable.

## Phase 1: Foundation

- [x] Copy the existing UIUX gallery into this standalone repository.
- [x] Remove root-monorepo Vite and path assumptions.
- [x] Consume the public `@codexsun/ui` package through the approved sibling repository.

## Phase 2: Verification

- [ ] Install dependencies from this repository root.
- [ ] Pass repository boundary and type checks.
- [ ] Pass production build.
- [ ] Verify the live gallery at port 6102.

## Phase 3: Delivery

- [ ] Commit the standalone migration.
- [ ] Push to `CODEXSUN/uiux` after the remote repository is available.
