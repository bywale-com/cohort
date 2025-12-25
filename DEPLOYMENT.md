# Deployment Guide

## Quick Deploy to Vercel (Recommended)

### Prerequisites
- GitHub account
- Vercel account (free tier available)
- Environment variables ready

### Steps

1. **Push to GitHub**
   ```bash
   git add .
   git commit -m "Complete Phase 1: Add Open Graph, dynamic sitemap, optimize images"
   git push origin main
   ```

2. **Deploy to Vercel**
   - Go to [vercel.com](https://vercel.com)
   - Click "Add New Project"
   - Import your GitHub repository
   - Vercel will auto-detect Next.js

3. **Configure Environment Variables**
   In Vercel dashboard → Settings → Environment Variables, add:
   ```
   NEXT_PUBLIC_SANITY_PROJECT_ID=fc4od7b4
   NEXT_PUBLIC_SANITY_DATASET=production
   NEXT_PUBLIC_SITE_URL=https://your-app.vercel.app
   RESEND_API_KEY=re_xxxxx
   CONTACT_EMAIL=your-email@example.com
   ```

4. **Deploy**
   - Click "Deploy"
   - Wait for build to complete
   - Your site will be live!

---

## Alternative: Cloudflare Pages

1. **Connect Repository**
   - Go to Cloudflare Dashboard → Pages
   - Connect your Git provider
   - Select repository

2. **Build Settings**
   - Framework preset: Next.js
   - Build command: `npm run build`
   - Build output directory: `.next`

3. **Environment Variables**
   - Add all required env vars in Cloudflare Pages settings

---

## Post-Deployment Checklist

- [ ] Visit live URL and verify all pages load
- [ ] Test navigation on mobile and desktop
- [ ] Verify blog posts display correctly
- [ ] Test contact form submission
- [ ] Check sitemap.xml is accessible
- [ ] Verify robots.txt
- [ ] Test social sharing previews (use [opengraph.xyz](https://www.opengraph.xyz/))
- [ ] Run Lighthouse audit on live site
- [ ] Test from different network/device

---

## Environment Variables Reference

### Required for Site to Work
```bash
NEXT_PUBLIC_SANITY_PROJECT_ID=fc4od7b4
NEXT_PUBLIC_SANITY_DATASET=production
NEXT_PUBLIC_SITE_URL=https://your-domain.com
```

### Required for Contact Form
```bash
RESEND_API_KEY=re_xxxxx  # Get from resend.com
CONTACT_EMAIL=your-email@example.com
```

### Optional
```bash
SANITY_API_TOKEN=sk_xxxxx  # Only for programmatic writes
```

---

## Troubleshooting

### Build Fails
- Check all environment variables are set
- Verify Node.js version (should be 18+)
- Check build logs for specific errors

### Contact Form Not Working
- Verify RESEND_API_KEY is set correctly
- Check CONTACT_EMAIL is valid
- Verify Resend domain is verified (for production)

### Images Not Loading
- Check Sanity project ID is correct
- Verify Sanity dataset name matches
- Check network tab for 404 errors

### Blog Posts Not Showing
- Verify NEXT_PUBLIC_SANITY_PROJECT_ID is set
- Check posts are published (not drafts) in Sanity
- Verify dataset name is correct

