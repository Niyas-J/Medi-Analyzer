# 🏥 HealthVision - AI-Powered Health Analytics Dashboard

A futuristic, responsive web application that analyzes hospital reports and visualizes health data on an interactive 3D human body model with personalized care strategies.

![HealthVision Dashboard](https://img.shields.io/badge/React-18.2.0-blue)
![Three.js](https://img.shields.io/badge/Three.js-0.159.0-black)
![TailwindCSS](https://img.shields.io/badge/TailwindCSS-3.3.6-38bdf8)
![License](https://img.shields.io/badge/license-MIT-green)

## ✨ Features

### 🎯 Core Capabilities

- **3D Interactive Body Visualization**: Translucent human body model with dynamic organ highlighting based on health risks
- **Smart Report Analysis**: Upload hospital reports (PDF/images) with OCR-powered data extraction
- **Real-time Health Analytics**: 
  - Risk scoring (0-100 scale)
  - Heart age vs. chronological age comparison
  - Key health marker tracking (HbA1c, APOB, VLDL, etc.)
- **AI-Powered Insights**: Intelligent health recommendations based on vital signs
- **Personalized Care Strategy**:
  - Medication recommendations with dosage
  - Exercise routines
  - Lifestyle modifications
- **Specialist Consultation**: In-app form to request medical consultation

### 🎨 Design Features

- Glassmorphic UI with smooth animations
- Gradient backgrounds with ambient effects
- Color-coded health status (Green/Yellow/Red)
- Responsive design for all devices
- Framer Motion animations for fluid UX

## 🚀 Quick Start

### Prerequisites

- Node.js 16+ and npm/yarn
- Modern web browser with WebGL support

### Installation

```bash
# Clone or navigate to project directory
cd Medi-Analyzer

# Install dependencies
npm install

# Start development server
npm run dev
```

The application will open at `http://localhost:3000`

### Build for Production

```bash
npm run build
npm run preview
```

## 📁 Project Structure

```
Medi-Analyzer/
├── src/
│   ├── components/
│   │   ├── Body3D.jsx              # 3D human body visualization
│   │   ├── VitalsDashboard.jsx     # Health metrics cards
│   │   ├── HealthAnalytics.jsx     # Risk scoring & charts
│   │   ├── CareStrategy.jsx        # Medicine & exercise recommendations
│   │   ├── ReportUploader.jsx      # OCR report processor
│   │   └── ConsultationForm.jsx    # Doctor consultation modal
│   ├── utils/
│   │   └── healthAnalyzer.js       # AI health analysis logic
│   ├── App.jsx                     # Main application
│   ├── main.jsx                    # Entry point
│   └── index.css                   # Global styles
├── package.json
├── vite.config.js
├── tailwind.config.js
└── README.md
```

## 🧩 Component Overview

### 1. Body3D Component
- Built with Three.js and React Three Fiber
- Interactive 3D human body model
- Dynamic organ highlighting (heart, lungs, liver, pancreas, brain)
- Hover labels for organ information
- Orbital camera controls

### 2. VitalsDashboard Component
- Displays 6 primary vitals:
  - Blood Pressure
  - Heart Rate
  - Temperature
  - Blood Sugar
  - Cholesterol
  - HbA1c
- Additional markers: APOB, VLDL, LDL, HDL
- Status-based color coding

### 3. HealthAnalytics Component
- Overall risk score with progress bar
- Heart age comparison chart (Recharts)
- Key areas of concern
- AI-generated health insights

### 4. CareStrategy Component
- Tabbed interface (Medications/Exercises/Lifestyle)
- Expandable medication cards with dosage info
- Exercise recommendations with frequency
- Lifestyle modification tips
- Priority-based color coding

### 5. ReportUploader Component
- Drag & drop file upload
- OCR text extraction using Tesseract.js
- Supports PDF and image formats
- Automatic vital sign parsing
- Progress tracking

### 6. ConsultationForm Component
- Modal form for specialist consultation
- Patient information collection
- Urgency level selection
- Success confirmation animation

## 🔧 Technology Stack

| Technology | Purpose |
|------------|---------|
| React 18 | Frontend framework |
| Vite | Build tool & dev server |
| TailwindCSS | Utility-first styling |
| Three.js | 3D rendering |
| @react-three/fiber | React renderer for Three.js |
| @react-three/drei | Three.js helpers |
| Framer Motion | Animation library |
| Recharts | Data visualization |
| Tesseract.js | OCR text extraction |
| Lucide React | Icon library |
| React Dropzone | File upload handling |

## 🧠 AI Health Analysis Logic

The `healthAnalyzer.js` utility provides intelligent health assessment:

### Risk Score Calculation
- Blood pressure: Up to 25 points
- Heart rate: Up to 15 points
- Blood sugar: Up to 20 points
- Cholesterol: Up to 20 points
- HbA1c: Up to 20 points

### Heart Age Calculation
Factors considered:
- Blood pressure impact: +4-8 years
- Cholesterol impact: +5-10 years
- Blood sugar impact: +3-7 years
- Heart rate impact: +5 years

### Insight Generation
- Automatic detection of health concerns
- Severity-based recommendations
- Evidence-based medical guidance

## 🎨 Customization

### Customize the Human Body Image

Want to use your own anatomical image? It's easy!

**Quick Method:**
1. Edit `src/components/Body3D.jsx`
2. Change the image URL on line ~100:
   ```javascript
   src="YOUR_IMAGE_URL_HERE"
   ```

**Or add to project:**
1. Add image to `public/` folder
2. Use: `src="/your-image.png"`

📖 **See [CUSTOMIZE_BODY_IMAGE.md](CUSTOMIZE_BODY_IMAGE.md) for complete guide**

Free medical images:
- [Unsplash Medical](https://unsplash.com/s/photos/human-anatomy)
- [Pexels Anatomy](https://www.pexels.com/search/medical-anatomy/)

### Changing Theme Colors

Edit `tailwind.config.js`:

```javascript
theme: {
  extend: {
    colors: {
      primary: '#your-color',
      secondary: '#your-color',
    }
  }
}
```

### Modifying Health Thresholds

Edit `src/utils/healthAnalyzer.js`:

```javascript
if (vitals.bloodPressureSystolic > YOUR_THRESHOLD) {
  // Custom logic
}
```

### Adding New Vitals

1. Add to sample data in `healthAnalyzer.js`
2. Update `VitalsDashboard.jsx` with new card
3. Include in risk calculation logic

## 🔒 Privacy & Security

- **No data storage**: All processing happens client-side
- **No external API calls**: Sample data used for demonstration
- **HIPAA considerations**: For production use, implement:
  - Encrypted data transmission
  - Secure backend API
  - User authentication
  - Audit logging

## 🚧 Future Enhancements

- [ ] Integration with real OCR API (Google Vision, AWS Textract)
- [ ] OpenAI GPT integration for advanced health insights
- [ ] Real-time doctor video consultation
- [ ] Health history tracking & trends
- [ ] Export reports as PDF
- [ ] Multi-language support
- [ ] Dark/light theme toggle
- [ ] Voice assistant integration
- [ ] Wearable device data sync

## 🐛 Troubleshooting

### Issue: 3D model not rendering
**Solution**: Ensure WebGL is enabled in your browser and GPU drivers are updated.

### Issue: OCR not extracting data
**Solution**: The OCR uses Tesseract.js which works best with clear, high-contrast images. For production, consider cloud OCR services.

### Issue: Animations lagging
**Solution**: Reduce particle count in `Body3D.jsx` or disable animations on low-end devices.

## 📝 License

MIT License - feel free to use this project for personal or commercial purposes.

## 🤝 Contributing

Contributions are welcome! Please feel free to submit pull requests or open issues.

## 📧 Support

For questions or support, please open an issue on the repository.

---

**Disclaimer**: This is a demonstration application. Health recommendations are AI-generated and for informational purposes only. Always consult qualified healthcare professionals for medical advice.

**Built with ❤️ for better health outcomes**

