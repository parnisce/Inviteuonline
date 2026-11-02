import { useGSAP } from '@gsap/react'
import gsap from 'gsap'
import SplitText from '@/components/SplitText'
import PetalsCanvas from '@/components/landing/PetalsCanvas'
import { Link } from 'react-router-dom'

const CHIPS = [
  { text: 'RSVP received · Anna', dot: 'bg-forest', pos: '-left-3 top-14 md:-left-10' },
  { text: 'Table 7 · fully seated', dot: 'bg-gold', pos: '-right-2 top-1/3 md:-right-8' },
  { text: '+12 photos uploaded', dot: 'bg-clay', pos: '-left-2 bottom-14 md:-left-6' },
]

const AVATARS = [
  { initials: 'BM', tone: 'bg-blush text-clay' },
  { initials: 'RT', tone: 'bg-sage text-forest' },
  { initials: 'DC', tone: 'bg-gold/25 text-golddeep' },
  { initials: 'LN', tone: 'bg-ink/10 text-ink' },
]

function Star() {
  return (
    <svg viewBox="0 0 24 24" className="h-3.5 w-3.5 fill-gold" aria-hidden="true">
      <path d="M12 2l2.9 6.1 6.6.7-4.9 4.5 1.3 6.5L12 16.6 6.1 19.8l1.3-6.5L2.5 8.8l6.6-.7z" />
    </svg>
  )
}

export default function Hero() {
  useGSAP(() => {
    if (window.matchMedia?.('(prefers-reduced-motion: reduce)').matches) return
    gsap.to('.hero-chip', {
      y: -9,
      duration: 2.4,
      ease: 'sine.inOut',
      yoyo: true,
      repeat: -1,
      stagger: { each: 0.55 },
    })
  })

  const fn = { splitType: 'chars', trigger: 'load', duration: 1.05, delay: 42, tag: 'span', textAlign: 'left' }

  return (
    <section id="top" className="relative overflow-hidden bg-gradient-to-b from-cream via-paper to-paper">
      <PetalsCanvas className="pointer-events-none absolute inset-0 h-full w-full opacity-75 lg:opacity-100" />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-0 top-0 h-72 bg-[radial-gradient(70%_100%_at_50%_0%,rgba(194,149,90,0.16),transparent_72%)]"
      />

      <div className="mx-auto grid max-w-6xl gap-16 px-5 pb-16 pt-28 sm:pt-32 lg:grid-cols-[1.05fr_0.95fr] lg:items-center lg:gap-12 lg:pb-24 lg:pt-40">
        {/* Copy */}
        <div>
          <span className="inline-flex items-center gap-2 rounded-full border border-gold/60 bg-cream px-3 py-1 text-xs font-medium text-golddeep">
            <svg viewBox="0 0 12 12" className="h-2 w-2 fill-gold">
              <rect x="2" y="2" width="8" height="8" transform="rotate(45 6 6)" />
            </svg>
            For couples, families &amp; coordinators
          </span>

          <h1 className="mt-6 font-display text-4xl font-semibold leading-[1.06] tracking-tight sm:text-5xl md:text-6xl lg:text-7xl">
            <span className="block">
              <SplitText text="Your wedding," {...fn} />
            </span>
            <span className="mt-2 block sm:mt-1">
              <SplitText text="one" {...fn} delay={680} className="mr-[0.22em]" />
              <SplitText text="beautiful" {...fn} delay={800} className="mr-[0.22em] italic text-golddeep" />
              <span className="block sm:inline">
                <SplitText text="link." {...fn} delay={1180} />
              </span>
            </span>
          </h1>

          <p className="mt-6 max-w-md text-lg leading-relaxed text-bark">
            Send a single link instead of five group chats. Guests open a page in seconds, tap their
            RSVP, and you quietly watch the headcount, the seating and the albums build themselves.
          </p>

          <div className="mt-8 flex flex-wrap items-center gap-3">
            <Link
              to="/register"
              className="rounded-full bg-ink px-6 py-3 text-sm font-semibold text-cream transition hover:bg-forest"
            >
              Create your invitation
            </Link>
            <a
              href="#templates"
              className="rounded-full border border-ink/15 bg-cream px-6 py-3 text-sm font-semibold text-ink transition hover:border-gold hover:text-golddeep"
            >
              Peek at a sample invite
            </a>
          </div>

          <div className="mt-8 flex items-center gap-4">
            <div className="flex -space-x-2.5">
              {AVATARS.map((a) => (
                <span
                  key={a.initials}
                  className={`flex h-9 w-9 items-center justify-center rounded-full border-2 border-paper font-display text-xs font-semibold ${a.tone}`}
                >
                  {a.initials}
                </span>
              ))}
            </div>
            <div>
              <p className="flex items-center gap-1" aria-label="Rated 4.9 out of 5">
                <Star />
                <Star />
                <Star />
                <Star />
                <Star />
              </p>
              <p className="mt-1 text-sm text-bark">
                Trusted by <span className="font-semibold text-ink">1,900+ couples</span>
              </p>
            </div>
          </div>

          <ul className="mt-6 flex flex-wrap items-center gap-x-3 gap-y-2 text-xs text-bark">
            <li>Free for 30 guests</li>
            <li aria-hidden="true" className="h-1 w-1 rounded-full bg-gold" />
            <li>No card needed</li>
            <li aria-hidden="true" className="h-1 w-1 rounded-full bg-gold" />
            <li>Live in minutes</li>
          </ul>
        </div>

        {/* Invitation card */}
        <div className="relative mx-auto w-full max-w-sm lg:max-w-md">
          <div className="absolute -inset-10 -z-10 rounded-full bg-gold/20 blur-3xl" />
          <div className="absolute left-1/2 top-1/2 -z-10 h-[112%] w-[112%] -translate-x-1/2 -translate-y-1/2 animate-float rounded-full border border-dashed border-gold/50" />
          <div className="absolute left-1/2 top-1/2 -z-10 hidden h-[88%] w-[88%] -translate-x-1/2 -translate-y-1/2 animate-float rounded-full border border-gold/25 [animation-delay:-3.5s] sm:block" />

          <article className="relative rotate-2 rounded-[1.75rem] border border-ink/10 bg-cream p-7 shadow-xl shadow-ink/10 transition-transform duration-700 hover:rotate-0 sm:p-10">
            <div className="pointer-events-none absolute inset-3 rounded-[1.25rem] border border-gold/40" />

            <div className="relative text-center">
              <p className="text-[10px] font-medium uppercase tracking-[0.35em] text-golddeep">Save the date</p>
              <svg viewBox="0 0 24 24" className="mx-auto mt-4 h-5 w-5 fill-gold">
                <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
              </svg>
              <h3 className="mt-3 font-display text-4xl italic leading-tight">Maya &amp; Noah</h3>
              <p className="mt-2 text-sm text-bark">June 21, 2027 · Solvang Gardens</p>

              <div className="mx-auto mt-5 w-44">
                <div className="flex items-center justify-between text-[10px] font-medium uppercase tracking-[0.18em] text-bark">
                  <span>RSVPs</span>
                  <span>128 / 150</span>
                </div>
                <div className="mt-1.5 h-1 overflow-hidden rounded-full bg-ink/10">
                  <span className="block h-full w-[85%] rounded-full bg-gradient-to-r from-gold to-golddeep" />
                </div>
              </div>

              <div className="mx-auto mt-5 flex w-40 items-center gap-3">
                <span className="h-px flex-1 bg-ink/15" />
                <svg viewBox="0 0 12 12" className="h-2 w-2 fill-gold">
                  <rect x="2" y="2" width="8" height="8" transform="rotate(45 6 6)" />
                </svg>
                <span className="h-px flex-1 bg-ink/15" />
              </div>

              <a
                href="#cta"
                className="mt-5 inline-block rounded-full bg-ink px-5 py-2 text-xs font-semibold text-cream transition hover:bg-forest"
              >
                RSVP now
              </a>
            </div>

            {/* Wax seal */}
            <span
              aria-hidden="true"
              className="absolute -bottom-5 -right-4 flex h-14 w-14 rotate-12 items-center justify-center rounded-full bg-[radial-gradient(circle_at_30%_30%,#e3b87f,#a87a3f_60%,#8a6230)] shadow-lg shadow-ink/25 ring-4 ring-cream"
            >
              <svg viewBox="0 0 24 24" className="h-5 w-5 fill-cream">
                <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
              </svg>
            </span>
          </article>

          {CHIPS.map((chip) => (
            <div
              key={chip.text}
              className={`hero-chip absolute ${chip.pos} hidden items-center gap-2 rounded-full border border-ink/10 bg-cream px-3 py-2 text-xs font-medium shadow-lg shadow-ink/5 sm:flex`}
            >
              <span className={`h-2 w-2 rounded-full ${chip.dot}`} />
              {chip.text}
            </div>
          ))}
        </div>
      </div>

      <div className="hidden pb-6 sm:flex sm:justify-center">
        <a
          href="#features"
          aria-label="Scroll to features"
          className="flex h-10 w-10 items-center justify-center rounded-full border border-ink/15 bg-cream text-bark transition hover:border-gold hover:text-golddeep"
        >
          <svg viewBox="0 0 24 24" className="h-4 w-4 animate-bounce" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M6 9l6 6 6-6" />
          </svg>
        </a>
      </div>
    </section>
  )
}
