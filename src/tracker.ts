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

/** Record a portfolio visit for the in-site visitors dashboard. */
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

  try {
    const res = await fetch("/api/visit", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
      keepalive: true,
    })
    if (res.ok) markTracked()
  } catch {
    // Tracking is best-effort.
  }
}
