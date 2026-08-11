// Academicons (https://jpswalsh.github.io/academicons/) is a CSS icon
// font for real academic/research-platform logos — Google Scholar,
// Mendeley, Semantic Scholar, Scopus, etc. — that aren't in simple-icons
// and so aren't available through react-icons. It's loaded via CDN in
// index.html (no npm dependency), and each icon is just a styled <i>
// with an "ai ai-<slug>" class, colored via the CSS `color` property.
//
// This factory wraps a slug into a component with the same shape as a
// react-icons component (accepts className/style), so it drops into
// HealthTechMarquee's existing `<Icon className="htm-icon" style={{color}} />`
// rendering with no special-casing needed there.

function academicon(slug) {
  return function AcademiconIcon({ className = '', style }) {
    return (
      <i
        className={`ai ai-${slug} htm-icon-font ${className}`.trim()}
        style={style}
        aria-hidden="true"
      />
    )
  }
}

export const GoogleScholarIcon = academicon('google-scholar')
export const MendeleyIcon = academicon('mendeley')
export const SemanticScholarIcon = academicon('semantic-scholar')
export const ScopusIcon = academicon('scopus')
