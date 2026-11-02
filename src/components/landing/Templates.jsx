import Reveal from '@/components/Reveal'
import { Link } from 'react-router-dom'

const TEMPLATES = [
  {
    name: 'Heirloom',
    bg: 'bg-cream text-ink',
    card: 'border border-ink/10',
    inner: 'border border-gold/40',
    nameStyle: 'italic',
    accent: 'text-golddeep',
  },
  {
    name: 'Deco Onyx',
    bg: 'bg-ink text-cream',
    card: '',
    inner: 'border border-gold/60',
    nameStyle: 'font-light',
    accent: 'text-gold',
  },
  {
    name: 'Sage Almanac',
    bg: 'bg-sage text-forest',
    card: 'border border-forest/20',
    inner: 'border-y border-forest/30',
    nameStyle: 'font-light',
    accent: 'text-forest/80',
  },
  {
    name: 'Pressed Petals',
    bg: 'bg-blush text-clay',
    card: 'border border-clay/25',
    inner: 'rounded-t-full border border-clay/30',
    nameStyle: 'italic',
    accent: 'text-clay',
  },
  {
    name: 'Terra Sun',
    bg: 'bg-cream text-ink',
    card: 'border border-ink/10',
    inner: 'border border-clay/40',
    nameStyle: 'font-light',
    accent: 'text-clay',
    sun: true,
  },
  {
    name: 'Champagne Hour',
    bg: 'bg-[linear-gradient(160deg,#f6e7cf,#d9b877_55%,#eecf9b)] text-ink',
    card: '',
    inner: 'border border-white/50',
    nameStyle: 'italic',
    accent: 'text-golddeep',
  },
]

export default function Templates() {
  return (
    <section id="templates" className="py-24">
      <div className="mx-auto max-w-6xl px-5">
        <Reveal className="flex flex-wrap items-end justify-between gap-6">
          <div className="max-w-2xl">
            <p className="text-xs font-semibold uppercase tracking-[0.3em] text-golddeep">Templates</p>
            <h2 className="mt-3 font-display text-4xl font-semibold tracking-tight md:text-5xl">
              A page they&rsquo;ll actually open.
            </h2>
            <p className="mt-4 text-lg text-bark">
              Editorial serif, warm color, no clutter. Pick a look, make it yours, and publish —
              then watch your open rate embarrass the family group chat.
            </p>
          </div>
          <Link
            to="/register"
            className="rounded-full border border-ink/15 bg-cream px-5 py-2.5 text-sm font-semibold transition hover:border-gold hover:text-golddeep"
          >
            Start with any template
          </Link>
        </Reveal>

        <Reveal stagger className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {TEMPLATES.map((t) => (
            <a key={t.name} href="#cta" className="group" aria-label={`Preview the ${t.name} template`}>
              <div className={`${t.bg} ${t.card} relative flex aspect-[3/4] flex-col items-center justify-center overflow-hidden rounded-2xl p-7 text-center shadow-sm transition duration-300 group-hover:-translate-y-2`}>
                {t.sun && <span aria-hidden="true" className="absolute left-1/2 top-12 h-36 w-36 -translate-x-1/2 rounded-full bg-clay/20" />}
                <div className={`${t.inner} relative flex h-full w-full flex-col items-center justify-center gap-3 rounded-xl px-4 py-8`}>
                  <p className={`text-[10px] font-semibold uppercase tracking-[0.3em] ${t.accent}`}>Save the date</p>
                  <svg viewBox="0 0 24 24" className="h-4 w-4 fill-gold">
                    <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
                  </svg>
                  <p className={`font-display text-3xl ${t.nameStyle} leading-snug`}>Maya &amp; Noah</p>
                  <p className="text-xs tracking-[0.25em] opacity-80">JUNE 21 · 2027</p>
                  <p className="mt-2 text-[10px] uppercase tracking-[0.2em] opacity-60">
                    An afternoon &amp; evening of vows
                  </p>
                </div>
              </div>
              <div className="mt-3 flex items-center justify-between px-1">
                <p className="font-display text-lg">{t.name}</p>
                <span className="rounded-full border border-ink/10 bg-cream px-3 py-1 text-xs font-medium text-bark transition group-hover:border-gold group-hover:text-golddeep">
                  Preview →
                </span>
              </div>
            </a>
          ))}
        </Reveal>
      </div>
    </section>
  )
}
