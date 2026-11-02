import { useRef } from 'react'
import { Link } from 'react-router-dom'
import { useGSAP } from '@gsap/react'
import gsap from 'gsap'
import PetalsCanvas from '@/components/landing/PetalsCanvas'

/**
 * Shared split-screen shell for Login & Register.
 * Left: decorative forest brand panel with a drifting petal field.
 * Right: the form (passed as children).
 */
export default function AuthLayout({ switchLink, children }) {
  const panel = useRef(null)

  useGSAP(
    () => {
      if (window.matchMedia?.('(prefers-reduced-motion: reduce)').matches) return
      gsap.to('.auth-card', {
        y: -10,
        rotate: 3.5,
        duration: 3,
        ease: 'sine.inOut',
        yoyo: true,
        repeat: -1,
      })
    },
    { scope: panel, dependencies: [] },
  )

  return (
    <main ref={panel} className="grid min-h-screen bg-paper lg:grid-cols-[1.05fr_1fr]">
      {/* Brand panel */}
      <section className="relative hidden overflow-hidden bg-forest p-12 text-cream lg:flex lg:flex-col lg:justify-between">
        <PetalsCanvas className="pointer-events-none absolute inset-0 h-full w-full opacity-70" />
        <div aria-hidden="true" className="absolute -right-28 -top-28 z-10 h-80 w-80 rounded-full border border-dashed border-gold/30" />
        <div aria-hidden="true" className="absolute -bottom-36 -left-24 z-10 h-96 w-96 rounded-full border border-dashed border-gold/20" />

        <Link to="/" className="font-display relative z-10 text-2xl font-semibold tracking-tight">
          Invite<span className="text-gold">U</span>
          <span className="text-gold">.</span>
        </Link>

        <div className="relative z-10 mx-auto my-10">
          <article className="auth-card relative w-64 -rotate-3 rounded-2xl bg-cream p-6 text-center text-ink shadow-2xl shadow-ink/30">
            <div className="pointer-events-none absolute inset-2 rounded-xl border border-gold/40" />
            <p className="text-[10px] font-semibold uppercase tracking-[0.3em] text-golddeep">Save the date</p>
            <svg viewBox="0 0 24 24" className="mx-auto mt-3 h-4 w-4 fill-gold">
              <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
            </svg>
            <p className="mt-2 font-display text-2xl italic leading-snug">Maya &amp; Noah</p>
            <p className="mt-1 text-xs text-bark">June 21, 2027</p>
            <span className="mt-3 inline-block rounded-full bg-ink px-4 py-1.5 text-[10px] font-semibold uppercase tracking-[0.15em] text-cream">
              RSVP open
            </span>
          </article>
        </div>

        <div className="relative z-10 max-w-md">
          <h2 className="font-display text-3xl font-semibold tracking-tight">One link. Every guest. Zero chaos.</h2>
          <ul className="mt-4 flex flex-wrap gap-2">
            {['Personal RSVP links', 'Seating in your browser', 'Guest photo albums'].map((item) => (
              <li key={item} className="rounded-full border border-cream/25 bg-cream/5 px-3 py-1 text-xs text-cream/90">
                {item}
              </li>
            ))}
          </ul>
          <p className="mt-4 text-xs text-cream/60">Free for 30 guests · no card needed · live in minutes</p>
        </div>
      </section>

      {/* Form panel */}
      <section className="flex flex-col px-6 pb-10 pt-6 sm:px-10 lg:px-14">
        <div className="flex items-center justify-between">
          <Link to="/" className={`font-display text-xl font-semibold tracking-tight${switchLink ? '' : ' lg:hidden'}`}>
            Invite<span className="text-golddeep">U</span>
            <span className="text-gold">.</span>
          </Link>
          <div className="ml-auto text-sm text-bank text-bark">{switchLink}</div>
        </div>
        <div className="mx-auto flex w-full max-w-sm flex-1 flex-col justify-center py-10">{children}</div>
      </section>
    </main>
  )
}
