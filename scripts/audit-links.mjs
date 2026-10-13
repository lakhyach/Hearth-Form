// Audit external destinations referenced by the site + docs (evidence, not assumptions).
const urls = [
  ['Sketchfab model (CC-BY attribution link)', 'https://sketchfab.com/3d-models/modern-apartment-interior-400c9069181a4342a7142433dfa3466e'],
  ['Unsplash license', 'https://unsplash.com/license'],
  ['CC-BY 4.0 deed', 'https://creativecommons.org/licenses/by/4.0/'],
  ['Live site /', 'https://hearth-and-form.vercel.app/'],
  ['Live GLB', 'https://hearth-and-form.vercel.app/apartment.glb'],
  ['Live OG image', 'https://hearth-and-form.vercel.app/og-image.jpg'],
  ['Live favicon', 'https://hearth-and-form.vercel.app/favicon.svg'],
  ['Canonical root (www-less)', 'https://hearth-and-form.vercel.app'],
  ['GitHub repo page', 'https://github.com/lakhyach/Hearth-Form'],
]
for (const [label, u] of urls) {
  try {
    const r = await fetch(u, { redirect: 'follow' })
    console.log(r.status, r.headers.get('content-type')?.slice(0, 40).padEnd(42), label, r.url !== u ? `(final: ${r.url})` : '')
  } catch (e) {
    console.log('ERR', label, e.message)
  }
}
