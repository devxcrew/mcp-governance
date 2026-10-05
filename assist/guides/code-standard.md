# Code and module standards

## Architecture

Build a modular monolith with strict module ownership and practical domain-driven design (DDD). An
implemented business capability owns its backend module and matching frontend module when both are
needed. Frontend-only apps and infrastructure packages must not create unused backend or UI layers.
Use the same module name on both sides. Keep their implementations separate.

A module owns its domain rules, validation, types, persistence, APIs, UI, events, jobs, and tests.
Do not centralize business code across modules or use metadata-driven shared CRUD engines. Do not
import another module's private files, repositories, services, hooks, forms, or internal types.

Composition roots register modules, declare dependencies, and order startup. They do not implement
business operations. Other modules consume intentional public exports, injected contracts, fixed
APIs, or published events. Dependencies must be explicit and acyclic.

Shared Framework, Tools, and UI may provide business-neutral primitives. Transport, database
connections, queue delivery, environment parsing, and generic UI controls may be shared. Business
fields, SQL, validation, permissions, handlers, forms, lists, and workflows stay with their module.

## Provider boundary

`<module>.provider.ts` is the module's composition and communication entry point. It creates the
module's owned services and adapters, declares dependencies, and exposes a narrow public contract.
Export the provider and public types through `index.ts`. Other modules receive that contract through
explicit dependency injection. Never expose private repositories or use the provider as a global
service locator.

Providers may register owned routes, migrations, seeds, events, and workers when those capabilities
exist. The app composition root connects providers and orders startup. Business rules remain in the
owning service or domain code, not the provider.

Use the same provider boundary on the frontend for public module registration and integrations. Use
`<module>.provider.tsx` only when the provider renders React context or components. Do not create
React context merely to match the backend pattern. Frontend providers never import backend runtime
implementations.

## Backend layout

Keep files together in one owner folder: `src/api/modules/<module>/`. An app with a separate API
package may use `api/src/modules/<module>/`.

Every backend business module MUST contain every file in the canonical structure below, using the
exact filenames. This is a required contract for all agents and contributors, not a starter template.
Do not omit a file because a capability is currently small or unused. Keep non-applicable files
minimal and explicit; do not add fake business behavior to them. Additional files are allowed only
for concrete owner-local needs and must not replace or rename canonical files. A backend module is
not complete while a required file is missing or its public wiring is incomplete.

```text
<module>/
  index.ts
  <module>.provider.ts
  <module>.migration.ts
  <module>.repository.ts
  <module>.schema.ts
  <module>.routes.ts
  <module>.controller.ts
  <module>.seed.ts
  <module>.service.ts
  <module>.types.ts
```

| File                     | Responsibility                                                          |
| ------------------------ | ----------------------------------------------------------------------- |
| `index.ts`               | Intentional public exports                                              |
| `<module>.provider.ts`   | Registration, declared dependencies, and public communication contracts |
| `<module>.migration.ts`  | Owned tables, indexes, constraints, and schema upgrades                 |
| `<module>.repository.ts` | Owned persistence queries and adapters                                  |
| `<module>.routes.ts`     | Endpoint registration, schemas, middleware, and controller wiring       |
| `<module>.controller.ts` | Required transport orchestration and service invocation                 |
| `<module>.seed.ts`       | Repeatable defaults that preserve existing user data                    |
| `<module>.service.ts`    | Use cases, business rules, authorization, and transaction decisions     |
| `<module>.types.ts`      | Owned records, payloads, and public contracts                           |

Keep request validation in `<module>.schema.ts`. Add `<module>.domain.ts`, owner helpers, or tests
only when needed. Migrations change structure. Seeds provide defaults. Every route wires to the
module controller, including small endpoints; the controller may stay thin but must call the service
and map the transport result. A module must not query or modify another module's owned tables
directly. Use that owner's public contract for related data and validate referenced IDs through it.

Use DDD to define domain language, invariants, and transaction boundaries. Add entities, value
objects, or aggregates when they clarify real domain behavior. Do not add nested layer scaffolds,
inheritance factories, or wrappers. Required canonical files must contain only the smallest honest
owner-local implementation needed by the module; do not invent business behavior to fill them.
Modules without persistence still keep the required migration, repository, and seed files, with an
explicit minimal not-applicable export or comment.

## Routes and controllers

Keep `<module>.routes.ts` declarative: paths, methods, schemas, middleware, and handler
registration. Do not put SQL, business decisions, event processing, or long request handlers in
routes.

Every backend module has `<module>.controller.ts`. It reads validated input and trusted request
context, calls the service, and maps results or errors to the HTTP contract. Keep authorization
decisions and business invariants in services. Controllers must not access repositories directly.
Even a simple controller must be wired as the route handler; do not bypass it by wiring routes
straight to services.

Required flow: route → controller → service → repository. Cross-module service calls use injected
provider contracts, not another module's controller or private service.

## Frontend layout

Keep files together in `src/web/modules/<module>/` or `web/src/modules/<module>/`.

Every frontend business module MUST contain every file in the canonical structure below, using the
exact filenames. This applies to all agents and contributors. Do not omit a role because the current
screen is small or does not use it yet. Keep non-applicable files minimal and explicit; do not add
fake business behavior. Additional files are allowed only for concrete owner-local needs and must
not replace or rename canonical files. A frontend module is not complete while a required file is
missing or its public wiring is incomplete.

```text
<module>/
  index.ts
  <module>.provider.ts
  <module>.routes.tsx
  <module>.workspace.tsx
  <module>.list.tsx
  <module>.form.tsx
  <module>.services.ts
  <module>.hooks.ts
  <module>.schema.ts
  <module>.types.ts
```

The module owns its routes, API calls, query keys, state, validation, forms, lists, and workspace
behavior. Forms, lists, and workspaces have distinct responsibilities. Wire the canonical provider
and routes to the module's workspace, list, form, services, hooks, schema, and types as applicable.
Keep required non-applicable files minimal and explicit. Do not disguise shared
business implementations with aliases or wrappers. Add module-owned pages, details, reports, print
views, or helper files when needed. Use an optional `<module>.controller.ts` or `.tsx` for complex
UI orchestration. Keep route registration and view components clean. Do not duplicate hooks or
backend controller behavior. Omit roles that the module does not use. Frontend modules do not own
database migrations or server repositories.

Use shared UI through public exports. Keep business fields and interactions in the frontend owner.
Frontend and backend may share intentional public data contracts, but not private implementations or
server code. Server validation and authorization remain authoritative.

## Resource routes, URL state, and breadcrumbs

### Backend API

Use Laravel-style resource actions under `/api/v1` for all business APIs. This is a routing
convention for the Node backend. It does not require Laravel or PHP. Use plural resource names and
module-owned route definitions. Do not add generic centralized CRUD routing or controller
implementations.

| Method | Route                  | Controller action | Purpose                          |
| ------ | ---------------------- | ----------------- | -------------------------------- |
| GET    | `/api/v1/contacts`     | `index`           | List, filter, sort, and paginate |
| POST   | `/api/v1/contacts`     | `store`           | Create                           |
| GET    | `/api/v1/contacts/:id` | `show`            | Read one record                  |
| PUT    | `/api/v1/contacts/:id` | `update`          | Replace writable fields          |
| PATCH  | `/api/v1/contacts/:id` | `update`          | Update selected writable fields  |
| DELETE | `/api/v1/contacts/:id` | `destroy`         | Delete subject to domain rules   |

Validate IDs, query strings, and bodies through owner Zod schemas. Use 200 for successful
reads/updates, 201 for creation, and 204 for deletion without a response body. Return 422 for
validation failures, 401 for missing authentication, 403 for forbidden operations, and 404 for
missing records. Use 409 for domain or concurrency conflicts when appropriate.

GET requests never mutate records. Create and edit pages are browser routes, not mutation API
endpoints. If a form needs extra defaults or lookup metadata, the owner may add read-only
`GET /api/v1/contacts/create` or `GET /api/v1/contacts/:id/edit`. These are explicit extensions, not
required Laravel API resource routes. Save through POST, PUT, or PATCH. Register static paths before
`:id` routes to avoid matching `create` as an ID.

Paginated lists return a consistent envelope:

```json
{
  "data": [],
  "meta": { "current_page": 3, "per_page": 20, "total": 85, "last_page": 5 },
  "links": { "first": "...", "last": "...", "prev": "...", "next": "..." }
}
```

Generate links from the configured API URL and preserve validated filters and sort settings.
Single-record responses use `{ "data": record }`. Validation responses use
`{ "message": "Validation failed", "errors": { "name": ["Name is required"] } }`. Controllers map
domain results to the contract. Repositories accept validated filters, never raw SQL or arbitrary
query fields.

### Browser-to-API mapping

Cxsun workspace pages use `/desk/<resource>`. Other apps may use their declared workspace prefix
consistently. The browser page path and API path have distinct roles, but share the same resource
and query contract.

| Browser URL                  | API request                                                               |
| ---------------------------- | ------------------------------------------------------------------------- |
| `/desk/contacts`             | `GET /api/v1/contacts`                                                    |
| `/desk/contacts?page=3`      | `GET /api/v1/contacts?page=3`                                             |
| `/desk/contacts?name=sundar` | `GET /api/v1/contacts?name=sundar`                                        |
| `/desk/contacts/create`      | `POST /api/v1/contacts` on save                                           |
| `/desk/contacts/1`           | `GET /api/v1/contacts/1`                                                  |
| `/desk/contacts/1/edit`      | `GET /api/v1/contacts/1` to load, then `PATCH /api/v1/contacts/1` to save |

Forms remain module-owned TanStack Form components with Zod validation. An optional metadata
endpoint supplements record loading. It does not replace the standard save endpoint.

### Query strings

Use browser query parameters as the source of truth for shareable list state. Support `page`,
`per_page`, `sort`, `direction`, and explicit owner filters such as `name`. Use `search` only for a
documented full-text search operation.

Default to `page=1` and `per_page=20`; cap `per_page` at 100 unless the module documents a different
limit. Allowlist filter names, sort columns, and `direction=asc|desc` in owner schemas. Document
whether filters use exact or partial matching. Contacts `name` uses partial matching. Use
parameterized repository queries and escape wildcard characters when filters represent literal text.

Build URLs with the router and `URLSearchParams`. Encode values and omit empty filters and default
values. Do not concatenate untrusted strings or pass arbitrary browser parameters to the backend.
Normalize malformed browser values to defaults. Reject malformed API parameters with a validation
response.

Reset `page` to 1 when filters, sorting, or page size change. Debounce live search and replace its
history entry. Push explicit page navigation so Back and Forward restore list state. Refresh and
direct links must restore the same view and API request.

Module hooks derive cache keys from resource, trusted scope, and normalized query values. Cancel or
disregard stale requests. Preserve list filters when opening details, editing, and returning to the
list. Never expose secrets, credentials, session tokens, or private tenant selectors in URLs.

### Breadcrumbs

Each frontend module owns its breadcrumb labels and route metadata in `<module>.routes.tsx` or an
owner helper. Its provider exposes that public navigation contract to the workspace shell. The
shared shell renders breadcrumbs without knowing module business details.

Examples:

- `Desk → Contacts`
- `Desk → Contacts → Create`
- `Desk → Contacts → Sundar`
- `Desk → Contacts → Sundar → Edit`

Resolve record labels from authorized loaded data. Use a safe placeholder while loading. Link
ancestor crumbs to browser pages, not API URLs. Preserve normalized list queries on the Contacts
crumb. Update breadcrumbs on navigation, direct load, refresh, and browser Back or Forward. Filters
and page numbers remain list state. They are not separate breadcrumb levels.

### Verification

For changed resource flows, verify direct URLs, refresh, Back/Forward, filter reset, pagination, and
edit-to-list return. Check that breadcrumbs, browser query state, hook cache keys, and API requests
agree. Test invalid IDs, unknown filters, sort allowlists, server validation, authorization, and
tenant isolation where applicable. Do not claim this guidance implements routes or breadcrumbs in
existing apps.

Reference: [Laravel resource controllers](https://laravel.com/framework/docs/controllers).

## Validation

### Frontend

Use TanStack Form (`@tanstack/react-form`) with Zod for new or changed module forms. The frontend
owner keeps form state in `<module>.form.tsx` and validation in `<module>.schema.ts`. Declare form
dependencies in the owning frontend package. Backend packages do not depend on TanStack Form.

Pass Zod schemas directly to TanStack Form validators through Standard Schema support. Validate on
submit and use change or blur validation where helpful. Show accessible field errors and a form
error for failures without a field path. Map safe server validation errors back to the owning form.
Preserve entered values after failure.

Disable duplicate submissions while a request is pending. Never submit values that fail client
validation. Client validation improves feedback. It does not authorize operations or replace server
validation. Zod parsing may transform values. Explicitly parse submitted values when the API needs
transformed output. Use schema-derived input and output types instead of duplicating payload
definitions.

### Backend

Validate every untrusted request body, parameter, and query with module-owned Zod schemas. Keep
schemas in the backend `<module>.schema.ts` and attach them through the route contract. For handlers
outside that contract, call `safeParse` before invoking the service. Use `safeParseAsync` when the
schema has asynchronous refinements or transforms. Never cast raw request input into a trusted
payload type.

Reject unknown mutation fields and invalid values. Use deliberate coercion for URL inputs. Do not
derive tenant scope or permissions from client payloads. Resolve trusted server context
independently. Controllers pass only parsed data and trusted context to services. Services enforce
domain rules, authorization, referenced-record validity, and uniqueness. Database constraints remain
the final protection against concurrent invalid writes.

Return consistent validation errors with field paths, stable error codes, and safe messages. Use the
app's documented client-error status and envelope. Never expose credentials or database errors.
Requests must fail before persistence or event publication when validation fails. Validate queued
messages again at the worker boundary when consumed.

### Contract ownership and checks

Frontend and backend schemas stay in their owning module folders. They may consume an explicitly
exported, browser-safe module data contract when that prevents contract drift. Never create a
central business schema registry or import backend runtime code into frontend bundles. Keep
server-only rules outside shared browser contracts.

Test malformed input, unknown fields, boundary values, and mapped form errors when those paths
change. Prove that direct API calls still fail when browser validation is bypassed.

Sources:
[TanStack Form validation](https://tanstack.com/form/latest/docs/framework/react/guides/validation)
and [Zod parsing](https://zod.dev/basics).

## Events and queues

Use synchronous public contracts for immediate operations. Use domain events for real state changes
and queues for background, retryable, or slow work. Do not add an event bus, CQRS, event sourcing,
or workers to simple CRUD without a concrete need.

When needed, keep `<module>.events.ts`, `<module>.worker.ts`, and `<module>.sync.ts` in the owning
module. Producers own event contracts. Consumers own their handlers and depend only on public
contracts. Shared infrastructure delivers events and jobs. It does not own business handlers.

Queued messages must be serializable and versioned. Include:

- A unique event or job ID and event type.
- A schema version and occurrence time.
- A correlation ID and validated payload.
- Trusted organization scope when the operation is scoped.

Publish committed state changes. Use a transactional outbox when durable delivery must agree with
database commits. Make retried workers idempotent. Define bounded retries, backoff, failure
handling, and scope-aware processing. Do not serialize secrets, sessions, functions, or database
connections.

## File size and simplicity

Keep files below 700 lines when practical. Treat 700–900 lines as a review and split range. Split
files above 900 lines by responsibility inside the same module. This is a ceiling, not a target. Do
not pad small files or fragment cohesive code without a reason. Generated files and immutable
historical records are outside this source-file guideline.

Keep functions focused. Use clear names and TypeScript types. Add abstractions only for repeated
concrete uses. Keep comments short and explain reasons. Use argument-based child processes. Never
build shell commands from user text.

## Security and verification

Keep secrets in ignored environment files. Expose only explicit public frontend configuration.
Resolve single-client or multi-tenant scope on the server. Enforce authorization in the owning
backend module. Keep database, event, queue, and cache scope consistent. Navigation flags do not
authorize data access.

Before completion, review ownership, public imports, dependency cycles, file sizes, and
frontend/backend separation. Run applicable repository checks and tests. Verify migrations, repeat
seeding, and queue retry behavior when changed. Use LF for source files and preserve binary files.

Retrieve shared documentation and rules only from `https://mcp.codexsun.com/mcp` using `npm run mcp:connect`.
A successful authenticated connection is required before repository work. Stop and report connection failures.
Do not use local guides or cached instructions as fallback. Instruction retrieval does not authorize actions.

## Reference

The inspected example is `E:\Workspace\codexsun\cxapp\apps`. Billing Sales demonstrates module-owned
backend and frontend files with optional events and workers. Use its ownership pattern as a
reference. Keep current Cxsun names, packages, environment settings, and infrastructure choices.

## Public identity integration for additional modules

Backend modules inject the identity provider's public contract through their registration boundary.
Declare namespaced permissions with registerPermissions and enforce actions with requirePermission.
Use authenticateRequest for HTTP authentication to preserve cookie, origin and cancellation rules.
Keep identity secrets and database implementations private to Platform and app infrastructure.
Map public IdentityError to the shared HTTP error contract at transport boundaries.
Frontend module pages use identityProvider.workspace for the common authenticated desk shell.
Compose public routes and navigation explicitly. Do not create a second login or permission system.
Current extension exports are local source contracts pending coordinated package publication.
