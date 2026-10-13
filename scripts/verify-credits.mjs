// Verify which Unsplash photo id each local image actually came from, by downloading
// every candidate id from the fetch/retry scripts and comparing bytes to the local file.
// Prints filename -> matched photo id (or NONE). Keeps credits honest/verifiable.
import { readFile } from 'node:fs/promises'
import { createHash } from 'node:crypto'

const DIR = new URL('../public/images/', import.meta.url)

// All candidate ids used across fetch-images.mjs + retry-images.mjs, per target file.
const CANDIDATES = {
  'hero-1': ['1618221195710-dd6b41faaea6', '1522708323590-d24dbb6b0267', '1505691938895-1758d7feb511', '1600585154340-be6161a56a0c', '1616486338812-3dadae4b4ace'],
  'hero-2': ['1616486338812-3dadae4b4ace', '1505691938895-1758d7feb511', '1522708323590-d24dbb6b0267', '1600585154340-be6161a56a0c', '1586023492125-27b2c045efd7'],
  'hero-3': ['1600585154340-be6161a56a0c', '1600607687920-4e1a9c122389', '1560114778-ec9ba51beb2f', '1600607687939-ce8a6c25118c'],
  'hero-4': ['1505691938895-1758d7feb511', '1567767292278-a4f21aa2d39e', '1600585154526-990ddc5b0b75', '1560448204-e02f11c3d0e2'],
  'hero-5': ['1522708323590-d24dbb6b0267', '1586023492125-27b2c045efd7', '1616594038964-0fe271041f12', '1618219908412-a212ab2457b0'],
  'style-1': ['1586023492125-27b2c045efd7', '1616594038964-0fe271041f12'],
  'style-2': ['1600607687939-ce8a6c25118c', '1616594038964-0fe271041f12', '1618219908412-a212ab2457b0', '1591445400289-22b9d9f43304'],
  'style-3': ['1616595182402-e9684bb2ea39', '1567767292278-a4f21aa2d39e', '1600585154526-990ddc5b0b75', '1560448204-e02f11c3d0e2'],
  'proj-1a': ['1600566753086-00f18fb6b3ea'],
  'proj-1b': ['1600210492486-724fe5c07fb3', '1584622650111-993a426fbf0a', '1522771753035-45f9d52a760b'],
  'proj-2a': ['1556911220-bff31c812dba', '1600607687903-268960e786df'],
  'proj-2b': ['1484101403633-562f891dc89a', '1556905644-3f5d8c2f6d9c', '1600489000022-c2086d79f9d4'],
  'proj-3a': ['1595526114035-0d45ed16cfbf', '1615874959474-d609969a22ed'],
  'proj-3b': ['1600121769074-eb4e9f8628ae', '1631679711274-363b653732a9', '1591445400289-22b9d9f43304', '159543296547-ea6a3a1631da'],
  'services-bg': ['1617806118547-26f17514682e', '1631679711274-363b653732a9', '1600121769074-eb4e9f8628ae'],
  'client-1': ['1600489000022-c2086d79f9d4', '1615874959474-d609969a22ed'],
  'client-2': ['1615874959474-d609969a22ed'],
}

const buf = async (name) => readFile(new URL(`${name}.jpg`, DIR))
const sha = (b) => createHash('sha1').update(b).digest('hex')
const fetchBuf = async (id) => {
  const r = await fetch(`https://images.unsplash.com/photo-${id}?auto=format&fit=crop&fm=jpg&q=72&w=1600`)
  if (!r.ok) throw new Error(r.status)
  return Buffer.from(await r.arrayBuffer())
}

for (const [name, ids] of Object.entries(CANDIDATES)) {
  let local
  try { local = sha(await buf(name)) } catch { console.log(`${name}: (file missing)`); continue }
  let found = 'NONE'
  for (const id of ids) {
    try { if (sha(await fetchBuf(id)) === local) { found = id; break } } catch { /* skip */ }
  }
  console.log(`${name}: photo-${found}`)
}
