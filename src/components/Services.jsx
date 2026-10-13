import Reveal from './Reveal.jsx'
import { services } from '../data/site.js'

export default function Services() {
  return (
    <section id="services" className="relative scroll-mt-24 overflow-hidden py-24 md:py-32">
      <div
        aria-hidden
        className="absolute inset-0 bg-cover bg-center"
        style={{ backgroundImage: 'url(/images/services-bg.jpg)' }}
      />
      <div className="absolute inset-0 bg-sage/90 backdrop-blur-xl" />

      <div className="relative mx-auto grid max-w-[1600px] gap-16 px-5 text-paper md:px-10 lg:grid-cols-2 lg:gap-24 lg:px-16">
        <div>
          <Reveal as="h2" className="text-3xl font-semibold uppercase tracking-tight md:text-4xl">
            {services.eyebrow}
          </Reveal>
          <Reveal as="p" delay={0.05} className="mt-10 max-w-md text-2xl font-light leading-snug md:text-3xl">
            {services.intro}
          </Reveal>
          <Reveal delay={0.1}>
            <a
              href="#contact"
              className="mt-10 inline-block rounded-sm bg-paper px-8 py-4 font-semibold tracking-widest text-sage uppercase transition-all duration-300 hover:-translate-y-1 hover:bg-white"
            >
              Start a project
            </a>
          </Reveal>
        </div>

        <div className="flex flex-col gap-5 md:gap-6">
          {services.packages.map((pkg, idx) => (
            <Reveal
              key={pkg.name}
              delay={idx * 0.05}
              className="rounded-lg border border-paper/15 bg-white/5 p-6 backdrop-blur-md transition-colors duration-500 hover:bg-white/10 md:p-8"
            >
              <div className="flex items-baseline justify-between gap-4">
                <h3 className="text-xl font-light md:text-2xl">{pkg.name}</h3>
                <span className="shrink-0 text-xl italic">{pkg.price}</span>
              </div>
              <p className="mt-4 text-xs uppercase tracking-[0.2em] opacity-90">Includes</p>
              <ul className="mt-2 space-y-1.5 text-sm opacity-90">
                {pkg.includes.map((line) => (
                  <li key={line} className="flex gap-2">
                    <span aria-hidden className="mt-2 size-1 shrink-0 rounded-full bg-current" />
                    {line}
                  </li>
                ))}
              </ul>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  )
}
