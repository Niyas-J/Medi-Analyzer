# 🔧 Environment Configuration Guide

This guide explains how to configure environment variables for HealthVision.

## 📋 Environment Files

### `.env` (Not tracked in Git)
Your local development environment variables.

### `.env.example` (Tracked in Git)
Template showing all available variables.

---

## 🚀 Quick Setup

### 1. Create Environment File

```bash
# Copy example to create your env file
cp .env.example .env
```

### 2. Edit Configuration

Open `.env` and add your API keys:

```env
# HealthVision Environment Variables

# API Endpoints
VITE_API_ENDPOINT=https://your-backend-api.com
VITE_OCR_API_KEY=your-ocr-api-key-here
VITE_OPENAI_API_KEY=sk-your-openai-key-here

# App Configuration
VITE_APP_NAME=HealthVision
VITE_APP_VERSION=1.0.0

# Feature Flags
VITE_ENABLE_OCR=true
VITE_ENABLE_AI_INSIGHTS=true
VITE_ENABLE_AUDIO=false
```

### 3. Access in Code

```javascript
// In any component or utility
const apiEndpoint = import.meta.env.VITE_API_ENDPOINT;
const ocrKey = import.meta.env.VITE_OCR_API_KEY;
```

---

## 🔑 API Keys Setup

### Tesseract.js (OCR)

**Current**: Using client-side Tesseract.js (no key needed)

**Production Option**: Google Cloud Vision API

1. Go to [Google Cloud Console](https://console.cloud.google.com)
2. Enable Vision API
3. Create API Key
4. Add to `.env`:
   ```env
   VITE_OCR_API_KEY=AIzaSyXXXXXXXXXXXXXXXXXXX
   ```

### OpenAI API (For Enhanced Insights)

1. Sign up at [OpenAI](https://platform.openai.com)
2. Create API key
3. Add to `.env`:
   ```env
   VITE_OPENAI_API_KEY=sk-xxxxxxxxxxxxxxxx
   ```

**Sample Integration**:

```javascript
// src/utils/openaiAnalyzer.js
import OpenAI from 'openai';

const openai = new OpenAI({
  apiKey: import.meta.env.VITE_OPENAI_API_KEY,
  dangerouslyAllowBrowser: true // Only for demo!
});

export async function getAIInsights(vitals) {
  const response = await openai.chat.completions.create({
    model: "gpt-4",
    messages: [{
      role: "system",
      content: "You are a medical AI assistant analyzing health vitals."
    }, {
      role: "user",
      content: `Analyze these vitals: ${JSON.stringify(vitals)}`
    }]
  });
  
  return response.choices[0].message.content;
}
```

---

## 🌍 Environment-Specific Configurations

### Development (`.env`)

```env
VITE_API_ENDPOINT=http://localhost:8000/api
VITE_ENABLE_DEBUG=true
VITE_LOG_LEVEL=verbose
```

### Staging (`.env.staging`)

```env
VITE_API_ENDPOINT=https://staging-api.healthvision.com
VITE_ENABLE_DEBUG=true
VITE_LOG_LEVEL=info
```

### Production (`.env.production`)

```env
VITE_API_ENDPOINT=https://api.healthvision.com
VITE_ENABLE_DEBUG=false
VITE_LOG_LEVEL=error
VITE_ENABLE_ANALYTICS=true
```

Build with specific environment:

```bash
# Development
npm run dev

# Staging
npm run build --mode staging

# Production
npm run build
```

---

## 🔐 Security Best Practices

### ⚠️ NEVER Commit `.env` Files

Already in `.gitignore`:
```
.env
.env.local
.env.*.local
```

### ✅ Use Backend Proxy for Sensitive Operations

**DON'T** (Client-side API calls):
```javascript
// ❌ Exposes API key in browser!
const response = await fetch('https://api.service.com', {
  headers: { 'API-Key': import.meta.env.VITE_API_KEY }
});
```

**DO** (Backend proxy):
```javascript
// ✅ API key stays on server
const response = await fetch('/api/proxy/service', {
  headers: { 'Authorization': `Bearer ${userToken}` }
});
```

### 🔒 API Key Restrictions

For Google Cloud APIs:
- Restrict by HTTP referrer (your domain)
- Restrict by API (only Vision API)
- Set usage quotas
- Enable billing alerts

---

## 🧪 Testing with Mock Data

For testing without API keys:

```javascript
// src/utils/mockService.js
export const useMockData = import.meta.env.VITE_USE_MOCK_DATA === 'true';

export async function fetchHealthData() {
  if (useMockData) {
    return sampleVitals; // Use sample data
  }
  
  // Real API call
  const response = await fetch(import.meta.env.VITE_API_ENDPOINT);
  return response.json();
}
```

In `.env`:
```env
VITE_USE_MOCK_DATA=true
```

---

## 📊 Feature Flags

Control features via environment variables:

```javascript
// src/config/features.js
export const features = {
  ocrEnabled: import.meta.env.VITE_ENABLE_OCR === 'true',
  aiInsights: import.meta.env.VITE_ENABLE_AI_INSIGHTS === 'true',
  audioAlerts: import.meta.env.VITE_ENABLE_AUDIO === 'true',
  consultations: import.meta.env.VITE_ENABLE_CONSULTS === 'true',
};

// Usage in component
import { features } from '@/config/features';

if (features.ocrEnabled) {
  // Show OCR upload button
}
```

---

## 🌐 Backend API Configuration

### Sample Backend `.env` (Node.js/Express)

```env
# Server Configuration
PORT=8000
NODE_ENV=production

# Database
DATABASE_URL=postgresql://user:pass@localhost:5432/healthvision
REDIS_URL=redis://localhost:6379

# Authentication
JWT_SECRET=your-super-secret-key-change-this
JWT_EXPIRY=7d

# External Services
OPENAI_API_KEY=sk-xxxxxxxxxxxxxxxx
SENDGRID_API_KEY=SG.xxxxxxxxxxxxxxxx
AWS_ACCESS_KEY=AKIAXXXXXXXXXXXXXXXX
AWS_SECRET_KEY=xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx

# Feature Flags
ENABLE_RATE_LIMITING=true
MAX_REQUESTS_PER_MINUTE=100

# CORS
ALLOWED_ORIGINS=https://healthvision.com,https://app.healthvision.com
```

---

## 📱 Mobile App Configuration (React Native)

For future mobile app:

```javascript
// app.config.js
export default {
  expo: {
    name: "HealthVision",
    extra: {
      apiEndpoint: process.env.API_ENDPOINT,
      ocrApiKey: process.env.OCR_API_KEY,
    }
  }
};

// Access in app
import Constants from 'expo-constants';

const apiEndpoint = Constants.expoConfig.extra.apiEndpoint;
```

---

## 🔄 CI/CD Environment Variables

### GitHub Actions

```yaml
# .github/workflows/deploy.yml
env:
  VITE_API_ENDPOINT: ${{ secrets.API_ENDPOINT }}
  VITE_OCR_API_KEY: ${{ secrets.OCR_API_KEY }}
```

Add secrets in GitHub repo settings:
- Settings → Secrets → Actions → New repository secret

### Vercel

Dashboard → Project → Settings → Environment Variables

Add for each environment:
- Production
- Preview
- Development

### Netlify

Site settings → Environment variables → Add variables

Or use `netlify.toml`:
```toml
[build.environment]
  VITE_API_ENDPOINT = "https://api.healthvision.com"
```

---

## 🐛 Debugging Environment Issues

### Check if variables are loaded:

```javascript
console.log('Environment:', {
  apiEndpoint: import.meta.env.VITE_API_ENDPOINT,
  mode: import.meta.env.MODE,
  dev: import.meta.env.DEV,
  prod: import.meta.env.PROD,
});
```

### Common Issues:

**Problem**: Variables are `undefined`

**Solutions**:
1. Ensure variable starts with `VITE_`
2. Restart dev server after adding variables
3. Check `.env` file is in project root
4. Verify no syntax errors in `.env`

**Problem**: Changes not reflecting

**Solution**: 
```bash
# Clear Vite cache
rm -rf node_modules/.vite
npm run dev
```

---

## 📚 References

- [Vite Environment Variables](https://vitejs.dev/guide/env-and-mode.html)
- [Google Cloud Vision API](https://cloud.google.com/vision/docs)
- [OpenAI API Documentation](https://platform.openai.com/docs)
- [dotenv Package](https://github.com/motdotla/dotenv)

---

**🔒 Remember: Keep your `.env` file secure and never commit it to Git!**

