import { useRef } from 'react'
import { useGSAP } from '@gsap/react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import Reveal from '@/components/Reveal'

gsap.registerPlugin(ScrollTrigger, useGSAP)

function Icon({ shape }) {
  return (
    <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
      {shape === 'link' && (
        <>
          <path d="M15 7h2a5 5 0 0 1 0 10h-2" />
          <path d="M9 17H7A5 5 0 0 1 7 7h2" />
          <path d="M8 12h8" />
        </>
      )}
      {shape === 'count' && <><path d="M3 20h4V10H3zM10 20h4V6h-4zM17 20h4v-6h-4z" /></>}
      {shape === 'seating' && <><circle cx="6" cy="6" r="2.4" /><circle cx="18" cy="6" r="2.4" /><circle cx="6" cy="18" r="2.4" /><circle cx="18" cy="18" r="2.4" /><rect x="10" y="10" width="4" height="4" rx="1" /></>}
      {shape === 'ticket' && <><path d="M3 9V8a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2v1a2 2 0 0 0 0 6v1a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-1a2 2 0 0 0 0-6z" /><path d="M12 8v2M12 14v2" /></>}
      {shape === 'camera' && <><path d="M21 19a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h3l2-3h4l2 3h3a2 2 0 0 1 2 2z" /><circle cx="12" cy="13" r="4" /></>}
      {shape === 'clock' && <><circle cx="12" cy="12" r="9" /><path d="M12 7v5l3 3" /></>}
    </svg>
  )
}

const GUEST_ROWS = [
  { name: 'Jennifer Wu', side: 'Bride side', status: 'Confirmed', tone: 'bg-forest/10 text-forest' },
  { name: 'Diego & Ana', side: 'Groom side', status: 'Thinking', tone: 'bg-gold/20 text-golddeep' },
  { name: 'The Ocampo family', side: 'Bride side', status: 'No reply yet', tone: 'bg-ink/5 text-bark' },
]

const BARS = [34, 52, 44, 66, 58, 78, 92]

const PHOTO_TONES = [
  'bg-[linear-gradient(135deg,#e5c9a8,#c2955a)]',
  'bg-[linear-gradient(135deg,#dfe5d6,#8ba38a)]',
  'bg-[linear-gradient(135deg,#f3e7da,#d8a98c)]',
  'bg-[linear-gradient(135deg,#c2955a,#31493a)]',
]

const SCHEDULE = ['3:00 · Ceremony', '6:00 · Dinner', '9:30 · Send-off']

const TILE = 'rounded-3xl border border-ink/10 bg-cream p-6 shadow-sm transition duration-300 hover:-translate-y-1 hover:border-gold/40 hover:shadow-lg hover:shadow-ink/5'

function TileHead({ shape, badge, title, children, tone = 'bg-blush text-golddeep' }) {
  return (
    <div className={children ? '' : 'flex h-full flex-col justify-between'}>
      <div className="flex items-start justify-between gap-4">
        <span className={`feat-icon flex h-10 w-10 shrink-0 items-center justify-center rounded-xl border border-gold/40 ${tone}`}>
          <Icon shape={shape} />
        </span>
        <span className="rounded-full border border-gold/30 bg-gold/10 px-2.5 py-1 text-[10px] font-semibold uppercase tracking-[0.15em] text-golddeep">
          {badge}
        </span>
      </div>
      <div className="mt-4">
        <h3 className="font-display text-xl font-semibold">{title}</h3>
        <p className="mt-1.5 text-sm leading-relaxed text-bark">{children}</p>
      </div>
    </div>
  )
}

export default function Features() {
  const scope = useRef(null)

  useGSAP(
    () => {
      if (window.matchMedia?.('(prefers-reduced-motion: reduce)').matches) return
      const q = (sel) => gsap.utils.toArray(sel, scope.current)

      // Pauses/resumes a looping timeline while it is on/off screen.
      const loopFor = (el, tl) => {
        if (!el) return
        ScrollTrigger.create({
          trigger: el,
          start: 'top 95%',
          end: 'bottom 5%',
          onToggle: (self) => (self.isActive ? tl.play() : tl.pause()),
        })
      }

      // ---------- entrances ----------
      gsap.from('.feat-icon', {
        scale: 0.4, rotate: -14, opacity: 0, duration: 0.55, ease: 'back.out(2.4)', stagger: 0.08, delay: 0.15,
        scrollTrigger: { trigger: scope.current, start: 'top 78%', once: true },
      })
      gsap.from('.feat-row', {
        y: 18, opacity: 0, duration: 0.55, ease: 'power2.out', stagger: 0.12,
        scrollTrigger: { trigger: '.feat-rows', start: 'top 85%', once: true },
      })
      gsap.from('.feat-bars span', {
        scaleY: 0, transformOrigin: 'bottom', duration: 0.7, ease: 'power3.out', stagger: 0.07,
        scrollTrigger: { trigger: '.feat-bars', start: 'top 85%', once: true },
      })
      const numEl = q('.feat-num')[0]
      if (numEl) {
        const target = Number(numEl.dataset.target)
        ScrollTrigger.create({
          trigger: numEl, start: 'top 88%', once: true,
          onEnter: () => {
            const state = { v: 0 }
            gsap.to(state, {
              v: target, duration: 1.4, ease: 'power2.out',
              onUpdate: () => { numEl.textContent = Math.round(state.v) },
            })
          },
        })
      }
      gsap.from('.feat-table', {
        scale: 0.55, opacity: 0, duration: 0.6, ease: 'back.out(2)', stagger: 0.09,
        scrollTrigger: { trigger: '.feat-tables', start: 'top 85%', once: true },
      })
      gsap.from('.feat-photo', {
        y: 22, opacity: 0, duration: 0.55, ease: 'power2.out', stagger: 0.08,
        scrollTrigger: { trigger: '.feat-photos', start: 'top 88%', once: true },
      })
      gsap.from('.feat-line', {
        scaleY: 0, duration: 0.9, ease: 'power2.out',
        scrollTrigger: { trigger: '.feat-timeline', start: 'top 86%', once: true },
      })
      gsap.from('.feat-t-dot', {
        scale: 0, opacity: 0, duration: 0.45, ease: 'back.out(2.4)', stagger: 0.18, delay: 0.25,
        scrollTrigger: { trigger: '.feat-timeline', start: 'top 86%', once: true },
      })

      // ---------- looping life ----------
      // RSVP: a "Thinking" reply turns into "Confirmed", then quietly resets.
      const pill = q('.feat-pill')[0]
      const countEl = q('.feat-count')[0]
      const barEl = q('.feat-bar-fill')[0]
      if (pill) {
        const swap = (on) => {
          pill.classList.toggle('bg-forest/10', on)
          pill.classList.toggle('text-forest', on)
          pill.classList.toggle('bg-gold/20', !on)
          pill.classList.toggle('text-golddeep', !on)
          pill.textContent = on ? 'Confirmed' : 'Thinking'
          if (countEl) countEl.textContent = on ? '63' : '62'
          if (barEl) gsap.to(barEl, { width: on ? '64%' : '62%', duration: 0.6, ease: 'power2.out' })
        }
        swap(false) // normalize after effect re-runs (StrictMode)
        const tl = gsap.timeline({ paused: true, repeat: -1, repeatDelay: 2.6 })
        tl.call(() => swap(true), null, 0)
          .fromTo(pill, { scale: 1 }, { scale: 1.22, duration: 0.16, yoyo: true, repeat: 1, ease: 'power2.out' }, 0.05)
          .call(() => swap(false), null, 2.8)
        loopFor(q('.feat-rows')[0], tl)
      }

      // Seating: a guest dot hops table to table.
      const dots = q('.seat-dot')
      if (dots.length) {
        gsap.set(dots, { scale: 0.4 })
        const tl = gsap.timeline({ paused: true, repeat: -1, repeatDelay: 1.2 })
        dots.forEach((d, i) => {
          tl.to(d, { opacity: 1, scale: 1, duration: 0.3, ease: 'back.out(3)' }, i * 1.05)
          tl.to(d, { opacity: 0, duration: 0.25, ease: 'power1.in' }, i * 1.05 + 0.8)
        })
        loopFor(q('.feat-tables')[0], tl)
      }

      // Check-in: the stamp slams down and the clock ticks forward.
      const stamp = q('.feat-stamp')[0]
      if (stamp) {
        const timeEl = stamp.querySelector('.feat-stamp-time')
        if (timeEl) timeEl.textContent = timeEl.dataset.base
        gsap.set(stamp, { transformOrigin: '85% 85%' })
        const tl = gsap.timeline({ paused: true, repeat: -1, repeatDelay: 2.2 })
        tl.set(stamp, { opacity: 0, scale: 2, rotate: -16, x: 0 }, 0)
          .to(stamp, { opacity: 1, scale: 1, rotate: -6, duration: 0.25, ease: 'power4.in' }, 0)
          .to(stamp, { x: 1.5, duration: 0.05, yoyo: true, repeat: 3, ease: 'none' }, 0.25)
          .call(() => { if (timeEl) timeEl.textContent = '6:43 PM' }, null, 0.55)
          .to({}, { duration: 2.3 }, 0.7)
          .call(() => { if (timeEl) timeEl.textContent = '6:42 PM' }, null, 3.1)
        loopFor(stamp, tl)
      }

      // Photos: a soft light sweeps across the album.
      const shimmers = q('.feat-shimmer')
      if (shimmers.length) {
        const tl = gsap.timeline({ paused: true, repeat: -1, repeatDelay: 2.8 })
        shimmers.forEach((s, i) => {
          tl.fromTo(s, { xPercent: -130 }, { xPercent: 240, duration: 1.15, ease: 'power2.inOut' }, i * 0.42)
        })
        loopFor(q('.feat-photos')[0], tl)
      }

      // Schedule: the last stop keeps pulsing.
      const lastDot = q('.feat-t-dot').at(-1)
      if (lastDot) {
        const tl = gsap.timeline({ paused: true, repeat: -1, yoyo: true })
        tl.to(lastDot, { scale: 1.9, opacity: 0.65, duration: 0.85, ease: 'sine.inOut' })
        loopFor(q('.feat-timeline')[0], tl)
      }
    },
    { scope },
  )

  return (
    <section id="features" className="py-24" ref={scope}>
      <div className="mx-auto max-w-6xl px-5">
        <Reveal className="max-w-2xl">
          <p className="text-xs font-semibold uppercase tracking-[0.3em] text-golddeep">What&rsquo;s inside</p>
          <h2 className="mt-3 font-display text-4xl font-semibold tracking-tight md:text-5xl">
            Everything your guests touch, in one link.
          </h2>
          <p className="mt-4 text-lg text-bark">
            Invitations, RSVPs, tables, door lists and photo albums usually live in four different
            tools. InviteU keeps them under one warm, well-designed roof.
          </p>
        </Reveal>

        <Reveal stagger className="mt-12 grid gap-5 md:grid-cols-2 lg:grid-cols-4">
          {/* RSVP links — wide tile */}
          <div className={`${TILE} md:col-span-2`}>
            <div className="flex h-full flex-col justify-between gap-6">
              <TileHead shape="link" badge="RSVP" title="One personal link per guest">
                Replies arrive the moment your guest taps. No accounts, no forms, no chasing.
              </TileHead>
              <div className="rounded-2xl border border-ink/10 bg-paper p-4 text-sm">
                <div className="flex items-center justify-between text-xs font-medium text-bark">
                  <span>
                    Guest list · <span className="feat-count" data-base="62">62</span> replied
                  </span>
                  <span className="flex h-1.5 w-16 overflow-hidden rounded-full bg-ink/10">
                    <span className="feat-bar-fill h-full w-[62%] rounded-full bg-gold" />
                  </span>
                </div>
                <ul className="feat-rows mt-3 space-y-2">
                  {GUEST_ROWS.map((row) => (
                    <li key={row.name} className="feat-row flex items-center justify-between gap-3 rounded-xl bg-cream px-3 py-2">
                      <span className="flex flex-col leading-tight">
                        <span className="font-medium text-ink">{row.name}</span>
                        <span className="text-xs text-bark">{row.side}</span>
                      </span>
                      <span className={`${row.tone} rounded-full px-2.5 py-1 text-xs font-semibold ${row.status === 'Thinking' ? 'feat-pill' : ''}`}>
                        {row.status}
                      </span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>

          {/* Live count */}
          <div className={TILE}>
            <TileHead shape="count" badge="Guests" title="Your headcount, live">
              Confirmed, thinking, declined — always current, never reconciled by hand.
            </TileHead>
            <p className="mt-6 font-display text-4xl font-semibold text-ink">
              <span className="feat-num" data-target="86">86</span>
              <span className="ml-2 text-sm font-normal text-bark">confirmed</span>
            </p>
            <div className="feat-bars mt-3 flex h-14 items-end gap-1.5">
              {BARS.map((h, i) => (
                <span
                  key={h}
                  className="w-full rounded-t-md bg-gradient-to-t from-gold/70 to-gold"
                  style={{ height: `${h}%`, opacity: 0.45 + (i / BARS.length) * 0.55 }}
                />
              ))}
            </div>
          </div>

          {/* Seating */}
          <div className={TILE}>
            <TileHead shape="seating" badge="Planning" title="Seating without grid paper">
              Drag names to tables of any size and re-flow when a plus-one appears.
            </TileHead>
            <div className="feat-tables mt-6 grid grid-cols-2 gap-3">
              {[1, 2, 3, 4].map((table) => (
                <div
                  key={table}
                  className="feat-table relative flex h-16 items-center justify-center rounded-full border border-gold/40 bg-blush/70 text-xs font-semibold text-golddeep"
                >
                  Table {table}
                  <span className="seat-dot absolute right-3 top-2 h-1.5 w-1.5 rounded-full bg-forest opacity-0" aria-hidden="true" />
                </div>
              ))}
            </div>
          </div>

          {/* Check-in */}
          <div className={TILE}>
            <TileHead shape="ticket" badge="Day-of" title="Check-in at the door">
              Tick guests off as they arrive. Your coordinator sees the same list, live.
            </TileHead>
            <div className="mt-7 flex items-center justify-center">
              <span className="feat-stamp -rotate-6 whitespace-nowrap rounded-md border-2 border-dashed border-forest px-3 py-1 text-xs font-bold uppercase tracking-[0.2em] text-forest">
                Checked in · <span className="feat-stamp-time" data-base="6:42 PM">6:42 PM</span>
              </span>
            </div>
            <p className="mt-4 text-center text-xs text-bark">Maya Lucas · Table 2</p>
          </div>

          {/* Photo album — wide tile */}
          <div className={`${TILE} md:col-span-2`}>
            <div className="flex h-full flex-col justify-between gap-6">
              <TileHead shape="camera" badge="After" title="One shared photo album">
                Guests point their camera at a QR code and every photo lands in the same place —
                yours, on your timeline.
              </TileHead>
              <div className="feat-photos grid grid-cols-4 gap-2">
                {PHOTO_TONES.map((tone) => (
                  <span key={tone} className={`feat-photo relative h-20 overflow-hidden rounded-xl ${tone}`}>
                    <span
                      className="feat-shimmer pointer-events-none absolute inset-0 bg-[linear-gradient(105deg,transparent_35%,rgba(255,255,255,0.5)_50%,transparent_65%)]"
                      style={{ transform: 'translateX(-130%)' }}
                      aria-hidden="true"
                    />
                  </span>
                ))}
              </div>
            </div>
          </div>

          {/* Day-of schedule */}
          <div className={TILE}>
            <TileHead shape="clock" badge="In the invite" title="The day, on the page">
              Ceremony, dinner, send-off — the schedule lives inside the invitation.
            </TileHead>
            <ul className="feat-timeline relative mt-6 space-y-3 text-sm">
              <span className="feat-line absolute bottom-1.5 left-[3px] top-1.5 w-px origin-top bg-gold/50" aria-hidden="true" />
              {SCHEDULE.map((step) => (
                <li key={step} className="flex items-center gap-3">
                  <span className="feat-t-dot h-2 w-2 shrink-0 rounded-full bg-gold" />
                  <span className="text-bark">{step}</span>
                </li>
              ))}
            </ul>
          </div>
        </Reveal>
      </div>
    </section>
  )
}
