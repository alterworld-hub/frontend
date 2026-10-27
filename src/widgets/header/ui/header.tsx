import type { Theme } from '~/shared/config'
import { useT } from '~/shared/i18n'
import { LocaleSwitch } from './locale-switch'
import { ThemeSwitch } from './theme-switch'
import './header.css'

export function Header({ theme }: { theme: Theme }) {
  const t = useT()
  return (
    <header className="header">
      <a className="header__brand" href="/">
        {t.app.title}
      </a>
      <div className="header__controls">
        <ThemeSwitch theme={theme} />
        <LocaleSwitch />
      </div>
    </header>
  )
}
