import { StrictMode } from "react"
import { createRoot } from "react-dom/client"
import "lenis/dist/lenis.css"
import "./index.css"
import App from "./App.tsx"
import { initAnalytics } from "./analytics"
import { trackVisit } from "./tracker"

void initAnalytics()
void trackVisit()

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
