# ⚡ Quick Start Guide - HealthVision

Get your HealthVision dashboard running in **under 5 minutes**!

## 📋 Prerequisites

- **Node.js** 16 or higher ([Download](https://nodejs.org/))
- **npm** or **yarn** (comes with Node.js)
- Modern browser (Chrome, Firefox, Safari, Edge)

Check your versions:
```bash
node --version  # Should be v16 or higher
npm --version   # Should be 8 or higher
```

---

## 🚀 Installation Steps

### 1. Navigate to Project Directory

```bash
cd Medi-Analyzer
```

### 2. Install Dependencies

```bash
npm install
```

This will install all required packages (~200MB). Wait 1-2 minutes.

### 3. Start Development Server

```bash
npm run dev
```

You should see:
```
  VITE v5.0.8  ready in 500 ms

  ➜  Local:   http://localhost:3000/
  ➜  Network: use --host to expose
  ➜  press h to show help
```

### 4. Open Browser

Navigate to: **http://localhost:3000**

🎉 **Done!** Your HealthVision dashboard is now running!

---

## 🧪 Testing the App

### Try These Features:

1. **View 3D Body Model** (Left Panel)
   - Rotate: Click & drag
   - Zoom: Scroll wheel
   - Hover over organs to see labels

2. **Check Sample Health Data** (Middle Panel)
   - View vitals cards
   - See risk score
   - Check heart age comparison

3. **Explore Care Strategy** (Right Panel)
   - Click tabs: Medications / Exercises / Lifestyle
   - Expand medication cards for details

4. **Upload a Report** (Top Bar)
   - Click "Upload Report"
   - Drag & drop an image or PDF
   - Watch OCR extract data (demo mode)

5. **Request Consultation**
   - Scroll to Care Strategy panel
   - Click "Consult Specialist"
   - Fill out form and submit

---

## 📱 Mobile Testing

To test on mobile devices on your network:

```bash
npm run dev -- --host
```

Then access from your phone using the Network URL shown.

---

## 🔧 Common Issues & Fixes

### Issue: Port 3000 already in use

**Solution**: Change port in `vite.config.js`:
```javascript
server: {
  port: 3001, // Change to any available port
}
```

### Issue: Dependencies failed to install

**Solution**: Clear cache and reinstall:
```bash
rm -rf node_modules package-lock.json
npm cache clean --force
npm install
```

### Issue: 3D model not showing

**Solution**: 
- Check browser console for errors
- Ensure WebGL is enabled
- Try a different browser
- Update graphics drivers

### Issue: Blank white screen

**Solution**: 
- Check browser console (F12)
- Ensure all files were created correctly
- Try `npm run build` to check for errors

---

## 🎨 Customization Quick Tips

### Change Sample Patient Data

Edit `src/utils/healthAnalyzer.js`:

```javascript
export const samplePatientInfo = {
  name: 'Your Name',
  age: 30,
  gender: 'Male',
  // ...
};
```

### Modify Risk Thresholds

Edit risk calculation in `src/utils/healthAnalyzer.js`:

```javascript
if (vitals.bloodPressureSystolic > 140) {
  riskScore += 25; // Adjust weight
}
```

### Change Color Scheme

Edit `tailwind.config.js` gradients or `src/index.css` styles.

---

## 📦 Build for Production

```bash
npm run build
```

Output will be in `dist/` folder (~2-3MB).

Preview production build:
```bash
npm run preview
```

---

## 🌐 Deploy Online (2 minutes)

### Fastest: Vercel

```bash
npm i -g vercel
vercel
```

Follow prompts. Live in 60 seconds!

### Alternative: Netlify Drop

1. Run `npm run build`
2. Go to [Netlify Drop](https://app.netlify.com/drop)
3. Drag `dist` folder
4. Done!

See `DEPLOYMENT.md` for more options.

---

## 📚 Next Steps

- Read `README.md` for full documentation
- Explore component files in `src/components/`
- Check `src/utils/healthAnalyzer.js` for AI logic
- Customize styling in `src/index.css`
- Add real API integration

---

## 🆘 Need Help?

- Check browser console (F12) for errors
- Read full `README.md`
- Review component comments in code
- Open GitHub issue

---

## 🎯 Development Commands

| Command | Purpose |
|---------|---------|
| `npm run dev` | Start dev server |
| `npm run build` | Build for production |
| `npm run preview` | Preview production build |
| `npm run lint` | Check code quality |

---

**🎉 Enjoy building with HealthVision!**

Made with ❤️ for better health outcomes.

