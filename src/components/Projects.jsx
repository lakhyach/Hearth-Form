import Reveal from './Reveal.jsx'
import { projects } from '../data/site.js'

export default function Projects() {
  return (
    <section id="projects" className="scroll-mt-24 bg-paper px-5 py-24 text-sage md:px-10 lg:px-16">
      <div className="mx-auto max-w-[1600px]">
        <Reveal as="h2" className="text-3xl font-semibold uppercase tracking-tight md:text-4xl">
          Selected Projects [{String(projects.length).padStart(2, '0')}]
        </Reveal>

        <div className="mt-16 flex flex-col gap-24 lg:gap-40">
          {projects.map((p) => (
            <article key={p.name} className="grid grid-cols-1 gap-8 md:grid-cols-12 md:gap-6">
              <div className="md:col-span-4 lg:sticky lg:top-28 lg:self-start">
                <h3 className="text-5xl font-normal tracking-tight lg:text-6xl">{p.name}</h3>
                <p className="mt-5 max-w-[30ch] text-base opacity-80">{p.blurb}</p>
                <p className="mt-8 text-[11px] uppercase tracking-[0.15em] opacity-50">
                  {p.location}
                  <br />
                  {p.size}
                </p>
                <a
                  href="#contact"
                  className="mt-6 inline-block text-xs uppercase tracking-[0.2em] text-clay underline-offset-4 hover:underline"
                >
                  Enquire about this project →
                </a>
              </div>

              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:col-span-8">
                {p.images.map((img, idx) => (
                  <div
                    key={img.src}
                    className={`group overflow-hidden rounded-sm ${idx === 1 ? 'lg:mt-16' : ''}`}
                  >
                    <img
                      src={img.src}
                      alt={img.alt}
                      loading="lazy"
                      className="aspect-[4/5] w-full object-cover grayscale transition-all duration-700 group-hover:scale-[1.03] group-hover:grayscale-0"
                    />
                  </div>
                ))}
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}
