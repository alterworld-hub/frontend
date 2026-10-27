import type { NodeInfo } from '../api/get-node'

export function HomePage({ node, version, renderedAt }: NodeInfo) {
  return (
    <main aria-label="node status">
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
