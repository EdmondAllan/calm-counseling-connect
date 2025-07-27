import React from 'react';
import { CheckCircle2, BookOpen, Home } from 'lucide-react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';

const BookingSuccess = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 flex items-center justify-center">
      <div className="max-w-md mx-auto text-center p-8">
        <motion.div
          initial={{ scale: 0, rotate: -30 }}
          animate={{ scale: 1, rotate: 0 }}
          transition={{ type: "spring", stiffness: 260, damping: 20 }}
          className="w-24 h-24 bg-gradient-to-br from-green-400 to-teal-500 rounded-full mx-auto flex items-center justify-center shadow-lg mb-6"
        >
          <CheckCircle2 className="w-16 h-16 text-white" />
        </motion.div>
        
        <h1 className="text-3xl font-bold text-gray-800 mb-4">Booking Confirmed!</h1>
        
        <div className="mt-6 p-4 bg-green-50/70 border border-green-200 rounded-lg mb-6">
          <p className="text-green-800">
            ✨ Your counseling session has been successfully booked! We'll send you a confirmation email shortly with session details and meeting information.
          </p>
        </div>
        
        <div className="grid grid-cols-1 gap-4 text-left mb-6">
          <div className="p-4 bg-blue-50 rounded-lg">
            <h3 className="font-bold flex items-center gap-2 mb-2">
              <BookOpen className="w-5 h-5 text-blue-500"/> 
              Next Steps
            </h3>
            <p className="text-sm text-gray-600">Check your email for session details.</p>
          </div>
          
          <div className="p-4 bg-purple-50 rounded-lg">
            <h3 className="font-bold flex items-center gap-2 mb-2">
              <Home className="w-5 h-5 text-purple-500"/> 
              Preparation
            </h3>
            <p className="text-sm text-gray-600">Find a quiet, comfortable space.</p>
          </div>
        </div>
        
        <button
          onClick={() => navigate('/booking')}
          className="w-full px-8 py-3 font-semibold text-white rounded-lg bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 transform hover:scale-105 transition-all duration-200 shadow-lg hover:shadow-xl"
        >
          Book Another Session
        </button>
      </div>
    </div>
  );
};

export default BookingSuccess; 