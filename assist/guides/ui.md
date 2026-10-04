# Shared UI

## Imports

| Component or contract | Import path                           |
| --------------------- | ------------------------------------- |
| Button                | `@devxcrew/react-ui/components/button`      |
| LoginPage             | `@devxcrew/react-ui/blocks/auth`            |
| MainWorkspace         | `@devxcrew/react-ui/layouts/main-workspace` |
| Shared styles         | `@devxcrew/react-ui/styles`                 |
| Design system         | `@devxcrew/react-ui/design-system`          |

`MainWorkspace` composes `mdi-main`.

## Before use

Run the MCP tool `get_ui_catalog` to read current exports. Check component props and UIUX examples.
The catalog lists imports, not complete prop schemas.

Keep reusable components and their dependencies in UI. Apps own page behavior, navigation, and data
connections. Do not copy shared components into apps.

## Frontend ownership

Keep each capability in its own frontend module, matching the backend module name. The owner
contains its forms, lists, workspace, routes, services, hooks, schemas, and types. Use shared UI
controls without centralizing business fields or workflows. Follow
[code and module standards](code-standard.md).

## Form validation

Use TanStack Form with module-owned Zod schemas. Show field errors and map safe API validation
failures back to the form. The backend validates independently. See
[validation standards](code-standard.md#validation).

## Resource navigation

Keep filters, pagination, and sorting in browser query strings. Map validated query values to the
module API. Expose module-owned breadcrumb metadata through the provider. Preserve list state on
ancestor links and return navigation. Follow
[resource routing and navigation](code-standard.md#resource-routes-url-state-and-breadcrumbs).
