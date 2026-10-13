import { useEffect, useState } from 'react'
import { useReducedMotion } from 'framer-motion'
import { ArrowDown } from 'lucide-react'
import { hero } from '../data/site.js'

export default function Hero() {
  const [i, setI] = useState(0)
  const reduce = useReducedMotion()

  useEffect(() => {
    if (reduce) return
    const id = setInterval(() => setI((v) => (v + 1) % hero.slides.length), 6000)
    return () => clearInterval(id)
  }, [reduce])

  return (
    <section id="top" className="relative h-[100svh] min-h-[600px] overflow-hidden bg-pine text-paper">
      {/* Crossfading background photos */}
      {hero.slides.map((s, idx) => (
        <div
          key={s.src}
          aria-hidden={idx !== i}
          className={`absolute inset-0 bg-cover bg-center transition-opacity duration-[1600ms] ease-in-out ${
            idx === i ? 'opacity-100' : 'opacity-0'
          }`}
          style={{ backgroundImage: `url(${s.src})`, filter: 'saturate(1.15)' }}
        />
      ))}
      <div className="absolute inset-0 bg-pine/55" />

      {/* Content */}
      <div className="relative z-10 mx-auto flex h-full max-w-[1600px] flex-col px-5 md:px-10 lg:px-16">
        <div className="flex flex-1 flex-col items-center justify-center pt-24 pb-6">
          <h1 className="display w-full text-center text-[clamp(2.4rem,11vw,12rem)] whitespace-nowrap">
            {hero.wordmark}
          </h1>
          <div className="mt-4 flex w-full items-center justify-between text-xs md:text-lg">
            <span className="font-normal">{hero.left}</span>
            <span className="hidden max-w-[16rem] text-right font-normal sm:block">{hero.right}</span>
          </div>
        </div>

        <div className="flex items-end justify-between pb-10">
          <a
            href="#projects"
            className="group inline-flex items-center gap-3 rounded-full border border-paper/30 px-6 py-3 text-sm uppercase tracking-[0.2em] transition-colors duration-300 hover:border-paper hover:bg-paper hover:text-pine"
          >
            View our work
            <ArrowDown className="size-4 transition-transform duration-300 group-hover:translate-y-0.5" />
          </a>
          <p className="hidden text-xs uppercase tracking-[0.25em] text-paper/60 sm:block">
            {hero.slides[i].alt}
          </p>
        </div>
      </div>
    </section>
  )
}
