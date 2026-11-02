import { useEffect, useRef, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useGSAP } from '@gsap/react'
import gsap from 'gsap'
import AuthLayout from '@/components/auth/AuthLayout'
import Field from '@/components/auth/Field'

const EMAIL_RE = /^\S+@\S+\.\S+$/

export default function Login() {
  const navigate = useNavigate()
  const root = useRef(null)
  const [values, setValues] = useState({ email: '', password: '' })
  const [errors, setErrors] = useState({})
  const [status, setStatus] = useState('idle')

  useEffect(() => {
    document.title = 'InviteU · Sign in'
  }, [])

  useGSAP(
    () => {
      if (window.matchMedia?.('(prefers-reduced-motion: reduce)').matches) return
      gsap.from('.auth-step', {
        y: 18,
        opacity: 0,
        duration: 0.6,
        ease: 'power3.out',
        stagger: 0.07,
        delay: 0.05,
      })
    },
    { scope: root, dependencies: [] },
  )

  const set = (key) => (e) => {
    setValues((v) => ({ ...v, [key]: e.target.value }))
    setErrors((err) => ({ ...err, [key]: undefined }))
  }

  const validate = () => {
    const next = {}
    if (!values.email.trim()) next.email = 'Please enter your email.'
    else if (!EMAIL_RE.test(values.email)) next.email = 'That does not look like an email address.'
    if (!values.password) next.password = 'Please enter your password.'
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
          New to InviteU?{' '}
          <Link to="/register" className="font-semibold text-golddeep underline-offset-4 hover:underline">
            Create an account
          </Link>
        </>
      }
    >
      <div ref={root}>
        <div className="auth-step">
          <h1 className="font-display text-4xl font-semibold tracking-tight">Welcome back.</h1>
          <p className="mt-2 text-sm leading-relaxed text-bark">
            Sign in and pick up where you left off — replies, tables and photo albums are exactly as
            you left them.
          </p>
        </div>

        <form noValidate className="mt-8 space-y-4" onSubmit={onSubmit}>
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
              onBlur={() => setErrors((err) => ({ ...err, email: undefined }))}
              error={errors.email}
            />
          </div>

          <div className="auth-step">
            <Field
              id="password"
              label="Password"
              icon="lock"
              revealable
              placeholder="Your password"
              autoComplete="current-password"
              value={values.password}
              onChange={set('password')}
              error={errors.password}
              aside={
                <button type="button" className="text-xs font-medium text-golddeep underline-offset-4 hover:underline">
                  Forgot password?
                </button>
              }
            />
          </div>

          <label className="auth-step flex items-center gap-2 text-sm text-bark">
            <input type="checkbox" name="remember" className="h-4 w-4 accent-gold" />
            Keep me signed in
          </label>

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
                  Signing in…
                </>
              ) : (
                'Sign in'
              )}
            </button>
            <p className="mt-3 text-center text-xs text-bark/80">Demo build — sign-in is not wired to a server yet.</p>
          </div>
        </form>

        <div className="auth-step my-6 flex items-center gap-4 text-xs text-bark/70">
          <span className="h-px flex-1 bg-ink/10" />
          or continue with
          <span className="h-px flex-1 bg-ink/10" />
        </div>

        <div className="auth-step">
          <button
            type="button"
            className="flex w-full items-center justify-center gap-3 rounded-full border border-ink/15 bg-cream px-6 py-3 text-sm font-semibold text-ink transition hover:border-gold hover:text-golddeep"
          >
            <span aria-hidden="true" className="font-display text-lg font-bold text-golddeep">G</span>
            Continue with Google
          </button>
        </div>
      </div>
    </AuthLayout>
  )
}
