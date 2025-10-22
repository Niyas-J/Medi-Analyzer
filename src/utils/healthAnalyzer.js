/**
 * Health Analyzer Utility
 * Contains AI logic for analyzing health vitals and generating insights
 */

// Calculate risk score based on vitals (0-100 scale)
export const calculateRiskScore = (vitals) => {
  let riskScore = 0;
  
  // Blood Pressure Risk
  if (vitals.bloodPressureSystolic > 140 || vitals.bloodPressureDiastolic > 90) {
    riskScore += 25;
  } else if (vitals.bloodPressureSystolic > 130 || vitals.bloodPressureDiastolic > 85) {
    riskScore += 15;
  }
  
  // Heart Rate Risk
  if (vitals.heartRate > 100 || vitals.heartRate < 60) {
    riskScore += 15;
  }
  
  // Blood Sugar Risk
  if (vitals.bloodSugar > 126) {
    riskScore += 20;
  } else if (vitals.bloodSugar > 100) {
    riskScore += 10;
  }
  
  // Cholesterol Risk
  if (vitals.cholesterol > 240) {
    riskScore += 20;
  } else if (vitals.cholesterol > 200) {
    riskScore += 10;
  }
  
  // HbA1c Risk
  if (vitals.hba1c > 6.5) {
    riskScore += 20;
  } else if (vitals.hba1c > 5.7) {
    riskScore += 10;
  }
  
  return Math.min(riskScore, 100);
};

// Calculate heart age based on vitals
export const calculateHeartAge = (vitals, chronologicalAge) => {
  let ageModifier = 0;
  
  // BP impact
  if (vitals.bloodPressureSystolic > 140) ageModifier += 8;
  else if (vitals.bloodPressureSystolic > 130) ageModifier += 4;
  
  // Cholesterol impact
  if (vitals.cholesterol > 240) ageModifier += 10;
  else if (vitals.cholesterol > 200) ageModifier += 5;
  
  // Blood sugar impact
  if (vitals.bloodSugar > 126) ageModifier += 7;
  else if (vitals.bloodSugar > 100) ageModifier += 3;
  
  // Heart rate impact
  if (vitals.heartRate > 100) ageModifier += 5;
  
  return chronologicalAge + ageModifier;
};

// Generate health insights based on vitals
export const generateHealthInsights = (vitals) => {
  const insights = [];
  
  // Blood Pressure Analysis
  if (vitals.bloodPressureSystolic > 140 || vitals.bloodPressureDiastolic > 90) {
    insights.push({
      type: 'warning',
      category: 'Cardiovascular',
      message: 'High blood pressure detected. Hypertension increases risk of heart disease and stroke.',
      recommendation: 'Reduce sodium intake, exercise regularly, and consult a cardiologist.',
      severity: 'high'
    });
  } else if (vitals.bloodPressureSystolic > 130) {
    insights.push({
      type: 'caution',
      category: 'Cardiovascular',
      message: 'Elevated blood pressure. Early stage hypertension detected.',
      recommendation: 'Monitor BP regularly, reduce stress, maintain healthy weight.',
      severity: 'medium'
    });
  }
  
  // Blood Sugar Analysis
  if (vitals.bloodSugar > 126) {
    insights.push({
      type: 'warning',
      category: 'Metabolic',
      message: 'High blood glucose levels. Diabetes range detected.',
      recommendation: 'Consult an endocrinologist. Reduce sugar intake, increase physical activity.',
      severity: 'high'
    });
  } else if (vitals.bloodSugar > 100) {
    insights.push({
      type: 'caution',
      category: 'Metabolic',
      message: 'Prediabetes zone. Blood sugar levels are elevated.',
      recommendation: 'Adopt low-glycemic diet, exercise 30 mins daily, lose excess weight.',
      severity: 'medium'
    });
  }
  
  // Cholesterol Analysis
  if (vitals.cholesterol > 240) {
    insights.push({
      type: 'warning',
      category: 'Cardiovascular',
      message: 'High cholesterol levels increase cardiovascular disease risk.',
      recommendation: 'Reduce saturated fats, increase fiber intake, consider statin therapy.',
      severity: 'high'
    });
  }
  
  // HbA1c Analysis
  if (vitals.hba1c > 6.5) {
    insights.push({
      type: 'warning',
      category: 'Metabolic',
      message: 'HbA1c indicates poor glucose control over past 3 months.',
      recommendation: 'Strict diabetic diet, regular glucose monitoring, medication review.',
      severity: 'high'
    });
  }
  
  // Heart Rate Analysis
  if (vitals.heartRate > 100) {
    insights.push({
      type: 'caution',
      category: 'Cardiovascular',
      message: 'Elevated resting heart rate detected. May indicate stress or fitness issues.',
      recommendation: 'Practice stress reduction, improve cardiovascular fitness.',
      severity: 'medium'
    });
  } else if (vitals.heartRate < 60 && vitals.heartRate > 40) {
    insights.push({
      type: 'info',
      category: 'Cardiovascular',
      message: 'Low heart rate. Common in athletes but monitor for symptoms.',
      recommendation: 'If experiencing dizziness or fatigue, consult a doctor.',
      severity: 'low'
    });
  }
  
  // All vitals normal
  if (insights.length === 0) {
    insights.push({
      type: 'success',
      category: 'Overall Health',
      message: 'All vital signs are within normal range. Excellent health markers!',
      recommendation: 'Maintain current lifestyle, continue regular check-ups.',
      severity: 'low'
    });
  }
  
  return insights;
};

// Identify organs at risk
export const identifyAffectedOrgans = (vitals) => {
  const affected = [];
  
  // Heart/Cardiovascular
  if (vitals.bloodPressureSystolic > 130 || vitals.heartRate > 100 || vitals.cholesterol > 200) {
    affected.push({
      organ: 'heart',
      severity: vitals.bloodPressureSystolic > 140 ? 'high' : 'medium',
      color: '#ef4444',
      label: 'Cardiovascular System'
    });
  }
  
  // Pancreas/Metabolic
  if (vitals.bloodSugar > 100 || vitals.hba1c > 5.7) {
    affected.push({
      organ: 'pancreas',
      severity: vitals.bloodSugar > 126 ? 'high' : 'medium',
      color: '#f59e0b',
      label: 'Metabolic System'
    });
  }
  
  // Liver (VLDL, APOB indicators)
  if (vitals.vldl > 30 || vitals.apob > 100) {
    affected.push({
      organ: 'liver',
      severity: 'medium',
      color: '#10b981',
      label: 'Liver Function'
    });
  }
  
  // Brain (stress markers, high BP)
  if (vitals.bloodPressureSystolic > 140 || vitals.stressLevel > 7) {
    affected.push({
      organ: 'brain',
      severity: 'medium',
      color: '#eab308',
      label: 'Neurological Health'
    });
  }
  
  return affected;
};

// Generate personalized care strategy
export const generateCareStrategy = (vitals, insights) => {
  const strategy = {
    medications: [],
    exercises: [],
    lifestyle: []
  };
  
  // Medication recommendations based on conditions
  if (vitals.bloodPressureSystolic > 140) {
    strategy.medications.push({
      name: 'ACE Inhibitor',
      dosage: '10mg once daily',
      purpose: 'Controls high blood pressure',
      note: 'Consult doctor before taking'
    });
    strategy.medications.push({
      name: 'Omega-3 Fatty Acids',
      dosage: '1000mg daily',
      purpose: 'Supports cardiovascular health',
      note: 'Available over-the-counter'
    });
  }
  
  if (vitals.cholesterol > 200) {
    strategy.medications.push({
      name: 'Statin Therapy',
      dosage: '20mg at bedtime',
      purpose: 'Reduces LDL cholesterol',
      note: 'Prescription required'
    });
  }
  
  if (vitals.bloodSugar > 100) {
    strategy.medications.push({
      name: 'Metformin',
      dosage: '500mg twice daily',
      purpose: 'Controls blood glucose levels',
      note: 'Take with meals'
    });
  }
  
  // General supplements
  strategy.medications.push({
    name: 'Magnesium Citrate',
    dosage: '400mg daily',
    purpose: 'Improves heart rhythm & blood pressure',
    note: 'Supports muscle and nerve function'
  });
  
  strategy.medications.push({
    name: 'Vitamin D3',
    dosage: '2000 IU daily',
    purpose: 'Bone health & immune support',
    note: 'Especially important if low sun exposure'
  });
  
  // Exercise recommendations
  const riskScore = calculateRiskScore(vitals);
  
  if (riskScore > 50) {
    strategy.exercises.push({
      activity: 'Light Walking',
      duration: '15-20 minutes',
      frequency: '2x daily',
      benefits: 'Gentle cardiovascular activity'
    });
    strategy.exercises.push({
      activity: 'Breathing Exercises',
      duration: '10 minutes',
      frequency: 'Daily',
      benefits: 'Reduces stress and blood pressure'
    });
  } else {
    strategy.exercises.push({
      activity: 'Brisk Walking',
      duration: '30-45 minutes',
      frequency: 'Daily',
      benefits: 'Improves heart health and circulation'
    });
    strategy.exercises.push({
      activity: 'Yoga or Stretching',
      duration: '20 minutes',
      frequency: '3-4x weekly',
      benefits: 'Flexibility, stress reduction'
    });
    strategy.exercises.push({
      activity: 'Strength Training',
      duration: '30 minutes',
      frequency: '2-3x weekly',
      benefits: 'Builds muscle, improves metabolism'
    });
  }
  
  // Lifestyle modifications
  strategy.lifestyle.push({
    category: 'Diet',
    recommendation: 'Mediterranean diet rich in fruits, vegetables, whole grains',
    priority: 'high'
  });
  
  strategy.lifestyle.push({
    category: 'Hydration',
    recommendation: 'Drink 8-10 glasses of water daily',
    priority: 'medium'
  });
  
  strategy.lifestyle.push({
    category: 'Sleep',
    recommendation: '7-9 hours of quality sleep per night',
    priority: 'high'
  });
  
  strategy.lifestyle.push({
    category: 'Stress Management',
    recommendation: 'Practice meditation, mindfulness, or deep breathing',
    priority: 'medium'
  });
  
  if (vitals.bloodPressureSystolic > 130) {
    strategy.lifestyle.push({
      category: 'Sodium Intake',
      recommendation: 'Limit to less than 2000mg per day',
      priority: 'high'
    });
  }
  
  return strategy;
};

// Sample data for demo purposes
export const sampleVitals = {
  bloodPressureSystolic: 145,
  bloodPressureDiastolic: 92,
  heartRate: 88,
  temperature: 98.6,
  bloodSugar: 118,
  cholesterol: 215,
  hba1c: 6.2,
  apob: 105,
  vldl: 32,
  ldl: 140,
  hdl: 45,
  triglycerides: 180,
  stressLevel: 6,
  oxygenSaturation: 97
};

export const samplePatientInfo = {
  name: 'John Doe',
  age: 45,
  gender: 'Male',
  weight: 82, // kg
  height: 175, // cm
  lastCheckup: '2024-10-15'
};

