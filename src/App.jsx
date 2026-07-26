import './index.css'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Nav          from './components/Nav'
import Footer        from './components/Footer'
import ScrollToTop   from './pages/ScrollToTop'
import PageLayout    from './pages/PageLayout'
import Home          from './pages/Home'
import About        from './components/About'
import Experience   from './components/Experience'
import Skills       from './components/Skills'
import Projects     from './components/Projects'
import NutritionFoundations from './components/NutritionFoundations'
import NutritionSnapshot from './components/NutritionSnapshot'
import Opportunities from './components/Opportunities'
import Support       from './components/Support'
import Contact       from './components/Contact'

export default function App() {
  return (
    <BrowserRouter basename={import.meta.env.BASE_URL}>
      <ScrollToTop />
      <Nav />
      <main>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<PageLayout><About /></PageLayout>} />
          <Route path="/projects" element={<PageLayout><Projects /></PageLayout>} />
          <Route path="/skills" element={<PageLayout><Skills /></PageLayout>} />
          <Route path="/experience" element={<PageLayout><Experience /></PageLayout>} />
          <Route path="/impact" element={<PageLayout><NutritionSnapshot /><NutritionFoundations /></PageLayout>} />
          <Route path="/opportunities" element={<PageLayout><Opportunities /></PageLayout>} />
          <Route path="/support" element={<PageLayout><Support /></PageLayout>} />
          <Route path="/contact" element={<PageLayout><Contact /></PageLayout>} />
          <Route path="*" element={<Home />} />
        </Routes>
      </main>
      <Footer />
    </BrowserRouter>
  )
}
