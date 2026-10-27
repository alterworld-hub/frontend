import './segmented.css'

type Option<T extends string> = { value: T; label: string }

export function Segmented<T extends string>(props: {
  label: string
  value: T
  options: readonly Option<T>[]
  onChange: (value: T) => void
}) {
  return (
    <fieldset className="segmented">
      <legend className="segmented__legend">{props.label}</legend>
      {props.options.map((o) => (
        <button
          key={o.value}
          type="button"
          className={`segmented__option${o.value === props.value ? ' segmented__option--active' : ''}`}
          aria-pressed={o.value === props.value}
          onClick={() => props.onChange(o.value)}
        >
          {o.label}
        </button>
      ))}
    </fieldset>
  )
}
