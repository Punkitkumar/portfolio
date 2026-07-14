import { useLayoutEffect, useRef } from "react"
import gsap from "gsap"
import { profile } from "../data/content"
import { Reveal, Stagger } from "./Reveal"

const stats = [
  { value: "60–70%", label: "Story investigation time saved via MCP agents" },
  { value: "30,000+", label: "Confluence pages in production RAG corpus" },
  { value: "Knight", label: "LeetCode Top 2.9% · 1968 rating" },
  { value: "Expert", label: "Codeforces 1780 · CodeChef 4★" },
]

export function About() {
  const sectionRef = useRef<HTMLElement>(null)

  useLayoutEffect(() => {
    const root = sectionRef.current
    if (!root) return
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return

    const ctx = gsap.context(() => {
      root.querySelectorAll<HTMLElement>(".stat").forEach((stat) => {
        stat.addEventListener("pointerenter", () => {
          gsap.to(stat, {
            y: -14,
            scale: 1.04,
            rotateZ: -1.5,
            duration: 0.45,
            ease: "back.out(2)",
            overwrite: "auto",
          })
          gsap.to(stat.querySelector(".stat-value"), {
            scale: 1.08,
            color: "#0f766e",
            duration: 0.4,
            ease: "power2.out",
            overwrite: "auto",
          })
        })
        stat.addEventListener("pointerleave", () => {
          gsap.to(stat, {
            y: 0,
            scale: 1,
            rotateZ: 0,
            duration: 0.5,
            ease: "elastic.out(1, 0.6)",
            overwrite: "auto",
          })
          gsap.to(stat.querySelector(".stat-value"), {
            scale: 1,
            clearProps: "color",
            duration: 0.35,
            overwrite: "auto",
          })
        })
      })

      const chips = root.querySelectorAll(".chip")
      root.querySelector(".interest-row")?.addEventListener("pointerenter", () => {
        gsap.to(chips, {
          y: -6,
          scale: 1.06,
          stagger: 0.04,
          duration: 0.35,
          ease: "back.out(2)",
          overwrite: "auto",
        })
      })
      root.querySelector(".interest-row")?.addEventListener("pointerleave", () => {
        gsap.to(chips, {
          y: 0,
          scale: 1,
          stagger: 0.03,
          duration: 0.35,
          ease: "power2.out",
          overwrite: "auto",
        })
      })
    }, root)

    return () => ctx.revert()
  }, [])

  return (
    <section className="section" id="about" ref={sectionRef}>
      <div className="container">
        <Reveal>
          <p className="section-label">About</p>
          <h2 className="section-title">Algorithms, systems, and production AI.</h2>
        </Reveal>

        <div className="about-grid">
          <Reveal delay={0.08}>
            <div className="about-text">
              <p>{profile.summary}</p>
              <p>
                Driven by innovation and continuous improvement — open to software engineering,
                machine learning, AI systems, cloud engineering, and backend architecture roles
                where ownership and delivery matter.
              </p>
              <div className="interest-row">
                {profile.interests.map((item) => (
                  <span className="chip" key={item}>
                    {item}
                  </span>
                ))}
              </div>
            </div>
          </Reveal>

          <Stagger className="stat-stack" stagger={0.12}>
            {stats.map((s) => (
              <div className="stat" key={s.label}>
                <div className="stat-value">{s.value}</div>
                <div className="stat-label">{s.label}</div>
              </div>
            ))}
          </Stagger>
        </div>
      </div>
    </section>
  )
}
