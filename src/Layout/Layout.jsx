import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Link, Outlet } from 'react-router-dom';

const Layout = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  // Uncomment and use this useEffect when your auth API is ready
  useEffect(() => {
    const checkAuthStatus = async () => {
      try {
        
        const response = await axios.get("http://localhost:3000/api/v1/worker/isloggedin");
        setIsLoggedIn(response.data === true);
      } catch (error) {
        console.error("Error checking auth status:", error);
        setIsLoggedIn(false);
      }
    };
    
    checkAuthStatus();
  }, []);

  return (
    <div className="min-h-screen flex flex-col">
      {/* Header */}
      <header className="bg-white shadow-md py-4 px-6">
        <div className="container mx-auto flex justify-between items-center">
          <div className="flex items-center space-x-8">
            <h1 className="text-2xl font-bold text-[#52AE77]">GigConnect</h1>
            <nav className="flex space-x-6">
              <a href="/" className="text-gray-700 hover:text-green-500">Home</a>
              <a href="/client/feed" className="text-gray-700 hover:text-green-500">Jobs</a>
              <a href="/freelancers" className="text-gray-700 hover:text-green-500">Freelancers</a>
            </nav>
          </div>
          
          <div className="flex space-x-4">
            {isLoggedIn ? (
              <Link to="/profile">
                <button className="bg-[#52AE77] hover:bg-[#52BE80] text-white px-4 py-2 rounded-md transition">
                  Profile
                </button>
              </Link>
            ) : (
              <>
                <Link to="/roleselection">
                  <button className="text-gray-700 hover:text-green-500 px-4 py-2 rounded-md hover:bg-gray-100 transition cursor-pointer">
                    Sign In
                  </button>
                </Link>
                <Link to="/roleselection">
                  <button className="bg-[#52AE77] hover:bg-[#52BE80] text-white px-4 py-2 rounded-md transition cursor-pointer">
                    Sign Up
                  </button>
                </Link>
              </>
            )}
          </div>
        </div>
      </header>
    
          {/* Main Content */}
          <main className="flex-grow container mx-auto px-6 py-8">
            <Outlet />
          </main>
    
          {/* Footer */}
          <div className="bg-[#1D2128] py-8 px-4 text-white">
  {/* Newsletter Section */}
  <div className="max-w-3xl mx-auto mb-8 text-center">
    <h3 className="text-lg font-medium mb-4">Subscribe to our newsletter</h3>
    <div className="flex flex-col sm:flex-row gap-2 justify-center max-w-md mx-auto  mt-4  items-center border rounded-lg overflow-hidden">
    <input 
              type="text" 
              placeholder="Enter job title or keywords" 
              className="w-full p-3 outline-none"
            />
            <button className="bg-[#52AE77] px-6 py-3  text-white font-semibold hover:bg-green hover:bg-[#52BE80] cursor-pointer">Search</button>
          
</div>
  </div>

  {/* Quick Links Section - Single Line Layout */}
  <div className="max-w-5xl mx-auto mb-6">
    <div className="text-center">
      <h4 className="text-sm font-medium mb-4">Quick Links</h4>
      <div className="flex flex-wrap justify-center gap-x-6 text-sm">
        <a href="#" className="hover:text-green-400">Pricing</a>
        <a href="#" className="hover:text-green-400">About us</a>
        <a href="#" className="hover:text-green-400">Features</a>
        <a href="#" className="hover:text-green-400">Help Center</a>
        <a href="#" className="hover:text-green-400">Contact us</a>
        <a href="#" className="hover:text-green-400">FAQs</a>
        <a href="#" className="hover:text-green-400">Careers</a>
      </div>
    </div>
  </div>

  {/* Footer Copyright - Single Line */}
  <div className="max-w-3xl mx-auto pt-4 border-t border-gray-800">
    <div className="text-center text-xs text-gray-400">
      © 2024 Brand, Inc. • <a href="#" className="hover:text-white">Privacy</a> • <a href="#" className="hover:text-white">Terms</a> • <a href="#" className="hover:text-white">Sitemap</a>
    </div>
  </div>
</div>
        </div>
      );
    
}

export default Layout