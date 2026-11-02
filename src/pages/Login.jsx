import { useEffect, useRef, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useGSAP } from '@gsap/react'
import gsap from 'gsap'
import AuthLayout from '@/components/auth/AuthLayout'
import Field from '@/components/auth/Field'
import { supabase } from '@/lib/supabase'

const EMAIL_RE = /^\S+@\S+\.\S+$/

function friendlyAuthError(code = '', message = '') {
  if (code === 'invalid_credentials' || /invalid login credentials/i.test(message)) {
    return 'That email and password don’t match an account. Double-check both and try again.'
  }
  if (code === 'email_provider_disabled' || /email (signups|logins|sign-ins) are disabled/i.test(message)) {
    return 'Email sign-in is switched off on the server right now — the site owner can re-enable it in Supabase → Authentication → Providers → Email.'
  }
  if (code === 'email_not_confirmed' || /email ?not ?confirmed/i.test(message)) {
    return 'Please confirm your email first — look for the InviteU confirmation link in your inbox.'
  }
  if (code === 'over_request_rate_limit' || /rate limit/i.test(message)) {
    return 'Too many attempts in a short while. Give it a minute and try again.'
  }
  return 'Something went wrong while signing in. Please try again in a moment.'
}

export default function Login() {
  const navigate = useNavigate()
  const root = useRef(null)
  const [values, setValues] = useState({ email: '', password: '' })
  const [errors, setErrors] = useState({})
  const [status, setStatus] = useState('idle')
  const [banner, setBanner] = useState(null)
  const [notice, setNotice] = useState(null)

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

  const onSubmit = async (e) => {
    e.preventDefault()
    setBanner(null)
    setNotice(null)
    const next = validate()
    setErrors(next)
    if (Object.keys(next).length > 0) return
    setStatus('submitting')

    const { data, error } = await supabase.auth.signInWithPassword({
      email: values.email.trim(),
      password: values.password,
    })

    if (error) {
      setStatus('idle')
      setBanner(friendlyAuthError(error.code, error.message))
      return
    }
    if (!data.session) {
      setStatus('idle')
      setBanner('Sign-in did not finish — please try again in a moment.')
      return
    }
    navigate('/', { replace: true })
  }

  const onForgotPassword = async () => {
    setBanner(null)
    setNotice(null)
    setErrors((err) => ({ ...err, email: undefined }))
    if (!EMAIL_RE.test(values.email)) {
      setErrors({
        email: 'Enter the email on your account above, then tap “Forgot password?” to get a reset link.',
      })
      return
    }
    setStatus('resetting')
    const { error } = await supabase.auth.resetPasswordForEmail(values.email.trim(), {
      redirectTo: `${window.location.origin}/reset-password`,
    })
    setStatus('idle')
    if (error) {
      setBanner(
        /rate limit/i.test(error.message || '')
          ? 'A reset link is already on its way — check your inbox, or wait a minute and try again.'
          : friendlyAuthError(error.code, error.message),
      )
      return
    }
    setNotice(
      `Password reset link sent to ${values.email.trim()} — check your inbox (and spam, just in case).`,
    )
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
                <button
                  type="button"
                  onClick={onForgotPassword}
                  disabled={status === 'resetting'}
                  className="text-xs font-medium text-golddeep underline-offset-4 hover:underline disabled:opacity-60"
                >
                  {status === 'resetting' ? 'Sending…' : 'Forgot password?'}
                </button>
              }
            />
          </div>

          {(banner || notice) && (
            <p
              role={banner ? 'alert' : 'status'}
              className={`auth-step rounded-xl border px-4 py-3 text-sm font-medium ${
                banner ? 'border-clay/30 bg-clay/5 text-ink' : 'border-forest/30 bg-forest/5 text-ink'
              }`}
            >
              {banner || notice}
            </p>
          )}

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
          </div>
        </form>
      </div>
    </AuthLayout>
  )
}
