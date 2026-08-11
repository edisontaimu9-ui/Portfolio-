import { marqueeItems } from '../data/marqueeItems'

// A continuous, theme-aware strip of mixed tech / clinical / nutrition /
// Malawi icons that travels along a section's top edge — a quiet signature
// detail rather than a decorative carousel. Rendering logic only; the
// mixed sequence itself lives in `src/data/marqueeItems.js`.

const doubled = [...marqueeItems, ...marqueeItems]

export default function HealthTechMarquee({ edge = 'top' }) {
  return (
    <div className={`htm-marquee htm-marquee--${edge}`} aria-hidden="true">
      <div className="htm-fade htm-fade--left" />
      <div className="htm-fade htm-fade--right" />
      <div className="htm-track">
        {doubled.map(({ Icon, label, color }, i) => (
          <span className="htm-item" key={i}>
            <span className="htm-chip">
              <Icon className="htm-icon" style={{ color }} />
            </span>
            {label && <span className="htm-label">{label}</span>}
          </span>
        ))}
      </div>
    </div>
  )
}
