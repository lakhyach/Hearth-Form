# Hearth & Form

An original, portfolio-ready one-page website for an interior-design & space-styling
studio. It recreates the *visual experience* of a reference site — the editorial
typography, the calm warm palette, scroll reveals, the project/approach/service
interactions, and an interactive 3D apartment walkthrough — but as a fully distinct
brand with its own name, identity, wording, logo, imagery, and implementation.

> **Live:** https://hearth-and-form.vercel.app

## Tech stack

- [Vite](https://vitejs.dev/) + [React 18](https://react.dev/)
- [Tailwind CSS v4](https://tailwindcss.com/) (design tokens via `@theme`)
- [Framer Motion](https://www.framer.com/motion/) for scroll/UI motion
- [React Three Fiber](https://r3f.docs.pmnd.rs/) + [drei](https://github.com/pmndrs/drei) + [three.js](https://threejs.org/) for the 3D scene
- [Lucide](https://lucide.dev/) icons
- Self-hosted [Rubik](https://rsms.me/inter/) typeface via `@fontsource`

## Sections

Hero (wordmark + crossfading interiors) · Studio/About · Style gallery (auto-advancing)
· Selected projects (grayscale→colour on hover) · Services (glass cards) · How we work
(hover-invert cells) · **Virtual Experience** (interactive 3D apartment with room
hotspots, orbit + zoom, live camera HUD, fullscreen) · Testimonials · Footer.

## Getting started

```bash
npm install
npm run dev        # local dev server
npm run build      # production build -> dist/
npm run preview    # preview the production build
npm run lint       # ESLint
```

## 3D model

- **Model:** "Modern apartment interior" by **Katydid** on Sketchfab
  <https://sketchfab.com/3d-models/modern-apartment-interior-400c9069181a4342a7142433dfa3466e>
- **License:** **CC-BY 4.0** (attribution required; commercial use permitted). Attribution
  is shown on the site at the 3D section.
- The source `.glb` was optimised with `@gltf-transform` (WebP textures, dedup, weld,
  prune) from ~10 MB to ~5.4 MB, keeping Draco compression **off** so the browser needs
  no extra decoder.
- The scene auto-frames the model (bounding-box normalisation), provides a loading
  progress bar, a no-WebGL fallback image, respects `prefers-reduced-motion`, and reserves
  an aspect-ratio box so there is no layout shift.

## Imagery

Interior photographs are sourced from [Unsplash](https://unsplash.com/) and served
locally from `public/images/` (no hotlinking). They are used under the
[Unsplash License](https://unsplash.com/license), which permits free commercial use
without attribution. Attribution is nevertheless provided in `CREDITS.md`.

## Typeface

Rubik, via [`@fontsource/rubik`](https://github.com/fontsource/font-srcols), is licensed
under the SIL Open Font License 1.1.

## Honesty notes

- The studio name, location, project names and testimonial text are **original
  portfolio/demo content** created for this project, not real client references.
- There is **no backend**. The newsletter is clearly labelled a demo form and opens the
  visitor's email app; the contact address uses a reserved `.example` domain.
- **No social-media accounts** are linked, because no verified official accounts for
  this brand exist (removed rather than faked).

## Accessibility & performance

- Semantic landmarks, a skip link, single H1, descriptive alt text, visible focus
  outlines, `aria-current` on the 3D room buttons, and `prefers-reduced-motion` support
  (instant anchors, reduced decorative animation).
- Self-hosted fonts (no third-party render-blocking), preloaded LCP hero image, lazy
  3D section, content-visibility on below-fold sections.

## Credits

See [`CREDITS.md`](./CREDITS.md).

## License

Original source code is released under the **MIT License** (see [`LICENSE`](./LICENSE)).
Third-party assets are **not** covered by MIT: the 3D model is CC-BY 4.0, photos are
Unsplash-licensed, and the typeface is OFL-1.1. See `CREDITS.md`.
