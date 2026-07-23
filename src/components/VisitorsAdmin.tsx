import { useEffect, useMemo, useState } from "react"
import { VISITS_STORE, VISITORS_PASS_HASH, sha256Hex } from "../tracker"

type Visit = {
  id: string
  ts: string
  path: string
  referrer: string
  language: string
  timezone: string
  screen: string
  country?: string
  city?: string
  region?: string
  ua?: string
  _id?: string
}

type VisitsResponse = {
  ok: boolean
  total: number
  visits: Visit[]
  countries: Record<string, number>
  cities: Record<string, number>
  paths: Record<string, number>
  error?: string
}

const PASS_KEY = "pk_visitors_pass"

function topEntries(map: Record<string, number>, limit = 6) {
  return Object.entries(map)
    .sort((a, b) => b[1] - a[1])
    .slice(0, limit)
}

function summarize(raw: Visit[]): VisitsResponse {
  const visits = raw
    .map((v) => ({
      ...v,
      id: v.id || v._id || `${v.ts}-${v.path}`,
      ts: v.ts || new Date().toISOString(),
      path: v.path || "/",
      referrer: v.referrer || "direct",
      language: v.language || "",
      timezone: v.timezone || "",
      screen: v.screen || "",
    }))
    .sort((a, b) => +new Date(b.ts) - +new Date(a.ts))

  const countries: Record<string, number> = {}
  const cities: Record<string, number> = {}
  const paths: Record<string, number> = {}
  for (const v of visits) {
    if (v.country) countries[v.country] = (countries[v.country] || 0) + 1
    if (v.city) cities[v.city] = (cities[v.city] || 0) + 1
    if (v.path) paths[v.path] = (paths[v.path] || 0) + 1
  }

  return {
    ok: true,
    total: visits.length,
    visits: visits.slice(0, 200),
    countries,
    cities,
    paths,
  }
}

export function VisitorsAdmin() {
  const [open, setOpen] = useState(false)
  const [pass, setPass] = useState(() => localStorage.getItem(PASS_KEY) || "")
  const [input, setInput] = useState("")
  const [data, setData] = useState<VisitsResponse | null>(null)
  const [error, setError] = useState("")
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    const sync = () => setOpen(window.location.hash === "#visitors")
    sync()
    window.addEventListener("hashchange", sync)
    return () => window.removeEventListener("hashchange", sync)
  }, [])

  async function load(nextPass = pass) {
    if (!nextPass.trim()) {
      setError("Enter your admin password.")
      return
    }

    setLoading(true)
    setError("")

    try {
      // Prefer local Node API when available
      try {
        const localRes = await fetch(`/api/visits?pass=${encodeURIComponent(nextPass)}`)
        if (localRes.ok) {
          const json = (await localRes.json()) as VisitsResponse
          if (json.ok) {
            localStorage.setItem(PASS_KEY, nextPass)
            setPass(nextPass)
            setData(json)
            return
          }
        }
      } catch {
        // fall through to remote store (static hosting)
      }

      const hash = await sha256Hex(nextPass)
      if (hash !== VISITORS_PASS_HASH) {
        setError("Incorrect password")
        setData(null)
        return
      }

      const remoteRes = await fetch(`${VISITS_STORE}/visits`)
      if (!remoteRes.ok) throw new Error("store failed")
      const raw = (await remoteRes.json()) as Visit[]
      const json = summarize(Array.isArray(raw) ? raw : [])
      localStorage.setItem(PASS_KEY, nextPass)
      setPass(nextPass)
      setData(json)
    } catch {
      setError("Could not load visits. Check your connection and try again.")
      setData(null)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    if (open && pass) void load(pass)
  }, [open, pass])

  const countryRows = useMemo(() => topEntries(data?.countries || {}), [data])
  const cityRows = useMemo(() => topEntries(data?.cities || {}), [data])

  if (!open) return null

  return (
    <div className="visitors-overlay" role="dialog" aria-label="Visitor tracker">
      <div className="visitors-panel">
        <div className="visitors-head">
          <div>
            <p className="section-label">Visitor tracker</p>
            <h2 className="section-title">Who visited this portfolio</h2>
          </div>
          <button
            className="visitors-close"
            onClick={() => {
              window.location.hash = ""
            }}
          >
            Close
          </button>
        </div>

        {!data ? (
          <form
            className="visitors-login"
            onSubmit={(e) => {
              e.preventDefault()
              void load(input)
            }}
          >
            <p>Enter your private admin password to view visit logs.</p>
            <input
              type="password"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Admin password"
              autoComplete="current-password"
              autoFocus
            />
            <button type="submit" className="btn-primary" disabled={loading || !input.trim()}>
              {loading ? "Loading…" : "Open dashboard"}
            </button>
            {error ? <p className="visitors-error">{error}</p> : null}
          </form>
        ) : (
          <>
            <div className="visitors-stats">
              <div className="stat">
                <div className="stat-value">{data.total}</div>
                <div className="stat-label">Total recorded visits</div>
              </div>
              <div className="stat">
                <div className="stat-value">{Object.keys(data.countries).length}</div>
                <div className="stat-label">Countries</div>
              </div>
              <div className="stat">
                <div className="stat-value">{Object.keys(data.cities).length}</div>
                <div className="stat-label">Cities</div>
              </div>
            </div>

            <div className="visitors-grid">
              <div>
                <h3>Top countries</h3>
                <ul>
                  {countryRows.map(([name, count]) => (
                    <li key={name}>
                      <span>{name}</span>
                      <strong>{count}</strong>
                    </li>
                  ))}
                </ul>
              </div>
              <div>
                <h3>Top cities</h3>
                <ul>
                  {cityRows.map(([name, count]) => (
                    <li key={name}>
                      <span>{name}</span>
                      <strong>{count}</strong>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            <div className="visitors-table-wrap">
              <div className="visitors-table-head">
                <h3>Recent visits</h3>
                <button type="button" className="btn-ghost" onClick={() => void load(pass)} disabled={loading}>
                  Refresh
                </button>
              </div>
              <table className="visitors-table">
                <thead>
                  <tr>
                    <th>When</th>
                    <th>Where</th>
                    <th>Path</th>
                    <th>From</th>
                  </tr>
                </thead>
                <tbody>
                  {data.visits.map((v) => (
                    <tr key={v.id}>
                      <td>{new Date(v.ts).toLocaleString()}</td>
                      <td>
                        {[v.city, v.region, v.country].filter(Boolean).join(", ") || "Unknown"}
                      </td>
                      <td>{v.path}</td>
                      <td title={v.referrer}>{v.referrer || "direct"}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </>
        )}
      </div>
    </div>
  )
}
