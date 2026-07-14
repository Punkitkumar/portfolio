import { useLayoutEffect, useRef } from "react"
import gsap from "gsap"

const ITEMS = [
  "Software Engineer",
  "Backend Architecture",
  "RAG & MCP Agents",
  "Cloud-Native Microservices",
  "Spring Boot",
  "Kafka",
  "Kubernetes",
  "Standard Chartered",
  "IIT Kharagpur",
  "LeetCode Knight",
  "Codeforces Expert",
  "AlgoZenith Mentor",
]

export function InfiniteMarquee() {
  const trackRef = useRef<HTMLDivElement>(null)

  useLayoutEffect(() => {
    const track = trackRef.current
    if (!track) return
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return

    const ctx = gsap.context(() => {
      const width = track.scrollWidth / 2
      gsap.fromTo(
        track,
        { x: 0 },
        {
          x: -width,
          duration: 18,
          ease: "none",
          repeat: -1,
        },
      )
    }, track)

    return () => ctx.revert()
  }, [])

  const row = [...ITEMS, ...ITEMS]

  return (
    <div className="marquee" aria-hidden="true">
      <div className="marquee-track" ref={trackRef}>
        {row.map((item, i) => (
          <span className="marquee-item" key={`${item}-${i}`}>
            {item}
            <span className="marquee-sep">✦</span>
          </span>
        ))}
      </div>
    </div>
  )
}
