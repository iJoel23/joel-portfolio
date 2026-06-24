import About from "./components/About"
import Contact from "./components/Contact"
import CursorGlow from "./components/CursorGlow"
import Footer from "./components/Footer"
import Hero from "./components/Hero"
import LanguageTransition from "./components/LanguageTransition"
import Navbar from "./components/Navbar"
import Projects from "./components/Projects"
import Skills from "./components/Skills"
import { ModalOpenProvider } from "./context/ModalOpenContext"

function App() {
  return (
    <ModalOpenProvider>
      <CursorGlow />
      <div className="relative z-10">
        <Navbar />
        <LanguageTransition>
          <Hero />
          <Projects />
          <About />
          <Skills />
          <Contact />
          <Footer />
        </LanguageTransition>
      </div>
    </ModalOpenProvider>
  )
}

export default App
