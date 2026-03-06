# Deployment Guide - Generosity™ Sales Engine Dashboard

## Prerequisites

✅ Backend API deployed at: `https://generosity-sales-engine-mvp-api.onrender.com`
✅ Vercel account ready
✅ GitHub repository set up
✅ Squarespace Partners Portal page ready

## Step 1: Push to GitHub

```bash
cd generosity-dashboard
git init
git add .
git commit -m "Initial commit - Generosity Dashboard MVP"
git remote add origin <your-github-repo-url>
git push -u origin main
```

## Step 2: Deploy to Vercel

### Option A: Vercel CLI

```bash
npm install -g vercel
cd dashboard
vercel
```

Follow the prompts:
- Set up and deploy? **Y**
- Which scope? Choose your account
- Link to existing project? **N**
- Project name: `generosity-dashboard`
- Which directory? `./` (already in dashboard folder)
- Override settings? **Y**
  - Root Directory: `.` (leave as is since you're in dashboard/)
  - Build Command: `npm run build`
  - Output Directory: `.next`
  - Install Command: `npm install`

### Option B: Vercel Web UI

1. Go to https://vercel.com/new
2. Import your GitHub repository
3. Configure project:
   - **Framework Preset**: Next.js
   - **Root Directory**: `dashboard`
   - **Build Command**: `npm run build`
   - **Output Directory**: `.next`
   - **Install Command**: `npm install`
   - **Node.js Version**: 20.x

4. Add Environment Variables:
   ```
   NEXT_PUBLIC_API_BASE_URL=https://generosity-sales-engine-mvp-api.onrender.com
   NEXT_PUBLIC_APP_ENV=production
   ```

5. Click **Deploy**

## Step 3: Verify Deployment

Once deployed, test the dashboard:

1. Open your Vercel deployment URL (e.g., `https://generosity-dashboard.vercel.app`)
2. Try logging in with test credentials
3. Navigate through all pages:
   - Overview (KPIs should load)
   - Prospects (table should render)
   - Campaigns (form should submit)
   - Sequencing (flow diagram should display)
   - Geo Intel (search should work)
   - Approvals (queue should load)
   - Settings (tenant info should display)

## Step 4: Squarespace Integration

1. Log in to Squarespace
2. Navigate to your Partners Portal page
3. Add a **Button block**
4. Configure button:
   - **Label**: "Launch Sales Dashboard →"
   - **URL**: `https://your-vercel-url.vercel.app`
   - **Open in**: New Tab
   - **Style**: Primary button, full width on mobile
5. Save and publish

## Step 5: Custom Domain (Optional)

### In Vercel:
1. Go to Project Settings → Domains
2. Add your custom domain (e.g., `dashboard.generosity.com`)
3. Follow DNS configuration instructions

### Update Squarespace:
- Update button URL to custom domain

## Tenant Credentials (Phase 1)

Ask backend team for login credentials for:
- PACE Supply
- Franklin Electric
- Safeway Water

## Troubleshooting

### Build fails on Vercel
- Check that Root Directory is set to `dashboard`
- Verify all dependencies are in package.json
- Check build logs for TypeScript errors

### API calls fail
- Verify `NEXT_PUBLIC_API_BASE_URL` is set correctly
- Check CORS settings on backend API
- Verify backend is live at the URL

### Login doesn't work
- Check that `/auth/login` endpoint is live
- Verify credentials with backend team
- Check browser console for errors

### Images don't load
- Verify `generosity-logo.svg` exists in `public/` folder
- Check Next.js Image configuration

## Post-Deployment Checklist

- [ ] Dashboard loads without errors
- [ ] Login redirects to /app/overview correctly
- [ ] All 7 pages render properly
- [ ] KPI thresholds show correct colors
- [ ] Campaign form submits successfully
- [ ] Compliance Gate shows as always active
- [ ] Fallback cards appear for unavailable endpoints
- [ ] Demo watermarks appear only on mock data
- [ ] Logout works and clears cookie
- [ ] Mobile responsive on all pages
- [ ] Squarespace button opens dashboard in new tab

## Monitoring

After deployment, monitor:
- Vercel Analytics dashboard
- API response times
- Error rates in browser console
- User feedback from all three tenants

## Rollback

If issues occur:
```bash
vercel rollback
```

Or in Vercel UI:
1. Go to Deployments
2. Find previous working deployment
3. Click "..." → Promote to Production

## Support

For deployment issues:
- Vercel Docs: https://vercel.com/docs
- Next.js Docs: https://nextjs.org/docs
- Generosity™ HQ: [contact info]

---

**Deployment Target**: 48 hours from project start
**Status**: Production-ready MVP for Phase 1 demo
