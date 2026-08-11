// Data for HealthTechMarquee. One deliberately mixed sequence — technology,
// clinical, nutrition and Malawi items are interleaved throughout rather
// than grouped, so the marquee reads as one identity, not four categories.
// Tech logos come from `react-icons` (already a project dependency);
// everything else is a custom icon from `../components/icons/MarqueeIcons`.

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
  { Icon: SiFlutter, label: 'Flutter' },
  { Icon: KidneyIcon },
  { Icon: MalawiMapIcon, label: 'Malawi' },
  { Icon: SiPython, label: 'Python' },
  { Icon: AppleIcon },
  { Icon: SiGithub },
  { Icon: StethoscopeIcon },
  { Icon: LakeWavesIcon, label: 'Lake Malawi' },
  { Icon: SiDart },
  { Icon: NutritionLabelIcon },
  { Icon: HiOutlineSparkles, label: 'AI' },
  { Icon: MaizeIcon },
  { Icon: HeartPulseIcon },
  { Icon: SiReact, label: 'React' },
  { Icon: SiTypescript },
  { Icon: LeafIcon },
  { Icon: BaobabIcon },
  { Icon: SiDocker },
  { Icon: PlateIcon },
  { Icon: DnaIcon },
  { Icon: SiCloudflare },
  { Icon: ScaleIcon },
  { Icon: AfricaIcon },
  { Icon: SiJavascript },
  { Icon: BrainIcon },
  { Icon: MalawiFlagIcon },
  { Icon: SiGit },
  { Icon: WaterDropIcon },
  { Icon: MicroscopeIcon },
  { Icon: HiOutlineDevicePhoneMobile },
  { Icon: DripBagIcon, label: 'Clinical nutrition' },
  { Icon: HiOutlineCircleStack },
  { Icon: MedicalCrossIcon },
  { Icon: GlucoseDropIcon },
  { Icon: HiOutlineCommandLine },
  { Icon: HiOutlineGlobeAlt },
  { Icon: MedicalDocIcon },
]
