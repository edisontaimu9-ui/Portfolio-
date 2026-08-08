import './index.css'
import { Suspense, lazy } from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { AuthProvider } from './context/AuthContext'
import Nav          from './components/Nav'
import Footer        from './components/Footer'
import ScrollToTop   from './pages/ScrollToTop'
import AnalyticsTracker from './pages/AnalyticsTracker'
import PageLayout    from './pages/PageLayout'
import Home          from './pages/Home'
import Blog          from './pages/Blog'
import BlogPost      from './pages/BlogPost'
import ProtectedRoute from './pages/admin/ProtectedRoute'

const About                 = lazy(() => import('./components/About'))
const Experience             = lazy(() => import('./components/Experience'))
const Skills                 = lazy(() => import('./components/Skills'))
const Projects                = lazy(() => import('./components/Projects'))
const NutritionFoundations = lazy(() => import('./components/NutritionFoundations'))
const NutritionSnapshot    = lazy(() => import('./components/NutritionSnapshot'))
const Opportunities         = lazy(() => import('./components/Opportunities'))
const Support                = lazy(() => import('./components/Support'))
const Contact                = lazy(() => import('./components/Contact'))

const Login       = lazy(() => import('./pages/admin/Login'))
const Dashboard    = lazy(() => import('./pages/admin/Dashboard'))
const PostEditor  = lazy(() => import('./pages/admin/PostEditor'))

export default function App() {
  return (
    <AuthProvider>
      <BrowserRouter basename={import.meta.env.BASE_URL}>
        <ScrollToTop />
        <AnalyticsTracker />
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

              {/* Public blog */}
              <Route path="/blog" element={<PageLayout title="Blog"><Blog /></PageLayout>} />
              <Route path="/blog/:slug" element={<BlogPost />} />

              {/* Admin (protected) */}
              <Route path="/admin/login" element={<Login />} />
              <Route path="/admin" element={<ProtectedRoute><Dashboard /></ProtectedRoute>} />
              <Route path="/admin/new" element={<ProtectedRoute><PostEditor /></ProtectedRoute>} />
              <Route path="/admin/edit/:id" element={<ProtectedRoute><PostEditor /></ProtectedRoute>} />

              <Route path="*" element={<Home />} />
            </Routes>
          </Suspense>
        </main>
        <Footer />
      </BrowserRouter>
    </AuthProvider>
  )
}
