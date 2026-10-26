# frontend

Web UI. SSR: TanStack Start on rsbuild, React. Served by `srvx` from a distroless Node 24 image.

Conventions: [alterworld-hub/.github](https://github.com/alterworld-hub/.github/blob/main/CONVENTIONS.md).

## Commands
| | |
|---|---|
| `just dev` | Dev server on :3000 |
| `just check` | lint, build, typecheck, chart lint (same as CI) |
| `just image` | Build and run the container on :3000 |

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
