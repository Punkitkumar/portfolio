import { useEffect, useState } from "react"
import { AnimatePresence, motion } from "framer-motion"
import { profile } from "../data/content"

const links = [
  { href: "#about", label: "About" },
  { href: "#domains", label: "Domains" },
  { href: "#experience", label: "Experience" },
  { href: "#skills", label: "Skills" },
  { href: "#projects", label: "Projects" },
  { href: "#contact", label: "Contact" },
]

export function Nav() {
  const [scrolled, setScrolled] = useState(false)
  const [open, setOpen] = useState(false)
  const [firstName, ...rest] = profile.name.split(" ")
  const lastName = rest.join(" ")

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24)
    onScroll()
    window.addEventListener("scroll", onScroll, { passive: true })
    return () => window.removeEventListener("scroll", onScroll)
  }, [])

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : ""
    return () => {
      document.body.style.overflow = ""
    }
  }, [open])

  return (
    <>
      <motion.header
        className={`nav ${scrolled || open ? "scrolled" : ""}`}
        initial={{ y: -16 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
      >
        <div className="nav-inner">
          <a className="nav-brand" href="#top" onClick={() => setOpen(false)}>
            {firstName} <span>{lastName}</span>
          </a>

          <ul className="nav-links">
            {links.map((l) => (
              <li key={l.href}>
                <a href={l.href}>{l.label}</a>
              </li>
            ))}
            <li>
              <a className="nav-cta" href={profile.linkedin} target="_blank" rel="noreferrer">
                LinkedIn
              </a>
            </li>
          </ul>

          <button
            className="nav-toggle"
            aria-label={open ? "Close menu" : "Open menu"}
            aria-expanded={open}
            onClick={() => setOpen((v) => !v)}
          >
            <span style={{ transform: open ? "translateY(7px) rotate(45deg)" : undefined }} />
            <span style={{ opacity: open ? 0 : 1 }} />
            <span style={{ transform: open ? "translateY(-7px) rotate(-45deg)" : undefined }} />
          </button>
        </div>
      </motion.header>

      <AnimatePresence>
        {open && (
          <motion.nav
            className="mobile-menu"
            initial={{ opacity: 0, y: -12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.25 }}
          >
            <ul>
              {links.map((l) => (
                <li key={l.href}>
                  <a href={l.href} onClick={() => setOpen(false)}>
                    {l.label}
                  </a>
                </li>
              ))}
              <li>
                <a href={profile.linkedin} target="_blank" rel="noreferrer" onClick={() => setOpen(false)}>
                  LinkedIn
                </a>
              </li>
            </ul>
          </motion.nav>
        )}
      </AnimatePresence>
    </>
  )
}
