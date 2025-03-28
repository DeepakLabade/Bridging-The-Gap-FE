import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const RoleSelection = () => {
  const [selectedRole, setSelectedRole] = useState(null);
  const navigate = useNavigate()

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col items-center justify-center p-6">
      <div className="w-full max-w-md bg-white rounded-lg shadow-md p-8">
        <h1 className="text-2xl font-bold text-center mb-8">Join as a client or freelancer</h1>
        
        {/* Role Selection Cards */}
        <div className="space-y-4 mb-8">
          <div 
            className={`p-4 border-2 rounded-lg cursor-pointer transition-colors ${
              selectedRole === 'client' 
                ? 'border-green-500 bg-green-50' 
                : 'border-gray-200 hover:border-green-300'
            }`}
            onClick={() => setSelectedRole('client')}
          >
            <div className="flex items-center">
              <div className={`w-5 h-5 rounded-full border-2 mr-3 ${
                selectedRole === 'client' ? 'border-green-500 bg-green-500' : 'border-gray-300'
              }`}></div>
              <span className="font-medium">I'm a client, hiring for a project</span>
            </div>
          </div>
          
          <div 
            className={`p-4 border-2 rounded-lg cursor-pointer transition-colors ${
              selectedRole === 'freelancer' 
                ? 'border-green-500 bg-green-50' 
                : 'border-gray-200 hover:border-green-300'
            }`}
            onClick={() => setSelectedRole('freelancer')}
          >
            <div className="flex items-center">
              <div className={`w-5 h-5 rounded-full border-2 mr-3 ${
                selectedRole === 'freelancer' ? 'border-green-500 bg-green-500' : 'border-gray-300'
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
          {/* <div className="relative flex justify-center">
            <span className="px-2 bg-white text-gray-500">or</span>
          </div> */}
        </div>
        
        {/* Action Buttons */}
        <div className="space-y-4">
          <button 
            className={`w-full py-2 px-4 rounded-md font-medium cursor-pointer ${
              selectedRole 
                ? 'bg-green-600 hover:bg-green-700 text-white' 
                : 'bg-gray-300 text-gray-500 cursor-not-allowed'
            }`}
            disabled={!selectedRole}
            onClick={() => {
              if(selectedRole == "client") {
                navigate("/client/signup")
              } else {
                navigate("/worker/signup")
              }
            }}
          >
            Create Account
          </button>
          
          <div className="text-center text-sm text-gray-600">
            Already have an account?{' '}
            <a onClick={() => {
              if(selectedRole == "freelancer") {
                navigate("/worker/signin")
              } else {
                navigate("/client/signin")
              }
            }} className="text-green-600 hover:underline cursor-pointer">Log In</a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RoleSelection;