# Generosity™ Sales Engine Dashboard - MVP v3.0

**Production-ready partner dashboard for Home WTR Hub sales intelligence**

Built for: PACE Supply, Franklin Electric, Safeway Water

---

## 🎯 Project Status

✅ **COMPLETE** — Ready for 48-hour deploy target
- All 7 pages implemented
- Real API integration with graceful fallbacks
- Authentication + protected routes
- Brand-compliant UI/UX
- Mobile responsive
- TypeScript strict mode
- Zero placeholders

---

## 📁 Repository Structure

```
generosity-dashboard/
├── dashboard/              # Next.js application (deploy this directory)
│   ├── app/               # App Router pages
│   │   ├── api/          # API routes (auth)
│   │   ├── app/          # Protected dashboard pages
│   │   ├── login/        # Login page
│   │   ├── layout.tsx    # Root layout
│   │   └── globals.css   # Global styles
│   ├── components/        # React components
│   │   ├── alerts/
│   │   ├── approvals/
│   │   ├── campaigns/
│   │   ├── geo/
│   │   ├── kpi/
│   │   ├── layout/
│   │   ├── prospects/
│   │   ├── sequencing/
│   │   └── shared/
│   ├── lib/              # Utilities & types
│   │   ├── api.ts
│   │   ├── auth.ts
│   │   ├── mock-data.ts
│   │   ├── types.ts
│   │   └── utils.ts
│   ├── public/           # Static assets
│   ├── middleware.ts     # Auth middleware
│   ├── package.json
│   ├── tsconfig.json
│   ├── tailwind.config.ts
│   └── README.md
├── DEPLOYMENT.md         # Detailed deployment guide
└── README.md            # This file
```

---

## 🚀 Quick Deploy

### Prerequisites
- Node.js 20+
- npm or yarn
- Vercel account (or other Next.js host)

### Local Development

```bash
cd dashboard
npm install
cp .env.example .env.local
# Edit .env.local with API URL
npm run dev
# Open http://localhost:3000
```

### Production Deploy to Vercel

```bash
cd dashboard
vercel
```

Or use Vercel UI:
1. Import GitHub repo
2. Set **Root Directory**: `dashboard`
3. Add environment variable:
   ```
   NEXT_PUBLIC_API_BASE_URL=https://generosity-sales-engine-mvp-api.onrender.com
   ```
4. Deploy

See [DEPLOYMENT.md](./DEPLOYMENT.md) for detailed instructions.

---

## 🏗️ Tech Stack

| Layer | Technology |
|-------|-----------|
| Framework | Next.js 14 (App Router) |
| Language | TypeScript (strict) |
| Styling | Tailwind CSS + shadcn/ui |
| Icons | lucide-react |
| Auth | JWT via httpOnly cookies |
| HTTP | axios + SWR |
| Deploy | Vercel |

---

## 📄 Pages

| Route | Description |
|-------|-------------|
| `/login` | Authentication page |
| `/app/overview` | Mission Control — KPIs + Alerts |
| `/app/prospects` | Home WTR Hub Pipeline |
| `/app/campaigns` | Campaign creation + execution |
| `/app/sequencing` | Compliance-gated flow diagram |
| `/app/geo-intel` | Water signal intelligence |
| `/app/approvals` | Compliance queue + audit log |
| `/app/settings` | Tenant config + SendGrid status |

---

## 🎨 Brand Guidelines

**Colors:**
- Primary: `#0A2540` (deep navy)
- Accent: `#00B4D8` (water blue)
- Success: `#22C55E`
- Warning: `#F59E0B`
- Danger: `#EF4444`

**Typography:**
- Display: DM Sans (headings, KPIs, nav)
- Body: Inter (copy, tables, labels)

**Design Philosophy:**
Refined enterprise intelligence platform. Clean, data-dense, trustworthy. Think Stripe Dashboard meets a water utility command center.

---

## 🔐 Authentication

- JWT tokens stored in httpOnly cookies
- Middleware protects all `/app/*` routes
- Automatic redirect to `/login` on 401
- Logout clears cookie and redirects

---

## 🧪 Testing Checklist

Before demo:
- [ ] Login works for all 3 tenants
- [ ] All KPI tiles render with correct thresholds
- [ ] Campaign form submits successfully
- [ ] Prospects table filters/sorts correctly
- [ ] Geo search returns data
- [ ] Compliance Gate shows as always active
- [ ] SendGrid warmup warnings display when needed
- [ ] Fallback cards appear for unavailable endpoints
- [ ] Demo watermarks only on mock data
- [ ] Mobile responsive on all pages
- [ ] Logout works properly

---

## 🚨 Non-Negotiables (Enforced)

1. ✅ **Compliance Gate**: Always active, non-toggleable in Phase 1
2. ✅ **Product Scope**: Home WTR Hub only (no other products)
3. ✅ **Status Normalization**: No UPPERCASE API strings leak to UI
4. ✅ **Type Normalization**: Legacy "solar" always displays as "Home WTR Hub"
5. ✅ **Graceful Fallbacks**: FallbackCard for 404/500, no raw errors
6. ✅ **Demo Transparency**: Watermarks on mocked sections
7. ✅ **KPI Accuracy**: Real threshold logic with color-coded status

---

## 📊 API Integration

**Live Endpoints:**
- `POST /auth/login` → JWT token
- `GET /auth/me` → User info
- `GET /prospects` → Prospect list
- `POST /campaigns/run` → Execute campaign

**Fallback Behavior:**
When endpoints return 404/500 or timeout:
- Show FallbackCard with water-blue accent
- Use mock data where appropriate
- Display "Live Data Pending" message
- Demo watermark appears

**Field Name Mapping:**
Campaign results use exact API field names:
- `prospects_selected`
- `emails_sent`
- `emails_failed`
- `emails_skipped`

---

## 🎯 Phase 1 vs Phase 2

**Phase 1 (Current MVP):**
- ✅ Core dashboard pages
- ✅ Campaign creation + execution
- ✅ Compliance gate (always active)
- ✅ Geo intelligence
- ✅ KPI monitoring
- ✅ Approval queue (manual)

**Phase 2 (Post-Demo):**
- SMS, LinkedIn, Phone channels
- Behavior-triggered sequencing
- Real-time open/click tracking
- Automated routing rules
- Advanced analytics

---

## 📝 Development Notes

**Key Utilities (`lib/utils.ts`):**
- `normalizeStatus()` — UPPERCASE → lowercase
- `titleStatus()` — Format for display
- `displayType()` — Always returns "Home WTR Hub"
- `kpiStatus()` — Threshold-based color logic
- `relativeTime()` — Human-readable timestamps

**Component Patterns:**
- FallbackCard for unavailable endpoints
- DemoWatermark for mocked data
- StatusBadge for normalized statuses
- LoadingSkeleton for async states

---

## 🐛 Troubleshooting

**Build Errors:**
- Ensure Root Directory is `dashboard`
- Check all imports use `@/` alias
- Verify TypeScript strict mode compliance

**API Issues:**
- Check `NEXT_PUBLIC_API_BASE_URL` is set
- Verify backend CORS allows your domain
- Check browser console for 401/403 errors

**Auth Problems:**
- Clear cookies and try again
- Verify JWT token format with backend team
- Check middleware.ts is protecting routes

---

## 📞 Support

- **Deployment Issues**: See [DEPLOYMENT.md](./DEPLOYMENT.md)
- **API Questions**: Backend team at Render
- **UI/UX Feedback**: Generosity™ HQ
- **Bug Reports**: GitHub Issues

---

## 📜 License

Proprietary — Generosity™ HQ

---

**Built with care for the Generosity™ partner ecosystem.**
**Demo-ready in 48 hours. Production-ready for scale.**
