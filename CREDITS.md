# Credits & Licensing

This project is an original work. Third-party assets are listed below with their
licences and sources. Original source code is MIT-licensed (see `LICENSE`); these
assets are **not** covered by MIT.

## 3D model — CC-BY 4.0

- **"Modern apartment interior"** by **Katydid** (Sketchfab user `Katydid.`)
  Source: <https://sketchfab.com/3d-models/modern-apartment-interior-400c9069181a4342a7142433dfa3466e>
  Licence: **Creative Commons Attribution 4.0 International (CC-BY 4.0)** — free to
  use and adapt, including commercially, **with attribution**.
  File: `public/apartment.glb` (optimised from the original download with @gltf-transform).
  Attribution is displayed on the site within the "Virtual Experience" section.

## Photography — Unsplash License

All interior/architecture photographs are sourced from
[Unsplash](https://unsplash.com/) and used under the
[Unsplash License](https://unsplash.com/license) (free for commercial use; attribution
is **not** required). Every image was downloaded at build time and is served locally
from `public/images/` — none are hotlinked at runtime.

The exact Unsplash source photo IDs used are recorded in the fetch scripts, which are
the authoritative, verifiable download log:

- `scripts/fetch-images.mjs`
- `scripts/retry-images.mjs` (alternate IDs used when a first choice was unavailable)
- `scripts/verify-credits.mjs` (content-matches each local file back to its source ID)

`verify-credits.mjs` byte-matches most files, but Unsplash's CDN re-encodes JPEGs on
download, so a handful of local files no longer hash to a single candidate ID; the
scripts above remain the record of what was requested.

`public/og-image.jpg` is a copy of `public/images/hero-1.jpg` (same Unsplash source).

## Typeface — SIL Open Font License 1.1

- **Rubik**, designed by Hubert & Fischer, licensed under the SIL Open Font
  License 1.1 ([specimen](https://fonts.google.com/specimen/Rubik),
  [source](https://github.com/google/fonts/tree/main/ofl/rubik)).
  Self-hosted on this site via [`@fontsource/rubik`](https://github.com/fontsource/fontsource).

## Icons — ISC

- **Lucide** (`lucide-react`), ISC licence.

## Frameworks / libraries

React, Vite, Tailwind CSS, Framer Motion, three.js / @react-three/fiber / @react-three/drei,
lucide-react — each under their respective open-source licences (MIT / ISC / Apache).
