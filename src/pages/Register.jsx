import { useEffect, useRef, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useGSAP } from '@gsap/react'
import gsap from 'gsap'
import AuthLayout from '@/components/auth/AuthLayout'
import Field from '@/components/auth/Field'

const EMAIL_RE = /^\S+@\S+\.\S+$/

const STRENGTH = [
  { label: '', color: '' },
  { label: 'Weak', color: 'text-clay' },
  { label: 'Fair', color: 'text-golddeep' },
  { label: 'Good', color: 'text-golddeep' },
  { label: 'Strong', color: 'text-forest' },
]
const STRENGTH_BAR = ['', 'bg-clay', 'bg-golddeep', 'bg-gold', 'bg-forest']

const STRENGTH_COLORS = ['', 'bg-clay', 'bg-golddeep', 'bg-gold', 'bg-forest']

// Rough signal, not a security promise — good UX scaffolding for the real backend.
function strengthOf(pw) {
  if (!pw) return 0
  let score = 1
  if (pw.length >= 10) score++
  if (/[A-Z]/.test(pw) && /[0-9]/.test(pw)) score++
  if (pw.length >= 14 || /[^A-Za-z0-9]/.test(pw)) score++
  return score
}

export default function Register() {
  const navigate = useNavigate()
  const root = useRef(null)
  const [values, setValues] = useState({ name: '', email: '', password: '', confirm: '', terms: false })
  const [errors, setErrors] = useState({})
  const [status, setStatus] = useState('idle')

  useEffect(() => {
    document.title = 'InviteU · Create your account'
  }, [])

  useGSAP(
    () => {
      if (window.matchMedia?.('(prefers-reduced-motion: reduce)').matches) return
      gsap.from('.auth-step', {
        y: 18,
        opacity: 0,
        duration: 0.6,
        ease: 'power3.out',
        stagger: 0.06,
        delay: 0.05,
      })
    },
    { scope: root, dependencies: [] },
  )

  const strength = strengthOf(values.password)

  const set = (key) => (e) => {
    setValues((v) => ({ ...v, [key]: e.target.value }))
    setErrors((err) => ({ ...err, [key]: undefined }))
  }

  const validate = () => {
    const next = {}
    if (values.name.trim().length < 2) next.name = 'Tell us what to call you.'
    if (!values.email.trim()) next.email = 'Please enter your email.'
    else if (!EMAIL_RE.test(values.email)) next.email = 'That does not look like an email address.'
    if (values.password.length < 8) next.password = 'Use at least 8 characters.'
    if (values.confirm !== values.password) next.confirm = 'Passwords do not match.'
    if (!values.terms) next.terms = 'Please accept the terms to continue.'
    return next
  }

  const onSubmit = (e) => {
    e.preventDefault()
    const next = validate()
    setErrors(next)
    if (Object.keys(next).length > 0) return
    setStatus('submitting')
    // Demo build: no server yet — simulate a short round trip, then head home.
    setTimeout(() => navigate('/', { replace: true }), 900)
  }

  return (
    <AuthLayout
      switchLink={
        <>
          Already planning?{' '}
          <Link to="/login" className="font-semibold text-golddeep underline-offset-4 hover:underline">
            Sign in
          </Link>
        </>
      }
    >
      <div ref={root}>
        <div className="auth-step">
          <h1 className="font-display text-4xl font-semibold tracking-tight">Create your account.</h1>
          <p className="mt-2 text-sm leading-relaxed text-bark">
            Set your invitation up once — then send one beautiful link and let the replies, seats and
            photographs organize themselves.
          </p>
        </div>

        <form noValidate className="mt-8 space-y-4" onSubmit={onSubmit}>
          <div className="auth-step">
            <Field
              id="name"
              label="Your names"
              icon="user"
              placeholder="Maya & Noah"
              autoComplete="name"
              value={values.name}
              onChange={set('name')}
              error={errors.name}
            />
          </div>

          <div className="auth-step">
            <Field
              id="email"
              label="Email"
              type="email"
              icon="mail"
              placeholder="you@example.com"
              autoComplete="email"
              value={values.email}
              onChange={set('email')}
              error={errors.email}
            />
          </div>

          <div className="auth-step">
            <Field
              id="password"
              label="Password"
              icon="lock"
              revealable
              placeholder="At least 8 characters"
              autoComplete="new-password"
              value={values.password}
              onChange={set('password')}
              onBlur={() => setErrors((err) => ({ ...err, password: values.password.length < 8 && values.password ? 'Use at least 8 characters.' : undefined }))}
              error={errors.password}
            />
            {values.password && (
              <div className="mt-2 flex items-center gap-3" aria-live="polite">
                <div className="flex flex-1 gap-1" aria-hidden="true">
                  {[1, 2, 3, 4].map((i) => (
                    <span
                      key={i}
                      className={`h-1 flex-1 rounded-full transition-colors duration-300 ${i <= strength ? STRENGTH_COLORS[strength] : 'bg-ink/10'}`}
                    />
                  ))}
                </div>
                <span className={`text-xs font-medium ${STRENGTH[strength].color}`}>{STRENGTH[strength].label}</span>
              </div>
            )}
          </div>

          <div className="auth-step">
            <Field
              id="confirm"
              label="Confirm password"
              icon="lock"
              revealable
              placeholder="Once more, with feeling"
              autoComplete="new-password"
              value={values.confirm}
              onChange={set('confirm')}
              error={errors.confirm}
            />
          </div>

          <div className="auth-step">
            <label className="flex items-start gap-2.5 text-sm text-bark">
              <input
                type="checkbox"
                name="terms"
                checked={values.terms}
                onChange={(e) => {
                  setValues((v) => ({ ...v, terms: e.target.checked }))
                  setErrors((err) => ({ ...err, terms: undefined }))
                }}
                className="mt-0.5 h-4 w-4 shrink-0 accent-gold"
              />
              <span>
                I agree to the{' '}
                <span className="font-medium text-golddeep underline underline-offset-4">terms</span> and{' '}
                <span className="font-medium text-golddeep underline underline-offset-4">privacy policy</span> — my
                guest list stays mine and exportable.
              </span>
            </label>
            {errors.terms && (
              <p role="alert" className="mt-1.5 text-xs font-medium text-clay">
                {errors.terms}
              </p>
            )}
          </div>

          <div className="auth-step pt-2">
            <button
              type="submit"
              disabled={status === 'submitting'}
              aria-busy={status === 'submitting'}
              className="flex w-full items-center justify-center gap-2 rounded-full bg-ink px-6 py-3 text-sm font-semibold text-cream transition hover:bg-forest disabled:opacity-60"
            >
              {status === 'submitting' ? (
                <>
                  <svg viewBox="0 0 24 24" className="h-4 w-4 animate-spin" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
                    <path d="M12 3a9 9 0 1 0 9 9" />
                  </svg>
                  Creating account…
                </>
              ) : (
                'Create account — it’s free'
              )}
            </button>
            <p className="mt-3 text-center text-xs text-bark/80">Demo build — registrations are not stored yet.</p>
          </div>
        </form>
      </div>
    </AuthLayout>
  )
}
