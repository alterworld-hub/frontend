import { createFileRoute } from '@tanstack/react-router'
import { createServerFn } from '@tanstack/react-start'

const getNode = createServerFn().handler(() => ({
  node: process.env.NODE_PATH_ID ?? 'unknown',
  version: process.env.APP_VERSION ?? 'dev',
  renderedAt: new Date().toISOString(),
}))

export const Route = createFileRoute('/')({
  loader: () => getNode(),
  component: Home,
})

function Home() {
  const { node, version, renderedAt } = Route.useLoaderData()
  return (
    <main>
      <h1>alterworld</h1>
      <p>event platform node</p>
      <p>
        node <code>{node}</code> · frontend <code>{version}</code>
      </p>
      <p>
        rendered <time dateTime={renderedAt}>{renderedAt}</time>
      </p>
    </main>
  )
}
