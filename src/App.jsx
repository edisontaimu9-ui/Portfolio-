import './index.css'
import Nav          from './components/Nav'
import Hero         from './components/Hero'
import About        from './components/About'
import Experience   from './components/Experience'
import Skills       from './components/Skills'
import Projects     from './components/Projects'
import NutritionFoundations from './components/NutritionFoundations'
import NutritionSnapshot from './components/NutritionSnapshot'
import Opportunities from './components/Opportunities'
import Contact       from './components/Contact'
import Footer        from './components/Footer'

export default function App() {
  return (
    <>
      <Nav />
      <main>
        <Hero />
        <About />
        <Experience />
        <Skills />
        <Projects />
        <NutritionFoundations />
        <NutritionSnapshot />
        <Opportunities />
        <Contact />
      </main>
      <Footer />
    </>
  )
}
