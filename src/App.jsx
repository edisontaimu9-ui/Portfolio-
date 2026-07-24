import './index.css'
import Nav          from './components/Nav'
import Hero         from './components/Hero'
import About        from './components/About'
import NutritionSnapshot from './components/NutritionSnapshot'
import Skills       from './components/Skills'
import Projects     from './components/Projects'
import Experience   from './components/Experience'
import Opportunities from './components/Opportunities'
import Contact      from './components/Contact'
import Footer       from './components/Footer'

export default function App() {
  return (
    <>
      <Nav />
      <main>
        <Hero />
        <About />
        <NutritionSnapshot />
        <Skills />
        <Projects />
        <Experience />
        <Opportunities />
        <Contact />
      </main>
      <Footer />
    </>
  )
}
