import { useRouter } from '@tanstack/react-router'
import { setPreference } from '~/shared/api'
import { LOCALES, type Locale } from '~/shared/config'
import { useLocale, useT } from '~/shared/i18n'
import { Segmented } from '~/shared/ui'

export function LocaleSwitch() {
  const t = useT()
  const router = useRouter()
  const change = async (value: Locale) => {
    await setPreference({ data: { name: 'locale', value } })
    await router.invalidate()
  }
  return (
    <Segmented
      label={t.header.locale}
      value={useLocale()}
      options={LOCALES.map((value) => ({ value, label: value.toUpperCase() }))}
      onChange={change}
    />
  )
}
