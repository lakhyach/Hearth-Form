import Reveal from './Reveal.jsx'
import { approach } from '../data/site.js'

export default function HowWeWork() {
  return (
    <section id="approach" className="scroll-mt-24 border-t border-sage/10 bg-paper px-5 py-24 text-sage md:px-10 lg:px-16">
      <div className="mx-auto max-w-[1600px]">
        <Reveal as="h2" className="text-3xl font-semibold uppercase tracking-tight md:text-4xl">
          {approach.eyebrow}
        </Reveal>

        <ol className="mt-14 grid grid-cols-1 border-l border-t border-sage/10 md:grid-cols-2 lg:grid-cols-3">
          {approach.steps.map((step, idx) => (
            <li
              key={step.title}
              className="group border-b border-r border-sage/10 p-8 transition-colors duration-300 hover:bg-sage hover:text-paper lg:p-10"
            >
              <span className="text-4xl font-light opacity-30 transition-opacity group-hover:opacity-60 lg:text-5xl">
                {String(idx + 1).padStart(2, '0')}
              </span>
              <h3 className="mt-6 text-xl font-medium lg:text-2xl">{step.title}</h3>
              <ul className="mt-4 space-y-2 text-sm opacity-70">
                {step.items.map((it) => (
                  <li key={it} className="flex gap-2">
                    <span aria-hidden className="mt-[0.55em] size-1 shrink-0 rounded-full bg-current" />
                    {it}
                  </li>
                ))}
              </ul>
            </li>
          ))}
        </ol>
      </div>
    </section>
  )
}
