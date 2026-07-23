import { StrictMode } from "react"
import { createRoot } from "react-dom/client"
import "lenis/dist/lenis.css"
import "./index.css"
import App from "./App.tsx"
import { trackVisit } from "./tracker"

// Google Analytics loads from index.html (official gtag snippet).
void trackVisit()

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
