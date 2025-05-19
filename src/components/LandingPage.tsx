import React from 'react';
import { useNavigate } from 'react-router-dom';
import Logo from '@/components/logo/LogoExtended'; // Updated to use the extended Logo component

const LandingPage = () => {
  const navigate = useNavigate();

  const handleGetStarted = () => {
    navigate('/login');
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-royal-blue/5 to-saffron-orange/5">
      <Logo size="lg" variant="light" className="mb-8" />
      <h1 className="text-4xl font-bold text-white mb-4">Welcome to Wealthवाणी</h1>
      <p className="text-lg text-white mb-6">Your journey to financial wellness starts here.</p>
      <button 
        onClick={handleGetStarted} 
        className="bg-white text-royal-blue px-6 py-3 rounded-lg shadow-lg hover:bg-gray-100 transition"
      >
        Get Started
      </button>
    </div>
  );
};

export default LandingPage;
