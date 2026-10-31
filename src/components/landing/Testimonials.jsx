import { useRef } from 'react'
import { useGSAP } from '@gsap/react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import Reveal from '@/components/Reveal'

gsap.registerPlugin(ScrollTrigger, useGSAP)

const STATS = [
  { value: 1900, suffix: '+', label: 'weddings planned' },
  { value: 120000, suffix: '+', label: 'RSVP links sent' },
  { value: 78, suffix: '%', label: 'average reply rate' },
  { value: 45000, suffix: '+', label: 'photos collected' },
]

const QUOTES = [
  {
    quote: 'We sent links on a Friday and by Sunday half the list had replied. I never nudged a single person.',
    name: 'Bea M.',
    role: 'married last spring',
  },
  {
    quote: 'The seating chart that used to live on a whiteboard now lives in my phone, and it stays correct.',
    name: 'Rico T.',
    role: 'groom, reformed spreadsheet hoarder',
  },
  {
    quote: 'Our coordinator finally stopped pinging me for the guest list in the middle of dinner service.',
    name: 'Dana & Caleb',
    role: '220 guests, zero drama',
  },
]

function Stat({ value, suffix, label }) {
  return (
    <div className="text-center">
      <p className="font-display text-4xl font-semibold tracking-tight md:text-5xl">
        <span data-target={value} data-suffix={suffix}>
          0
        </span>
      </p>
      <p className="mt-2 text-sm text-bark">{label}</p>
    </div>
  )
}

export default function Testimonials() {
  const section = useRef(null)

  useGSAP(
    () => {
      const counters = section.current.querySelectorAll('[data-target]')
      counters.forEach((el) => {
        const target = Number(el.dataset.target)
        const suffix = el.dataset.suffix || ''
        const state = { v: 0 }
        gsap.to(state, {
          v: target,
          duration: 1.8,
          ease: 'power2.out',
          scrollTrigger: { trigger: el, start: 'top 88%', once: true },
          onUpdate: () => {
            el.textContent = Math.round(state.v).toLocaleString('en-US') + suffix
          },
        })
      })
    },
    { scope: section },
  )

  return (
    <section ref={section} className="py-24">
      <div className="mx-auto max-w-6xl px-5">
        <Reveal stagger className="grid grid-cols-2 gap-8 border-y border-ink/10 py-12 lg:grid-cols-4">
          {STATS.map((s) => (
            <Stat key={s.label} {...s} />
          ))}
        </Reveal>

        <Reveal className="mt-16 max-w-2xl">
          <h2 className="font-display text-4xl font-semibold tracking-tight md:text-5xl">
            Calm couples, quiet guest lists.
          </h2>
        </Reveal>

        <Reveal stagger className="mt-8 grid gap-5 md:grid-cols-3">
          {QUOTES.map((q) => (
            <figure key={q.name} className="flex flex-col justify-between rounded-3xl border border-ink/10 bg-cream p-7 shadow-sm">
              <svg viewBox="0 0 24 24" className="h-6 w-6 fill-gold" aria-hidden="true">
                <path d="M9.6 5C6 7 4 10.2 4 14.1c0 2.9 1.7 4.9 4 4.9 2 0 3.5-1.5 3.5-3.6 0-2-1.4-3.4-3.3-3.4-.3 0-.7 0-1 .2.4-1.9 2-3.7 3.9-4.8L9.6 5zm9 0C15 7 13 10.2 13 14.1c0 2.9 1.7 4.9 4 4.9 2 0 3.5-1.5 3.5-3.6 0-2-1.4-3.4-3.3-3.4-.3 0-.7 0-1 .2.4-1.9 2-3.7 3.9-4.8L18.6 5z" />
              </svg>
              <blockquote className="mt-4 font-display text-xl italic leading-relaxed text-ink">
                {q.quote}
              </blockquote>
              <figcaption className="mt-6 text-sm">
                <span className="font-semibold">{q.name}</span>
                <span className="ml-2 text-bark">· {q.role}</span>
              </figcaption>
            </figure>
          ))}
        </Reveal>
      </div>
    </section>
  )
}
