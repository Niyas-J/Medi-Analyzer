import React from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell } from 'recharts';
import { AlertCircle, TrendingUp, Shield } from 'lucide-react';
import { motion } from 'framer-motion';

/**
 * Health Analytics Component
 * Displays risk scores, heart age comparison, and key health concerns
 */

const HealthAnalytics = ({ vitals, riskScore, heartAge, chronologicalAge, insights }) => {
  // Heart age data for chart
  const ageData = [
    {
      name: 'Your Age',
      age: chronologicalAge,
      fill: '#60a5fa'
    },
    {
      name: 'Heart Age',
      age: heartAge,
      fill: heartAge > chronologicalAge ? '#ef4444' : '#22c55e'
    }
  ];
  
  // Risk level determination
  const getRiskLevel = (score) => {
    if (score >= 70) return { level: 'High', color: 'red', bgColor: 'bg-red-500' };
    if (score >= 40) return { level: 'Moderate', color: 'yellow', bgColor: 'bg-yellow-500' };
    return { level: 'Low', color: 'green', bgColor: 'bg-green-500' };
  };
  
  const risk = getRiskLevel(riskScore);
  
  // Key concerns based on vitals
  const concerns = [];
  if (vitals.hba1c > 5.7) {
    concerns.push({
      metric: 'HbA1c',
      value: vitals.hba1c,
      target: '< 5.7',
      status: vitals.hba1c > 6.5 ? 'critical' : 'warning'
    });
  }
  if (vitals.apob > 90) {
    concerns.push({
      metric: 'APOB',
      value: vitals.apob,
      target: '< 90',
      status: vitals.apob > 120 ? 'critical' : 'warning'
    });
  }
  if (vitals.vldl > 30) {
    concerns.push({
      metric: 'VLDL',
      value: vitals.vldl,
      target: '< 30',
      status: 'warning'
    });
  }
  if (vitals.bloodPressureSystolic > 130) {
    concerns.push({
      metric: 'Blood Pressure',
      value: `${vitals.bloodPressureSystolic}/${vitals.bloodPressureDiastolic}`,
      target: '< 120/80',
      status: vitals.bloodPressureSystolic > 140 ? 'critical' : 'warning'
    });
  }
  
  return (
    <div className="space-y-6">
      {/* Risk Score Card */}
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        className={`bg-white rounded-xl p-6 border-2 shadow-md ${riskScore >= 70 ? 'border-red-400' : 'border-gray-200'}`}
      >
        <div className="flex items-center gap-3 mb-4">
          <Shield className={`w-8 h-8 text-${risk.color}-600`} />
          <h3 className="text-xl font-bold text-gray-900">Overall Risk Score</h3>
        </div>
        
        {/* Risk Progress Bar */}
        <div className="relative">
          <div className="w-full h-8 bg-gray-200 rounded-full overflow-hidden">
            <motion.div
              initial={{ width: 0 }}
              animate={{ width: `${riskScore}%` }}
              transition={{ duration: 1, ease: 'easeOut' }}
              className={`h-full ${risk.bgColor} flex items-center justify-end pr-3`}
            >
              <span className="text-white font-bold text-sm">{riskScore}</span>
            </motion.div>
          </div>
          <div className="flex justify-between mt-2 text-xs text-gray-600">
            <span>0 (Low Risk)</span>
            <span>100 (High Risk)</span>
          </div>
        </div>
        
        <div className={`mt-4 p-3 rounded-lg ${
          risk.color === 'red' ? 'bg-red-50 border border-red-200' :
          risk.color === 'yellow' ? 'bg-amber-50 border border-amber-200' :
          'bg-green-50 border border-green-200'
        }`}>
          <p className={`${
            risk.color === 'red' ? 'text-red-700' :
            risk.color === 'yellow' ? 'text-amber-700' :
            'text-green-700'
          } font-semibold`}>
            Risk Level: {risk.level}
          </p>
          <p className="text-gray-700 text-sm mt-1">
            {riskScore >= 70 
              ? 'Immediate medical attention recommended. Schedule consultation with specialist.' 
              : riskScore >= 40 
              ? 'Some health markers need attention. Follow care strategy and monitor closely.'
              : 'Good overall health. Maintain current lifestyle and routine check-ups.'}
          </p>
        </div>
      </motion.div>
      
      {/* Heart Age Comparison */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="bg-white rounded-xl p-6 border border-gray-200 shadow-md"
      >
        <div className="flex items-center gap-3 mb-4">
          <Heart className="w-8 h-8 text-pink-600" />
          <h3 className="text-xl font-bold text-gray-900">Heart Age Analysis</h3>
        </div>
        
        <ResponsiveContainer width="100%" height={200}>
          <BarChart data={ageData}>
            <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
            <XAxis dataKey="name" stroke="#6b7280" />
            <YAxis stroke="#6b7280" />
            <Tooltip
              contentStyle={{
                backgroundColor: 'white',
                border: '1px solid #e5e7eb',
                borderRadius: '8px',
                boxShadow: '0 4px 6px rgba(0,0,0,0.1)'
              }}
            />
            <Bar dataKey="age" radius={[8, 8, 0, 0]}>
              {ageData.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={entry.fill} />
              ))}
            </Bar>
          </BarChart>
        </ResponsiveContainer>
        
        <div className="mt-4 text-center">
          {heartAge > chronologicalAge ? (
            <p className="text-red-700">
              Your heart is <span className="font-bold text-xl">{heartAge - chronologicalAge} years older</span> than your actual age
            </p>
          ) : (
            <p className="text-green-700">
              Your heart age is <span className="font-bold text-xl">healthy</span> for your age
            </p>
          )}
        </div>
      </motion.div>
      
      {/* Key Areas of Concern */}
      {concerns.length > 0 && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="bg-white rounded-xl p-6 border border-gray-200 shadow-md"
        >
          <div className="flex items-center gap-3 mb-4">
            <AlertCircle className="w-8 h-8 text-orange-600" />
            <h3 className="text-xl font-bold text-gray-900">Key Areas of Concern</h3>
          </div>
          
          <div className="space-y-3">
            {concerns.map((concern, index) => (
              <motion.div
                key={concern.metric}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.5 + index * 0.1 }}
                className={`p-4 rounded-lg ${
                  concern.status === 'critical' 
                    ? 'bg-red-50 border border-red-300' 
                    : 'bg-amber-50 border border-amber-300'
                }`}
              >
                <div className="flex justify-between items-center">
                  <div>
                    <h4 className={`font-semibold ${
                      concern.status === 'critical' ? 'text-red-700' : 'text-amber-700'
                    }`}>
                      {concern.metric}
                    </h4>
                    <p className="text-gray-700 text-sm mt-1">
                      Current: <span className="font-bold">{concern.value}</span> | 
                      Target: <span className="font-bold">{concern.target}</span>
                    </p>
                  </div>
                  <div className={`px-3 py-1 rounded-full text-xs font-bold ${
                    concern.status === 'critical' 
                      ? 'bg-red-600 text-white' 
                      : 'bg-amber-600 text-white'
                  }`}>
                    {concern.status === 'critical' ? 'CRITICAL' : 'WARNING'}
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      )}
      
      {/* AI Insights */}
      {insights && insights.length > 0 && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
          className="bg-white rounded-xl p-6 border border-gray-200 shadow-md"
        >
          <div className="flex items-center gap-3 mb-4">
            <TrendingUp className="w-8 h-8 text-blue-600" />
            <h3 className="text-xl font-bold text-gray-900">AI Health Insights</h3>
          </div>
          
          <div className="space-y-3">
            {insights.slice(0, 3).map((insight, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.7 + index * 0.1 }}
                className="p-4 rounded-lg bg-gray-50 border border-gray-200"
              >
                <div className="flex items-start gap-3">
                  <div className={`w-2 h-2 rounded-full mt-2 ${
                    insight.severity === 'high' ? 'bg-red-500' :
                    insight.severity === 'medium' ? 'bg-amber-500' :
                    'bg-green-500'
                  }`}></div>
                  <div className="flex-1">
                    <p className="text-gray-900 font-medium">{insight.message}</p>
                    <p className="text-gray-600 text-sm mt-1">{insight.recommendation}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      )}
    </div>
  );
};

// Import for Heart icon
import { Heart } from 'lucide-react';

export default HealthAnalytics;

