import { createServerFn } from '@tanstack/react-start'
import { getCookie, getRequestHeader, setCookie } from '@tanstack/react-start/server'
import { DEFAULT_LOCALE, isLocale, isTheme, type Locale, type Theme } from '../config'

const YEAR = 60 * 60 * 24 * 365

// Cookie wins; otherwise the first supported language from Accept-Language.
function detectLocale(): Locale {
  const saved = getCookie('locale')
  if (isLocale(saved)) return saved
  return (
    (getRequestHeader('accept-language') ?? '')
      .split(',')
      .map((part) => part.split(';')[0].trim().slice(0, 2).toLowerCase())
      .find(isLocale) ?? DEFAULT_LOCALE
  )
}

export const getPreferences = createServerFn().handler(() => {
  const theme = getCookie('theme')
  return { locale: detectLocale(), theme: isTheme(theme) ? theme : ('system' as Theme) }
})

type Preference = { name: 'locale'; value: Locale } | { name: 'theme'; value: Theme }

export const setPreference = createServerFn({ method: 'POST' })
  .validator((input: Preference) => {
    if (input.name === 'locale' && isLocale(input.value)) return input
    if (input.name === 'theme' && isTheme(input.value)) return input
    throw new Error('invalid preference')
  })
  .handler(({ data }) => {
    setCookie(data.name, data.value, { path: '/', maxAge: YEAR, sameSite: 'lax' })
  })
