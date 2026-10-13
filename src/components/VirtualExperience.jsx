import { Suspense, useRef, useState, useEffect, Component, useMemo } from 'react'
import { Canvas, useFrame, useThree } from '@react-three/fiber'
import { Vector3 } from 'three'
import { OrbitControls, useProgress, Environment, Lightformer } from '@react-three/drei'
import { Maximize2, Minimize2 } from 'lucide-react'
import Apartment from './Apartment.jsx'

// Each chip is a solid two-stop gradient: the previous `colour → colour55` wash let
// the 3D scene show through the label, which put white text as low as 2.2:1 over the
// amber chip. These pairs keep the colour coding while holding >=5:1 with white.
const HOTSPOTS = [
  { label: 'Living Room', pos: [-1.24, -0.43, 0.72], color: '#2563eb', deep: '#1e3a8a' },
  { label: 'Sitting Area', pos: [-1.22, -0.03, -0.99], color: '#b45309', deep: '#78350f' },
  { label: 'Kitchen', pos: [1.81, -0.1, -0.69], color: '#9333ea', deep: '#581c87' },
  { label: 'Dining', pos: [2.3, -0.17, 0.58], color: '#0e7490', deep: '#164e63' },
]

function supportsWebGL() {
  try {
    const c = document.createElement('canvas')
    return !!(window.WebGLRenderingContext && (c.getContext('webgl') || c.getContext('experimental-webgl')))
  } catch {
    return false
  }
}

// Moves the camera toward the selected hotspot; also drives the live coordinate readout.
function Rig({ target, coordsRef }) {
  const camera = useThree((s) => s.camera)
  useFrame(() => {
    if (target.current) {
      camera.position.lerp(target.current, 0.06)
      if (camera.position.distanceTo(target.current) < 0.05) target.current = null
    }
    if (coordsRef.current) {
      const { x, y, z } = camera.position
      coordsRef.current.textContent = `X ${x.toFixed(2)}   Y ${y.toFixed(2)}   Z ${z.toFixed(2)}`
    }
  })
  return null
}

class Boundary extends Component {
  state = { failed: false }
  static getDerivedStateFromError() {
    return { failed: true }
  }
  render() {
    return this.state.failed ? this.props.fallback : this.props.children
  }
}

function Loader() {
  const { progress, active } = useProgress()
  if (!active) return null
  return (
    <div className="absolute inset-0 z-20 flex flex-col items-center justify-center gap-4 bg-zinc-900/80 text-paper">
      <div className="h-1 w-48 overflow-hidden rounded-full bg-white/15">
        <div className="h-full bg-clay transition-[width] duration-300" style={{ width: `${progress}%` }} />
      </div>
      <p className="text-xs uppercase tracking-[0.25em] text-paper/85">Loading 3D · {Math.round(progress)}%</p>
    </div>
  )
}

function Fallback() {
  return (
    <div className="absolute inset-0 z-20 flex flex-col items-center justify-center gap-3 bg-zinc-900 p-6 text-center text-paper">
      <img src="/images/hero-3.jpg" alt="Modern house at dusk, glazed living wing opening to the garden" className="absolute inset-0 -z-10 h-full w-full object-cover opacity-40" />
      <p className="text-sm">The interactive 3D scene couldn’t start on this device.</p>
      <p className="text-xs text-paper/85">Here’s a photograph of a comparable space instead.</p>
    </div>
  )
}

export default function VirtualExperience() {
  const [showCoords, setShowCoords] = useState(true)
  const [full, setFull] = useState(false)
  const [near, setNear] = useState(false)
  const target = useRef(null)
  const coordsRef = useRef(null)
  const wrapRef = useRef(null)
  const webgl = useMemo(supportsWebGL, [])

  // The apartment GLB is ~5.4 MB, so it must not compete with the first screen.
  // Only mount the Canvas (and therefore start the fetch) once the section nears.
  useEffect(() => {
    const el = wrapRef.current
    if (!el || typeof IntersectionObserver === 'undefined') {
      setNear(true)
      return
    }
    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setNear(true)
          io.disconnect()
        }
      },
      { rootMargin: '600px' },
    )
    io.observe(el)
    return () => io.disconnect()
  }, [])

  const toggleFull = async () => {
    try {
      if (!document.fullscreenElement) {
        await wrapRef.current?.requestFullscreen()
        setFull(true)
      } else {
        await document.exitFullscreen()
        setFull(false)
      }
    } catch {
      /* fullscreen not permitted — ignore */
    }
  }

  // Escape (or the browser's own control) leaves fullscreen without touching our
  // state, so keep `full` in sync or the layout would stay pinned to the viewport.
  useEffect(() => {
    const onChange = () => setFull(Boolean(document.fullscreenElement))
    document.addEventListener('fullscreenchange', onChange)
    return () => document.removeEventListener('fullscreenchange', onChange)
  }, [])

  const focus = (pos) => {
    target.current = new Vector3(pos[0], pos[1], pos[2])
  }

  return (
    <section
      id="experience"
      className="scroll-mt-24 bg-zinc-800 px-5 py-24 text-paper md:px-10 md:py-32 lg:px-16"
    >
      <div className="mx-auto max-w-[1400px]">
        <div className="mb-6 flex items-center justify-between text-[10px] uppercase tracking-[0.25em] text-paper/70 lg:text-xs">
          <h2>Virtual Experience</h2>
          <span>Interactive 3D</span>
        </div>

        {/* The outer element is the fullscreen target, so the licence credit stays on
            screen while the viewer is expanded. */}
        <div ref={wrapRef} className={full ? 'fixed inset-0 z-[1000] flex flex-col bg-zinc-900' : undefined}>
          <div
            className={`relative overflow-hidden rounded-lg border border-white/5 bg-zinc-900 ${
              full
                ? 'min-h-0 flex-1 rounded-none border-0'
                : 'aspect-square md:aspect-auto md:h-[440px] lg:h-[600px]'
            }`}
          >
            {near && webgl ? (
              <Boundary fallback={<Fallback />}>
                <Suspense fallback={null}>
                  <Canvas
                    dpr={[1, 1.5]}
                    camera={{ position: [1.69, -0.44, 1.05], fov: 60 }}
                    gl={{ antialias: true, powerPreference: 'high-performance' }}
                  >
                    <color attach="background" args={['#2a2419']} />
                    <hemisphereLight intensity={0.9} color="#fff5e6" groundColor="#3a2f22" />
                    <ambientLight intensity={0.7} />
                    <directionalLight position={[6, 9, 5]} intensity={1.6} color="#ffe4b5" />
                    <directionalLight position={[-7, 4, -5]} intensity={0.7} color="#cfe0ff" />
                    <pointLight position={[0, 0.6, 0]} intensity={10} color="#ffcf99" distance={9} decay={2} />
                    <pointLight position={[1.5, 0.5, 1.5]} intensity={6} color="#ffffff" distance={8} decay={2} />
                    <Apartment />
                    <Environment resolution={256}>
                      <Lightformer intensity={2} position={[0, 5, 0]} scale={[10, 10, 1]} />
                      <Lightformer intensity={1.2} position={[5, 2, 5]} scale={[6, 6, 1]} color="#ffd9a0" />
                      <Lightformer intensity={1} position={[-5, 2, -5]} scale={[6, 6, 1]} color="#cfe0ff" />
                    </Environment>
                    <Rig target={target} coordsRef={coordsRef} />
                    <OrbitControls
                      makeDefault
                      enablePan
                      enableZoom
                      enableDamping
                      dampingFactor={0.08}
                      zoomSpeed={1}
                      rotateSpeed={0.6}
                      minDistance={0.5}
                      maxDistance={8}
                      target={[0, 0, 0]}
                    />
                  </Canvas>
                  <Loader />
                </Suspense>

                {/* HUD */}
                {showCoords && (
                  <div className="pointer-events-none absolute left-3 top-3 rounded-md border border-white/10 bg-black/50 px-3 py-2 backdrop-blur-sm">
                    <p className="text-[10px] uppercase tracking-widest text-clay">Camera position</p>
                    <p ref={coordsRef} className="mt-1 font-mono text-xs text-paper/90">
                      X 1.69&nbsp;&nbsp;&nbsp;Y -0.44&nbsp;&nbsp;&nbsp;Z 1.05
                    </p>
                  </div>
                )}

                <button
                  type="button"
                  onClick={() => setShowCoords((v) => !v)}
                  className="absolute right-3 top-3 min-h-11 rounded-md border border-white/10 bg-black/40 px-3 py-2 text-[10px] uppercase tracking-widest text-paper/80 backdrop-blur-sm hover:text-paper"
                >
                  {showCoords ? 'Hide coords' : 'Show coords'}
                </button>
                <button
                  type="button"
                  onClick={toggleFull}
                  aria-label={full ? 'Exit fullscreen' : 'Enter fullscreen'}
                  className="absolute right-3 top-16 grid size-11 place-items-center rounded-md border border-white/10 bg-black/40 text-paper/80 backdrop-blur-sm hover:text-paper"
                >
                  {full ? <Minimize2 className="size-4" /> : <Maximize2 className="size-4" />}
                </button>

                {/* Hotspots */}
                <div className="absolute inset-x-3 bottom-3 flex flex-wrap items-end gap-2">
                  {HOTSPOTS.map((h) => (
                    <button
                      key={h.label}
                      type="button"
                      onClick={() => focus(h.pos)}
                      className="min-h-11 rounded-sm px-4 py-2 text-[11px] font-semibold uppercase tracking-wider text-white shadow-lg transition-transform hover:-translate-y-0.5"
                      style={{ background: `linear-gradient(135deg, ${h.color}, ${h.deep})` }}
                    >
                      {h.label}
                    </button>
                  ))}
                  {/* Same chip treatment as the HUD/controls: the text sits over an
                      arbitrary 3D view, so it needs its own scrim to stay legible. */}
                  <p className="ml-auto hidden rounded-md border border-white/10 bg-black/40 px-3 py-2 text-[10px] uppercase tracking-widest text-paper/90 backdrop-blur-sm sm:block">
                    Drag to orbit · Scroll to zoom · Right-drag to pan
                  </p>
                </div>
              </Boundary>
            ) : webgl ? null : (
              <Fallback />
            )}
          </div>

          <p className={full ? 'px-4 py-3 text-xs text-paper/80' : 'mt-4 text-xs text-paper/80'}>
            3D model: “Modern apartment interior” by{' '}
            <a
              href="https://sketchfab.com/Katydid."
              target="_blank"
              rel="noopener noreferrer"
              className="underline underline-offset-2 hover:text-paper"
            >
              Katydid
            </a>{' '}
            ·{' '}
            <a
              href="https://sketchfab.com/3d-models/modern-apartment-interior-400c9069181a4342a7142433dfa3466e"
              target="_blank"
              rel="noopener noreferrer"
              className="underline underline-offset-2 hover:text-paper"
            >
              source
            </a>{' '}
            ·{' '}
            <a
              href="https://creativecommons.org/licenses/by/4.0/"
              target="_blank"
              rel="noopener noreferrer"
              className="underline underline-offset-2 hover:text-paper"
            >
              CC&nbsp;BY&nbsp;4.0
            </a>
            ; the original file was optimised (WebP textures, geometry weld/prune) for
            the web.
          </p>
        </div>
      </div>
    </section>
  )
}
