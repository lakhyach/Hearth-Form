import Reveal from './Reveal.jsx'
import { about } from '../data/site.js'

export default function About() {
  return (
    <section id="studio" className="scroll-mt-24 bg-paper px-5 py-24 text-sage md:px-10 lg:px-16 lg:py-32">
      <div className="mx-auto grid max-w-[1600px] gap-12 lg:grid-cols-2 lg:gap-20">
        <div>
          <Reveal as="h2" className="text-3xl font-semibold uppercase tracking-tight md:text-4xl">
            {about.eyebrow}
          </Reveal>
          <Reveal delay={0.1} className="mt-8 overflow-hidden rounded-lg">
            <img
              src="/images/hero-5.jpg"
              alt='Open-plan dining and living space with a red armchair and transparent chairs'
              className="aspect-[4/3] w-full object-cover lg:aspect-[3/4]"
              loading="lazy"
            />
          </Reveal>
        </div>

        <div>
          <Reveal as="p" className="text-2xl font-medium tracking-tight md:text-3xl">
            {about.lead}
          </Reveal>

          <dl className="my-14 grid grid-cols-2 gap-x-8 gap-y-12">
            {about.stats.map((s, idx) => (
              <Reveal key={s.label} delay={idx * 0.06}>
                <dt className="text-4xl font-medium tracking-tighter md:text-5xl">{s.value}</dt>
                <dd className="mt-2 text-sm md:text-base">{s.label}</dd>
              </Reveal>
            ))}
          </dl>
        </div>
      </div>
    </section>
  )
}
