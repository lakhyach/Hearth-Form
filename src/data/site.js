// All site content for Hearth & Form — original copy written for this brand.
// Image paths point to locally-served, licensed assets in /public/images.

export const brand = {
  name: 'Hearth & Form',
  short: 'Hearth & Form',
  tagline: 'Living spaces for considered living',
  city: 'Copenhagen',
  founded: 2014,
  email: 'studio@hearthandform.example',
}

export const nav = [
  { label: 'Studio', href: '#studio' },
  { label: 'Projects', href: '#projects' },
  { label: 'Approach', href: '#approach' },
]

export const hero = {
  wordmark: 'HEARTH & FORM',
  left: 'Interior Architecture Studio ®',
  right: 'Living spaces for considered living',
  slides: [
    { src: '/images/hero-1.jpg', alt: 'Sunlit living room with a cream linen sofa and sage green wall' },
    { src: '/images/hero-2.jpg', alt: 'Dining area with an oak table and glass pendant lights' },
    { src: '/images/hero-3.jpg', alt: 'Open-plan kitchen with sage cabinetry and a stone island' },
    { src: '/images/hero-4.jpg', alt: 'Serene bedroom with linen bedding and soft morning light' },
    { src: '/images/hero-5.jpg', alt: 'Reading nook with a boucle armchair beside an arched window' },
  ],
}

export const about = {
  eyebrow: 'Since 2014',
  lead:
    'We’re Mira and Jonas, two architects who found our true calling in interior design. ' +
    'At Hearth & Form we believe a home is a form of care — for your habits, your calm, ' +
    'and your everyday life. We don’t just make rooms beautiful; we design interiors that ' +
    'feel alive, reflect who you are, and support you daily.',
  stats: [
    { value: '10+', label: 'years of combined design practice' },
    { value: '5,000+', label: 'm² designed across the Nordics and beyond' },
    { value: '100%', label: 'tailor-made interiors' },
    { value: '2', label: 'architects behind every detail' },
  ],
}

export const styles = [
  { title: 'Bold Choices', src: '/images/style-1.jpg', alt: 'Living room with rich colour and layered texture' },
  { title: 'Modern Living', src: '/images/style-2.jpg', alt: 'Clean modern interior with warm neutral tones' },
  { title: 'Calm Spaces', src: '/images/style-3.jpg', alt: 'Quiet minimal bedroom in soft natural light' },
]

export const projects = [
  {
    name: 'Alder House',
    blurb: 'An intimate apartment composed around stillness, oak and natural light.',
    location: 'Frederiksberg, Copenhagen',
    size: '72 m²',
    images: [
      { src: '/images/proj-1a.jpg', alt: 'Alder House bathroom in stone and warm light' },
      { src: '/images/proj-1b.jpg', alt: 'Alder House detail with tactile materials' },
    ],
  },
  {
    name: 'Marlow Loft',
    blurb: 'A calm, open plan where minimalism meets warmth and everyday purpose.',
    location: 'Norrmalm, Stockholm',
    size: '58 m²',
    images: [
      { src: '/images/proj-2a.jpg', alt: 'Marlow Loft kitchen in muted green' },
      { src: '/images/proj-2b.jpg', alt: 'Marlow Loft dining corner' },
    ],
  },
  {
    name: 'Sorrel Flat',
    blurb: 'A compact home with comforting tones and clever, generous zoning.',
    location: 'Amager, Copenhagen',
    size: '54 m²',
    images: [
      { src: '/images/proj-3a.jpg', alt: 'Sorrel Flat bedroom in soft linen' },
      { src: '/images/proj-3b.jpg', alt: 'Sorrel Flat reading corner' },
    ],
  },
]

export const services = {
  eyebrow: 'Our Services [04]',
  intro:
    'Four design packages tailored to your needs, goals and project stage — from space ' +
    'planning to full, turnkey realisation.',
  packages: [
    {
      name: 'Layout Planning',
      price: '$45 / m²',
      includes: [
        'Site visit and measured survey',
        '3–4 planning options tailored to your lifestyle',
        '3D layout of the selected option',
        'Basic furniture drawings',
      ],
    },
    {
      name: 'Technical Project',
      price: '$55 / m²',
      includes: ['Everything in Layout Planning', 'Full technical documentation for the builder'],
    },
    {
      name: 'Concept & Technical',
      price: '$65 / m²',
      includes: ['Everything in Technical Project', 'Visual moodboards and colour & material palettes'],
    },
    {
      name: 'Full Design & Realisation',
      price: '$95 / m²',
      includes: [
        'Everything in Concept & Technical',
        'Photorealistic 3D visualisation of every room',
        'Furniture procurement and styling',
        'On-site supervision through to handover',
      ],
    },
  ],
}

export const approach = {
  eyebrow: 'How We Work',
  steps: [
    { title: 'Introduction & Discovery', items: ['Online meeting', 'Walk-through of a past project', 'Your vision, needs and budget', 'A good-fit conversation'] },
    { title: 'Site Visit & Survey', items: ['On-site measurements', 'Contract and brief', 'Client questionnaire', 'Measured floor plan'] },
    { title: 'Layout Planning', items: ['3–4 planning options', 'Revisions and final approval', '3D model of the chosen layout'] },
    { title: 'Concept Development', items: ['Mood and inspiration', 'A personalised interior concept', 'Furniture and materials within budget'] },
    { title: 'Visualisation & Technical', items: ['Photorealistic 3D for each room', 'Full technical drawings', 'Detailed item-by-item budget'] },
    { title: 'Delivery & Support', items: ['Digital and printed project album', 'Renovation support', 'Up to 2 years after completion'] },
  ],
}

export const testimonials = [
  {
    quote: 'They designed not just a home — but a feeling.',
    body:
      'We found Hearth & Form through their past work and knew we wanted to collaborate. ' +
      'They were kind, responsive and attentive, and guided us toward a natural style that ' +
      'quietly elevated our whole vision.',
    author: 'Ola & Mette H.',
    place: 'Copenhagen',
    image: '/images/client-1.jpg',
    alt: 'Warm living room from the Copenhagen project',
  },
  {
    quote: 'I finally enjoy coming home.',
    body:
      'I thought my flat had no potential. The layout options I hadn’t considered completely ' +
      'changed how I live — every corner is now intentional and functional, yet soft and bright.',
    author: 'Sofia L.',
    place: 'Stockholm',
    image: '/images/client-2.jpg',
    alt: 'Dining corner from the Stockholm project',
  },
  {
    quote: 'Calm, capable and genuinely collaborative.',
    body:
      'From first meeting to final styling, the process was transparent and calm. The technical ' +
      'drawings made our builder’s job easy, and the finished space is even better than the renders.',
    author: 'Anders K.',
    place: 'Aarhus',
    image: '/images/client-1.jpg',
    alt: 'Interior detail from the Aarhus project',
  },
]

export const footer = {
  blurb:
    'Thoughtful interiors for considered living. Based in Copenhagen, working across the Nordics and beyond.',
  website: [
    { label: 'Studio', href: '#studio' },
    { label: 'Projects', href: '#projects' },
    { label: 'Approach', href: '#approach' },
  ],
}
