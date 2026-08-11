// Minimal, hand-drawn line icons for the clinical/nutrition/Malawi side of the
// HealthTechMarquee. Kept as inline SVGs (rather than an added icon package)
// so the marquee introduces zero new dependencies and every icon inherits
// `currentColor`, matching the tech icons pulled from `react-icons`.

function Base({ children, ...props }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.7"
      strokeLinecap="round"
      strokeLinejoin="round"
      {...props}
    >
      {children}
    </svg>
  )
}

export function StethoscopeIcon(props) {
  return (
    <Base {...props}>
      <path d="M4 3v4a4 4 0 0 0 4 4v0a4 4 0 0 0 4-4V3" />
      <path d="M12 11v3a5 5 0 0 0 10 0v-1" />
      <circle cx="20" cy="16" r="2.1" />
    </Base>
  )
}

export function HeartPulseIcon(props) {
  return (
    <Base {...props}>
      <path d="M3 12h4l2-6 3 12 2-9 2 3h5" />
    </Base>
  )
}

export function BrainIcon(props) {
  return (
    <Base {...props}>
      <path d="M9 4a3 3 0 0 0-3 3 3 3 0 0 0-2 5 3 3 0 0 0 2 5h1a3 3 0 0 0 3-3V6a2 2 0 0 0-1-2Z" />
      <path d="M15 4a3 3 0 0 1 3 3 3 3 0 0 1 2 5 3 3 0 0 1-2 5h-1a3 3 0 0 1-3-3V6a2 2 0 0 1 1-2Z" />
    </Base>
  )
}

export function DnaIcon(props) {
  return (
    <Base {...props}>
      <path d="M6 3c0 6 12 6 12 12" />
      <path d="M18 3c0 6-12 6-12 12" />
      <path d="M8 6h8M7 12h10M8 18h8" />
    </Base>
  )
}

export function KidneyIcon(props) {
  return (
    <Base {...props}>
      <path d="M9 3C5 3 4 8 5 12c1 4-1 7 2 8 3 1 5-2 5-6 0-3 2-3 2-6 0-3-2-5-5-5Z" />
    </Base>
  )
}

export function MedicalCrossIcon(props) {
  return (
    <Base {...props}>
      <rect x="3" y="3" width="18" height="18" rx="4" />
      <path d="M12 8v8M8 12h8" />
    </Base>
  )
}

export function MicroscopeIcon(props) {
  return (
    <Base {...props}>
      <path d="M8 21h8" />
      <path d="M12 21v-5" />
      <path d="M9 16h6l-1-4h-4l-1 4Z" />
      <path d="M13 12V6a2 2 0 1 0-4 0" />
      <circle cx="9" cy="6" r="1.5" />
    </Base>
  )
}

export function MedicalDocIcon(props) {
  return (
    <Base {...props}>
      <rect x="5" y="3" width="14" height="18" rx="2" />
      <path d="M9 8h6M9 12h6M9 16h3" />
      <path d="M15.5 15.5v3M14 17h3" />
    </Base>
  )
}

export function GlucoseDropIcon(props) {
  return (
    <Base {...props}>
      <path d="M12 3c4 5 6 8 6 11a6 6 0 0 1-12 0c0-3 2-6 6-11Z" />
      <path d="M9.5 15h5" />
    </Base>
  )
}

export function PlateIcon(props) {
  return (
    <Base {...props}>
      <circle cx="12" cy="12" r="9" />
      <path d="M12 3v9l7 4" />
    </Base>
  )
}

export function AppleIcon(props) {
  return (
    <Base {...props}>
      <path d="M12 8c-3-4-8-2-8 3 0 5 4 9 8 9s8-4 8-9c0-5-5-7-8-3Z" />
      <path d="M12 8V5" />
      <path d="M12 5c0-1 1-2 2-2" />
    </Base>
  )
}

export function LeafIcon(props) {
  return (
    <Base {...props}>
      <path d="M20 4C10 4 4 10 4 18c8 0 14-6 14-14Z" />
      <path d="M6 18c4-4 8-6 12-10" />
    </Base>
  )
}

export function NutritionLabelIcon(props) {
  return (
    <Base {...props}>
      <rect x="6" y="3" width="12" height="18" rx="1.5" />
      <path d="M8 7h8M8 10h8M8 13h5M8 16h6" />
    </Base>
  )
}

export function ScaleIcon(props) {
  return (
    <Base {...props}>
      <rect x="4" y="14" width="16" height="7" rx="1.5" />
      <circle cx="12" cy="8" r="4" />
      <path d="M12 12v2" />
    </Base>
  )
}

export function WaterDropIcon(props) {
  return (
    <Base {...props}>
      <path d="M12 3c4 5 6 8 6 11a6 6 0 0 1-12 0c0-3 2-6 6-11Z" />
      <path d="M9.5 14.5c1 1 4 1 5 0" />
    </Base>
  )
}

export function MaizeIcon(props) {
  return (
    <Base {...props}>
      <rect x="9" y="3" width="6" height="16" rx="3" />
      <path d="M9 7h6M9 10h6M9 13h6M9 16h6" />
      <path d="M12 19v2" />
    </Base>
  )
}

export function DripBagIcon(props) {
  return (
    <Base {...props}>
      <path d="M8 3h8l-1 6a3 3 0 0 1-6 0L8 3Z" />
      <path d="M12 9v6" />
      <path d="M10 21h4l-1-6h-2l-1 6Z" />
    </Base>
  )
}

export function MalawiMapIcon(props) {
  return (
    <Base {...props}>
      <path d="M10 2c1 3 0 4 2 5s1 3 3 4-1 3 1 4-2 3 0 4-3 2-3 4-2 1-3-1-1-4-2-5 1-3-1-4 2-2 1-4 1-3 2-6Z" />
      <path d="M13 6c1 4 1 8-1 12" />
    </Base>
  )
}

export function LakeWavesIcon(props) {
  return (
    <Base {...props}>
      <path d="M3 8c2-2 4-2 6 0s4 2 6 0 4-2 6 0" />
      <path d="M3 13c2-2 4-2 6 0s4 2 6 0 4-2 6 0" />
      <path d="M3 18c2-2 4-2 6 0s4 2 6 0 4-2 6 0" />
    </Base>
  )
}

export function MalawiFlagIcon(props) {
  return (
    <Base {...props}>
      <rect x="3" y="4" width="18" height="16" rx="1.5" />
      <path d="M3 9.33h18M3 14.67h18" />
      <circle cx="12" cy="6.7" r="1.8" fill="currentColor" stroke="none" />
    </Base>
  )
}

export function BaobabIcon(props) {
  return (
    <Base {...props}>
      <path d="M12 21v-7" />
      <path d="M8 21h8" />
      <ellipse cx="12" cy="9" rx="6" ry="5" />
      <path d="M7 6 5 4M17 6l2-2M12 4V2" />
    </Base>
  )
}

export function AfricaIcon(props) {
  return (
    <Base {...props}>
      <path d="M11 2c3 0 4 2 6 3s3 3 2 5-3 2-3 4 2 3 1 5-3 3-3 5c0 2-2 3-3 1s0-4-2-5-4 0-5-2 1-4 0-6-3-3-2-5 3-2 4-4 2-1 5-1Z" />
    </Base>
  )
}
