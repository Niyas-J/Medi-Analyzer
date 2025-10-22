# 🖼️ Customize Human Body Image

You can easily replace the human body visualization with your own realistic medical image!

## 📋 Options to Add Custom Body Image

### Option 1: Use External URL (Easiest)

Edit `src/components/Body3D.jsx` and change the image URL:

```javascript
<img 
  src="YOUR_IMAGE_URL_HERE"  // ← Change this
  alt="Human Anatomy"
  className="w-full h-full object-contain opacity-80"
  // ...
/>
```

**Recommended Free Medical Image Sources:**
- [Unsplash Medical](https://unsplash.com/s/photos/human-anatomy)
- [Pexels Medical](https://www.pexels.com/search/human-anatomy/)
- [Pixabay Science](https://pixabay.com/images/search/human-body/)
- [OpenVerse Medical](https://wordpress.org/openverse/)

### Option 2: Add Image to Project

1. **Download or create** a high-quality human anatomy image (PNG, JPG, SVG)

2. **Place the image** in the `public` folder:
   ```
   public/
   └── human-body.png  ← Your image here
   ```

3. **Update** `src/components/Body3D.jsx`:
   ```javascript
   <img 
     src="/human-body.png"  // References public folder
     alt="Human Anatomy"
     // ...
   />
   ```

### Option 3: Search and Download from Web

1. Go to any of these sites:
   - **Unsplash**: https://unsplash.com/s/photos/anatomy-human-body
   - **Pexels**: https://www.pexels.com/search/medical-anatomy/
   - **Freepik**: https://www.freepik.com/search?format=search&query=human%20body%20anatomy

2. Download a high-quality image (1000x2000px recommended)

3. Save to `public/` folder or use URL as shown above

## 🎨 Image Requirements

### Ideal Specifications:
- **Aspect Ratio**: Portrait (1:2 or similar)
- **Resolution**: At least 400x800px
- **Format**: PNG (transparent background preferred), JPG, or SVG
- **Content**: Front-facing human body anatomy
- **Style**: Medical illustration, 3D render, or realistic photo

### Good Example Images:
- Translucent 3D medical models
- X-ray style visualizations
- Anatomical diagrams with organ visibility
- Medical textbook illustrations

## 🔧 Advanced Customization

### Adjust Image Appearance

In `src/components/Body3D.jsx`, modify these properties:

```javascript
<img 
  src="YOUR_IMAGE_URL"
  className="w-full h-full object-contain opacity-80"
  style={{ 
    maxHeight: '100%', 
    maxWidth: '100%',
    filter: 'brightness(1.1) contrast(1.05)'  // ← Adjust these
  }}
/>
```

**Filter Options:**
- `brightness(1.2)` - Make brighter
- `contrast(1.1)` - Increase contrast
- `saturate(1.2)` - More colorful
- `grayscale(0.3)` - Slight grayscale
- `blur(0.5px)` - Slight blur for depth

### Position Organ Hotspots

Adjust organ positions to match your image:

```javascript
{/* Brain */}
<OrganHotspot
  position={{ x: 50, y: 8 }}  // ← x: left%, y: top%
  organ="Brain"
  // ...
/>
```

**Tips:**
- x: 0 = left edge, 100 = right edge
- y: 0 = top, 100 = bottom
- Use browser inspector to find exact positions

## 📸 Recommended Image URLs

### Option A: Professional Medical Render
```javascript
src="https://images.unsplash.com/photo-1530497610245-94d3c16cda28?w=400&h=800&fit=crop"
```

### Option B: Anatomical Illustration
```javascript
src="https://images.unsplash.com/photo-1559757148-5c350d0d3c56?w=400&h=800&fit=crop"
```

### Option C: X-Ray Style
```javascript
src="https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?w=400&h=800&fit=crop"
```

## 🎯 Complete Example

```javascript
// src/components/Body3D.jsx

<div className="relative w-full h-full flex items-center justify-center">
  <img 
    src="/custom-body.png"  // Your custom image
    alt="Human Anatomy"
    className="w-full h-full object-contain opacity-90"
    style={{ 
      maxHeight: '100%', 
      maxWidth: '100%',
      filter: 'brightness(1.15) contrast(1.1) saturate(0.95)'
    }}
    onError={(e) => {
      // Fallback to SVG if image fails
      e.target.style.display = 'none';
      e.target.nextSibling.style.display = 'block';
    }}
  />
  
  {/* Fallback SVG remains unchanged */}
  <svg style={{ display: 'none' }}>
    {/* ... SVG code ... */}
  </svg>
  
  {/* Organ hotspots - adjust positions as needed */}
  <OrganHotspot position={{ x: 50, y: 8 }} organ="Brain" ... />
  <OrganHotspot position={{ x: 45, y: 24 }} organ="Heart" ... />
  {/* ... */}
</div>
```

## ✅ Testing Your Custom Image

1. Save your changes
2. Vite will auto-reload (HMR)
3. Check browser console for errors
4. Verify organ hotspots align correctly
5. Test hover interactions

## 🆘 Troubleshooting

**Image not showing?**
- Check browser console for 404 errors
- Verify file path is correct
- Ensure CORS allows the image URL
- Try using `/` prefix for public folder files

**Organ positions wrong?**
- Open browser DevTools
- Use element inspector to find coordinates
- Adjust x/y percentages accordingly
- Test in different screen sizes

**Image quality poor?**
- Use higher resolution source (min 800x1600)
- Check image compression settings
- Try PNG format for better quality
- Avoid over-filtering

---

**💡 Pro Tip**: Use semi-transparent PNG images with anatomical details for the best visual effect with organ overlays!

**🎨 Need Help?** Check the component code comments or refer to the main README.md

