import './index.css'
import { Suspense, lazy } from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Nav          from './components/Nav'
import Footer        from './components/Footer'
import ScrollToTop   from './pages/ScrollToTop'
import PageLayout    from './pages/PageLayout'
import Home          from './pages/Home'

const About                 = lazy(() => import('./components/About'))
const Experience             = lazy(() => import('./components/Experience'))
const Skills                 = lazy(() => import('./components/Skills'))
const Projects                = lazy(() => import('./components/Projects'))
const NutritionFoundations = lazy(() => import('./components/NutritionFoundations'))
const NutritionSnapshot    = lazy(() => import('./components/NutritionSnapshot'))
const Opportunities         = lazy(() => import('./components/Opportunities'))
const Support                = lazy(() => import('./components/Support'))
const Contact                = lazy(() => import('./components/Contact'))

export default function App() {
  return (
    <BrowserRouter basename={import.meta.env.BASE_URL}>
      <ScrollToTop />
      <Nav />
      <main>
        <Suspense fallback={<div style={{ minHeight: '60vh' }} />}>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/about" element={<PageLayout title="About"><About /></PageLayout>} />
            <Route path="/projects" element={<PageLayout title="Projects"><Projects /></PageLayout>} />
            <Route path="/skills" element={<PageLayout title="Skills"><Skills /></PageLayout>} />
            <Route path="/experience" element={<PageLayout title="Experience"><Experience /></PageLayout>} />
            <Route path="/impact" element={<PageLayout title="Impact"><NutritionSnapshot /><NutritionFoundations /></PageLayout>} />
            <Route path="/opportunities" element={<PageLayout title="Opportunities"><Opportunities /></PageLayout>} />
            <Route path="/support" element={<PageLayout title="Support"><Support /></PageLayout>} />
            <Route path="/contact" element={<PageLayout title="Contact"><Contact /></PageLayout>} />
            <Route path="*" element={<Home />} />
          </Routes>
        </Suspense>
      </main>
      <Footer />
    </BrowserRouter>
  )
}
