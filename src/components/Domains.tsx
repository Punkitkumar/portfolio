import { useLayoutEffect, useRef, type CSSProperties } from "react"
import gsap from "gsap"
import { domains } from "../data/content"
import { Reveal, Stagger } from "./Reveal"

export function Domains() {
  const sectionRef = useRef<HTMLElement>(null)

  useLayoutEffect(() => {
    const root = sectionRef.current
    if (!root) return
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return

    const ctx = gsap.context(() => {
      const core = root.querySelector(".orbit-core")
      const rings = root.querySelectorAll(".orbit-ring")
      const nodes = root.querySelectorAll(".orbit-node")

      gsap.to(rings, {
        scale: 1.08,
        duration: 3.2,
        yoyo: true,
        repeat: -1,
        stagger: 0.45,
        ease: "sine.inOut",
      })

      gsap.to(core, {
        scale: 1.06,
        duration: 2.4,
        yoyo: true,
        repeat: -1,
        ease: "sine.inOut",
      })

      nodes.forEach((node, i) => {
        gsap.to(node, {
          scale: 1.15,
          duration: 1.8 + i * 0.15,
          yoyo: true,
          repeat: -1,
          ease: "sine.inOut",
          delay: i * 0.2,
        })
      })

      root.querySelectorAll<HTMLElement>(".domain-item").forEach((item) => {
        item.addEventListener("pointerenter", () => {
          gsap.to(item, {
            x: 18,
            scale: 1.02,
            duration: 0.4,
            ease: "back.out(2)",
            overwrite: "auto",
          })
        })
        item.addEventListener("pointerleave", () => {
          gsap.to(item, {
            x: 0,
            scale: 1,
            duration: 0.45,
            ease: "power3.out",
            overwrite: "auto",
          })
        })
      })
    }, root)

    return () => ctx.revert()
  }, [])

  return (
    <section className="section domains-section" id="domains" ref={sectionRef}>
      <div className="container">
        <Reveal>
          <p className="section-label">Domains</p>
          <h2 className="section-title">At the intersection of Backend, AI & Systems.</h2>
          <p className="section-lead">
            Built for production engineering — sitting where backend reliability, distributed
            systems, and applied AI meet across finance, logistics, and enterprise platforms.
          </p>
        </Reveal>

        <div className="domains-layout">
          <Reveal y={40}>
            <div className="domains-orbit" aria-hidden="true">
              <div className="orbit-ring orbit-ring-a" />
              <div className="orbit-ring orbit-ring-b" />
              <div className="orbit-core pulse-glow">
                <span className="orbit-core-label">Full Stack Engineer</span>
                <span className="orbit-core-title">Backend × AI × Systems</span>
              </div>
              <div className="orbit-spinner">
                {domains.map((d, i) => {
                  const angle = (i / domains.length) * 360 - 90
                  return (
                    <span
                      key={d.name}
                      className={`orbit-node accent-${d.accent}`}
                      style={{ "--angle": `${angle}deg` } as CSSProperties}
                    >
                      <span className="orbit-node-label">{d.name}</span>
                    </span>
                  )
                })}
              </div>
            </div>
          </Reveal>

          <Stagger className="domains-list" stagger={0.08} selector=":scope > li" as="ul">
            {domains.map((d, i) => (
              <li
                key={d.name}
                className={`domain-item accent-${d.accent} float-soft`}
                style={{ animationDelay: `${i * 0.35}s` } as CSSProperties}
              >
                <span className="domain-name">{d.name}</span>
                <span className="domain-detail">{d.detail}</span>
              </li>
            ))}
          </Stagger>
        </div>
      </div>
    </section>
  )
}
