# HIMS buyer website

Marketing site to sell **HIMS** — the India-first Hospital Information Management System.

This repo is independent from the main HIMS Laravel application. It has a Vite/React frontend plus a small Express API for demo leads.

## Easy setup

```bash
cd D:\company\buyer-website
copy .env.example .env
npm install
npm run dev
```

Open [http://127.0.0.1:5180](http://127.0.0.1:5180). The Vite dev server proxies `/api` to the Express API on port 5181.

Fill in Hostinger SMTP values in `.env` so submitted leads email `hello@trinovustech.com`. In local development the lead is still saved to MySQL if SMTP is empty.

## Scripts

| Command | Purpose |
|---|---|
| `npm run dev` | Frontend on 5180 and API on 5181 |
| `npm run build` | Production frontend (`dist/`) and API (`server/dist/`) |
| `npm start` | Serve the built site and API together |
| `npm run preview` | Vite preview of the frontend only |

## Lead API

`POST /api/leads`

JSON body:

- `name` (required)
- `email` (required)
- `phone` (optional)
- `hospital` or `company` (required)
- `message` (optional)

Valid submissions are stored in MySQL (`hims_buyer.leads` by default) with status `new` and emailed to `LEAD_NOTIFICATION_EMAIL`. The API creates that database and table on startup if they do not exist.

## Leads dashboard

Open [http://127.0.0.1:5180/admin](http://127.0.0.1:5180/admin). Sign in with `ADMIN_PASSWORD` from `.env` (local default: `himsadmin`). This URL is not linked from the public site.

## Environment variables

See `.env.example`. Local MySQL:

- `DB_HOST=127.0.0.1`
- `DB_PORT=3306`
- `DB_DATABASE=hims_buyer`
- `DB_USERNAME=root`
- `DB_PASSWORD=`

Hostinger mailbox SMTP typically uses:

- `SMTP_HOST=smtp.hostinger.com`
- `SMTP_PORT=465`
- `SMTP_SECURE=true`
- `SMTP_USER` = the full mailbox address
- `SMTP_PASSWORD` = the mailbox password
- `LEAD_NOTIFICATION_EMAIL` — inbox for new leads. Comma-separate multiple addresses.

## Going live on Hostinger

This is no longer a static-only site. Production needs Node 22+ so the API can store leads and send mail:

1. Copy `.env.example` to `.env` on the server (or set the same keys in hPanel).
2. Set `NODE_ENV=production`, `PORT` from Hostinger, MySQL `DB_*` values, and the SMTP values for `hello@trinovustech.com`.
3. Build with `npm run build` and start with `npm start`.

The Express server serves the Vite `dist/` folder and `POST /api/leads` on the same origin.

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
