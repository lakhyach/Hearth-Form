// Retry pass: for each still-missing asset, try a list of alternate Unsplash
// interior photo ids until one downloads successfully.
import { writeFile } from 'node:fs/promises'
const OUT = new URL('../public/images/', import.meta.url)

const NEED = {
  'style-3': [
    '1567767292278-a4f21aa2d39e',
    '1600585154526-990ddc5b0b75',
    '1560448204-e02f11c3d0e2',
  ],
  'proj-1b': [
    '1584622650111-993a426fbf0a',
    '1522771753035-45f9d52a760b',
    '1600166890320-... ',
  ],
  'proj-3b': [
    '1560185893-a55cbc8c57e8',
    '1618221195710-dd6b41faaea6',
    '1513694203232-219973ca8989',
  ],
  'services-bg': [
    '1618220179428-2289f84fab08',
    '1616486338812-3dadae4b4ace',
    '1600607686527-6fb886090705',
  ],
  'client-2': [
    '1615874959881-4d2d0b069a61',
    '1600566753190-3b82525610c0',
    '1616627562900-b33cd5918002',
  ],
}

const url = (id) =>
  `https://images.unsplash.com/photo-${id}?auto=format&fit=crop&fm=jpg&q=72&w=1600`

for (const [name, ids] of Object.entries(NEED)) {
  let done = false
  for (const id of ids) {
    try {
      const res = await fetch(url(id.trim()), { headers: { 'User-Agent': 'hearth-form-build/1.0' } })
      if (!res.ok) throw new Error(`HTTP ${res.status}`)
      const buf = Buffer.from(await res.arrayBuffer())
      if (buf.length < 5000) throw new Error('too small')
      await writeFile(new URL(`${name}.jpg`, OUT), buf)
      console.log(`OK   ${name}.jpg  <- ${id}  ${(buf.length / 1024).toFixed(0)}KB`)
      done = true
      break
    } catch (e) {
      console.log(`  try ${name} <- ${id} failed (${e.message})`)
    }
  }
  if (!done) console.log(`FAIL ${name}: no alternate worked`)
}
