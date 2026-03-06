# Generosity™ Sales Engine Dashboard

Partner-facing sales intelligence dashboard for the Generosity Home WTR Hub.

Built with Next.js 14 (App Router), TypeScript, Tailwind CSS, and shadcn/ui.

## Quick Start

```bash
cd dashboard
npm install
cp .env.example .env.local
# Edit .env.local: set NEXT_PUBLIC_API_BASE_URL
npm run dev
# Open http://localhost:3000
```

## Deploy to Vercel

1. Push repo to GitHub
2. Import project in Vercel
3. Set **Root Directory**: `dashboard`
4. Add environment variable:
   ```
   NEXT_PUBLIC_API_BASE_URL=https://generosity-sales-engine-mvp-api.onrender.com
   ```
5. Deploy
6. Copy Vercel URL → add to Squarespace Partners Portal as button link

## Tenants (Phase 1)

- **PACE Supply** (`pace-supply`)
- **Franklin Electric** (`franklin-elec`)
- **Safeway Water** (`safeway-water`)

Each tenant has independent login credentials. All data is scoped server-side by tenant via JWT.

## Product Scope

**Home WTR Hub only.** No other products appear anywhere in the UI.

## Architecture

- **Framework**: Next.js 14 App Router
- **Language**: TypeScript (strict mode)
- **Styling**: Tailwind CSS
- **Auth**: JWT via httpOnly cookies + middleware
- **Data Fetching**: SWR with graceful fallbacks
- **API**: REST client with axios

## API Integration Notes

- **POST /campaigns/run** returns: `prospects_selected`, `emails_sent`, `emails_failed`, `emails_skipped`
- All status strings from API are UPPERCASE — normalized to lowercase before display
- Legacy `type` field values (e.g. "solar") are always displayed as "Home WTR Hub"
- Graceful fallback to demo data when endpoints return 404/500

## Pages

- `/login` — Authentication
- `/app/overview` — Mission Control (KPIs + Alerts)
- `/app/prospects` — Prospect pipeline with geo lookup
- `/app/campaigns` — Campaign creation + results + history
- `/app/sequencing` — Phase 1 flow diagram + Phase 2 preview
- `/app/geo-intel` — Postal code search + geo cards
- `/app/approvals` — Pending queue + audit log
- `/app/settings` — Tenant info + compliance mode + SendGrid status

## Brand Specification

- **Primary**: #0A2540 (deep navy)
- **Accent**: #00B4D8 (water blue)
- **Fonts**: DM Sans (display), Inter (body)
- **Component Library**: shadcn/ui + lucide-react

## Phase 2 (after MVP demo)

- SMS, LinkedIn, Phone channel triggers
- Real open/click/reply tracking
- Full approval workflow enforcement
- Behavior-triggered sequencing

## Non-Negotiables

1. ✓ Compliance Gate always active/non-toggleable in Phase 1
2. ✓ All status strings normalized (no UPPERCASE leaks to partners)
3. ✓ Product scope: Home WTR Hub only
4. ✓ Graceful fallbacks with FallbackCard (no raw errors)
5. ✓ Demo watermarks on mock data sections
6. ✓ KPI thresholds with color-coded status rings
7. ✓ SendGrid warmup warnings when restricted

## Development

```bash
npm run dev     # Start dev server
npm run build   # Production build
npm run start   # Start production server
npm run lint    # Lint check
```

## License

Proprietary — Generosity™ HQ
