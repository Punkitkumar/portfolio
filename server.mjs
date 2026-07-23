import { createServer } from "node:http"
import { readFile, writeFile, mkdir, access } from "node:fs/promises"
import { createReadStream } from "node:fs"
import path from "node:path"
import { fileURLToPath } from "node:url"

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const DIST = path.join(__dirname, "dist")
const DATA_DIR = path.join(__dirname, ".data")
const VISITS_FILE = path.join(DATA_DIR, "visits.json")
const PORT = Number(process.env.PORT || 4173)
const ADMIN_PASS = process.env.VISITORS_PASS
if (!ADMIN_PASS) {
  console.warn(
    "[visitors] Set VISITORS_PASS in your environment (or .env) — visitor dashboard stays locked until then.",
  )
}
const MAX_VISITS = 2000

const MIME = {
  ".html": "text/html; charset=utf-8",
  ".js": "text/javascript; charset=utf-8",
  ".css": "text/css; charset=utf-8",
  ".svg": "image/svg+xml",
  ".png": "image/png",
  ".jpg": "image/jpeg",
  ".jpeg": "image/jpeg",
  ".webp": "image/webp",
  ".ico": "image/x-icon",
  ".json": "application/json; charset=utf-8",
  ".woff": "font/woff",
  ".woff2": "font/woff2",
}

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

async function writeVisits(visits) {
  await writeFile(VISITS_FILE, JSON.stringify(visits, null, 0), "utf8")
}

function sendJson(res, status, body) {
  const payload = JSON.stringify(body)
  res.writeHead(status, {
    "Content-Type": "application/json; charset=utf-8",
    "Cache-Control": "no-store",
    "Access-Control-Allow-Origin": "*",
    "Access-Control-Allow-Headers": "Content-Type, X-Visitors-Pass",
    "Access-Control-Allow-Methods": "GET, POST, OPTIONS",
  })
  res.end(payload)
}

function readBody(req) {
  return new Promise((resolve, reject) => {
    const chunks = []
    req.on("data", (c) => chunks.push(c))
    req.on("end", () => {
      const raw = Buffer.concat(chunks).toString("utf8")
      if (!raw) return resolve({})
      try {
        resolve(JSON.parse(raw))
      } catch (err) {
        reject(err)
      }
    })
    req.on("error", reject)
  })
}

function sanitizeVisit(input, req) {
  const ua = String(req.headers["user-agent"] || "").slice(0, 300)
  const forwarded = String(req.headers["x-forwarded-for"] || "")
    .split(",")[0]
    .trim()
  return {
    id: `${Date.now()}-${Math.random().toString(36).slice(2, 8)}`,
    ts: new Date().toISOString(),
    path: String(input.path || "/").slice(0, 200),
    referrer: String(input.referrer || "").slice(0, 300),
    language: String(input.language || "").slice(0, 40),
    timezone: String(input.timezone || "").slice(0, 80),
    screen: String(input.screen || "").slice(0, 40),
    country: String(input.country || "").slice(0, 80),
    city: String(input.city || "").slice(0, 80),
    region: String(input.region || "").slice(0, 80),
    ua,
    ip: forwarded || "",
  }
}

async function handleApi(req, res, url) {
  if (req.method === "OPTIONS") {
    sendJson(res, 204, {})
    return true
  }

  if (url.pathname === "/api/health") {
    sendJson(res, 200, { ok: true })
    return true
  }

  if (url.pathname === "/api/visit" && req.method === "POST") {
    try {
      const body = await readBody(req)
      const visit = sanitizeVisit(body, req)
      const visits = await readVisits()
      visits.unshift(visit)
      await writeVisits(visits.slice(0, MAX_VISITS))
      sendJson(res, 201, { ok: true, id: visit.id })
    } catch {
      sendJson(res, 400, { ok: false, error: "Invalid visit payload" })
    }
    return true
  }

  if (url.pathname === "/api/visits" && req.method === "GET") {
    const pass = url.searchParams.get("pass") || req.headers["x-visitors-pass"]
    if (!ADMIN_PASS || pass !== ADMIN_PASS) {
      sendJson(res, 401, { ok: false, error: "Unauthorized" })
      return true
    }
    const visits = await readVisits()
    const countries = {}
    const cities = {}
    const paths = {}
    for (const v of visits) {
      if (v.country) countries[v.country] = (countries[v.country] || 0) + 1
      if (v.city) cities[v.city] = (cities[v.city] || 0) + 1
      if (v.path) paths[v.path] = (paths[v.path] || 0) + 1
    }
    sendJson(res, 200, {
      ok: true,
      total: visits.length,
      visits: visits.slice(0, 200),
      countries,
      cities,
      paths,
    })
    return true
  }

  return false
}

function contentType(filePath) {
  return MIME[path.extname(filePath).toLowerCase()] || "application/octet-stream"
}

async function serveStatic(req, res, url) {
  let filePath = path.join(DIST, decodeURIComponent(url.pathname))
  if (url.pathname === "/" || url.pathname === "") {
    filePath = path.join(DIST, "index.html")
  }

  try {
    await access(filePath)
  } catch {
    filePath = path.join(DIST, "index.html")
  }

  res.writeHead(200, { "Content-Type": contentType(filePath) })
  createReadStream(filePath).pipe(res)
}

await ensureStore()

createServer(async (req, res) => {
  try {
    const url = new URL(req.url || "/", `http://${req.headers.host || "localhost"}`)
    if (await handleApi(req, res, url)) return
    await serveStatic(req, res, url)
  } catch (err) {
    console.error(err)
    sendJson(res, 500, { ok: false, error: "Server error" })
  }
}).listen(PORT, () => {
  console.log(`Portfolio server listening on :${PORT}`)
})
