import { Link } from 'react-router-dom'

export default function CTA() {
  return (
    <section id="cta" className="px-3 pb-3">
      <div className="relative mx-auto max-w-6xl overflow-hidden rounded-[2.5rem] bg-forest px-6 py-16 text-center text-cream md:px-16 md:py-24">
        <div aria-hidden="true" className="absolute -left-20 -top-24 h-64 w-64 rounded-full border border-dashed border-gold/40" />
        <div aria-hidden="true" className="absolute -bottom-28 -right-16 h-72 w-72 rounded-full border border-dashed border-gold/40" />
        <div aria-hidden="true" className="absolute right-16 top-10 h-2 w-2 rotate-45 bg-gold/80" />

        <p className="text-xs font-semibold uppercase tracking-[0.3em] text-gold">Ready when you are</p>
        <h2 className="mx-auto mt-4 max-w-2xl font-display text-4xl font-semibold tracking-tight md:text-6xl">
          Send the invite. Skip the chaos.
        </h2>
        <p className="mx-auto mt-5 max-w-xl text-lg text-cream/80">
          Publish a page your guests will actually open, and let the replies, the seats and the
          photographs organize themselves while you plan the fun parts.
        </p>
        <div className="mt-9 flex flex-wrap items-center justify-center gap-3">
          <Link
            to="/register"
            className="rounded-full bg-gold px-7 py-3.5 text-sm font-semibold text-ink transition hover:bg-golddeep hover:text-cream"
          >
            Create your free invitation
          </Link>
          <a
            href="#templates"
            className="rounded-full border border-cream/30 px-7 py-3.5 text-sm font-semibold text-cream transition hover:border-gold hover:text-gold"
          >
            Browse templates
          </a>
        </div>
        <p className="mt-6 text-xs text-cream/60">Free for 30 guests · no card needed · live in minutes</p>
      </div>
    </section>
  )
}
