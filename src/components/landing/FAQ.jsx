import Reveal from '@/components/Reveal'

const FAQS = [
  {
    q: 'What exactly is InviteU?',
    a: 'A home for your wedding logistics: a beautifully designed digital invitation that doubles as your RSVP desk, seating planner, door list and photo album — all reachable from a single link.',
  },
  {
    q: 'Do my guests need to create an account?',
    a: 'No. They tap their personal link, your invitation opens in their browser, and replying takes one tap. No apps, no passwords, no "who are you again?" screens.',
  },
  {
    q: 'How do the personal RSVP links work?',
    a: 'When you add a guest (or import a whole relatives-only mess), InviteU generates a unique link per guest. Replies are instantly attributed to the right person — even if they forward the link around the family group.',
  },
  {
    q: 'Can InviteU handle a few hundred guests?',
    a: 'Yes. Lists in the hundreds are where the planner earns its keep: import in bulk, filter by who replied, and drag confirmed guests between round tables of any size.',
  },
  {
    q: 'Can it do more than weddings?',
    a: 'Any guest list moment works: debuts, anniversaries, christenings, reunions, corporate dinners. Change the name of the event and the same tools apply.',
  },
  {
    q: 'What happens after the wedding?',
    a: 'The invitation stays online exactly as you left it, so links in old chats still open. Photo collection can run for as long as you like, and your data is yours to export.',
  },
]

export default function FAQ() {
  return (
    <section id="faq" className="py-24">
      <div className="mx-auto max-w-3xl px-5">
        <Reveal className="text-center">
          <p className="text-xs font-semibold uppercase tracking-[0.3em] text-golddeep">FAQ</p>
          <h2 className="mt-3 font-display text-4xl font-semibold tracking-tight md:text-5xl">
            asked questions, frequently
          </h2>
        </Reveal>

        <Reveal stagger className="mt-10 space-y-3">
          {FAQS.map((item) => (
            <details key={item.q} className="group rounded-2xl border border-ink/10 bg-cream px-5 open:border-gold/50 open:bg-blush/50">
              <summary className="flex cursor-pointer list-none items-center justify-between gap-4 py-4 font-medium">
                {item.q}
                <svg
                  viewBox="0 0 24 24"
                  className="h-4 w-4 shrink-0 text-golddeep transition-transform duration-300 group-open:rotate-45"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                >
                  <path d="M12 5v14M5 12h14" />
                </svg>
              </summary>
              <p className="pb-5 text-sm leading-relaxed text-bark">{item.a}</p>
            </details>
          ))}
        </Reveal>
      </div>
    </section>
  )
}
