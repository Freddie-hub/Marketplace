'use client';

import { useState } from 'react';
import { Search, ShoppingCart, User } from 'lucide-react';

const NavigationBar = () => {
  const [searchQuery, setSearchQuery] = useState('');

  return (
    <nav className="w-full bg-white border-b border-gray-200 px-4 py-3">
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        {/* Logo */}
        <div className="flex items-center">
          <div className="flex items-center space-x-1">
            {/* Logo icon with green gradient */}
            <div className="w-8 h-8 bg-gradient-to-br from-green-400 to-teal-500 rounded-md flex items-center justify-center">
              <span className="text-white font-bold text-lg">N</span>
            </div>
            <span className="text-xl font-bold text-gray-800 ml-2">NERATION</span>
          </div>
        </div>

        {/* Search Bar */}
        <div className="flex-1 max-w-2xl mx-8">
          <div className="relative flex">
            <input
              type="text"
              placeholder="Search"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full px-4 py-2.5 text-gray-700 bg-gray-50 border border-gray-200 rounded-l-full focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent"
            />
            <button className="px-6 py-2.5 bg-teal-500 text-white rounded-r-full hover:bg-teal-600 transition-colors duration-200 flex items-center justify-center">
              <Search className="w-5 h-5" />
              <span className="ml-2 font-medium">Search</span>
            </button>
          </div>
        </div>

        {/* Right side - Login/Register and Cart */}
        <div className="flex items-center space-x-6">
          {/* Login/Register */}
          <div className="flex items-center space-x-1 text-gray-700 hover:text-gray-900 cursor-pointer">
            <User className="w-5 h-5" />
            <span className="font-medium">Login</span>
            <span className="text-gray-400">|</span>
            <span className="font-medium">Register</span>
          </div>

          {/* Shopping Cart */}
          <div className="relative cursor-pointer hover:text-gray-700 transition-colors">
            <ShoppingCart className="w-6 h-6 text-gray-600" />
            <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
              0
            </span>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default NavigationBar;
