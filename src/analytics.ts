declare global {
  interface Window {
    dataLayer: unknown[]
    gtag: (...args: unknown[]) => void
  }
}

const MEASUREMENT_ID =
  (import.meta.env.VITE_GA_MEASUREMENT_ID as string | undefined) || "G-L2GE2KTCTB"

function loadScript(src: string) {
  return new Promise<void>((resolve, reject) => {
    const existing = document.querySelector<HTMLScriptElement>(`script[src="${src}"]`)
    if (existing) {
      resolve()
      return
    }

    const script = document.createElement("script")
    script.async = true
    script.src = src
    script.onload = () => resolve()
    script.onerror = () => reject(new Error(`Failed to load ${src}`))
    document.head.appendChild(script)
  })
}

/** Initialize Google Analytics 4 when VITE_GA_MEASUREMENT_ID is set. */
export async function initAnalytics() {
  if (!MEASUREMENT_ID || !MEASUREMENT_ID.startsWith("G-")) return

  window.dataLayer = window.dataLayer || []
  window.gtag = function gtag(...args: unknown[]) {
    window.dataLayer.push(args)
  }

  window.gtag("js", new Date())
  window.gtag("config", MEASUREMENT_ID, {
    anonymize_ip: true,
    send_page_view: true,
  })

  try {
    await loadScript(`https://www.googletagmanager.com/gtag/js?id=${MEASUREMENT_ID}`)
  } catch {
    // Tracking is best-effort; never break the portfolio if GA is blocked.
  }
}
