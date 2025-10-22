import React, { useState } from 'react';
import { Pill, Activity, Heart, AlertCircle, ChevronDown, ChevronUp } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

/**
 * Care Strategy Component
 * Displays personalized medications, exercises, and lifestyle recommendations
 */

const MedicationCard = ({ medication, index }) => {
  const [expanded, setExpanded] = useState(false);
  
  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.1 }}
      className="bg-gray-50 border border-gray-200 rounded-lg p-4 hover:shadow-md transition-all cursor-pointer"
      onClick={() => setExpanded(!expanded)}
    >
      <div className="flex items-start justify-between">
        <div className="flex items-start gap-3 flex-1">
          <div className="p-2 rounded-lg bg-gradient-to-br from-purple-400 to-pink-500">
            <Pill className="w-5 h-5 text-white" />
          </div>
          <div className="flex-1">
            <h4 className="text-gray-900 font-semibold">{medication.name}</h4>
            <p className="text-blue-600 text-sm mt-1">{medication.dosage}</p>
            <p className="text-gray-600 text-sm mt-1">{medication.purpose}</p>
          </div>
        </div>
        {expanded ? (
          <ChevronUp className="w-5 h-5 text-gray-500" />
        ) : (
          <ChevronDown className="w-5 h-5 text-gray-500" />
        )}
      </div>
      
      <AnimatePresence>
        {expanded && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            className="mt-3 pt-3 border-t border-gray-300"
          >
            <div className="flex items-start gap-2">
              <AlertCircle className="w-4 h-4 text-amber-600 mt-0.5 flex-shrink-0" />
              <p className="text-gray-700 text-sm">{medication.note}</p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
};

const ExerciseCard = ({ exercise, index }) => {
  return (
    <motion.div
      initial={{ opacity: 0, x: -10 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ delay: index * 0.1 }}
      className="bg-gray-50 border border-gray-200 rounded-lg p-4"
    >
      <div className="flex items-start gap-3">
        <div className="p-2 rounded-lg bg-gradient-to-br from-green-400 to-emerald-500">
          <Activity className="w-5 h-5 text-white" />
        </div>
        <div className="flex-1">
          <h4 className="text-gray-900 font-semibold">{exercise.activity}</h4>
          <div className="flex flex-wrap gap-2 mt-2">
            <span className="px-2 py-1 rounded-full bg-blue-100 text-blue-700 text-xs font-medium">
              {exercise.duration}
            </span>
            <span className="px-2 py-1 rounded-full bg-purple-100 text-purple-700 text-xs font-medium">
              {exercise.frequency}
            </span>
          </div>
          <p className="text-gray-600 text-sm mt-2">{exercise.benefits}</p>
        </div>
      </div>
    </motion.div>
  );
};

const LifestyleCard = ({ item, index }) => {
  const priorityColors = {
    high: 'from-red-400 to-orange-500',
    medium: 'from-yellow-400 to-orange-400',
    low: 'from-green-400 to-emerald-500'
  };
  
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ delay: index * 0.1 }}
      className="flex items-center gap-3 p-3 rounded-lg bg-gray-50 border border-gray-200"
    >
      <div className={`w-1 h-12 rounded-full bg-gradient-to-b ${priorityColors[item.priority]}`}></div>
      <div className="flex-1">
        <h5 className="text-gray-900 font-medium text-sm">{item.category}</h5>
        <p className="text-gray-600 text-xs mt-1">{item.recommendation}</p>
      </div>
    </motion.div>
  );
};

const CareStrategy = ({ strategy, onConsultClick }) => {
  const [activeTab, setActiveTab] = useState('medications');
  
  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
      <div>
        <h2 className="text-2xl font-bold text-gray-900 flex items-center gap-2">
          <Heart className="w-7 h-7 text-red-500" />
          Customized Care Strategy
        </h2>
        <p className="text-gray-600 text-sm mt-1">Personalized recommendations for optimal health</p>
      </div>
      </div>
      
      {/* Tab Navigation */}
      <div className="flex gap-2 bg-gray-100 rounded-lg p-1 border border-gray-200">
        <button
          onClick={() => setActiveTab('medications')}
          className={`flex-1 py-2 px-4 rounded-md transition-all font-medium ${
            activeTab === 'medications' 
              ? 'bg-white text-purple-700 shadow-sm' 
              : 'text-gray-600 hover:text-gray-900'
          }`}
        >
          Medications
        </button>
        <button
          onClick={() => setActiveTab('exercises')}
          className={`flex-1 py-2 px-4 rounded-md transition-all font-medium ${
            activeTab === 'exercises' 
              ? 'bg-white text-green-700 shadow-sm' 
              : 'text-gray-600 hover:text-gray-900'
          }`}
        >
          Exercises
        </button>
        <button
          onClick={() => setActiveTab('lifestyle')}
          className={`flex-1 py-2 px-4 rounded-md transition-all font-medium ${
            activeTab === 'lifestyle' 
              ? 'bg-white text-blue-700 shadow-sm' 
              : 'text-gray-600 hover:text-gray-900'
          }`}
        >
          Lifestyle
        </button>
      </div>
      
      {/* Content */}
      <div className="space-y-3">
        <AnimatePresence mode="wait">
          {activeTab === 'medications' && (
            <motion.div
              key="medications"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="space-y-3"
            >
              {strategy.medications.map((med, index) => (
                <MedicationCard key={index} medication={med} index={index} />
              ))}
            </motion.div>
          )}
          
          {activeTab === 'exercises' && (
            <motion.div
              key="exercises"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="space-y-3"
            >
              {strategy.exercises.map((exercise, index) => (
                <ExerciseCard key={index} exercise={exercise} index={index} />
              ))}
            </motion.div>
          )}
          
          {activeTab === 'lifestyle' && (
            <motion.div
              key="lifestyle"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="space-y-2"
            >
              {strategy.lifestyle.map((item, index) => (
                <LifestyleCard key={index} item={item} index={index} />
              ))}
            </motion.div>
          )}
        </AnimatePresence>
      </div>
      
      {/* Action Buttons */}
      <div className="grid grid-cols-2 gap-3 mt-6">
        <motion.button
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          onClick={onConsultClick}
          className="py-3 px-4 rounded-lg bg-gradient-to-r from-blue-500 to-cyan-500 text-white font-semibold hover:shadow-glow-blue transition-all"
        >
          Consult Specialist
        </motion.button>
        <motion.button
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          className="py-3 px-4 rounded-lg glass text-white font-semibold hover:bg-white/20 transition-all"
        >
          Download Report
        </motion.button>
      </div>
      
      {/* Disclaimer */}
      <div className="bg-amber-50 rounded-lg p-4 border border-amber-300">
        <div className="flex items-start gap-2">
          <AlertCircle className="w-5 h-5 text-amber-700 flex-shrink-0 mt-0.5" />
          <p className="text-amber-900 text-sm">
            <strong>Disclaimer:</strong> These recommendations are AI-generated and for informational purposes only. 
            Always consult with qualified healthcare professionals before starting any new medication or treatment plan.
          </p>
        </div>
      </div>
    </div>
  );
};

export default CareStrategy;

