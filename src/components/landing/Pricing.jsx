import Reveal from '@/components/Reveal'
import { Link } from 'react-router-dom'

function Check() {
  return (
    <svg viewBox="0 0 24 24" className="mt-0.5 h-4 w-4 shrink-0 text-forest" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M4 12.5l5 5L20 6.5" />
    </svg>
  )
}

const FREE = ['Up to 30 guests', 'Every invitation template', 'Personal RSVP links', 'Basic seating planner', 'Guest list export']
const PRO = [
  'Unlimited guests',
  'Custom colors, fonts & ornaments',
  'Door check-in & day-of tools',
  'QR guest photo album',
  'Co-planner accounts',
  'Custom web address',
]

function Plan({ name, price, note, features, featured }) {
  return (
    <div
      className={`relative rounded-3xl border p-8 shadow-sm ${
        featured ? 'border-ink/20 bg-ink text-cream' : 'border-ink/10 bg-cream'
      }`}
    >
      {featured && (
        <span className="absolute -top-3 left-8 rounded-full bg-gold px-3 py-1 text-[10px] font-bold uppercase tracking-[0.2em] text-ink">
          Most chosen
        </span>
      )}
      <h3 className="font-display text-xl font-semibold">{name}</h3>
      <p className={`mt-3 ${featured ? 'text-bark/70' : 'text-bark'}`}>{note}</p>
      <p className="mt-6 flex items-end gap-1">
        <span className={`font-display text-5xl font-semibold ${featured ? 'text-cream' : ''}`}>{price}</span>
        <span className={`pb-1.5 text-sm ${featured ? 'text-bark' : 'text-bark'}`}>
          {featured ? 'one-time · per invitation' : 'free forever'}
        </span>
      </p>
      <ul className={`mt-8 space-y-3 text-sm ${featured ? '' : ''}`}>
        {features.map((f) => (
          <li key={f} className="flex items-start gap-3">
            <Check />
            <span className={featured ? 'text-cream/90' : 'text-ink'}>{f}</span>
          </li>
        ))}
      </ul>
      <Link
        to="/register"
        className={`mt-8 block rounded-full px-5 py-3 text-center text-sm font-semibold transition ${
          featured ? 'bg-gold text-ink hover:bg-golddeep hover:text-cream' : 'bg-ink text-cream hover:bg-forest'
        }`}
      >
        {featured ? 'Start free, upgrade anytime' : 'Start your invitation'}
      </Link>
    </div>
  )
}

export default function Pricing() {
  return (
    <section id="pricing" className="border-t border-ink/10 bg-blush/40 py-24">
      <div className="mx-auto max-w-6xl px-5">
        <Reveal className="mx-auto max-w-2xl text-center">
          <p className="text-xs font-semibold uppercase tracking-[0.3em] text-golddeep">Pricing</p>
          <h2 className="mt-3 font-display text-4xl font-semibold tracking-tight md:text-5xl">
            Pay once — or don&rsquo;t pay at all.
          </h2>
          <p className="mt-4 text-lg text-bark">
            No subscriptions, no renewals. A free tier that fits small weddings and one-time
            upgrade when your list outgrows it.
          </p>
        </Reveal>

        <Reveal stagger className="mx-auto mt-12 grid max-w-4xl gap-6 md:grid-cols-2">
          <Plan
            name="Free"
            price="₱0"
            note="Small, lovely weddings — and everything you need to try InviteU properly."
            features={FREE}
          />
          <Plan
            featured
            name="Lifetime"
            price="₱1,499"
            note="One payment, your big day covered, and the page outlives the cake."
            features={PRO}
          />
        </Reveal>

        <Reveal className="mx-auto mt-8 max-w-4xl text-center text-sm text-bark">
          <p>Your page stays online after the wedding. You keep your guest list and can export it anytime.</p>
        </Reveal>
      </div>
    </section>
  )
}
