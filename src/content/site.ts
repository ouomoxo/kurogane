// Centralised content model. All public copy lives here, not in scene components
// (directive §17). Tone: formal, institutional, confident, quietly ominous.
// Arasaka describes itself only as a stabilising force. English + verified Japanese.
//
// NOTE: This is an in-universe FAN CONCEPT. No affiliation with CD PROJEKT RED or
// R. Talsorian Games. All figures are fictional concept data.

export interface NavItem {
  path: string
  label: string
  jp: string
  code: string
}

export const NAV: NavItem[] = [
  { path: '/corporation', label: 'Corporation', jp: '会社', code: 'DIV-01' },
  { path: '/security', label: 'Security', jp: '警備', code: 'DIV-02' },
  { path: '/intelligence', label: 'Intelligence', jp: '情報', code: 'DIV-03' },
  { path: '/advanced-systems', label: 'Advanced Systems', jp: '先端技術', code: 'DIV-04' },
  { path: '/continuity', label: 'Continuity', jp: '継承', code: 'DIV-05' },
  { path: '/global-network', label: 'Global Network', jp: '世界網', code: 'DIV-06' },
  { path: '/investors', label: 'Investors', jp: '投資家', code: 'DIV-07' },
  { path: '/careers', label: 'Careers', jp: '採用', code: 'DIV-08' },
  { path: '/contact', label: 'Contact', jp: '連絡', code: 'DIV-09' },
]

export const REGIONS = ['Tokyo', 'Night City', 'Pacific', 'Europe', 'Orbital'] as const

export const HERO = {
  eyebrow: 'Arasaka Secure Network · Public Access Node',
  classif: 'Identity Classification: External',
  title: 'Sovereignty, Secured.',
  jp: '株式会社アラサカ',
  lede: 'Arasaka protects the systems, institutions, and human continuities upon which civilization depends. For a century we have held what governments could not.',
  node: 'Node TYO-000 · Public',
}

export const CLOSING = {
  eyebrow: 'Institutional Statement',
  title: 'The future does not require permission.',
  lede: 'Order is not granted. It is maintained. Arasaka remains, as it has remained, the guarantor of continuity across every generation it has outlived.',
}

// Each numbered homepage sequence — spatial station + copy (directive §7).
export interface Sequence {
  id: string
  code: string
  eyebrow: string
  title: string
  jp: string
  body: string[]
}

export const SEQUENCES: Sequence[] = [
  {
    id: 'history',
    code: 'SEQ-02',
    eyebrow: 'Institutional History',
    title: 'A century of continuity',
    jp: '一世紀の継続',
    body: [
      'Founded in the aftermath of collapse, Arasaka was built to outlast the institutions it serves.',
      'Where states failed, the corporation held — through manufacturing, security, finance, and the custody of memory itself.',
    ],
  },
  {
    id: 'security',
    code: 'SEQ-03',
    eyebrow: 'Security Systems',
    title: 'Peace through deterrence',
    jp: '抑止による平和',
    body: [
      'Executive protection, infrastructure defense, and autonomous perimeter systems, operated as one sovereign apparatus.',
      'Deterrence is not the promise of force. It is the certainty of it.',
    ],
  },
  {
    id: 'intelligence',
    code: 'SEQ-04',
    eyebrow: 'Intelligence',
    title: 'Visibility is control',
    jp: '可視性こそ支配',
    body: [
      'Threat is a function of what remains unseen. Arasaka sees.',
      'Behavioral prediction, encrypted continuity, and threat classification across sovereign networks.',
    ],
  },
  {
    id: 'advanced-systems',
    code: 'SEQ-05',
    eyebrow: 'Advanced Systems',
    title: 'Designed beyond hesitation',
    jp: '躊躇なき精密',
    body: [
      'Precision robotics, secure identity hardware, and neural integration — machines built to exceed the moment a person would pause.',
      'Judgment is auditable after the fact. Never negotiated during it.',
    ],
  },
  {
    id: 'continuity',
    code: 'SEQ-06',
    eyebrow: 'Continuity',
    title: 'Legacy is no longer limited by biology',
    jp: '継承は生命を超える',
    body: [
      'An executive is an institution. An institution does not end with a body.',
      'Cognitive archives, secured identity, and controlled succession preserve what a lifetime cannot.',
    ],
  },
  {
    id: 'global-network',
    code: 'SEQ-07',
    eyebrow: 'Global Network',
    title: 'Operating above geography',
    jp: '地理を超えた運用',
    body: [
      'Nineteen sovereign corporate zones, strategic facilities on every continent, infrastructure beyond the reach of any single jurisdiction.',
      'Borders are administrative. Continuity is not.',
    ],
  },
]

// SEQ-08 — governance strip on the homepage (restrained; no racing counters).
export const GOV = {
  eyebrow: 'Governance · Investor Confidence',
  title: 'Power, translated into numbers',
  stats: [
    { k: 'Reporting since', v: '1991' },
    { k: 'Continuity index', v: 'AAA·L' },
    { k: 'Sovereign zones', v: '19' },
    { k: 'Volatility', v: 'Managed' },
  ],
}

export const FOOTER = {
  disclaimer:
    'PROJECT KUROGANE is an unofficial, in-universe fan concept. Not affiliated with, endorsed by, or licensed from CD PROJEKT RED or R. Talsorian Games. All corporate figures and statements are fictional.',
  seal: 'Arasaka Corporation · アラサカ社',
  established: 'Est. 1990 · Continuity Since',
}
