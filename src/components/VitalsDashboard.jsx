import React from 'react';
import { Heart, Activity, Thermometer, Droplet, TrendingUp, Zap } from 'lucide-react';
import { motion } from 'framer-motion';

/**
 * Vitals Dashboard Component
 * Displays health metrics in beautiful glassmorphic cards
 */

const VitalCard = ({ icon: Icon, label, value, unit, status, index }) => {
  const statusColors = {
    optimal: 'from-green-400 to-emerald-500',
    moderate: 'from-yellow-400 to-orange-500',
    risk: 'from-red-400 to-rose-600',
    info: 'from-blue-400 to-cyan-500'
  };
  
  const statusBorder = {
    optimal: 'border-green-300',
    moderate: 'border-amber-300',
    risk: 'border-red-300',
    info: 'border-blue-300'
  };
  
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.1 }}
      className={`bg-white rounded-xl p-4 border-2 ${statusBorder[status]} hover:shadow-lg transition-all duration-300 shadow-sm`}
    >
      <div className="flex items-start justify-between mb-3">
        <div className={`p-3 rounded-lg bg-gradient-to-br ${statusColors[status]}`}>
          <Icon className="w-6 h-6 text-white" />
        </div>
        <div className={`px-2 py-1 rounded-full text-xs font-semibold ${
          status === 'optimal' ? 'bg-green-100 text-green-700' :
          status === 'moderate' ? 'bg-amber-100 text-amber-700' :
          status === 'risk' ? 'bg-red-100 text-red-700' :
          'bg-blue-100 text-blue-700'
        }`}>
          {status.toUpperCase()}
        </div>
      </div>
      
      <h3 className="text-gray-600 text-sm font-medium mb-1">{label}</h3>
      <div className="flex items-baseline gap-2">
        <span className="text-gray-900 text-3xl font-bold">{value}</span>
        <span className="text-gray-500 text-sm">{unit}</span>
      </div>
    </motion.div>
  );
};

const VitalsDashboard = ({ vitals }) => {
  // Determine status based on values
  const getBloodPressureStatus = (systolic, diastolic) => {
    if (systolic > 140 || diastolic > 90) return 'risk';
    if (systolic > 130 || diastolic > 85) return 'moderate';
    return 'optimal';
  };
  
  const getHeartRateStatus = (hr) => {
    if (hr > 100 || hr < 50) return 'risk';
    if (hr > 90 || hr < 60) return 'moderate';
    return 'optimal';
  };
  
  const getBloodSugarStatus = (bs) => {
    if (bs > 126) return 'risk';
    if (bs > 100) return 'moderate';
    return 'optimal';
  };
  
  const getCholesterolStatus = (chol) => {
    if (chol > 240) return 'risk';
    if (chol > 200) return 'moderate';
    return 'optimal';
  };
  
  const getHbA1cStatus = (hba1c) => {
    if (hba1c > 6.5) return 'risk';
    if (hba1c > 5.7) return 'moderate';
    return 'optimal';
  };
  
  const vitalCards = [
    {
      icon: Heart,
      label: 'Blood Pressure',
      value: `${vitals.bloodPressureSystolic}/${vitals.bloodPressureDiastolic}`,
      unit: 'mmHg',
      status: getBloodPressureStatus(vitals.bloodPressureSystolic, vitals.bloodPressureDiastolic)
    },
    {
      icon: Activity,
      label: 'Heart Rate',
      value: vitals.heartRate,
      unit: 'BPM',
      status: getHeartRateStatus(vitals.heartRate)
    },
    {
      icon: Thermometer,
      label: 'Temperature',
      value: vitals.temperature,
      unit: '°F',
      status: 'optimal'
    },
    {
      icon: Droplet,
      label: 'Blood Sugar',
      value: vitals.bloodSugar,
      unit: 'mg/dL',
      status: getBloodSugarStatus(vitals.bloodSugar)
    },
    {
      icon: TrendingUp,
      label: 'Cholesterol',
      value: vitals.cholesterol,
      unit: 'mg/dL',
      status: getCholesterolStatus(vitals.cholesterol)
    },
    {
      icon: Zap,
      label: 'HbA1c',
      value: vitals.hba1c,
      unit: '%',
      status: getHbA1cStatus(vitals.hba1c)
    }
  ];
  
  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-2xl font-bold text-gray-900">Vitals Overview</h2>
        <div className="text-gray-500 text-sm">
          Last updated: {new Date().toLocaleDateString()}
        </div>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {vitalCards.map((card, index) => (
          <VitalCard key={card.label} {...card} index={index} />
        ))}
      </div>
      
      {/* Additional Markers */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.6 }}
        className="bg-gray-50 rounded-xl p-5 mt-6 border border-gray-200"
      >
        <h3 className="text-gray-900 text-lg font-semibold mb-4">Additional Markers</h3>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div>
            <p className="text-gray-600 text-sm">APOB</p>
            <p className="text-gray-900 text-xl font-bold">{vitals.apob} <span className="text-sm font-normal">mg/dL</span></p>
          </div>
          <div>
            <p className="text-gray-600 text-sm">VLDL</p>
            <p className="text-gray-900 text-xl font-bold">{vitals.vldl} <span className="text-sm font-normal">mg/dL</span></p>
          </div>
          <div>
            <p className="text-gray-600 text-sm">LDL</p>
            <p className="text-gray-900 text-xl font-bold">{vitals.ldl} <span className="text-sm font-normal">mg/dL</span></p>
          </div>
          <div>
            <p className="text-gray-600 text-sm">HDL</p>
            <p className="text-gray-900 text-xl font-bold">{vitals.hdl} <span className="text-sm font-normal">mg/dL</span></p>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default VitalsDashboard;

