import { achievements, education, mentorship } from "../data/content"
import { Reveal, Stagger } from "./Reveal"

export function More() {
  return (
    <section className="section" id="more">
      <div className="container">
        <div className="split-two">
          <div>
            <Reveal>
              <p className="section-label">Education</p>
              <h2 className="section-title">IIT Kharagpur</h2>
            </Reveal>
            <Reveal delay={0.08}>
              <div className="edu-degree">{education.degree}</div>
              <div className="edu-school">{education.school}</div>
              <div className="edu-period">{education.period}</div>
              <ul className="edu-details">
                {education.details.map((d) => (
                  <li key={d}>{d}</li>
                ))}
              </ul>
              <div className="course-wrap">
                {education.coursework.map((c) => (
                  <span className="chip" key={c}>
                    {c}
                  </span>
                ))}
              </div>
            </Reveal>
          </div>

          <div>
            <Reveal>
              <p className="section-label">Achievements</p>
              <h2 className="section-title">Recognition</h2>
            </Reveal>
            <Stagger stagger={0.1} selector=":scope > .achieve-item">
              {achievements.map((a) => (
                <div className="achieve-item" key={a.title}>
                  <h3>{a.title}</h3>
                  <p>{a.detail}</p>
                </div>
              ))}
            </Stagger>
          </div>
        </div>

        <div style={{ marginTop: "4.5rem" }}>
          <Reveal>
            <p className="section-label">Mentorship</p>
            <h2 className="section-title">Teaching the next generation of engineers.</h2>
          </Reveal>
          <Stagger stagger={0.1} selector=":scope > .lead-item">
            {mentorship.map((l) => (
              <div className="lead-item" key={l.title}>
                <h3>{l.title}</h3>
                <p>{l.detail}</p>
              </div>
            ))}
          </Stagger>
        </div>
      </div>
    </section>
  )
}
