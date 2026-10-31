const LABELS = [
  'Digital invitations',
  'Personal RSVP links',
  'Live guest lists',
  'Seating planner',
  'Door check-in',
  'Guest photo albums',
  'Day-of schedule',
  'Gift registries',
]

function Belt({ hidden }) {
  return (
    <ul className="flex items-center gap-10 pr-10" aria-hidden={hidden || undefined}>
      {LABELS.map((label) => (
        <li key={label} className="flex items-center gap-10">
          <span className="font-display text-lg italic text-bark">{label}</span>
          <svg viewBox="0 0 12 12" className="h-2 w-2 shrink-0 fill-gold">
            <rect x="2" y="2" width="8" height="8" transform="rotate(45 6 6)" />
          </svg>
        </li>
      ))}
    </ul>
  )
}

export default function Marquee() {
  return (
    <div className="overflow-hidden border-y border-ink/10 bg-cream py-4 [&_ul]:animate-marquee">
      <div className="flex w-max">
        <Belt />
        <Belt hidden />
      </div>
    </div>
  )
}
