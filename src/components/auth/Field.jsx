import { useState } from 'react'

const ICONS = {
  mail: <path d="M4 6h16a1 1 0 0 1 1 1v10a1 1 0 0 1-1 1H4a1 1 0 0 1-1-1V7a1 1 0 0 1 1-1zm16 4-8 5-8-5" />,
  lock: <path d="M7 11V8a5 5 0 0 1 10 0v3M6 11h12a1 1 0 0 1 1 1v7a1 1 0 0 1-1 1H6a1 1 0 0 1-1-1v-7a1 1 0 0 1 1-1z" />,
  user: <path d="M12 12a4 4 0 1 0 0-8 4 4 0 0 0 0 8zm8 9a8 8 0 0 0-16 0" />,
}

const BASE_INPUT =
  'mt-1.5 w-full rounded-xl border bg-cream px-4 py-2.5 text-sm text-ink placeholder:text-bark/50 focus:outline-none focus:ring-2 transition'

export default function Field({
  id,
  label,
  type = 'text',
  value,
  onChange,
  onBlur,
  error,
  autoComplete,
  placeholder,
  icon,
  revealable,
  aside,
  className = '',
}) {
  const [show, setShow] = useState(false)
  const inputType = revealable ? (show ? 'text' : 'password') : type

  return (
    <div className={className}>
      <div className="mb-1.5 flex items-center justify-between gap-3">
        <label htmlFor={id} className="text-sm font-medium text-ink">
          {label}
        </label>
        {aside}
      </div>
      <div className="relative">
        {icon && (
          <span className="pointer-events-none absolute left-3.5 top-[50%] mt-0.5 -translate-y-[calc(50%+2px)] text-bark" aria-hidden="true">
            <svg viewBox="0 0 24 24" className="h-4.5 w-4.5" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
              {ICONS[icon]}
            </svg>
          </span>
        )}
        <input
          id={id}
          name={id}
          type={inputType}
          value={value}
          onChange={onChange}
          onBlur={onBlur}
          placeholder={placeholder}
          autoComplete={autoComplete}
          aria-invalid={error ? 'true' : undefined}
          className={`${BASE_INPUT} border-ink/15 focus:border-gold focus:ring-gold/30 ${
            icon ? 'pl-10' : ''
          } ${revealable ? 'pr-11' : ''} ${error ? 'border-clay focus:border-clay focus:ring-clay/25' : ''}`}
        />
        {revealable && (
          <button
            type="button"
            onClick={() => setShow(!show)}
            aria-label={show ? 'Hide password' : 'Show password'}
            className="absolute right-3 top-1/2 mt-0.5 -translate-y-[calc(50%+2px)] text-bark transition hover:text-ink"
          >
            <svg viewBox="0 0 24 24" className="h-4.5 w-4.5" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
              {show ? (
                <>
                  <path d="M2 12s3.5-7 10-7 10 7 10 7-3.5 7-10 7S2 12 2 12z" />
                  <circle cx="12" cy="12" r="3" />
                  <path d="M3 3l18 18" />
                </>
              ) : (
                <>
                  <path d="M2 12s3.5-7 10-7 10 7 10 7-3.5 7-10 7S2 12 2 12z" />
                  <circle cx="12" cy="12" r="3" />
                </>
              )}
            </svg>
          </button>
        )}
      </div>
      {error && (
        <p role="alert" className="mt-1.5 text-xs font-medium text-clay">
          {error}
        </p>
      )}
    </div>
  )
}
