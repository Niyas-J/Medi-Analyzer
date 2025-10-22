import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Activity, Brain, Upload } from 'lucide-react';

// Components
import Body3D from './components/Body3D';
import VitalsDashboard from './components/VitalsDashboard';
import HealthAnalytics from './components/HealthAnalytics';
import CareStrategy from './components/CareStrategy';
import ReportUploader from './components/ReportUploader';
import ConsultationForm from './components/ConsultationForm';

// Utilities
import {
  sampleVitals,
  samplePatientInfo,
  calculateRiskScore,
  calculateHeartAge,
  generateHealthInsights,
  identifyAffectedOrgans,
  generateCareStrategy
} from './utils/healthAnalyzer';

/**
 * Main HealthVision Application
 * Three-panel futuristic health analytics dashboard
 */

function App() {
  // State Management
  const [vitals, setVitals] = useState(sampleVitals);
  const [patientInfo, setPatientInfo] = useState(samplePatientInfo);
  const [riskScore, setRiskScore] = useState(0);
  const [heartAge, setHeartAge] = useState(0);
  const [insights, setInsights] = useState([]);
  const [affectedOrgans, setAffectedOrgans] = useState([]);
  const [careStrategy, setCareStrategy] = useState({ medications: [], exercises: [], lifestyle: [] });
  const [showConsultForm, setShowConsultForm] = useState(false);
  const [showUploader, setShowUploader] = useState(false);
  const [audioEnabled, setAudioEnabled] = useState(false);
  
  // Analyze health data whenever vitals change
  useEffect(() => {
    const risk = calculateRiskScore(vitals);
    const hAge = calculateHeartAge(vitals, patientInfo.age);
    const healthInsights = generateHealthInsights(vitals);
    const organs = identifyAffectedOrgans(vitals);
    const strategy = generateCareStrategy(vitals, healthInsights);
    
    setRiskScore(risk);
    setHeartAge(hAge);
    setInsights(healthInsights);
    setAffectedOrgans(organs);
    setCareStrategy(strategy);
    
    // Play alert sound if high risk (placeholder - actual audio implementation)
    if (risk >= 70 && audioEnabled) {
      // Placeholder for ambient sound or alert
      console.log('High risk detected - playing alert');
    }
  }, [vitals, patientInfo, audioEnabled]);
  
  // Handle report upload and data extraction
  const handleDataExtracted = (extractedData) => {
    setVitals(extractedData);
    setShowUploader(false);
  };
  
  return (
    <div className="min-h-screen animated-gradient relative overflow-hidden">
      {/* Subtle Background Effects */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-20 left-20 w-96 h-96 bg-blue-400/5 rounded-full blur-[120px]"></div>
        <div className="absolute bottom-20 right-20 w-96 h-96 bg-purple-400/5 rounded-full blur-[120px]"></div>
      </div>
      
      {/* Header */}
      <header className="relative z-10 bg-white border-b border-gray-200 shadow-sm">
        <div className="container mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="p-2 rounded-lg bg-gradient-to-br from-blue-500 to-blue-600">
                <Brain className="w-8 h-8 text-white" />
              </div>
              <div>
                <h1 className="text-2xl font-bold text-gray-900">HealthVision</h1>
                <p className="text-gray-500 text-sm">AI-Powered Health Analytics Dashboard</p>
              </div>
            </div>
            
            <div className="flex items-center gap-3">
              {/* Upload Button */}
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setShowUploader(!showUploader)}
                className="px-4 py-2 rounded-lg bg-white border border-gray-200 text-gray-700 font-medium hover:bg-gray-50 transition-all flex items-center gap-2 shadow-sm"
              >
                <Upload className="w-4 h-4" />
                Upload Report
              </motion.button>
              
              {/* Patient Info */}
              <div className="bg-white border border-gray-200 rounded-lg px-4 py-2 shadow-sm">
                <p className="text-gray-900 text-sm">
                  <span className="text-gray-500">Patient:</span> <span className="font-semibold">{patientInfo.name}</span>
                </p>
                <p className="text-gray-500 text-xs">
                  Age: {patientInfo.age} | {patientInfo.gender}
                </p>
              </div>
              
              {/* Risk Indicator */}
              <div className={`px-4 py-2 rounded-lg border-2 shadow-sm ${
                riskScore >= 70 ? 'bg-red-50 border-red-400' :
                riskScore >= 40 ? 'bg-amber-50 border-amber-400' :
                'bg-green-50 border-green-400'
              }`}>
                <div className="flex items-center gap-2">
                  <Activity className={`w-5 h-5 ${
                    riskScore >= 70 ? 'text-red-600' :
                    riskScore >= 40 ? 'text-amber-600' :
                    'text-green-600'
                  }`} />
                  <div>
                    <p className="text-xs text-gray-600">Risk Score</p>
                    <p className={`font-bold ${
                      riskScore >= 70 ? 'text-red-700' :
                      riskScore >= 40 ? 'text-amber-700' :
                      'text-green-700'
                    }`}>
                      {riskScore}/100
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </header>
      
      {/* Report Uploader Section */}
      {showUploader && (
        <motion.div
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: 'auto' }}
          exit={{ opacity: 0, height: 0 }}
          className="relative z-10 border-b border-white/10 bg-black/20"
        >
          <div className="container mx-auto px-6 py-6">
            <ReportUploader onDataExtracted={handleDataExtracted} />
          </div>
        </motion.div>
      )}
      
      {/* Main Content - Three Panel Layout */}
      <main className="relative z-10 container mx-auto px-6 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 h-[calc(100vh-200px)]">
          
          {/* LEFT PANEL - 3D Human Body */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
            className="lg:col-span-3 bg-white rounded-2xl p-4 overflow-hidden shadow-lg border border-gray-200"
          >
            <div className="flex items-center gap-2 mb-4">
              <div className="w-2 h-2 rounded-full bg-blue-500 animate-pulse"></div>
              <h2 className="text-gray-900 font-semibold">Body Scan</h2>
            </div>
            <div className="h-[calc(100%-3rem)]">
              <Body3D affectedOrgans={affectedOrgans} />
            </div>
          </motion.div>
          
          {/* MIDDLE PANEL - Health Metrics & Analytics */}
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="lg:col-span-5 space-y-6 overflow-y-auto custom-scrollbar"
          >
            {/* Vitals Dashboard */}
            <div className="bg-white rounded-2xl p-6 shadow-lg border border-gray-200">
              <VitalsDashboard vitals={vitals} />
            </div>
            
            {/* Health Analytics */}
            <div className="bg-white rounded-2xl p-6 shadow-lg border border-gray-200">
              <HealthAnalytics
                vitals={vitals}
                riskScore={riskScore}
                heartAge={heartAge}
                chronologicalAge={patientInfo.age}
                insights={insights}
              />
            </div>
          </motion.div>
          
          {/* RIGHT PANEL - Care Strategy */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
            className="lg:col-span-4 bg-white rounded-2xl p-6 overflow-y-auto custom-scrollbar shadow-lg border border-gray-200"
          >
            <CareStrategy
              strategy={careStrategy}
              onConsultClick={() => setShowConsultForm(true)}
            />
          </motion.div>
        </div>
      </main>
      
      {/* Consultation Form Modal */}
      <ConsultationForm
        isOpen={showConsultForm}
        onClose={() => setShowConsultForm(false)}
      />
      
      {/* Footer */}
      <footer className="relative z-10 bg-white border-t border-gray-200 py-4">
        <div className="container mx-auto px-6">
          <div className="flex items-center justify-between text-gray-500 text-sm">
            <p>© 2024 HealthVision. AI-Powered Health Analytics.</p>
            <div className="flex items-center gap-4">
              <button className="hover:text-gray-900 transition-all">Privacy</button>
              <button className="hover:text-gray-900 transition-all">Terms</button>
              <button className="hover:text-gray-900 transition-all">Support</button>
            </div>
          </div>
        </div>
      </footer>
      
      {/* Custom scrollbar styles */}
      <style>{`
        .custom-scrollbar::-webkit-scrollbar {
          width: 6px;
        }
        .custom-scrollbar::-webkit-scrollbar-track {
          background: rgba(255, 255, 255, 0.05);
          border-radius: 3px;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb {
          background: rgba(255, 255, 255, 0.2);
          border-radius: 3px;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb:hover {
          background: rgba(255, 255, 255, 0.3);
        }
      `}</style>
    </div>
  );
}

export default App;

