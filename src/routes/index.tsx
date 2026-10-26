import { createFileRoute } from '@tanstack/react-router'
import { createServerFn } from '@tanstack/react-start'

const getNode = createServerFn().handler(() => ({
  node: process.env.NODE_PATH_ID ?? 'unknown',
  version: process.env.APP_VERSION ?? 'dev',
}))

export const Route = createFileRoute('/')({
  loader: () => getNode(),
  component: Home,
})

function Home() {
  const { node, version } = Route.useLoaderData()
  return (
    <main>
      <h1>alterworld</h1>
      <p>
        node <code>{node}</code> · frontend <code>{version}</code>
      </p>
    </main>
  )
}
