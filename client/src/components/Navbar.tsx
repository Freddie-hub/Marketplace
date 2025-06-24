'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { onAuthStateChanged, signOut, User as FirebaseUser } from 'firebase/auth';
import { Search, ShoppingCart, User } from 'lucide-react';
import { auth } from '@/lib/firebase';

export default function NavigationBar() {
  const [searchQuery, setSearchQuery] = useState('');
  const [user, setUser] = useState<FirebaseUser | null>(null);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (firebaseUser) => {
      setUser(firebaseUser);
    });

    return () => unsubscribe();
  }, []);

  const handleLogout = async () => {
    await signOut(auth);
  };

  return (
    <nav className="w-full bg-white border-b border-gray-200 px-4 py-3 shadow-sm">
      <div className="max-w-7xl mx-auto flex flex-wrap items-center justify-between gap-4">
        
        {/* Logo */}
        <div className="flex items-center space-x-2">
          <div className="w-9 h-9 bg-gradient-to-br from-green-400 to-teal-500 rounded-md flex items-center justify-center">
            <span className="text-white font-bold text-lg">N</span>
          </div>
          <span className="text-xl font-bold text-gray-800">NERATION</span>
        </div>

        {/* Search Bar */}
        <div className="flex-1 max-w-2xl mx-auto w-full">
          <form
            onSubmit={(e) => {
              e.preventDefault();
              // Add search logic here
            }}
            className="relative flex"
            role="search"
          >
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search products..."
              className="w-full px-4 py-2.5 text-sm text-gray-700 bg-gray-100 border border-gray-300 rounded-l-full focus:outline-none focus:ring-2 focus:ring-teal-500"
              aria-label="Search"
            />
            <button
              type="submit"
              className="px-5 py-2.5 bg-teal-500 text-white rounded-r-full hover:bg-teal-600 transition"
              aria-label="Submit search"
            >
              <Search className="w-5 h-5" />
            </button>
          </form>
        </div>

        {/* Right Side */}
        <div className="flex items-center space-x-6 text-sm">
          {user ? (
            <>
              {/* Show logged-in user */}
              <div className="text-gray-700 flex items-center space-x-2">
                <User className="w-5 h-5" />
                <span className="font-medium truncate max-w-[120px]">{user.email}</span>
                <button
                  onClick={handleLogout}
                  className="text-red-600 hover:underline text-xs"
                >
                  Logout
                </button>
              </div>
            </>
          ) : (
            <>
              {/* Show Login/Register if not logged in */}
              <div className="flex items-center space-x-2 text-gray-700 hover:text-gray-900">
                <User className="w-5 h-5" />
                <Link href="/login" className="font-medium hover:underline">Login</Link>
                <span className="text-gray-400">|</span>
                <Link href="/signup" className="font-medium hover:underline">Register</Link>
              </div>
            </>
          )}

          {/* Shopping Cart */}
          <div className="relative cursor-pointer group">
            <ShoppingCart className="w-6 h-6 text-gray-600 group-hover:text-gray-800 transition" aria-label="Shopping cart" />
            <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs font-semibold rounded-full w-5 h-5 flex items-center justify-center">
              0
            </span>
          </div>
        </div>
      </div>
    </nav>
  );
}
