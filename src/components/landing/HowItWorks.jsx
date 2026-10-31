import Reveal from '@/components/Reveal'

const STEPS = [
  {
    n: '01',
    title: 'Choose a design',
    body: 'Start from an editorial template, set your names, date and colors. Two minutes, tops — the typography and layout are handled for you.',
  },
  {
    n: '02',
    title: 'Send your one link',
    body: 'Every guest gets a personal link by text or chat. They tap, see your page, and answer in seconds — nothing to install.',
  },
  {
    n: '03',
    title: 'Welcome everyone',
    body: 'RSVPs fill your guest list, seats flow into tidy tables, and after the big day the photos quietly gather in one album.',
  },
]

export default function HowItWorks() {
  return (
    <section id="how" className="border-y border-ink/10 bg-blush/40 py-24">
      <div className="mx-auto max-w-6xl px-5">
        <Reveal className="max-w-2xl">
          <p className="text-xs font-semibold uppercase tracking-[0.3em] text-golddeep">How it works</p>
          <h2 className="mt-3 font-display text-4xl font-semibold tracking-tight md:text-5xl">
            From blank page to first reply before lunch.
          </h2>
        </Reveal>

        <Reveal stagger className="relative mt-14 grid gap-10 md:grid-cols-3">
          {STEPS.map((step) => (
            <div key={step.n} className="relative">
              <div aria-hidden="true" className="pointer-events-none absolute -top-6 left-0 hidden h-px w-full border-t border-dashed border-gold/60 md:block" />
              <p className="font-display text-6xl italic text-gold/70">{step.n}</p>
              <h3 className="mt-4 font-display text-2xl font-semibold">{step.title}</h3>
              <p className="mt-2 max-w-xs text-sm leading-relaxed text-bark">{step.body}</p>
            </div>
          ))}
        </Reveal>
      </div>
    </section>
  )
}
