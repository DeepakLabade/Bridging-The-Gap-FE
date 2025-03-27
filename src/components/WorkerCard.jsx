import axios from 'axios';
import React from 'react';
import { useNavigate } from 'react-router-dom';

const WorkerCard = ({ worker }) => {

  const navigate = useNavigate()

  return (
    <div className="w-full max-w-[260px] rounded-lg border border-gray-200 bg-white shadow-xs hover:shadow-sm transition-all duration-200 hover:border-blue-100">
      <div className="p-4">
        {/* Username and Experience */}
        <div className="flex justify-between items-center mb-2">
          <h3 className="text-base font-medium text-gray-800 truncate">{worker.username}</h3>
          <span className="bg-blue-50 text-[#52AE77] text-xs px-2 py-1 rounded-full whitespace-nowrap">
            {worker.experience} {worker.experience === 1 ? 'year' : 'years'}
          </span>
        </div>
        
        {/* Occupation */}
        <p className="text-gray-600 text-sm font-medium mb-2">{worker.occupation}</p>
        
        {/* Single Skill */}
        <div className="mb-3">
          <span className="inline-block bg-gray-100 text-gray-700 text-xs px-3 py-1 rounded-full">
            {worker.skill}
          </span>
        </div>
        
        {/* Description */}
        <p className="text-gray-500 text-sm line-clamp-3 mb-4">
          {worker.description}
        </p>
        
        {/* Contact Button */}
        <button
        onClick={async() => {
          navigate("/chat")
          await axios.get("http://localhost:3000/api/v1/ws/start")
        }} 
        className="w-full bg-[#52AE77] hover:bg-[#52AE77] text-white text-sm py-2 rounded-md font-medium transition-colors duration-200">
          Contact
        </button>
      </div>
    </div>
  );
};

export default WorkerCard;