import { createRootRoute, HeadContent, Outlet, Scripts } from '@tanstack/react-router'
import type { ReactNode } from 'react'
import { getPreferences } from '~/shared/api'
import { I18nProvider, messagesFor } from '~/shared/i18n'
import { Header } from '~/widgets/header'
import '../styles/tokens.css'
import '../styles/base.css'

export const Route = createRootRoute({
  loader: () => getPreferences(),
  head: ({ loaderData }) => {
    const t = messagesFor(loaderData?.locale ?? 'en')
    return {
      meta: [
        { charSet: 'utf-8' },
        { name: 'viewport', content: 'width=device-width, initial-scale=1, viewport-fit=cover' },
        { title: t.app.title },
        { name: 'description', content: t.app.description },
      ],
    }
  },
  component: Layout,
  shellComponent: RootDocument,
})

function Layout() {
  const { theme } = Route.useLoaderData()
  return (
    <>
      <Header theme={theme} />
      <Outlet />
    </>
  )
}

// SSR sets lang and data-theme from cookies: no flash of the wrong scheme or language.
function RootDocument({ children }: { children: ReactNode }) {
  const { locale, theme } = Route.useLoaderData()
  return (
    <html lang={locale} data-theme={theme === 'system' ? undefined : theme}>
      <head>
        <HeadContent />
      </head>
      <body>
        <I18nProvider locale={locale}>{children}</I18nProvider>
        <Scripts />
      </body>
    </html>
  )
}
