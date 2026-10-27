# frontend

Web UI. SSR: TanStack Start on rsbuild, React. Served by `srvx` from a distroless Node 24 image.

Conventions: [alterworld-hub/.github](https://github.com/alterworld-hub/.github/blob/main/CONVENTIONS.md).

## Commands
| | |
|---|---|
| `just dev` | Dev server on :3000 |
| `just check` | lint (Biome, Steiger), build, typecheck, chart lint (same as CI) |
| `just image` | Build and run the container on :3000 |

## Structure
[Feature-Sliced Design](https://feature-sliced.design): `src/app` (routing, document shell; TanStack Start `srcDirectory`), `src/pages/<page>`, later `widgets`, `features`, `entities`, `shared`.
- Routes in `src/app/routes` are thin: they import a page through its public API (`~/pages/<page>`).
- A layer imports only from layers below it; slices only through their `index.ts`.
- Enforced by [Steiger](https://github.com/feature-sliced/steiger) in `npm run lint`; a violation fails CI.

## UI
- Styles: plain CSS next to the component, [BEM](https://en.bem.info/methodology/naming-convention/) class names (`block__element--modifier`), block = component.
- Design tokens in `src/app/styles/tokens.css`; components use only `var(--…)`. Colors are `light-dark(light, dark)`.
- Color scheme: `system` (OS) by default; `light`/`dark` stored in cookie `theme`, rendered as `<html data-theme>` on the server (no flash).
- Locale: cookie `locale`, else `Accept-Language`, else `en`. Messages in `src/shared/i18n/messages/<locale>.ts`; `ru` is typed by `en`, so a missing key fails typecheck. Use `useT()`.
- Floating layout: header and content are elevated islands (`--shadow-float`, `--radius`) off the screen edges.

## Runtime
| | |
|---|---|
| Port | 3000 |
| Health | `GET /healthz` → `200 ok` |
| Env | `NODE_PATH_ID` node path shown in UI; `APP_VERSION` set by chart |
| FS | read-only root works; runs as uid 65532 |

## Delivery
Standard `service.yml` pipeline (see [.github](https://github.com/alterworld-hub/.github)). Repo-specific: `check` job only.
- Chart in `deploy/chart`; version synced by release-please.
- Deploy: by digest via `gitops`.
