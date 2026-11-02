import { useEffect, useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import { useGSAP } from '@gsap/react'
import gsap from 'gsap'
import AuthLayout from '@/components/auth/AuthLayout'
import Field from '@/components/auth/Field'
import { supabase } from '@/lib/supabase'

export default function ResetPassword() {
  const root = useRef(null)
  const [values, setValues] = useState({ password: '', confirm: '' })
  const [errors, setErrors] = useState({})
  const [banner, setBanner] = useState(null)
  // checking: reading the session · ready: recovery session present ·
  // expired: opened the page without a recovery session · submitting · done
  const [status, setStatus] = useState('checking')

  useEffect(() => {
    document.title = 'InviteU · Choose a new password'
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

  useEffect(() => {
    let mounted = true

    supabase.auth.getSession().then(({ data }) => {
      if (mounted) setStatus(data.session ? 'ready' : 'expired')
    })

    // The recovery email lands with tokens in the URL; supabase-js turns those
    // into a session and fires PASSWORD_RECOVERY — catch it if it's slightly late.
    const { data } = supabase.auth.onAuthStateChange((event, nextSession) => {
      if ((event === 'PASSWORD_RECOVERY' || event === 'SIGNED_IN') && nextSession) {
        if (mounted) setStatus('ready')
      }
    })

    return () => {
      mounted = false
      data.subscription.unsubscribe()
    }
  }, [])

  const set = (key) => (e) => {
    setValues((v) => ({ ...v, [key]: e.target.value }))
    setErrors((err) => ({ ...err, [key]: undefined }))
  }

  const onSubmit = async (e) => {
    e.preventDefault()
    setBanner(null)
    const next = {}
    if (values.password.length < 8)
      next.password = 'Use at least 8 characters — longer is stronger.'
    if (values.confirm !== values.password) next.confirm = 'Passwords do not match.'
    setErrors(next)
    if (Object.keys(next).length > 0) return

    setStatus('submitting')
    const { error } = await supabase.auth.updateUser({ password: values.password })
    if (error) {
      setStatus('ready')
      setBanner(
        error.message?.match(/rate limit/i)
          ? 'Too many attempts in a short while. Give it a minute and try again.'
          : 'We could not update the password just now — the link may have expired. Request a fresh one from the sign-in page.',
      )
      return
    }
    setStatus('done')
  }

  return (
    <AuthLayout
      switchLink={
        <>
          Remembered it?{' '}
          <Link to="/login" className="font-semibold text-golddeep underline-offset-4 hover:underline">
            Sign in
          </Link>
        </>
      }
    >
      <div ref={root}>
        <div className="auth-step">
          <h1 className="font-display text-4xl font-semibold tracking-tight">Choose a new password.</h1>
          <p className="mt-2 text-sm leading-relaxed text-bark">
            Pick something you have not used elsewhere — it protects your guest list, your RSVPs and
            everything you upload.
          </p>
        </div>

        {status === 'checking' && (
          <p className="auth-step mt-8 text-sm text-bark">Checking your reset link…</p>
        )}

        {status === 'expired' && (
          <div className="auth-step mt-8 rounded-2xl border border-clay/30 bg-clay/5 p-5 text-sm text-ink">
            <p className="font-semibold">This reset link is not active.</p>
            <p className="mt-1.5 text-bark">
              Reset links are single-use and expire quickly. Request a fresh one from the{' '}
              <Link to="/login" className="font-semibold text-golddeep underline-offset-4 hover:underline">
                sign-in page
              </Link>{' '}
              — put in your email and tap &ldquo;Forgot password?&rdquo;.
            </p>
          </div>
        )}

        {(status === 'ready' || status === 'submitting' || status === 'done') && status !== 'done' && (
          <form noValidate className="mt-8 space-y-4" onSubmit={onSubmit}>
            <div className="auth-step">
              <Field
                id="password"
                label="New password"
                icon="lock"
                revealable
                placeholder="At least 8 characters"
                autoComplete="new-password"
                value={values.password}
                onChange={set('password')}
                error={errors.password}
              />
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

            {banner && (
              <p role="alert" className="rounded-xl border border-clay/30 bg-clay/5 px-4 py-3 text-sm font-medium text-ink">
                {banner}
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
                    Updating…
                  </>
                ) : (
                  'Save new password'
                )}
              </button>
            </div>
          </form>
        )}

        {status === 'done' && (
          <div className="auth-step mt-8 rounded-2xl border border-gold/40 bg-cream p-6">
            <div className="flex items-center gap-3">
              <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-forest/10 text-forest">
                <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M4 12.5l5 5L20 6.5" />
                </svg>
              </span>
              <h2 className="font-display text-2xl font-semibold tracking-tight">Password updated.</h2>
            </div>
            <p className="mt-3 text-sm leading-relaxed text-bark">
              You can use the new password the next time you sign in — this device stays signed in.
            </p>
            <Link
              to="/"
              className="mt-4 inline-block rounded-full bg-ink px-5 py-2.5 text-sm font-semibold text-cream transition hover:bg-forest"
            >
              Back to InviteU
            </Link>
          </div>
        )}
      </div>
    </AuthLayout>
  )
}
