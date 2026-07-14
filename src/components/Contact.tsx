import { useLayoutEffect, useRef } from "react"
import gsap from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"
import { profile } from "../data/content"
import { Magnetic } from "./Magnetic"

gsap.registerPlugin(ScrollTrigger)

export function Contact() {
  const panelRef = useRef<HTMLDivElement>(null)

  useLayoutEffect(() => {
    const el = panelRef.current
    if (!el) return
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return

    const ctx = gsap.context(() => {
      gsap.fromTo(
        el,
        { autoAlpha: 0, y: 80, scale: 0.92, rotateX: 8 },
        {
          autoAlpha: 1,
          y: 0,
          scale: 1,
          rotateX: 0,
          duration: 1.15,
          ease: "power4.out",
          scrollTrigger: {
            trigger: el,
            start: "top 85%",
            toggleActions: "restart none restart reverse",
            invalidateOnRefresh: true,
          },
        },
      )

      gsap.to(el, {
        backgroundPosition: "200% 50%",
        duration: 8,
        ease: "none",
        repeat: -1,
        yoyo: true,
      })

      const links = el.querySelectorAll(".contact-links a")
      gsap.to(links, {
        y: -4,
        duration: 2.2,
        stagger: 0.25,
        yoyo: true,
        repeat: -1,
        ease: "sine.inOut",
      })
    }, panelRef)

    return () => ctx.revert()
  }, [])

  return (
    <section className="section contact" id="contact">
      <div className="container">
        <div className="contact-panel" ref={panelRef}>
          <p className="section-label">Contact</p>
          <h2 className="section-title">Let’s build the next system together.</h2>
          <p className="section-lead">
            Open to software engineering, machine learning, AI systems, cloud engineering, and
            backend architecture roles. Reach out for collaborations, opportunities, or a quick chat.
          </p>

          <div className="contact-links">
            <Magnetic strength={0.45}>
              <a className="primary" href={`mailto:${profile.email}`}>
                {profile.email}
              </a>
            </Magnetic>
            <Magnetic strength={0.4}>
              <a href={profile.linkedin} target="_blank" rel="noreferrer">
                LinkedIn
              </a>
            </Magnetic>
            <Magnetic strength={0.4}>
              <a href={profile.github} target="_blank" rel="noreferrer">
                GitHub
              </a>
            </Magnetic>
            <Magnetic strength={0.35}>
              <a href={profile.leetcode} target="_blank" rel="noreferrer">
                LeetCode
              </a>
            </Magnetic>
            {profile.phones.map((phone) => (
              <Magnetic key={phone} strength={0.35}>
                <a href={`tel:${phone.replace(/\s/g, "")}`}>{phone}</a>
              </Magnetic>
            ))}
          </div>
        </div>

        <footer className="footer">
          <span>
            © {new Date().getFullYear()} {profile.name}
          </span>
          <span>Software Engineer · IIT Kharagpur · LeetCode Knight</span>
        </footer>
      </div>
    </section>
  )
}
