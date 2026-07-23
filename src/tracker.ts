export type VisitPayload = {
  path: string
  referrer: string
  language: string
  timezone: string
  screen: string
  country?: string
  city?: string
  region?: string
}

const SESSION_KEY = "pk_visit_session"

/** Free remote store so tracking works on static Render hosting too. */
export const VISITS_STORE =
  (import.meta.env.VITE_VISITS_STORE as string | undefined) ||
  "https://crudcrud.com/api/6aba7f82c1374bf392b5845742c4b051"

export const VISITORS_PASS_HASH =
  (import.meta.env.VITE_VISITORS_PASS_HASH as string | undefined) ||
  "60d24ddb61c89bef812829e78eadddb9f90956a7db4d191b75558319ce4b6060"

function alreadyTrackedThisSession() {
  try {
    const stamp = sessionStorage.getItem(SESSION_KEY)
    if (!stamp) return false
    return Date.now() - Number(stamp) < 1000 * 60 * 30
  } catch {
    return false
  }
}

function markTracked() {
  try {
    sessionStorage.setItem(SESSION_KEY, String(Date.now()))
  } catch {
    // ignore
  }
}

async function lookupGeo(): Promise<Pick<VisitPayload, "country" | "city" | "region">> {
  try {
    const res = await fetch("https://ipapi.co/json/", { signal: AbortSignal.timeout(2500) })
    if (!res.ok) return {}
    const data = (await res.json()) as {
      country_name?: string
      city?: string
      region?: string
    }
    return {
      country: data.country_name || "",
      city: data.city || "",
      region: data.region || "",
    }
  } catch {
    return {}
  }
}

async function postVisit(url: string, payload: VisitPayload) {
  const res = await fetch(url, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ ...payload, ts: new Date().toISOString() }),
    keepalive: true,
  })
  return res.ok
}

/** Record a portfolio visit (local API and/or free remote store). */
export async function trackVisit() {
  if (typeof window === "undefined") return
  if (alreadyTrackedThisSession()) return

  const geo = await lookupGeo()
  const payload: VisitPayload = {
    path: window.location.pathname + window.location.hash,
    referrer: document.referrer || "direct",
    language: navigator.language || "",
    timezone: Intl.DateTimeFormat().resolvedOptions().timeZone || "",
    screen: `${window.screen.width}x${window.screen.height}`,
    ...geo,
  }

  let ok = false
  try {
    ok = (await postVisit("/api/visit", payload)) || ok
  } catch {
    // static hosts have no /api — fall through to remote store
  }

  try {
    ok = (await postVisit(`${VISITS_STORE}/visits`, payload)) || ok
  } catch {
    // best-effort
  }

  if (ok) markTracked()
}

export async function sha256Hex(text: string) {
  const data = new TextEncoder().encode(text)
  const digest = await crypto.subtle.digest("SHA-256", data)
  return [...new Uint8Array(digest)].map((b) => b.toString(16).padStart(2, "0")).join("")
}
