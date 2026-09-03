import './index.css'
import { Suspense, lazy } from 'react'
import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom'
import { AnimatePresence } from 'framer-motion'
import { AuthProvider } from './context/AuthContext'
import Nav          from './components/Nav'
import Footer        from './components/Footer'
import ScrollToTop   from './pages/ScrollToTop'
import AnalyticsTracker from './pages/AnalyticsTracker'
import ContentProtection from './components/ContentProtection'
import PageTransition from './components/PageTransition'
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

// Public-facing pages fade/slide between each other on navigation.
// Admin routes are deliberately left out of AnimatePresence — auth
// redirects there should be instant, not animated.
function AnimatedRoutes() {
  const location = useLocation()
  const page = (el) => <PageTransition>{el}</PageTransition>

  return (
    <AnimatePresence mode="wait">
      <Routes location={location} key={location.pathname}>
        <Route path="/" element={page(<Home />)} />
        <Route path="/about" element={page(<PageLayout title="About"><About /></PageLayout>)} />
        <Route path="/projects" element={page(<PageLayout title="Projects"><Projects /></PageLayout>)} />
        <Route path="/skills" element={page(<PageLayout title="Skills"><Skills /></PageLayout>)} />
        <Route path="/experience" element={page(<PageLayout title="Experience"><Experience /></PageLayout>)} />
        <Route path="/impact" element={page(<PageLayout title="Impact"><NutritionSnapshot /><NutritionFoundations /></PageLayout>)} />
        <Route path="/opportunities" element={page(<PageLayout title="Opportunities"><Opportunities /></PageLayout>)} />
        <Route path="/support" element={page(<PageLayout title="Support"><Support /></PageLayout>)} />
        <Route path="/contact" element={page(<PageLayout title="Contact"><Contact /></PageLayout>)} />

        {/* Public blog */}
        <Route path="/blog" element={page(<PageLayout title="Blog"><Blog /></PageLayout>)} />
        <Route path="/blog/:slug" element={page(<BlogPost />)} />

        {/* Admin (protected) — not wrapped in PageTransition */}
        <Route path="/admin/login" element={<Login />} />
        <Route path="/admin" element={<ProtectedRoute><Dashboard /></ProtectedRoute>} />
        <Route path="/admin/new" element={<ProtectedRoute><PostEditor /></ProtectedRoute>} />
        <Route path="/admin/edit/:id" element={<ProtectedRoute><PostEditor /></ProtectedRoute>} />

        <Route path="*" element={page(<Home />)} />
      </Routes>
    </AnimatePresence>
  )
}

export default function App() {
  return (
    <AuthProvider>
      <BrowserRouter basename={import.meta.env.BASE_URL}>
        <ScrollToTop />
        <AnalyticsTracker />
        <ContentProtection />
        <Nav />
        <main>
          <Suspense fallback={<div style={{ minHeight: '60vh' }} />}>
            <AnimatedRoutes />
          </Suspense>
        </main>
        <Footer />
      </BrowserRouter>
    </AuthProvider>
  )
}

