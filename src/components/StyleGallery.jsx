import { useEffect, useRef, useState } from 'react'
import { useReducedMotion } from 'framer-motion'
import { ChevronLeft, ChevronRight } from 'lucide-react'
import { styles } from '../data/site.js'

const DURATION = 5000

export default function StyleGallery() {
  const [i, setI] = useState(0)
  const [paused, setPaused] = useState(false)
  const [visible, setVisible] = useState(false)
  const sectionRef = useRef(null)
  const reduce = useReducedMotion()
  const n = styles.length

  const go = (dir) => setI((v) => (v + dir + n) % n)

  // Only auto-advance while the section is on screen.
  useEffect(() => {
    const el = sectionRef.current
    if (!el || typeof IntersectionObserver === 'undefined') return
    const io = new IntersectionObserver(([entry]) => setVisible(entry.isIntersecting), { threshold: 0.3 })
    io.observe(el)
    return () => io.disconnect()
  }, [])

  useEffect(() => {
    if (paused || reduce || !visible) return
    const id = setTimeout(() => setI((v) => (v + 1) % n), DURATION)
    return () => clearTimeout(id)
  }, [i, paused, reduce, visible, n])

  const active = styles[i]
  const prevTitle = styles[(i - 1 + n) % n].title
  const nextTitle = styles[(i + 1) % n].title

  return (
    <section
      ref={sectionRef}
      className="relative flex min-h-[700px] items-center overflow-hidden bg-charcoal px-5 py-24 text-paper md:px-10 lg:px-16"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      aria-roledescription="carousel"
      aria-label="Design styles"
    >
      {/* Blurred backdrop of the active image */}
      <div
        aria-hidden
        className="absolute inset-0 scale-125 bg-cover bg-center opacity-25 blur-[90px] transition-all duration-1000"
        style={{ backgroundImage: `url(${active.src})` }}
      />
      <div className="absolute inset-0 bg-charcoal/60" />

      <div className="relative mx-auto w-full max-w-[1400px]">
        <div className="flex items-end justify-center gap-4 md:gap-8">
          {/* left peek */}
          <button
            type="button"
            onClick={() => go(-1)}
            aria-label={`Previous: ${prevTitle}`}
            className="hidden w-1/5 shrink-0 overflow-hidden rounded-sm opacity-30 grayscale transition duration-500 hover:opacity-60 md:block"
          >
            <img src={styles[(i - 1 + n) % n].src} alt="" className="h-[360px] w-full object-cover" />
          </button>

          {/* center */}
          <figure className="relative w-full max-w-[520px] shrink-0 overflow-hidden rounded-sm shadow-2xl ring-1 ring-white/10 md:w-1/3">
            <img
              key={active.src}
              src={active.src}
              alt={active.alt}
              className="h-[420px] w-full object-cover saturate-[1.3] md:h-[540px]"
            />
            <figcaption className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/70 to-transparent p-6">
              <p className="text-2xl font-light md:text-3xl">{active.title}</p>
            </figcaption>
          </figure>

          {/* right peek */}
          <button
            type="button"
            onClick={() => go(1)}
            aria-label={`Next: ${nextTitle}`}
            className="hidden w-1/5 shrink-0 overflow-hidden rounded-sm opacity-30 grayscale transition duration-500 hover:opacity-60 md:block"
          >
            <img src={styles[(i + 1) % n].src} alt="" className="h-[360px] w-full object-cover" />
          </button>
        </div>

        {/* Controls */}
        <div className="mt-10 flex items-center justify-center gap-8">
          <button
            type="button"
            onClick={() => go(-1)}
            className="group flex items-center gap-2 text-xs uppercase tracking-[0.3em] text-paper/60 transition-colors hover:text-paper"
          >
            <ChevronLeft className="size-4" />
            <span className="hidden md:inline">{prevTitle}</span>
          </button>

          <div className="h-1 w-40 overflow-hidden rounded-full bg-white/15">
            <div
              key={i}
              className="h-full bg-paper/80 animate-progress"
              style={reduce ? { width: '100%' } : undefined}
            />
          </div>

          <button
            type="button"
            onClick={() => go(1)}
            className="group flex items-center gap-2 text-xs uppercase tracking-[0.3em] text-paper/60 transition-colors hover:text-paper"
          >
            <span className="hidden md:inline">{nextTitle}</span>
            <ChevronRight className="size-4" />
          </button>
        </div>
      </div>
    </section>
  )
}
