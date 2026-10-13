// One-time asset fetcher: downloads licensed Unsplash interior photographs
// into /public/images so the production site serves them locally (no hotlinking).
// Unsplash License: free for commercial use, attribution not required.
// Run: node scripts/fetch-images.mjs
import { mkdir, writeFile } from 'node:fs/promises'
import { existsSync } from 'node:fs'

const OUT = new URL('../public/images/', import.meta.url)
if (!existsSync(OUT)) await mkdir(OUT, { recursive: true })

// target filename -> Unsplash photo id (interiors/architecture)
const ASSETS = {
  'hero-1': '1618221195710-dd6b41faaea6',
  'hero-2': '1616486338812-3dadae4b4ace',
  'hero-3': '1600585154340-be6161a56a0c',
  'hero-4': '1505691938895-1758d7feb511',
  'hero-5': '1522708323590-d24dbb6b0267',
  'style-1': '1586023492125-27b2c045efd7',
  'style-2': '1600607687939-ce8a6c25118c',
  'style-3': '1616595182402-e9684bb2ea39',
  'proj-1a': '1600566753086-00f18fb6b3ea',
  'proj-1b': '1600210492486-724fe5c07fb3',
  'proj-2a': '1556911220-bff31c812dba',
  'proj-2b': '1484101403633-562f891dc89a',
  'proj-3a': '1595526114035-0d45ed16cfbf',
  'proj-3b': '1600121769074-eb4e9f8628ae',
  'services-bg': '1617806118547-26f17514682e',
  'client-1': '1600489000022-c2086d79f9d4',
  'client-2': '1615874959474-d609969a22ed',
}

const url = (id) =>
  `https://images.unsplash.com/photo-${id}?auto=format&fit=crop&fm=jpg&q=72&w=1600`

let ok = 0
const failed = []
for (const [name, id] of Object.entries(ASSETS)) {
  try {
    const res = await fetch(url(id), { headers: { 'User-Agent': 'hearth-form-build/1.0' } })
    if (!res.ok) throw new Error(`HTTP ${res.status}`)
    const buf = Buffer.from(await res.arrayBuffer())
    if (buf.length < 5000) throw new Error(`too small (${buf.length}B)`)
    await writeFile(new URL(`${name}.jpg`, OUT), buf)
    console.log(`OK   ${name}.jpg  ${(buf.length / 1024).toFixed(0)}KB`)
    ok++
  } catch (e) {
    console.log(`FAIL ${name}  <- ${id}  (${e.message})`)
    failed.push(name)
  }
}
console.log(`\nDownloaded ${ok}/${Object.keys(ASSETS).length}. Failed: ${failed.join(', ') || 'none'}`)
