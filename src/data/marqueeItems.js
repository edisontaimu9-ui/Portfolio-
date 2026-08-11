// Data for HealthTechMarquee. Every item here is a real, verified logo —
// nothing generic or hand-drawn. Tech brand logos and research-platform
// logos come from `react-icons/si` (simple-icons).
//
// Earlier versions of this file mixed in generic symbol icons (a leaf,
// a stethoscope, a scale — Lucide/Heroicons glyphs with no real-world
// brand behind them) alongside actual logos. Those have been removed:
// if a concept has no real logo, it's out rather than faked with a
// generic icon standing in for it. That leaves a smaller, honest list —
// 10 tech logos plus 3 verified research-identity logos (PubMed, ORCID,
// ResearchGate). Nothing else in the "clinical/nutrition" space has a
// real, confirmed logo in this icon library, so nothing stands in for it.
//
// Each item carries its real brand color — the same pattern already
// used for the tool icons in Skills.jsx.

import {
  SiFlutter, SiPython, SiGithub, SiDart, SiReact, SiTypescript,
  SiDocker, SiCloudflare, SiJavascript, SiGit,
  SiPubmed, SiOrcid, SiResearchgate,
} from 'react-icons/si'

export const marqueeItems = [
  { Icon: SiFlutter,      label: 'Flutter',      color: '#02569B' },
  { Icon: SiPubmed,       label: 'PubMed',       color: '#326599' },
  { Icon: SiPython,       label: 'Python',       color: '#3776AB' },
  { Icon: SiGithub,       label: 'GitHub',       color: '#8B8B93' },
  { Icon: SiOrcid,        label: 'ORCID',        color: '#A6CE39' },
  { Icon: SiDart,         label: 'Dart',         color: '#0175C2' },
  { Icon: SiReact,        label: 'React',        color: '#61DAFB' },
  { Icon: SiResearchgate, label: 'ResearchGate', color: '#00CCBB' },
  { Icon: SiTypescript,   label: 'TypeScript',   color: '#3178C6' },
  { Icon: SiDocker,       label: 'Docker',       color: '#2496ED' },
  { Icon: SiCloudflare,   label: 'Cloudflare',   color: '#F38020' },
  { Icon: SiJavascript,   label: 'JavaScript',   color: '#F7DF1E' },
  { Icon: SiGit,          label: 'Git',          color: '#F05032' },
]
