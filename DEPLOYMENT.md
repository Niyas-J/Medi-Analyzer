# 🚀 Deployment Guide - HealthVision

This guide covers multiple deployment options for the HealthVision dashboard.

## Quick Deploy Options

### 1. Vercel (Recommended)

Vercel offers the easiest deployment with automatic builds and global CDN.

```bash
# Install Vercel CLI
npm i -g vercel

# Deploy
vercel
```

Or use the Vercel dashboard:
1. Push code to GitHub
2. Import project on [vercel.com](https://vercel.com)
3. Vercel auto-detects Vite configuration
4. Deploy!

**Live in 2 minutes** ✨

---

### 2. Netlify

```bash
# Install Netlify CLI
npm install -g netlify-cli

# Build
npm run build

# Deploy
netlify deploy --prod --dir=dist
```

Or drag & drop the `dist` folder to [netlify.com/drop](https://app.netlify.com/drop)

---

### 3. GitHub Pages

1. Update `vite.config.js`:

```javascript
export default defineConfig({
  plugins: [react()],
  base: '/your-repo-name/', // Add this line
})
```

2. Install gh-pages:

```bash
npm install --save-dev gh-pages
```

3. Add to `package.json`:

```json
"scripts": {
  "predeploy": "npm run build",
  "deploy": "gh-pages -d dist"
}
```

4. Deploy:

```bash
npm run deploy
```

Access at: `https://yourusername.github.io/your-repo-name`

---

### 4. Cloudflare Pages

1. Push code to GitHub
2. Go to [Cloudflare Pages Dashboard](https://pages.cloudflare.com)
3. Connect repository
4. Build settings:
   - Build command: `npm run build`
   - Output directory: `dist`
5. Deploy!

---

### 5. AWS S3 + CloudFront

```bash
# Build
npm run build

# Upload to S3 (install AWS CLI first)
aws s3 sync dist/ s3://your-bucket-name --delete

# Invalidate CloudFront cache
aws cloudfront create-invalidation --distribution-id YOUR_DIST_ID --paths "/*"
```

---

### 6. Docker Deployment

Create `Dockerfile`:

```dockerfile
FROM node:18-alpine as build

WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
RUN npm run build

FROM nginx:alpine
COPY --from=build /app/dist /usr/share/nginx/html
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
```

Build and run:

```bash
docker build -t healthvision .
docker run -p 8080:80 healthvision
```

---

## Environment Variables

For production, create `.env.production`:

```env
VITE_API_ENDPOINT=https://your-api.com
VITE_OCR_API_KEY=your-key-here
VITE_OPENAI_API_KEY=your-key-here
```

Access in code:

```javascript
const apiEndpoint = import.meta.env.VITE_API_ENDPOINT;
```

---

## Performance Optimization

### 1. Code Splitting

Already implemented via Vite's automatic code splitting.

### 2. Image Optimization

- Use WebP format for images
- Compress assets before deployment
- Implement lazy loading

### 3. CDN Configuration

Add to `vite.config.js`:

```javascript
export default defineConfig({
  build: {
    rollupOptions: {
      output: {
        manualChunks: {
          'three': ['three', '@react-three/fiber', '@react-three/drei'],
          'charts': ['recharts'],
          'animations': ['framer-motion']
        }
      }
    }
  }
})
```

---

## Security Headers

Add to hosting provider:

```
X-Frame-Options: DENY
X-Content-Type-Options: nosniff
Referrer-Policy: strict-origin-when-cross-origin
Permissions-Policy: camera=(), microphone=(), geolocation=()
```

For Netlify, create `netlify.toml`:

```toml
[[headers]]
  for = "/*"
  [headers.values]
    X-Frame-Options = "DENY"
    X-Content-Type-Options = "nosniff"
    Referrer-Policy = "strict-origin-when-cross-origin"
```

---

## Monitoring & Analytics

### Add Google Analytics

1. Install:

```bash
npm install react-ga4
```

2. Add to `App.jsx`:

```javascript
import ReactGA from 'react-ga4';

useEffect(() => {
  ReactGA.initialize('G-XXXXXXXXXX');
  ReactGA.send('pageview');
}, []);
```

### Add Error Tracking (Sentry)

```bash
npm install @sentry/react
```

```javascript
import * as Sentry from "@sentry/react";

Sentry.init({
  dsn: "your-sentry-dsn",
  environment: "production"
});
```

---

## Custom Domain Setup

### Vercel
1. Go to Project Settings → Domains
2. Add your domain
3. Update DNS records as instructed

### Netlify
1. Domain Settings → Add custom domain
2. Configure DNS with your provider

---

## SSL/HTTPS

All recommended hosting providers (Vercel, Netlify, Cloudflare) provide **free automatic SSL** certificates via Let's Encrypt.

---

## Rollback Strategy

### Vercel/Netlify
- Previous deployments are accessible from dashboard
- One-click rollback available

### Manual Rollback
```bash
# Tag current version
git tag v1.0.0

# Rollback to previous version
git checkout v0.9.0
npm run deploy
```

---

## CI/CD Pipeline

Create `.github/workflows/deploy.yml`:

```yaml
name: Deploy to Production

on:
  push:
    branches: [main]

jobs:
  deploy:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      - uses: actions/setup-node@v3
        with:
          node-version: '18'
      - run: npm install
      - run: npm run build
      - run: npm run deploy
```

---

## Health Checks

Add a health check endpoint or use hosting provider's built-in monitoring.

For custom health checks, create `public/health.json`:

```json
{
  "status": "healthy",
  "version": "1.0.0",
  "timestamp": "2024-10-22T00:00:00Z"
}
```

---

## Cost Estimates

| Provider | Free Tier | Paid |
|----------|-----------|------|
| **Vercel** | 100GB bandwidth/month | $20/month for Pro |
| **Netlify** | 100GB bandwidth/month | $19/month for Pro |
| **Cloudflare Pages** | Unlimited bandwidth | Free forever |
| **GitHub Pages** | 100GB bandwidth/month | Free |
| **AWS S3+CloudFront** | 50GB/month (12 months free) | ~$5-20/month |

---

## Support & Troubleshooting

### Build Fails
- Clear cache: `rm -rf node_modules package-lock.json && npm install`
- Check Node version: `node -v` (should be 16+)

### 404 on Refresh (SPA Routing)
Add `_redirects` file to `public/` folder:
```
/*    /index.html   200
```

### Large Bundle Size
- Run `npm run build` and check dist size
- Use bundle analyzer: `npm install -D rollup-plugin-visualizer`

---

**🎉 Your HealthVision dashboard is now live!**

For questions, open an issue on GitHub or contact support.

