# Punkit Kumar — Personal Portfolio

Fully animated personal portfolio for **Punkit Kumar** (Backend Engineer | Applied AI / ML Engineer | Distributed Systems).

## Stack

- React + TypeScript + Vite
- **GSAP** + ScrollTrigger — scroll reveals, hero timelines, magnetic hover
- **Lenis** — butter-smooth scrolling (Awwwards-style)
- Canvas neural-field animation in the hero

## Develop

```bash
npm install
npm run dev
```

## Deploy on Render

`render.yaml` is already in the repo. Fastest path:

1. Open [Render → New Static Site](https://dashboard.render.com/select-repo?type=static) and sign in (GitHub recommended).
2. Connect your GitHub repository and branch.
3. Use:
   - **Build Command:** `npm ci && npm run build`
   - **Publish Directory:** `dist`
4. Click **Create Static Site** — Render will give you a `*.onrender.com` URL.

Or deploy via Blueprint: [New Blueprint](https://dashboard.render.com/blueprints) → select this repo (uses `render.yaml`).
