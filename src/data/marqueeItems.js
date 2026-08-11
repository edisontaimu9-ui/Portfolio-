// Data for HealthTechMarquee. One deliberately mixed sequence — technology
// and clinical/nutrition items are interleaved throughout rather than
// grouped, so the marquee reads as one identity, not separate categories.
//
// Every icon here is either a real, verified brand logo from `react-icons`
// (checked against the simple-icons/heroicons source lists) or a generic
// clinical/nutrition symbol from `../components/icons/MarqueeIcons`. The
// earlier custom Malawi/Africa/maize glyphs were invented shapes, not real
// recognizable icons, so they've been removed rather than reworked —
// PubMed and ORCID (real research-identity logos) take their place.
//
// Each item carries a fixed `color` (brand color for tech and research
// logos, a thematic accent for clinical/nutrition icons) — the same
// pattern already used for the tool icons in Skills.jsx.

import {
  SiFlutter, SiPython, SiGithub, SiDart, SiReact, SiTypescript,
  SiDocker, SiCloudflare, SiJavascript, SiGit, SiPubmed, SiOrcid,
} from 'react-icons/si'
import {
  HiOutlineDevicePhoneMobile, HiOutlineCircleStack, HiOutlineCommandLine,
  HiOutlineGlobeAlt, HiOutlineSparkles,
} from 'react-icons/hi2'
import {
  StethoscopeIcon, HeartPulseIcon, BrainIcon, DnaIcon, KidneyIcon,
  MedicalCrossIcon, MicroscopeIcon, MedicalDocIcon, GlucoseDropIcon,
  PlateIcon, AppleIcon, LeafIcon, NutritionLabelIcon, ScaleIcon,
  WaterDropIcon, DripBagIcon,
} from '../components/icons/MarqueeIcons'

export const marqueeItems = [
  { Icon: SiFlutter,        label: 'Flutter',     color: '#02569B' },
  { Icon: KidneyIcon,       label: 'Kidney',      color: '#E11D48' },
  { Icon: SiPubmed,         label: 'PubMed',      color: '#326599' },
  { Icon: SiPython,         label: 'Python',      color: '#3776AB' },
  { Icon: AppleIcon,        label: 'Fruit',       color: '#E11D48' },
  { Icon: SiGithub,         label: 'GitHub',      color: '#8B8B93' },
  { Icon: StethoscopeIcon,  label: 'Clinical',    color: '#0EA5E9' },
  { Icon: SiOrcid,          label: 'ORCID',       color: '#A6CE39' },
  { Icon: SiDart,           label: 'Dart',        color: '#0175C2' },
  { Icon: NutritionLabelIcon, label: 'Nutrition Facts', color: '#64748B' },
  { Icon: HiOutlineSparkles, label: 'AI',         color: '#A78BFA' },
  { Icon: HeartPulseIcon,   label: 'ECG',         color: '#F43F5E' },
  { Icon: SiReact,          label: 'React',       color: '#61DAFB' },
  { Icon: SiTypescript,     label: 'TypeScript',  color: '#3178C6' },
  { Icon: LeafIcon,         label: 'Leaf',        color: '#22C55E' },
  { Icon: SiDocker,         label: 'Docker',      color: '#2496ED' },
  { Icon: PlateIcon,        label: 'Healthy Plate', color: '#F59E0B' },
  { Icon: DnaIcon,          label: 'DNA',         color: '#10B981' },
  { Icon: SiCloudflare,     label: 'Cloudflare',  color: '#F38020' },
  { Icon: ScaleIcon,        label: 'Weighing Scale', color: '#0EA5E9' },
  { Icon: SiJavascript,     label: 'JavaScript',  color: '#F7DF1E' },
  { Icon: BrainIcon,        label: 'Brain',       color: '#8B5CF6' },
  { Icon: SiGit,            label: 'Git',         color: '#F05032' },
  { Icon: WaterDropIcon,    label: 'Hydration',   color: '#38BDF8' },
  { Icon: MicroscopeIcon,   label: 'Lab',         color: '#6366F1' },
  { Icon: HiOutlineDevicePhoneMobile, label: 'Mobile Dev', color: '#8B8B93' },
  { Icon: DripBagIcon,      label: 'Clinical Nutrition', color: '#06B6D4' },
  { Icon: HiOutlineCircleStack, label: 'Database', color: '#8B8B93' },
  { Icon: MedicalCrossIcon, label: 'Medical',     color: '#EF4444' },
  { Icon: GlucoseDropIcon,  label: 'Glucose',     color: '#DC2626' },
  { Icon: HiOutlineCommandLine, label: 'Terminal', color: '#8B8B93' },
  { Icon: HiOutlineGlobeAlt, label: 'API',        color: '#8B8B93' },
  { Icon: MedicalDocIcon,   label: 'Charting',    color: '#64748B' },
]
