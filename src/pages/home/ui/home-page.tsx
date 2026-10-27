import { useT } from '~/shared/i18n'
import type { NodeInfo } from '../api/get-node'
import './home-page.css'

export function HomePage({ node, version, renderedAt }: NodeInfo) {
  const t = useT()
  return (
    <main className="home" aria-label={t.app.description}>
      <section className="home__card">
        <h1 className="home__title">{t.app.title}</h1>
        <p className="home__tagline">{t.home.tagline}</p>
        <dl className="home__facts">
          <dt className="home__term">{t.home.node}</dt>
          <dd className="home__value">
            <code>{node}</code>
          </dd>
          <dt className="home__term">{t.home.version}</dt>
          <dd className="home__value">
            <code>{version}</code>
          </dd>
          <dt className="home__term">{t.home.rendered}</dt>
          <dd className="home__value">
            <time dateTime={renderedAt}>{renderedAt}</time>
          </dd>
        </dl>
      </section>
    </main>
  )
}
