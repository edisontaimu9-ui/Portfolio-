// Data for HealthTechMarquee. One deliberately mixed sequence — technology
// and clinical/nutrition items are interleaved throughout rather than
// grouped, so the marquee reads as one identity, not separate categories.
//
// Every icon here is a real, verified icon from `react-icons` — brand
// logos from simple-icons (`si`), Heroicons (`hi2`), or Lucide (`lu`).
// Earlier versions of this file included hand-drawn shapes for concepts
// with no real icon (a Malawi map, a kidney, a nutrition-facts label,
// a drip bag) — those have all been removed and replaced with the
// closest real, recognizable icon instead.
//
// Each item carries a fixed `color` (brand color for logos, a thematic
// accent for generic clinical/nutrition icons) — the same pattern
// already used for the tool icons in Skills.jsx.

import {
  SiFlutter, SiPython, SiGithub, SiDart, SiReact, SiTypescript,
  SiDocker, SiCloudflare, SiJavascript, SiGit, SiPubmed, SiOrcid,
} from 'react-icons/si'
import {
  HiOutlineDevicePhoneMobile, HiOutlineCircleStack, HiOutlineCommandLine,
  HiOutlineGlobeAlt, HiOutlineSparkles,
} from 'react-icons/hi2'
import {
  LuStethoscope, LuHeartPulse, LuBrain, LuDna, LuMicroscope,
  LuClipboardPlus, LuDroplets, LuPill, LuApple, LuLeaf, LuSalad,
  LuScale, LuSyringe, LuHospital, LuUtensilsCrossed,
} from 'react-icons/lu'

export const marqueeItems = [
  { Icon: SiFlutter,        label: 'Flutter',     color: '#02569B' },
  { Icon: LuStethoscope,    label: 'Clinical',    color: '#0EA5E9' },
  { Icon: SiPubmed,         label: 'PubMed',      color: '#326599' },
  { Icon: SiPython,         label: 'Python',      color: '#3776AB' },
  { Icon: LuApple,          label: 'Fruit',       color: '#E11D48' },
  { Icon: SiGithub,         label: 'GitHub',      color: '#8B8B93' },
  { Icon: LuHeartPulse,     label: 'ECG',         color: '#F43F5E' },
  { Icon: SiOrcid,          label: 'ORCID',       color: '#A6CE39' },
  { Icon: SiDart,           label: 'Dart',        color: '#0175C2' },
  { Icon: LuSalad,          label: 'Healthy Plate', color: '#F59E0B' },
  { Icon: HiOutlineSparkles, label: 'AI',         color: '#A78BFA' },
  { Icon: LuBrain,          label: 'Brain',       color: '#8B5CF6' },
  { Icon: SiReact,          label: 'React',       color: '#61DAFB' },
  { Icon: SiTypescript,     label: 'TypeScript',  color: '#3178C6' },
  { Icon: LuLeaf,           label: 'Leaf',        color: '#22C55E' },
  { Icon: SiDocker,         label: 'Docker',      color: '#2496ED' },
  { Icon: LuDna,            label: 'DNA',         color: '#10B981' },
  { Icon: SiCloudflare,     label: 'Cloudflare',  color: '#F38020' },
  { Icon: LuScale,          label: 'Weighing Scale', color: '#0EA5E9' },
  { Icon: SiJavascript,     label: 'JavaScript',  color: '#F7DF1E' },
  { Icon: LuMicroscope,     label: 'Lab',         color: '#6366F1' },
  { Icon: SiGit,            label: 'Git',         color: '#F05032' },
  { Icon: LuDroplets,       label: 'Hydration',   color: '#38BDF8' },
  { Icon: LuHospital,       label: 'Ward',        color: '#EF4444' },
  { Icon: HiOutlineDevicePhoneMobile, label: 'Mobile Dev', color: '#8B8B93' },
  { Icon: LuSyringe,        label: 'Clinical Nutrition', color: '#06B6D4' },
  { Icon: HiOutlineCircleStack, label: 'Database', color: '#8B8B93' },
  { Icon: LuPill,           label: 'Medication',  color: '#DC2626' },
  { Icon: HiOutlineCommandLine, label: 'Terminal', color: '#8B8B93' },
  { Icon: HiOutlineGlobeAlt, label: 'API',        color: '#8B8B93' },
  { Icon: LuClipboardPlus,  label: 'Charting',    color: '#64748B' },
  { Icon: LuUtensilsCrossed, label: 'Dietetics',  color: '#F59E0B' },
]
