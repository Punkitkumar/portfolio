import { useLayoutEffect, useRef } from "react"
import gsap from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"
import { experience } from "../data/content"
import { Reveal, Stagger } from "./Reveal"

gsap.registerPlugin(ScrollTrigger)

export function Experience() {
  const sectionRef = useRef<HTMLElement>(null)

  useLayoutEffect(() => {
    const root = sectionRef.current
    if (!root) return
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return

    const line = root.querySelector<HTMLElement>(".timeline-progress")
    if (!line) return

    const ctx = gsap.context(() => {
      gsap.fromTo(
        line,
        { scaleY: 0 },
        {
          scaleY: 1,
          ease: "none",
          scrollTrigger: {
            trigger: root.querySelector(".timeline"),
            start: "top 75%",
            end: "bottom 25%",
            scrub: 0.6,
          },
        },
      )
    }, root)

    return () => ctx.revert()
  }, [])

  return (
    <section className="section" id="experience" ref={sectionRef}>
      <div className="container">
        <Reveal>
          <p className="section-label">Experience & Internships</p>
          <h2 className="section-title">Where systems ship at scale.</h2>
          <p className="section-lead">
            Banking platforms at Standard Chartered, logistics backends at Landmark Group’s Logistiq,
            and teaching at IIT Kharagpur — shipping production systems while mentoring the next
            wave of engineers.
          </p>
        </Reveal>

        <div className="timeline-wrap">
          <div className="timeline-progress" aria-hidden="true" />
          <Stagger className="timeline" stagger={0.12} selector=":scope > article">
            {experience.map((job) => (
              <article className="exp-item" key={`${job.company}-${job.role}`}>
                <div className="exp-dot" aria-hidden="true" />
                <div className="exp-meta">
                  <h3 className="exp-role">{job.role}</h3>
                  <span className="exp-company">{job.company}</span>
                  <span className="exp-period">
                    {job.location} · {job.period}
                  </span>
                </div>
                <ul className="exp-list">
                  {job.highlights.map((h) => (
                    <li key={h.slice(0, 48)}>{h}</li>
                  ))}
                </ul>
              </article>
            ))}
          </Stagger>
        </div>
      </div>
    </section>
  )
}
