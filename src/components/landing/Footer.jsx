const GROUPS = [
  { title: 'Product', links: ['Features', 'Templates', 'Pricing', 'Samples'] },
  { title: 'Company', links: ['About', 'Journal', 'Contact'] },
  { title: 'Support', links: ['Help center', 'Guest guide', 'Status'] },
  { title: 'Legal', links: ['Privacy', 'Terms'] },
]

export default function Footer() {
  return (
    <footer className="border-t border-ink/10 bg-cream">
      <div className="mx-auto max-w-6xl px-5 py-14">
        <div className="grid gap-10 md:grid-cols-[1.4fr_repeat(4,1fr)]">
          <div>
            <a href="#top" className="font-display text-xl font-semibold tracking-tight">
              Invite<span className="text-golddeep">U</span>
              <span className="text-gold">.</span>
            </a>
            <p className="mt-3 max-w-xs text-sm leading-relaxed text-bark">
              One beautiful link for invitations, RSVPs, seating and the photos that come after.
            </p>
          </div>
          {GROUPS.map((group) => (
            <div key={group.title}>
              <p className="text-xs font-semibold uppercase tracking-[0.2em] text-golddeep">{group.title}</p>
              <ul className="mt-4 space-y-2.5 text-sm text-bark">
                {group.links.map((label) => (
                  <li key={label}>
                    <a className="transition hover:text-ink" href="#top">
                      {label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
        <div className="mt-12 flex flex-wrap items-center justify-between gap-3 border-t border-ink/10 pt-6 text-xs text-bark">
          <p>© {new Date().getFullYear()} InviteU. Made with too many guest lists.</p>
          <p className="font-display italic text-sm text-golddeep">One link, sent with love.</p>
        </div>
      </div>
    </footer>
  )
}
