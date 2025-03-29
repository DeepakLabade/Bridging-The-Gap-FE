import React from 'react';
import { FaSearch } from 'react-icons/fa';

const Home = () => {
  return (
    <div className="w-full relative">
      {/* Background Image Section */}
      <div className="w-full h-screen relative ">
        <img src="/IMG1.jpg" alt="Background" className="w-full h-full object-cover " />
        
        {/* Job Search Section */}
        <div className="absolute top-1/4 right-8 bg-white shadow-lg rounded-lg p-9 w-190">
          <h2 className="text-2xl font-semibold">Quick Job Search</h2>
          <div className="mt-4 flex items-center border rounded-lg overflow-hidden">
            <span className="p-3 text-gray-500"><FaSearch /></span>
            <input 
              type="text" 
              placeholder="Enter job title or keywords" 
              className="w-full p-3 outline-none"
            />
            <button className="bg-[#52AE77] px-6 py-3  text-white font-semibold hover:bg-green hover:bg-[#52BE80] cursor-pointer">Search</button>
          </div>
          <div className="mt-4 flex gap-2">
            <span className="bg-gray-200 px-3 py-1 rounded-full text-gray-700">Location</span>
            <span className="bg-green-100 text-green-600 px-3 py-1 rounded-full">Job Type</span>
            <span className="bg-green-100 text-green-600 px-3 py-1 rounded-full">Experience Level</span>
          </div>
        </div>
      </div>
      
      {/* Card Section */}
      <div className="flex justify-center gap-6 p-10 bg-gray-100">
        {/* Employer Card */}
        <div className="bg-white shadow-lg rounded-lg p-6 w-1/3 flex items-center justify-between">
          <div>
            <h2 className="text-2xl font-semibold">For Employer</h2>
            <p className="text-gray-600">Discover and Hire Best Talent.</p>
            <button className="mt-4 cursor-pointer px-4 py-2 border border-[#52AE77] text-[##52AE77] rounded-lg hover:bg-[#52AE77] hover:text-white transition">Post a Job</button>
          </div>
          <div className="w-32 h-20 bg-gray-300 rounded-lg"></div>
        </div>
        
        {/* Job Seeker Card */}
        <div className="bg-white shadow-lg rounded-lg p-6 w-1/3 flex items-center justify-between">
          <div>
            <h2 className="text-2xl font-semibold">For Job Seeker</h2>
            <p className="text-gray-600">Find your dream job today.</p>
            <button className="mt-4 px-4 py-2 border border-[#52AE77] text-[##52AE77] rounded-lg hover:bg-[#52AE77] hover:text-white transition cursor-pointer">Find Job</button>
          </div>
          <div className="w-32 h-20 bg-gray-300 rounded-lg"></div>
        </div>
      </div>
    </div>
  );
};

export default Home;