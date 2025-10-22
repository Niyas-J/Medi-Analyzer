import React, { useState } from 'react';
import { motion } from 'framer-motion';

/**
 * Realistic Human Body Component
 * Displays realistic anatomical image with organ highlighting
 * 
 * 🎨 CUSTOMIZE THE BODY IMAGE:
 * 1. Replace the image URL in line ~100 with your own
 * 2. Or add your image to /public folder and use: src="/your-image.png"
 * 3. See CUSTOMIZE_BODY_IMAGE.md for detailed instructions
 * 
 * Free medical images from:
 * - Unsplash: https://unsplash.com/s/photos/human-anatomy
 * - Pexels: https://www.pexels.com/search/medical-anatomy/
 */

// Organ hotspot component
const OrganHotspot = ({ position, organ, color, severity, onHover }) => {
  const [hovered, setHovered] = useState(false);
  
  return (
    <motion.div
      className="absolute cursor-pointer"
      style={{
        left: `${position.x}%`,
        top: `${position.y}%`,
        transform: 'translate(-50%, -50%)'
      }}
      onMouseEnter={() => {
        setHovered(true);
        onHover(organ);
      }}
      onMouseLeave={() => setHovered(false)}
      animate={{
        scale: severity === 'high' ? [1, 1.2, 1] : [1, 1.1, 1]
      }}
      transition={{
        duration: 2,
        repeat: Infinity,
        ease: "easeInOut"
      }}
    >
      {severity !== 'none' && (
        <>
          {/* Glow effect */}
          <div 
            className="absolute inset-0 rounded-full blur-xl opacity-60"
            style={{
              backgroundColor: color,
              width: '60px',
              height: '60px',
              transform: 'translate(-50%, -50%)',
              left: '50%',
              top: '50%'
            }}
          />
          {/* Center dot */}
          <div 
            className="relative w-8 h-8 rounded-full border-2"
            style={{
              backgroundColor: `${color}40`,
              borderColor: color
            }}
          />
        </>
      )}
      
      {hovered && (
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="absolute -top-12 left-1/2 -translate-x-1/2 bg-gray-900 text-white px-3 py-2 rounded-lg text-sm whitespace-nowrap shadow-lg z-50"
        >
          <div className="font-semibold">{organ}</div>
          <div className="text-xs text-gray-300">
            {severity === 'high' ? 'High Risk' : severity === 'medium' ? 'Moderate Risk' : 'Normal'}
          </div>
        </motion.div>
      )}
    </motion.div>
  );
};

// Main Body Component with realistic image
const Body3D = ({ affectedOrgans = [] }) => {
  const [hoveredOrgan, setHoveredOrgan] = useState(null);
  
  // Map affected organs to their positions and colors
  const getOrganData = (organName) => {
    const organ = affectedOrgans.find(o => o.organ === organName);
    return {
      color: organ?.color || '#64748b',
      severity: organ ? (organ.severity === 'high' ? 'high' : 'medium') : 'none'
    };
  };
  
  const heartData = getOrganData('heart');
  const brainData = getOrganData('brain');
  const liverData = getOrganData('liver');
  const pancreasData = getOrganData('pancreas');
  const lungsData = getOrganData('lungs');
  
  return (
    <div className="w-full h-full relative flex items-center justify-center bg-gradient-to-br from-blue-900 via-blue-800 to-blue-900 rounded-lg overflow-hidden shadow-2xl">
      {/* Realistic human body image */}
      <div className="relative w-full h-full flex items-center justify-center">
        {/* 3D Anatomical Visualization - YOUR CUSTOM IMAGE! */}
        <img 
          src="/human-body.webp"
          alt="Human Anatomy with Internal Organs"
          className="w-full h-full object-contain"
          style={{ 
            maxHeight: '100%', 
            maxWidth: '100%',
            filter: 'brightness(1.15) contrast(1.1) saturate(1.05)',
            opacity: 1
          }}
          onError={(e) => {
            // Fallback to SVG if image fails to load
            e.target.style.display = 'none';
            e.target.nextSibling.style.display = 'block';
          }}
        />
        
        {/* Fallback SVG (hidden by default) */}
        <svg 
          viewBox="0 0 200 500" 
          className="w-full h-full object-contain"
          style={{ maxHeight: '100%', maxWidth: '100%', display: 'none' }}
        >
          {/* Enhanced 3D-style human body silhouette */}
          <defs>
            <linearGradient id="bodyGradient" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" style={{ stopColor: '#60a5fa', stopOpacity: 0.9 }} />
              <stop offset="50%" style={{ stopColor: '#3b82f6', stopOpacity: 0.85 }} />
              <stop offset="100%" style={{ stopColor: '#1d4ed8', stopOpacity: 0.9 }} />
            </linearGradient>
            <linearGradient id="organGlow" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" style={{ stopColor: '#ef4444', stopOpacity: 0.8 }} />
              <stop offset="100%" style={{ stopColor: '#dc2626', stopOpacity: 0.9 }} />
            </linearGradient>
            <filter id="glow">
              <feGaussianBlur stdDeviation="4" result="coloredBlur"/>
              <feMerge>
                <feMergeNode in="coloredBlur"/>
                <feMergeNode in="SourceGraphic"/>
              </feMerge>
            </filter>
            <radialGradient id="shine">
              <stop offset="0%" style={{ stopColor: '#ffffff', stopOpacity: 0.3 }} />
              <stop offset="100%" style={{ stopColor: '#ffffff', stopOpacity: 0 }} />
            </radialGradient>
          </defs>
          
          {/* Head with 3D effect */}
          <ellipse cx="100" cy="35" rx="20" ry="25" fill="url(#bodyGradient)" stroke="#3b82f6" strokeWidth="2.5" filter="url(#glow)" />
          <ellipse cx="95" cy="32" rx="8" ry="10" fill="url(#shine)" />
          
          {/* Neck */}
          <rect x="90" y="58" width="20" height="12" fill="url(#bodyGradient)" stroke="#3b82f6" strokeWidth="2" rx="4" filter="url(#glow)" />
          
          {/* Shoulders and chest with internal organs visible */}
          <path 
            d="M 60 70 L 140 70 Q 145 75 145 80 L 145 120 Q 145 125 140 125 L 60 125 Q 55 125 55 120 L 55 80 Q 55 75 60 70 Z" 
            fill="url(#bodyGradient)" 
            stroke="#3b82f6" 
            strokeWidth="2.5"
            opacity="0.85"
            filter="url(#glow)"
          />
          
          {/* Lungs representation (pink/red) */}
          <ellipse cx="85" cy="95" rx="12" ry="18" fill="#ef4444" opacity="0.7" filter="url(#glow)" />
          <ellipse cx="115" cy="95" rx="12" ry="18" fill="#ef4444" opacity="0.7" filter="url(#glow)" />
          
          {/* Heart (darker red) */}
          <path d="M 100 85 L 95 95 Q 100 100 100 105 Q 100 100 105 95 Z" fill="#dc2626" opacity="0.8" filter="url(#glow)" />
          
          {/* Abdomen */}
          <path 
            d="M 65 125 L 135 125 Q 138 130 138 135 L 135 180 Q 135 185 130 185 L 70 185 Q 65 185 65 180 L 62 135 Q 62 130 65 125 Z" 
            fill="url(#bodyGradient)" 
            stroke="#3b82f6" 
            strokeWidth="2.5"
            opacity="0.85"
            filter="url(#glow)"
          />
          
          {/* Digestive organs (orange/yellow) */}
          <ellipse cx="95" cy="150" rx="15" ry="20" fill="#f59e0b" opacity="0.6" filter="url(#glow)" />
          <circle cx="110" cy="155" r="8" fill="#fbbf24" opacity="0.6" filter="url(#glow)" />
          
          {/* Pelvis */}
          <ellipse cx="100" cy="200" rx="30" ry="18" fill="url(#bodyGradient)" stroke="#6366f1" strokeWidth="2" />
          
          {/* Left leg */}
          <path 
            d="M 80 215 L 85 320 L 88 460 L 78 460 L 75 320 L 70 215 Z" 
            fill="url(#bodyGradient)" 
            stroke="#6366f1" 
            strokeWidth="2"
          />
          
          {/* Right leg */}
          <path 
            d="M 120 215 L 125 320 L 122 460 L 112 460 L 115 320 L 130 215 Z" 
            fill="url(#bodyGradient)" 
            stroke="#6366f1" 
            strokeWidth="2"
          />
          
          {/* Left arm */}
          <path 
            d="M 55 75 L 40 120 L 38 165 L 45 165 L 48 120 L 60 80 Z" 
            fill="url(#bodyGradient)" 
            stroke="#6366f1" 
            strokeWidth="2"
          />
          
          {/* Right arm */}
          <path 
            d="M 145 75 L 160 120 L 162 165 L 155 165 L 152 120 L 140 80 Z" 
            fill="url(#bodyGradient)" 
            stroke="#6366f1" 
            strokeWidth="2"
          />
        </svg>
        
        {/* Organ hotspots overlay */}
        {/* Brain */}
        <OrganHotspot
          position={{ x: 50, y: 8 }}
          organ="Brain"
          color={brainData.color}
          severity={brainData.severity}
          onHover={setHoveredOrgan}
        />
        
        {/* Heart */}
        <OrganHotspot
          position={{ x: 45, y: 24 }}
          organ="Heart"
          color={heartData.color}
          severity={heartData.severity}
          onHover={setHoveredOrgan}
        />
        
        {/* Lungs (left) */}
        <OrganHotspot
          position={{ x: 40, y: 22 }}
          organ="Left Lung"
          color={lungsData.color}
          severity={lungsData.severity}
          onHover={setHoveredOrgan}
        />
        
        {/* Lungs (right) */}
        <OrganHotspot
          position={{ x: 60, y: 22 }}
          organ="Right Lung"
          color={lungsData.color}
          severity={lungsData.severity}
          onHover={setHoveredOrgan}
        />
        
        {/* Liver */}
        <OrganHotspot
          position={{ x: 55, y: 32 }}
          organ="Liver"
          color={liverData.color}
          severity={liverData.severity}
          onHover={setHoveredOrgan}
        />
        
        {/* Pancreas */}
        <OrganHotspot
          position={{ x: 45, y: 34 }}
          organ="Pancreas"
          color={pancreasData.color}
          severity={pancreasData.severity}
          onHover={setHoveredOrgan}
        />
      </div>
      
      {/* Legend with blue background to match */}
      <div className="absolute bottom-4 left-4 bg-blue-950/80 backdrop-blur-md border border-blue-400/30 rounded-lg p-3 space-y-2 shadow-xl">
        <p className="text-blue-100 text-xs font-semibold mb-2">Risk Levels</p>
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 rounded-full bg-red-500 shadow-lg shadow-red-500/50"></div>
          <span className="text-blue-50 text-xs">High Risk</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 rounded-full bg-amber-400 shadow-lg shadow-amber-400/50"></div>
          <span className="text-blue-50 text-xs">Moderate Risk</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 rounded-full bg-cyan-400 shadow-lg shadow-cyan-400/50"></div>
          <span className="text-blue-50 text-xs">Normal</span>
        </div>
      </div>
    </div>
  );
};

export default Body3D;

