import { StrictMode } from "react"
import { createRoot } from "react-dom/client"
import "lenis/dist/lenis.css"
import "./index.css"
import App from "./App.tsx"
import { initAnalytics } from "./analytics"

void initAnalytics()

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
