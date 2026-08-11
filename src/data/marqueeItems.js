// Data for HealthTechMarquee. Every item here is a real, verified logo —
// nothing generic or hand-drawn. Tech brand logos and some research-
// platform logos (PubMed, ORCID, ResearchGate) come from `react-icons/si`
// (simple-icons). A few more real research logos — Google Scholar,
// Mendeley, Semantic Scholar, Scopus — aren't in simple-icons, so they
// come from Academicons instead (a CSS icon font loaded via CDN in
// index.html; see `../components/icons/Academicons`).
//
// Earlier versions of this file mixed in generic symbol icons (a leaf,
// a stethoscope, a scale — Lucide/Heroicons glyphs with no real-world
// brand behind them) alongside actual logos. Those stay removed: if a
// concept has no real logo, it's left out rather than faked with a
// generic icon standing in for it. A World Health Organization logo
// was also looked for and isn't available in either icon set, so it's
// not included — no substitute was used in its place.
//
// Each item carries its real brand color — the same pattern already
// used for the tool icons in Skills.jsx.

import {
  SiFlutter, SiPython, SiGithub, SiDart, SiReact, SiTypescript,
  SiDocker, SiCloudflare, SiJavascript, SiGit,
  SiPubmed, SiOrcid, SiResearchgate,
} from 'react-icons/si'
import {
  GoogleScholarIcon, MendeleyIcon, SemanticScholarIcon, ScopusIcon,
} from '../components/icons/Academicons'

export const marqueeItems = [
  { Icon: SiFlutter,        label: 'Flutter',         color: '#02569B' },
  { Icon: SiPubmed,         label: 'PubMed',          color: '#326599' },
  { Icon: SiPython,         label: 'Python',          color: '#3776AB' },
  { Icon: GoogleScholarIcon, label: 'Google Scholar', color: '#4285F4' },
  { Icon: SiGithub,         label: 'GitHub',          color: '#8B8B93' },
  { Icon: SiOrcid,          label: 'ORCID',           color: '#A6CE39' },
  { Icon: SiDart,           label: 'Dart',            color: '#0175C2' },
  { Icon: MendeleyIcon,     label: 'Mendeley',        color: '#9D1620' },
  { Icon: SiReact,          label: 'React',           color: '#61DAFB' },
  { Icon: SiResearchgate,   label: 'ResearchGate',    color: '#00CCBB' },
  { Icon: SiTypescript,     label: 'TypeScript',      color: '#3178C6' },
  { Icon: SemanticScholarIcon, label: 'Semantic Scholar', color: '#1857B6' },
  { Icon: SiDocker,         label: 'Docker',          color: '#2496ED' },
  { Icon: ScopusIcon,       label: 'Scopus',          color: '#E9711C' },
  { Icon: SiCloudflare,     label: 'Cloudflare',      color: '#F38020' },
  { Icon: SiJavascript,     label: 'JavaScript',      color: '#F7DF1E' },
  { Icon: SiGit,            label: 'Git',             color: '#F05032' },
]
