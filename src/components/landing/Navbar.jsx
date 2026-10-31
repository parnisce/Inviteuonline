import { useState } from 'react'
import { Link } from 'react-router-dom'

const LINKS = [
  { href: '#features', label: 'Features' },
  { href: '#how', label: 'How it works' },
  { href: '#templates', label: 'Templates' },
  { href: '#pricing', label: 'Pricing' },
  { href: '#faq', label: 'FAQ' },
]

export default function Navbar() {
  const [open, setOpen] = useState(false)

  return (
    <header className="fixed inset-x-0 top-0 z-50 border-b border-ink/10 bg-paper/85 backdrop-blur-md">
      <nav className="mx-auto flex h-16 max-w-6xl items-center justify-between px-5">
        <a href="#top" className="font-display text-xl font-semibold tracking-tight">
          Invite<span className="text-golddeep">U</span>
          <span className="text-gold">.</span>
        </a>

        <ul className="hidden items-center gap-7 text-sm font-medium text-bark md:flex">
          {LINKS.map((link) => (
            <li key={link.href}>
              <a className="transition hover:text-ink" href={link.href}>
                {link.label}
              </a>
            </li>
          ))}
        </ul>

        <div className="hidden items-center gap-4 md:flex">
          <Link to="/login" className="text-sm font-medium text-bark transition hover:text-ink">
            Log in
          </Link>
          <Link
            to="/register"
            className="rounded-full bg-ink px-4 py-2 text-sm font-semibold text-cream transition hover:bg-forest"
          >
            Start free
          </Link>
        </div>

        <button
          type="button"
          onClick={() => setOpen(!open)}
          className="flex h-9 w-9 items-center justify-center rounded-full border border-ink/15 text-ink md:hidden"
          aria-label="Toggle menu"
          aria-expanded={open}
        >
          <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="2">
            {open ? <path d="M5 5l14 14M19 5L5 19" /> : <path d="M3 6h18M3 12h18M3 18h18" />}
          </svg>
        </button>
      </nav>

      {open && (
        <div className="border-t border-ink/10 bg-paper px-5 pb-5 pt-3 md:hidden">
          <ul className="flex flex-col gap-1 text-sm font-medium text-bark">
            {LINKS.map((link) => (
              <li key={link.href}>
                <a
                  className="block rounded-lg px-2 py-2 hover:bg-blush"
                  href={link.href}
                  onClick={() => setOpen(false)}
                >
                  {link.label}
                </a>
              </li>
            ))}
          </ul>
          <Link
            to="/register"
            onClick={() => setOpen(false)}
            className="mt-3 block rounded-full bg-ink px-4 py-2.5 text-center text-sm font-semibold text-cream"
          >
            Start free
          </Link>
        </div>
      )}
    </header>
  )
}
