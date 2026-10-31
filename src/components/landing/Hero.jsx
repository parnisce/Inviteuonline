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

export default function Hero() {
  useGSAP(() => {
    gsap.to('.hero-chip', {
      y: -9,
      duration: 2.4,
      ease: 'sine.inOut',
      yoyo: true,
      repeat: -1,
      stagger: { each: 0.55 },
    })
  })

  return (
    <section id="top" className="relative overflow-hidden bg-gradient-to-b from-cream via-paper to-paper">
      <PetalsCanvas className="pointer-events-none absolute inset-0 h-full w-full" />

      <div className="mx-auto grid max-w-6xl gap-14 px-5 pb-20 pt-32 lg:grid-cols-[1.05fr_0.95fr] lg:items-center lg:pt-40">
        <div>
          <span className="inline-flex items-center gap-2 rounded-full border border-gold/60 bg-cream px-3 py-1 text-xs font-medium text-golddeep">
            <svg viewBox="0 0 12 12" className="h-2 w-2 fill-gold">
              <rect x="2" y="2" width="8" height="8" transform="rotate(45 6 6)" />
            </svg>
            For couples, families &amp; coordinators
          </span>

          <h1 className="mt-5 font-display text-5xl font-semibold leading-[1.05] tracking-tight md:text-6xl lg:text-7xl">
            <SplitText
              text="Your wedding, one beautiful link."
              className="text-left"
              textAlign="left"
              tag="span"
              trigger="load"
              delay={55}
              duration={1.1}
            />
          </h1>

          <p className="mt-5 max-w-md text-lg leading-relaxed text-bark">
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

          <ul className="mt-6 flex flex-wrap items-center gap-x-3 gap-y-2 text-xs text-bark">
            <li>Free for 30 guests</li>
            <li aria-hidden="true" className="h-1 w-1 rounded-full bg-gold" />
            <li>No card needed</li>
            <li aria-hidden="true" className="h-1 w-1 rounded-full bg-gold" />
            <li>Live in minutes</li>
          </ul>
        </div>

        <div className="relative mx-auto w-full max-w-sm lg:max-w-md">
          <div className="absolute -inset-10 -z-10 rounded-full bg-gold/20 blur-3xl" />
          <div className="absolute left-1/2 top-1/2 -z-10 h-[112%] w-[112%] -translate-x-1/2 -translate-y-1/2 animate-float rounded-full border border-dashed border-gold/50" />

          <article className="relative rotate-2 rounded-[1.75rem] border border-ink/10 bg-cream p-8 shadow-xl shadow-ink/10 transition-transform duration-700 hover:rotate-0 md:p-10">
            <div className="pointer-events-none absolute inset-3 rounded-[1.25rem] border border-gold/40" />

            <div className="relative text-center">
              <p className="text-[10px] font-medium uppercase tracking-[0.35em] text-golddeep">
                Save the date
              </p>
              <svg viewBox="0 0 24 24" className="mx-auto mt-4 h-5 w-5 fill-gold">
                <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
              </svg>
              <h3 className="mt-3 font-display text-4xl italic leading-tight">Maya &amp; Noah</h3>
              <p className="mt-2 text-sm text-bark">June 21, 2027 · Solvang Gardens</p>

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

              <svg viewBox="0 0 44 44" className="mx-auto mt-6 h-14 w-14 fill-ink/80" aria-hidden="true">
                <g>
                  <rect x="2" y="2" width="12" height="12" rx="2" fillOpacity="0.15" />
                  <rect x="5" y="5" width="6" height="6" rx="1" />
                  <rect x="30" y="2" width="12" height="12" rx="2" fillOpacity="0.15" />
                  <rect x="33" y="5" width="6" height="6" rx="1" />
                  <rect x="2" y="30" width="12" height="12" rx="2" fillOpacity="0.15" />
                  <rect x="5" y="33" width="6" height="6" rx="1" />
                  <rect x="19" y="3" width="3" height="3" />
                  <rect x="25" y="7" width="2" height="2" />
                  <rect x="19" y="12" width="2" height="2" />
                  <rect x="3" y="19" width="2" height="2" />
                  <rect x="9" y="21" width="3" height="2" />
                  <rect x="16" y="19" width="2" height="2" />
                  <rect x="22" y="20" width="3" height="3" />
                  <rect x="29" y="19" width="2" height="2" />
                  <rect x="35" y="21" width="2" height="2" />
                  <rect x="40" y="19" width="2" height="3" />
                  <rect x="20" y="27" width="2" height="3" />
                  <rect x="27" y="30" width="2" height="2" />
                  <rect x="32" y="33" width="3" height="3" />
                  <rect x="38" y="30" width="3" height="2" />
                  <rect x="16" y="37" width="3" height="3" />
                  <rect x="23" y="39" width="2" height="2" />
                </g>
              </svg>
            </div>
          </article>

          {CHIPS.map((chip) => (
            <div
              key={chip.text}
              className={`hero-chip absolute ${chip.pos} flex items-center gap-2 rounded-full border border-ink/10 bg-cream px-3 py-2 text-xs font-medium shadow-lg shadow-ink/5`}
            >
              <span className={`h-2 w-2 rounded-full ${chip.dot}`} />
              {chip.text}
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
