import React, { Children, useState } from 'react'
import { Link, Outlet } from 'react-router-dom';

const AuthLayout = () => {

    const [isLoggedIn, setIsLoggedIn] = useState()

    return (
        <div className="min-h-screen flex flex-col">
          {/* Header */}
          <header className="bg-white shadow-md py-4 px-6">
            <div className="container mx-auto flex justify-between items-center">
                <div className="flex items-center space-x-8">
                <h1 className="text-2xl font-bold text-[#52AE77]">GigConnect</h1>
                <nav className="flex space-x-6">
                    <a href="/" className="text-gray-700 hover:text-blue-500">Home</a>
                    <a href="/jobs" className="text-gray-700 hover:text-blue-500">Jobs</a>
                    <a href="/freelancers" className="text-gray-700 hover:text-blue-500">Freelancers</a>
                </nav>
                </div>
                <div className="flex space-x-4">
                {/* <Link to="/roleselection">
                    <button className="text-gray-700 hover:text-blue-500 px-4 py-2 rounded-md hover:bg-gray-100 transition">
                        Sign In
                    </button>
                </Link>
                <Link to={"/roleselection"}>
                    <button className="bg-[#52AE77] hover:bg-[#52BE80] text-white px-4 py-2 rounded-md transition">
                        Sign Up
                    </button>
                </Link> */}
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
    <div className="flex flex-col sm:flex-row gap-2 justify-center max-w-md mx-auto">
      <input
        type="email"
        placeholder="Input your email"
        className="flex-grow px-4 py-2 text-sm rounded border border-gray-600 bg-gray-900 text-white focus:outline-none focus:ring-1 focus:ring-blue-500"
      />
      <button className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 text-sm rounded font-medium">
        Subscribe
      </button>
    </div>
  </div>

  {/* Quick Links Section - Single Line Layout */}
  <div className="max-w-5xl mx-auto mb-6">
    <div className="text-center">
      <h4 className="text-sm font-medium mb-4">Quick Links</h4>
      <div className="flex flex-wrap justify-center gap-x-6 text-sm">
        <a href="#" className="hover:text-blue-400">Pricing</a>
        <a href="#" className="hover:text-blue-400">About us</a>
        <a href="#" className="hover:text-blue-400">Features</a>
        <a href="#" className="hover:text-blue-400">Help Center</a>
        <a href="#" className="hover:text-blue-400">Contact us</a>
        <a href="#" className="hover:text-blue-400">FAQs</a>
        <a href="#" className="hover:text-blue-400">Careers</a>
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

export default AuthLayout