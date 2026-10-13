import { useRef } from 'react'
import { ChevronLeft, ChevronRight } from 'lucide-react'
import Reveal from './Reveal.jsx'
import { testimonials } from '../data/site.js'

export default function Testimonials() {
  const scroller = useRef(null)

  const scrollBy = (dir) => {
    const el = scroller.current
    if (!el) return
    el.scrollBy({ left: dir * (el.clientWidth * 0.8), behavior: 'smooth' })
  }

  return (
    <section className="bg-paper px-5 py-24 text-sage md:px-10 lg:px-16">
      <div className="mx-auto max-w-[1600px]">
        <div className="mb-12 flex items-end justify-between">
          <Reveal as="h2" className="text-3xl font-semibold uppercase tracking-tight md:text-4xl">
            Our Happy Clients [{String(testimonials.length).padStart(2, '0')}]
          </Reveal>
          <div className="hidden gap-2 md:flex">
            <button
              type="button"
              onClick={() => scrollBy(-1)}
              aria-label="Previous testimonials"
              className="rounded-full border border-sage/20 p-2 transition-colors hover:bg-sage hover:text-paper"
            >
              <ChevronLeft className="size-5" />
            </button>
            <button
              type="button"
              onClick={() => scrollBy(1)}
              aria-label="Next testimonials"
              className="rounded-full border border-sage/20 p-2 transition-colors hover:bg-sage hover:text-paper"
            >
              <ChevronRight className="size-5" />
            </button>
          </div>
        </div>

        <div
          ref={scroller}
          className="no-scrollbar flex snap-x snap-mandatory gap-6 overflow-x-auto pb-4"
        >
          {testimonials.map((t) => (
            <figure
              key={t.author}
              className="flex w-full flex-shrink-0 snap-start flex-col overflow-hidden rounded-lg border border-sage/10 bg-paper-deep/60 sm:flex-row md:w-[640px]"
            >
              <div className="group w-full overflow-hidden sm:w-2/5">
                <img
                  src={t.image}
                  alt={t.alt}
                  loading="lazy"
                  className="aspect-square h-full w-full object-cover grayscale transition-all duration-700 group-hover:scale-105 group-hover:grayscale-0"
                />
              </div>
              <blockquote className="flex w-full flex-col justify-center gap-4 p-8 sm:w-3/5">
                <h3 className="text-xl font-medium tracking-tight md:text-2xl">“{t.quote}”</h3>
                <p className="text-sm opacity-75">{t.body}</p>
                <footer className="mt-2 text-[11px] uppercase tracking-[0.15em] opacity-60">
                  {t.author} · {t.place}
                </footer>
              </blockquote>
            </figure>
          ))}
        </div>
      </div>
    </section>
  )
}
