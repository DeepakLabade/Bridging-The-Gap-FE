import React, { useState } from 'react';

const RoleSelection = () => {
  const [selectedRole, setSelectedRole] = useState(null);

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col items-center justify-center p-6">
      <div className="w-full max-w-md bg-white rounded-lg shadow-md p-8">
        <h1 className="text-2xl font-bold text-center mb-8">Join as a client or freelancer</h1>
        
        {/* Role Selection Cards */}
        <div className="space-y-4 mb-8">
          <div 
            className={`p-4 border-2 rounded-lg cursor-pointer transition-colors ${
              selectedRole === 'client' 
                ? 'border-blue-500 bg-blue-50' 
                : 'border-gray-200 hover:border-blue-300'
            }`}
            onClick={() => setSelectedRole('client')}
          >
            <div className="flex items-center">
              <div className={`w-5 h-5 rounded-full border-2 mr-3 ${
                selectedRole === 'client' ? 'border-blue-500 bg-blue-500' : 'border-gray-300'
              }`}></div>
              <span className="font-medium">I'm a client, hiring for a project</span>
            </div>
          </div>
          
          <div 
            className={`p-4 border-2 rounded-lg cursor-pointer transition-colors ${
              selectedRole === 'freelancer' 
                ? 'border-blue-500 bg-blue-50' 
                : 'border-gray-200 hover:border-blue-300'
            }`}
            onClick={() => setSelectedRole('freelancer')}
          >
            <div className="flex items-center">
              <div className={`w-5 h-5 rounded-full border-2 mr-3 ${
                selectedRole === 'freelancer' ? 'border-blue-500 bg-blue-500' : 'border-gray-300'
              }`}></div>
              <span className="font-medium">I'm a freelancer, looking for work</span>
            </div>
          </div>
        </div>
        
        {/* Divider */}
        <div className="relative mb-6">
          <div className="absolute inset-0 flex items-center">
            <div className="w-full border-t border-gray-200"></div>
          </div>
          <div className="relative flex justify-center">
            <span className="px-2 bg-white text-gray-500">or</span>
          </div>
        </div>
        
        {/* Action Buttons */}
        <div className="space-y-4">
          <button 
            className={`w-full py-2 px-4 rounded-md font-medium ${
              selectedRole 
                ? 'bg-blue-600 hover:bg-blue-700 text-white' 
                : 'bg-gray-300 text-gray-500 cursor-not-allowed'
            }`}
            disabled={!selectedRole}
          >
            Create Account
          </button>
          
          <div className="text-center text-sm text-gray-600">
            Already have an account?{' '}
            <a href="#" className="text-blue-600 hover:underline">Log In</a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RoleSelection;