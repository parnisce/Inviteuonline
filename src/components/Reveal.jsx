import { useGSAP } from '@gsap/react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { useRef } from 'react'

gsap.registerPlugin(ScrollTrigger, useGSAP)

/**
 * Fades content up when it scrolls into view.
 * Pass `stagger` to animate the direct children one after another.
 */
export default function Reveal({ children, className = '', stagger = false, delay = 0, as: Tag = 'div' }) {
  const ref = useRef(null)

  useGSAP(
    () => {
      const targets = stagger ? ref.current.children : ref.current
      gsap.from(targets, {
        y: 34,
        opacity: 0,
        duration: 0.9,
        delay,
        ease: 'power3.out',
        stagger: stagger ? 0.12 : 0,
        // Release the inline transform so CSS hover effects can take over.
        onComplete: () => gsap.set(targets, { clearProps: 'transform,opacity' }),
        scrollTrigger: { trigger: ref.current, start: 'top 85%', once: true },
      })
    },
    { scope: ref },
  )

  return (
    <Tag ref={ref} className={className}>
      {children}
    </Tag>
  )
}
