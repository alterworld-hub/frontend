import { useRouter } from '@tanstack/react-router'
import { setPreference } from '~/shared/api'
import { THEMES, type Theme } from '~/shared/config'
import { useT } from '~/shared/i18n'
import { Segmented } from '~/shared/ui'

export function ThemeSwitch({ theme }: { theme: Theme }) {
  const t = useT()
  const router = useRouter()
  const change = async (value: Theme) => {
    await setPreference({ data: { name: 'theme', value } })
    await router.invalidate()
  }
  return (
    <Segmented
      label={t.header.theme}
      value={theme}
      options={THEMES.map((value) => ({ value, label: t.theme[value] }))}
      onChange={change}
    />
  )
}
