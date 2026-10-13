import Header from './components/Header.jsx'
import Hero from './components/Hero.jsx'
import About from './components/About.jsx'
import StyleGallery from './components/StyleGallery.jsx'
import Projects from './components/Projects.jsx'
import Services from './components/Services.jsx'
import HowWeWork from './components/HowWeWork.jsx'
import VirtualExperience from './components/VirtualExperience.jsx'
import Testimonials from './components/Testimonials.jsx'
import Footer from './components/Footer.jsx'

export default function App() {
  return (
    <>
      <a
        href="#studio"
        className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-[1001] focus:rounded focus:bg-pine focus:px-4 focus:py-2 focus:text-paper"
      >
        Skip to content
      </a>
      <Header />
      <main>
        <Hero />
        <About />
        <StyleGallery />
        <Projects />
        <Services />
        <HowWeWork />
        <VirtualExperience />
        <Testimonials />
      </main>
      <Footer />
    </>
  )
}
