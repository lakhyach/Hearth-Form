import { useState } from 'react'
import { ArrowUpRight, ArrowUp } from 'lucide-react'
import Logo from './Logo.jsx'
import { brand, footer } from '../data/site.js'

export default function Footer() {
  const [email, setEmail] = useState('')

  // No backend is configured, so the newsletter submits via the user's mail client.
  const onSubmit = (e) => {
    e.preventDefault()
    if (!email) return
    window.location.href = `mailto:${brand.email}?subject=Newsletter signup&body=Please add ${encodeURIComponent(
      email,
    )} to the Hearth & Form newsletter.`
  }

  const toTop = () => window.scrollTo({ top: 0, behavior: 'smooth' })

  return (
    <footer id="contact" className="relative scroll-mt-24 overflow-hidden text-paper">
      <div
        aria-hidden
        className="absolute inset-0 bg-cover bg-center"
        style={{ backgroundImage: 'url(/images/hero-1.jpg)' }}
      />
      <div className="absolute inset-0 bg-sage/95 backdrop-blur-2xl" />

      <div className="relative mx-auto max-w-[1600px] px-5 pt-24 md:px-10 lg:px-16">
        <div className="grid grid-cols-1 gap-12 md:grid-cols-2 lg:grid-cols-4">
          <div>
            <Logo className="size-9" />
            <p className="mt-5 max-w-[250px] text-sm opacity-90">{footer.blurb}</p>
            <a
              href={`mailto:${brand.email}`}
              className="mt-4 inline-flex min-h-11 items-center text-sm underline underline-offset-4 hover:text-white"
            >
              {brand.email}
            </a>
          </div>

          <div>
            <h2 className="eyebrow opacity-90">Our Newsletter</h2>
            <form onSubmit={onSubmit} className="mt-5">
              <label htmlFor="newsletter" className="sr-only">
                Your email address
              </label>
              <div className="flex items-center gap-2 border-b border-paper/25 pb-2">
                <input
                  id="newsletter"
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Your Email"
                  className="w-full bg-transparent text-sm placeholder:text-paper/70"
                />
                <button
                  type="submit"
                  aria-label="Subscribe"
                  className="grid size-11 shrink-0 place-items-center hover:text-white"
                >
                  <ArrowUpRight className="size-5" />
                </button>
              </div>
              <p className="mt-3 text-[11px] opacity-90">
                Demo form — opens your email app to reach the studio.
              </p>
            </form>
            <button
              type="button"
              onClick={toTop}
              className="mt-6 inline-flex min-h-11 items-center gap-2 text-xs uppercase tracking-[0.2em] opacity-90 hover:opacity-100"
            >
              Back to top <ArrowUp className="size-4" />
            </button>
          </div>

          <nav aria-label="Website">
            <h2 className="eyebrow opacity-90">Website</h2>
            <ul className="mt-5 space-y-1 text-sm">
              {footer.website.map((l) => (
                <li key={l.href}>
                  <a
                    href={l.href}
                    className="inline-flex min-h-11 items-center opacity-90 transition-opacity hover:opacity-100"
                  >
                    {l.label}
                  </a>
                </li>
              ))}
            </ul>
          </nav>

          <div>
            <h2 className="eyebrow opacity-90">Studio</h2>
            <p className="mt-5 text-sm opacity-90">
              By appointment
              <br />
              Copenhagen &amp; remote
            </p>
            <a
              href={`mailto:${brand.email}`}
              className="mt-4 inline-flex min-h-11 items-center text-sm underline underline-offset-4 hover:text-white"
            >
              Enquire →
            </a>
          </div>
        </div>

        <div className="mt-16 select-none">
          <span className="display block whitespace-nowrap text-[clamp(2rem,10.5vw,11rem)] leading-none opacity-90">
            HEARTH &amp; FORM®
          </span>
        </div>

        <div className="flex flex-col gap-2 border-t border-paper/10 py-8 text-xs uppercase tracking-[0.15em] text-paper/90 sm:flex-row sm:items-center sm:justify-between">
          <span>© {new Date().getFullYear()} {brand.name} · Interior Architecture Studio</span>
          <span>All rights reserved</span>
        </div>
      </div>
    </footer>
  )
}
