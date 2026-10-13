import { useEffect, useState } from 'react'
import { createPortal } from 'react-dom'
import { AnimatePresence, motion } from 'framer-motion'
import { Menu, X } from 'lucide-react'
import Logo from './Logo.jsx'
import { brand, nav } from '../data/site.js'

export default function Header() {
  const [scrolled, setScrolled] = useState(false)
  const [open, setOpen] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  // Lock body scroll while the mobile menu is open.
  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : ''
    return () => {
      document.body.style.overflow = ''
    }
  }, [open])

  return (
    <header
      className={`fixed inset-x-0 top-0 z-[999] transition-all duration-500 ${
        scrolled || open
          ? 'bg-charcoal/85 backdrop-blur-md py-3 shadow-lg shadow-black/5'
          : 'bg-transparent py-5'
      }`}
    >
      <div className="mx-auto flex max-w-[1600px] items-center justify-between px-5 md:px-10 lg:px-16">
        <a
          href="#top"
          className="text-paper transition-transform duration-200 hover:-translate-y-0.5"
          aria-label={`${brand.name} — home`}
        >
          <Logo className="size-8 md:size-9" />
        </a>

        <nav aria-label="Primary" className="hidden items-center gap-10 lg:flex">
          {nav.map((item) => (
            <a
              key={item.href}
              href={item.href}
              className="text-paper/90 underline-offset-8 transition-all duration-200 hover:-translate-y-0.5 hover:underline"
            >
              {item.label}
            </a>
          ))}
        </nav>

        <div className="flex items-center gap-3">
          <a
            href="#contact"
            className="hidden rounded-sm bg-sand px-6 py-2 font-semibold text-pine transition-colors duration-200 hover:bg-white sm:inline-block"
          >
            Contact
          </a>
          <button
            type="button"
            onClick={() => setOpen((v) => !v)}
            aria-expanded={open}
            aria-controls="mobile-menu"
            aria-label={open ? 'Close menu' : 'Open menu'}
            className="text-paper lg:hidden"
          >
            {open ? <X className="size-9" /> : <Menu className="size-9" />}
          </button>
        </div>
      </div>

      {createPortal(
        <AnimatePresence>
          {open && (
            <motion.nav
              key="mobile-menu"
              id="mobile-menu"
              aria-label="Mobile"
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'spring', damping: 26, stiffness: 220 }}
              className="fixed inset-0 z-[1000] flex flex-col bg-charcoal px-6 pt-28 pb-10 text-paper lg:hidden"
            >
              <Logo className="absolute left-5 top-6 size-8" />
              <button
                type="button"
                onClick={() => setOpen(false)}
                aria-label="Close menu"
                className="absolute right-5 top-6 text-paper"
              >
                <X className="size-9" />
              </button>
              <ul className="flex flex-col gap-2">
                {[...nav, { label: 'Contact', href: '#contact' }].map((item, i) => (
                  <motion.li
                    key={item.href}
                    initial={{ opacity: 0, y: 16 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.08 * i }}
                  >
                    <a
                      href={item.href}
                      onClick={() => setOpen(false)}
                      className="text-5xl font-bold tracking-tight hover:italic"
                    >
                      {item.label}
                    </a>
                  </motion.li>
                ))}
              </ul>
              <p className="mt-auto text-xs uppercase tracking-[0.2em] text-paper/40">
                © {new Date().getFullYear()} {brand.name} · Interior Architecture Studio
              </p>
            </motion.nav>
          )}
        </AnimatePresence>,
        document.body,
      )}
    </header>
  )
}
