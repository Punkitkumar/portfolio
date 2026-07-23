import { defineConfig, loadEnv, type Plugin } from "vite"
import react from "@vitejs/plugin-react"
import { mkdir, readFile, writeFile, access } from "node:fs/promises"
import path from "node:path"

const DATA_DIR = path.resolve(".data")
const VISITS_FILE = path.join(DATA_DIR, "visits.json")
const MAX_VISITS = 2000

async function ensureStore() {
  await mkdir(DATA_DIR, { recursive: true })
  try {
    await access(VISITS_FILE)
  } catch {
    await writeFile(VISITS_FILE, "[]", "utf8")
  }
}

async function readVisits() {
  try {
    const raw = await readFile(VISITS_FILE, "utf8")
    const parsed = JSON.parse(raw)
    return Array.isArray(parsed) ? parsed : []
  } catch {
    return []
  }
}

function visitorsApiPlugin(adminPass: string | undefined): Plugin {
  return {
    name: "visitors-api",
    configureServer(server) {
      if (!adminPass) {
        console.warn("[visitors] Set VISITORS_PASS in .env for local dashboard access.")
      }

      server.middlewares.use(async (req, res, next) => {
        if (!req.url?.startsWith("/api/")) return next()

        await ensureStore()
        const url = new URL(req.url, "http://localhost")

        const send = (status: number, body: unknown) => {
          res.statusCode = status
          res.setHeader("Content-Type", "application/json; charset=utf-8")
          res.setHeader("Cache-Control", "no-store")
          res.end(JSON.stringify(body))
        }

        if (url.pathname === "/api/health") {
          send(200, { ok: true })
          return
        }

        if (url.pathname === "/api/visit" && req.method === "POST") {
          const chunks: Buffer[] = []
          req.on("data", (c) => chunks.push(Buffer.from(c)))
          req.on("end", async () => {
            try {
              const body = JSON.parse(Buffer.concat(chunks).toString("utf8") || "{}") as Record<
                string,
                string
              >
              const visit = {
                id: `${Date.now()}-${Math.random().toString(36).slice(2, 8)}`,
                ts: new Date().toISOString(),
                path: String(body.path || "/").slice(0, 200),
                referrer: String(body.referrer || "").slice(0, 300),
                language: String(body.language || "").slice(0, 40),
                timezone: String(body.timezone || "").slice(0, 80),
                screen: String(body.screen || "").slice(0, 40),
                country: String(body.country || "").slice(0, 80),
                city: String(body.city || "").slice(0, 80),
                region: String(body.region || "").slice(0, 80),
                ua: String(req.headers["user-agent"] || "").slice(0, 300),
                ip: "",
              }
              const visits = await readVisits()
              visits.unshift(visit)
              await writeFile(VISITS_FILE, JSON.stringify(visits.slice(0, MAX_VISITS)), "utf8")
              send(201, { ok: true, id: visit.id })
            } catch {
              send(400, { ok: false, error: "Invalid visit payload" })
            }
          })
          return
        }

        if (url.pathname === "/api/visits" && req.method === "GET") {
          const pass = url.searchParams.get("pass")
          if (!adminPass || pass !== adminPass) {
            send(401, { ok: false, error: "Unauthorized" })
            return
          }
          const visits = await readVisits()
          const countries: Record<string, number> = {}
          const cities: Record<string, number> = {}
          const paths: Record<string, number> = {}
          for (const v of visits as Array<Record<string, string>>) {
            if (v.country) countries[v.country] = (countries[v.country] || 0) + 1
            if (v.city) cities[v.city] = (cities[v.city] || 0) + 1
            if (v.path) paths[v.path] = (paths[v.path] || 0) + 1
          }
          send(200, {
            ok: true,
            total: visits.length,
            visits: visits.slice(0, 200),
            countries,
            cities,
            paths,
          })
          return
        }

        next()
      })
    },
  }
}

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), "")
  const adminPass = env.VISITORS_PASS || process.env.VISITORS_PASS

  return {
    plugins: [react(), visitorsApiPlugin(adminPass)],
  }
})
