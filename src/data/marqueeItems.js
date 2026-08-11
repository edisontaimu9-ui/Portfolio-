// Data for HealthTechMarquee. One deliberately mixed sequence — technology,
// clinical, nutrition and Malawi items are interleaved throughout rather
// than grouped, so the marquee reads as one identity, not four categories.
// Tech logos come from `react-icons` (already a project dependency);
// everything else is a custom icon from `../components/icons/MarqueeIcons`.
//
// Each item carries a fixed `color` (brand color for tech, a thematic
// accent for clinical/nutrition/Malawi icons) — the same pattern already
// used for the tool icons in Skills.jsx, rather than a flat muted-gray
// treatment, so logos read at a glance instead of blending into the strip.

import {
  SiFlutter, SiPython, SiGithub, SiDart, SiReact, SiTypescript,
  SiDocker, SiCloudflare, SiJavascript, SiGit,
} from 'react-icons/si'
import {
  HiOutlineDevicePhoneMobile, HiOutlineCircleStack, HiOutlineCommandLine,
  HiOutlineGlobeAlt, HiOutlineSparkles,
} from 'react-icons/hi2'
import {
  StethoscopeIcon, HeartPulseIcon, BrainIcon, DnaIcon, KidneyIcon,
  MedicalCrossIcon, MicroscopeIcon, MedicalDocIcon, GlucoseDropIcon,
  PlateIcon, AppleIcon, LeafIcon, NutritionLabelIcon, ScaleIcon,
  WaterDropIcon, MaizeIcon, DripBagIcon, MalawiMapIcon, LakeWavesIcon,
  MalawiFlagIcon, BaobabIcon, AfricaIcon,
} from '../components/icons/MarqueeIcons'

export const marqueeItems = [
  { Icon: SiFlutter,        label: 'Flutter',     color: '#02569B' },
  { Icon: KidneyIcon,       label: 'Kidney',      color: '#E11D48' },
  { Icon: MalawiMapIcon,    label: 'Malawi',      color: '#178A75' },
  { Icon: SiPython,         label: 'Python',      color: '#3776AB' },
  { Icon: AppleIcon,        label: 'Fruit',       color: '#E11D48' },
  { Icon: SiGithub,         label: 'GitHub',      color: '#8B8B93' },
  { Icon: StethoscopeIcon,  label: 'Clinical',    color: '#0EA5E9' },
  { Icon: LakeWavesIcon,    label: 'Lake Malawi', color: '#0EA5E9' },
  { Icon: SiDart,           label: 'Dart',        color: '#0175C2' },
  { Icon: NutritionLabelIcon, label: 'Nutrition Facts', color: '#64748B' },
  { Icon: HiOutlineSparkles, label: 'AI',         color: '#A78BFA' },
  { Icon: MaizeIcon,        label: 'Maize',       color: '#EAB308' },
  { Icon: HeartPulseIcon,   label: 'ECG',         color: '#F43F5E' },
  { Icon: SiReact,          label: 'React',       color: '#61DAFB' },
  { Icon: SiTypescript,     label: 'TypeScript',  color: '#3178C6' },
  { Icon: LeafIcon,         label: 'Leaf',        color: '#22C55E' },
  { Icon: BaobabIcon,       label: 'Baobab',      color: '#B45309' },
  { Icon: SiDocker,         label: 'Docker',      color: '#2496ED' },
  { Icon: PlateIcon,        label: 'Healthy Plate', color: '#F59E0B' },
  { Icon: DnaIcon,          label: 'DNA',         color: '#10B981' },
  { Icon: SiCloudflare,     label: 'Cloudflare',  color: '#F38020' },
  { Icon: ScaleIcon,        label: 'Weighing Scale', color: '#0EA5E9' },
  { Icon: AfricaIcon,       label: 'Africa',      color: '#D97757' },
  { Icon: SiJavascript,     label: 'JavaScript',  color: '#F7DF1E' },
  { Icon: BrainIcon,        label: 'Brain',       color: '#8B5CF6' },
  { Icon: MalawiFlagIcon,   label: 'Malawi Flag', color: '#178A75' },
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
