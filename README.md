# HIMS buyer website

Marketing site to sell **HIMS** — the India-first Hospital Information Management System.

## Easy setup

```bash
cd D:\company\buyer-website
npm install
npm run dev
```

Open [http://127.0.0.1:5180](http://127.0.0.1:5180).

## Scripts

| Command | Purpose |
|---|---|
| `npm run dev` | Local preview on port 5180 |
| `npm run build` | Production build to `dist/` |
| `npm run preview` | Serve the production build |

## Screenshots

Product visuals live in `public/screenshots/`:

- `dashboard.jpg`
- `appointments.jpg`
- `pharmacy.jpg`
- `diagnostics.jpg`
- `billing.jpg`
- `documents.jpg`
- `bodymap-section.jpg` — real consultation body-map canvas (used in the marking demo)
- `consultation-workspace.jpg`
- `patient-photo-arm.jpg` — sample consented clinical photo for the popup demo

Replace these files anytime with fresher captures from the live app. Filenames should stay the same so the site picks them up automatically.

## Refresh product screenshots

With HIMS frontend running on `http://127.0.0.1:5173`:

```bash
cd D:\company\hims-laravel\hims-frontend
node scripts\capture-buyer-shots.mjs
node scripts\capture-bodymap-shots.mjs
```

That overwrites `D:\company\buyer-website\public\screenshots\*.jpg` from the live app.

Live demos on the page:

- `#live` — doctor starts a consultation from the OPD queue
- `#bodymap` — upload photo → popup → place markers → annotation details
