import { createContext, type ReactNode, useContext } from 'react'
import { DEFAULT_LOCALE, type Locale } from '../config'
import { en, type Messages } from './messages/en'
import { ru } from './messages/ru'

const dictionaries: Record<Locale, Messages> = { en, ru }

const LocaleContext = createContext<Locale>(DEFAULT_LOCALE)

export function I18nProvider({ locale, children }: { locale: Locale; children: ReactNode }) {
  return <LocaleContext value={locale}>{children}</LocaleContext>
}

export const useLocale = () => useContext(LocaleContext)

export const useT = () => dictionaries[useLocale()]

export const messagesFor = (locale: Locale) => dictionaries[locale]
