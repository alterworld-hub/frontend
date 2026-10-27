import { createServerFn } from '@tanstack/react-start'

export const getNode = createServerFn().handler(() => ({
  node: process.env.NODE_PATH_ID ?? 'unknown',
  version: process.env.APP_VERSION ?? 'dev',
  renderedAt: new Date().toISOString(),
}))

export type NodeInfo = Awaited<ReturnType<typeof getNode>>
