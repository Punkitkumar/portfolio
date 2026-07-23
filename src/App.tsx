import { useLenis } from "./hooks/useLenis"
import { Nav } from "./components/Nav"
import { Hero } from "./components/Hero"
import { About } from "./components/About"
import { Domains } from "./components/Domains"
import { Experience } from "./components/Experience"
import { Skills } from "./components/Skills"
import { Projects } from "./components/Projects"
import { More } from "./components/More"
import { Contact } from "./components/Contact"
import { CursorTrail } from "./components/CursorTrail"
import { FloatingOrbs } from "./components/FloatingOrbs"
import { VisitorsAdmin } from "./components/VisitorsAdmin"

export default function App() {
  useLenis()

  return (
    <>
      <CursorTrail />
      <FloatingOrbs />
      <Nav />
      <main>
        <Hero />
        <About />
        <Domains />
        <Experience />
        <Skills />
        <Projects />
        <More />
        <Contact />
      </main>
      <VisitorsAdmin />
    </>
  )
}
