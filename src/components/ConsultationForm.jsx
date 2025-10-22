import React, { useState } from 'react';
import { X, User, FileText, MessageSquare, Send, CheckCircle } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

/**
 * Consultation Form Modal
 * Allows users to request consultation with specialists
 */

const ConsultationForm = ({ isOpen, onClose }) => {
  const [formData, setFormData] = useState({
    name: '',
    age: '',
    phone: '',
    email: '',
    symptoms: '',
    urgency: 'normal'
  });
  
  const [submitted, setSubmitted] = useState(false);
  
  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };
  
  const handleSubmit = (e) => {
    e.preventDefault();
    
    // Simulate API call
    console.log('Consultation Request:', formData);
    
    // Show success state
    setSubmitted(true);
    
    // Reset after 3 seconds
    setTimeout(() => {
      setSubmitted(false);
      setFormData({
        name: '',
        age: '',
        phone: '',
        email: '',
        symptoms: '',
        urgency: 'normal'
      });
      onClose();
    }, 3000);
  };
  
  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/60 backdrop-blur-sm z-40"
          />
          
          {/* Modal */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-2xl z-50 p-4"
          >
            <div className="glass-dark rounded-2xl p-6 max-h-[90vh] overflow-y-auto">
              {/* Header */}
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl font-bold text-white flex items-center gap-2">
                  <MessageSquare className="w-7 h-7 text-blue-400" />
                  Consult a Specialist
                </h2>
                <button
                  onClick={onClose}
                  className="p-2 rounded-lg hover:bg-white/10 transition-all"
                >
                  <X className="w-6 h-6 text-white/60" />
                </button>
              </div>
              
              <AnimatePresence mode="wait">
                {!submitted ? (
                  <motion.form
                    key="form"
                    initial={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    onSubmit={handleSubmit}
                    className="space-y-4"
                  >
                    {/* Personal Info */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-white/80 text-sm font-medium mb-2">
                          Full Name *
                        </label>
                        <div className="relative">
                          <User className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-white/40" />
                          <input
                            type="text"
                            name="name"
                            value={formData.name}
                            onChange={handleChange}
                            required
                            className="w-full pl-10 pr-4 py-3 rounded-lg glass border border-white/20 text-white placeholder-white/40 focus:outline-none focus:border-blue-400 transition-all"
                            placeholder="John Doe"
                          />
                        </div>
                      </div>
                      
                      <div>
                        <label className="block text-white/80 text-sm font-medium mb-2">
                          Age *
                        </label>
                        <input
                          type="number"
                          name="age"
                          value={formData.age}
                          onChange={handleChange}
                          required
                          className="w-full px-4 py-3 rounded-lg glass border border-white/20 text-white placeholder-white/40 focus:outline-none focus:border-blue-400 transition-all"
                          placeholder="45"
                        />
                      </div>
                    </div>
                    
                    {/* Contact Info */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-white/80 text-sm font-medium mb-2">
                          Phone Number *
                        </label>
                        <input
                          type="tel"
                          name="phone"
                          value={formData.phone}
                          onChange={handleChange}
                          required
                          className="w-full px-4 py-3 rounded-lg glass border border-white/20 text-white placeholder-white/40 focus:outline-none focus:border-blue-400 transition-all"
                          placeholder="+1 (555) 000-0000"
                        />
                      </div>
                      
                      <div>
                        <label className="block text-white/80 text-sm font-medium mb-2">
                          Email Address *
                        </label>
                        <input
                          type="email"
                          name="email"
                          value={formData.email}
                          onChange={handleChange}
                          required
                          className="w-full px-4 py-3 rounded-lg glass border border-white/20 text-white placeholder-white/40 focus:outline-none focus:border-blue-400 transition-all"
                          placeholder="john@example.com"
                        />
                      </div>
                    </div>
                    
                    {/* Symptoms */}
                    <div>
                      <label className="block text-white/80 text-sm font-medium mb-2">
                        Symptoms / Concerns *
                      </label>
                      <div className="relative">
                        <FileText className="absolute left-3 top-3 w-5 h-5 text-white/40" />
                        <textarea
                          name="symptoms"
                          value={formData.symptoms}
                          onChange={handleChange}
                          required
                          rows={4}
                          className="w-full pl-10 pr-4 py-3 rounded-lg glass border border-white/20 text-white placeholder-white/40 focus:outline-none focus:border-blue-400 transition-all resize-none"
                          placeholder="Describe your symptoms, medical history, or specific concerns..."
                        />
                      </div>
                    </div>
                    
                    {/* Urgency */}
                    <div>
                      <label className="block text-white/80 text-sm font-medium mb-2">
                        Urgency Level
                      </label>
                      <div className="grid grid-cols-3 gap-3">
                        {['normal', 'moderate', 'urgent'].map((level) => (
                          <button
                            key={level}
                            type="button"
                            onClick={() => setFormData({ ...formData, urgency: level })}
                            className={`py-3 px-4 rounded-lg font-medium transition-all ${
                              formData.urgency === level
                                ? level === 'urgent'
                                  ? 'bg-red-500 text-white'
                                  : level === 'moderate'
                                  ? 'bg-yellow-500 text-black'
                                  : 'bg-green-500 text-white'
                                : 'glass text-white/60 hover:text-white'
                            }`}
                          >
                            {level.charAt(0).toUpperCase() + level.slice(1)}
                          </button>
                        ))}
                      </div>
                    </div>
                    
                    {/* Info Box */}
                    <div className="glass rounded-lg p-4 border border-blue-500/30">
                      <p className="text-blue-200 text-sm">
                        <strong>Note:</strong> A specialist will review your request and contact you within 24-48 hours. 
                        For medical emergencies, please call 911 or visit your nearest emergency room.
                      </p>
                    </div>
                    
                    {/* Submit Button */}
                    <motion.button
                      type="submit"
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      className="w-full py-4 px-6 rounded-lg bg-gradient-to-r from-blue-500 to-cyan-500 text-white font-bold text-lg hover:shadow-glow-blue transition-all flex items-center justify-center gap-2"
                    >
                      <Send className="w-5 h-5" />
                      Submit Consultation Request
                    </motion.button>
                  </motion.form>
                ) : (
                  <motion.div
                    key="success"
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="flex flex-col items-center justify-center py-12"
                  >
                    <motion.div
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      transition={{ delay: 0.2, type: 'spring', stiffness: 200 }}
                    >
                      <CheckCircle className="w-20 h-20 text-green-400 mb-6" />
                    </motion.div>
                    <h3 className="text-2xl font-bold text-white mb-3">Request Submitted!</h3>
                    <p className="text-white/70 text-center max-w-md">
                      Your consultation request has been sent to our medical team. 
                      A specialist will contact you shortly at the provided contact information.
                    </p>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};

export default ConsultationForm;

