// Single source of truth for page titles and meta descriptions.
// Used by the React app (src/pages/PageLayout.jsx, Home.jsx) AND by the
// build-time prerender script (scripts/generate-static-html.mjs), so the
// <title> a crawler reads in the raw HTML matches what the browser shows
// after React mounts. Keep this file free of JSX/browser APIs: Node imports it.

export const HOME_TITLE = 'Edison Taimu — Dietitian & Clinical Nutrition Software Builder, Malawi'

export const PAGE_SEO = {
  '/about': {
    title: 'About Edison Taimu — Dietitian & Clinical Nutrition Developer',
    description: 'Malawian dietitian in Zomba with a BSc in Nutrition & Dietetics (Hons) from KUHeS, building free clinical nutrition software for Malawi.',
  },
  '/projects': {
    title: 'Projects: Oasis CNST, Thanzi & Chakudya | Edison Taimu',
    description: 'Oasis CNST, Thanzi, DietitianOS, NCRS and the Chakudya Nutrition Registry: clinical nutrition tools and open food data built for Malawi.',
  },
  '/skills': {
    title: 'Skills: Dietetics & Software Development | Edison Taimu',
    description: 'Clinical dietetics and full-stack development: the tools and technologies used to build clinical nutrition software, from mobile apps to backend.',
  },
  '/experience': {
    title: 'Experience: Clinical Nutrition & Software | Edison Taimu',
    description: 'Ward rotations and the Nutrition Care Process, plus independent development of clinical nutrition software used in real clinical settings.',
  },
  '/impact': {
    title: 'Impact: Nutrition in Malawi & Tools Built | Edison Taimu',
    description: 'Malawi\u2019s nutrition indicators and the case for accessible nutrition care, alongside the reach of the clinical nutrition tools built for Malawi.',
  },
  '/opportunities': {
    title: 'Open to Dietetic Internship Placements | Edison Taimu',
    description: 'Edison Taimu is seeking dietetic internship and supervised practice placements in clinical and community nutrition, based in Zomba, Malawi.',
  },
  '/support': {
    title: 'Support Free Clinical Nutrition Software | Edison Taimu',
    description: 'Ways to support the free clinical nutrition software built for Malawi, and keep these tools running.',
  },
  '/contact': {
    title: 'Contact Edison Taimu — Dietitian in Zomba, Malawi',
    description: 'Get in touch with Edison Taimu about internship enquiries, collaborations, or problems worth solving in low-resource clinical settings.',
  },
  '/blog': {
    title: 'Blog: Clinical Nutrition & Building for Malawi | Edison Taimu',
    description: 'Writing on clinical nutrition, dietetics, and the health-tech tools built to support it in Malawi.',
  },
}

// '/about/' or '/about' -> '/about'; '/' stays '/'
export function seoForPath(pathname) {
  const clean = pathname.replace(/\/+$/, '') || '/'
  return PAGE_SEO[clean]
}
