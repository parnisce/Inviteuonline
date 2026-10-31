import * as THREE from 'three'
import { useEffect, useRef } from 'react'

const LAYERS = [
  { count: 24, size: 15, opacity: 0.85, drift: 0.00055, fall: 0.00042 },
  { count: 26, size: 10, opacity: 0.6, drift: 0.00085, fall: 0.0006 },
  { count: 20, size: 6, opacity: 0.4, drift: 0.0012, fall: 0.0008 },
]

const PALETTE = ['#c2955a', '#e5c9a8', '#bc5a34', '#dfe5d6']

// A soft radial sprite rendered as a tilted petal shape.
function petalTexture() {
  const canvas = document.createElement('canvas')
  canvas.width = canvas.height = 32
  const ctx = canvas.getContext('2d')
  const gradient = ctx.createRadialGradient(16, 16, 0, 16, 16, 16)
  gradient.addColorStop(0, 'rgba(255,255,255,0.95)')
  gradient.addColorStop(0.55, 'rgba(255,255,255,0.55)')
  gradient.addColorStop(1, 'rgba(255,255,255,0)')
  ctx.fillStyle = gradient
  ctx.beginPath()
  ctx.ellipse(16, 16, 15, 10, -0.6, 0, Math.PI * 2)
  ctx.fill()
  return new THREE.CanvasTexture(canvas)
}

/**
 * A gentle, wind-drifted field of petals — WebGL via three.js.
 * Renders nothing when the visitor prefers reduced motion.
 */
export default function PetalsCanvas({ className = '' }) {
  const host = useRef(null)

  useEffect(() => {
    if (window.matchMedia?.('(prefers-reduced-motion: reduce)').matches) return undefined
    const container = host.current
    if (!container) return undefined

    const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: false })
    const pixelRatio = Math.min(window.devicePixelRatio || 1, 2)
    renderer.setPixelRatio(pixelRatio)
    container.appendChild(renderer.domElement)

    const scene = new THREE.Scene()
    const camera = new THREE.OrthographicCamera(-1, 1, 1, -1, 0.1, 10)
    camera.position.z = 2

    const texture = petalTexture()
    const layers = LAYERS.flatMap((layer) => {
      const seeds = []
      const positions = new Float32Array(layer.count * 3)
      const colors = new Float32Array(layer.count * 3)
      const color = new THREE.Color()

      for (let i = 0; i < layer.count; i++) {
        color.set(PALETTE[i % PALETTE.length])
        colors.set([color.r, color.g, color.b], i * 3)
        seeds.push({
          x: 0,
          y: 0,
          phase: Math.random() * Math.PI * 2,
          speed: 0.5 + Math.random(),
          scale: 0.7 + Math.random() * 0.6,
        })
      }

      const geometry = new THREE.BufferGeometry()
      geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3))
      geometry.setAttribute('color', new THREE.BufferAttribute(colors, 3))

      const material = new THREE.PointsMaterial({
        map: texture,
        transparent: true,
        opacity: layer.opacity,
        vertexColors: true,
        size: layer.size * pixelRatio,
        sizeAttenuation: false,
        depthTest: false,
        depthWrite: false,
      })

      const points = new THREE.Points(geometry, material)
      scene.add(points)
      return { ...layer, geometry, material, points, seeds }
    })

    const fit = () => {
      const { width, height } = container.getBoundingClientRect()
      if (!width || !height) return
      renderer.setSize(width, height)
      camera.left = -width / height
      camera.right = width / height
      camera.top = 1
      camera.bottom = -1
      camera.updateProjectionMatrix()
    }
    fit()

    const clock = new THREE.Clock()
    let raf = 0

    const tick = () => {
      raf = requestAnimationFrame(tick)
      const time = clock.getElapsedTime()
      const aspect = (container.clientWidth || 1) / (container.clientHeight || 1)

      for (const layer of layers) {
        const position = layer.geometry.attributes.position
        for (let i = 0; i < layer.count; i++) {
          const seed = layer.seeds[i]
          seed.fall0 ??= Math.random() * 2 - 1
          seed.y -= layer.fall * seed.scale
          seed.x = seed.fall0 + Math.sin(time * seed.speed + seed.phase) * 0.14
          if (seed.y < -1.1) {
            seed.y = 1.1
            seed.fall0 = (Math.random() * 2 - 1) * aspect
          }
          position.setXYZ(i, seed.x * aspect, seed.y, 0)
        }
        position.needsUpdate = true
      }

      renderer.render(scene, camera)
    }
    tick()

    const onResize = () => fit()
    window.addEventListener('resize', onResize)

    return () => {
      cancelAnimationFrame(raf)
      window.removeEventListener('resize', onResize)
      for (const layer of layers) {
        layer.geometry.dispose()
        layer.material.dispose()
      }
      texture.dispose()
      renderer.dispose()
      container.removeChild(renderer.domElement)
    }
  }, [])

  return <div ref={host} className={className} aria-hidden="true" />
}
