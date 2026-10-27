export const LOCALES = ['en', 'ru'] as const
export type Locale = (typeof LOCALES)[number]
export const DEFAULT_LOCALE: Locale = 'en'

export const THEMES = ['system', 'light', 'dark'] as const
export type Theme = (typeof THEMES)[number]

export const isLocale = (v: unknown): v is Locale => LOCALES.includes(v as Locale)
export const isTheme = (v: unknown): v is Theme => THEMES.includes(v as Theme)
