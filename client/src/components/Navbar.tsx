'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { onAuthStateChanged, signOut, User as FirebaseUser } from 'firebase/auth';
import {
  Search,
  ShoppingCart,
  User,
  LayoutDashboard,
  LogOut,
  Phone,
  Store,
} from 'lucide-react';
import { auth } from '@/lib/firebase';

export default function NavigationBar() {
  const [searchQuery, setSearchQuery] = useState('');
  const [user, setUser] = useState<FirebaseUser | null>(null);
  const [loading, setLoading] = useState(true);
  const pathname = usePathname();
  const isDashboard = pathname?.startsWith('/dashboard') ?? false;

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (firebaseUser) => {
      setUser(firebaseUser);
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  const handleLogout = async () => {
    try {
      await signOut(auth);
    } catch (error) {
      console.error('Error signing out:', error);
    }
  };

  if (loading) {
    return <nav className="w-full bg-white border-b border-gray-200 px-4 py-3 shadow-sm"></nav>;
  }

  return (
    <nav className="w-full bg-white border-b border-gray-200 px-4 py-3 shadow-sm">
      <div className="max-w-7xl mx-auto flex flex-wrap items-center justify-between gap-4">
        {/* Logo */}
        <Link href="/" className="flex items-center space-x-2">
          <div className="w-9 h-9 bg-gradient-to-br from-green-400 to-teal-500 rounded-md flex items-center justify-center">
            <span className="text-white font-bold text-lg">N</span>
          </div>
          <span className="text-xl font-bold text-gray-800">NERATION</span>
        </Link>

        {/* Center Content */}
        {!isDashboard ? (
          <div className="flex-1 max-w-2xl mx-auto w-full">
            <form
              onSubmit={(e) => {
                e.preventDefault();
                // Search logic goes here
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
                aria-label="Search products"
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
        ) : (
          <div className="flex-1"></div>
        )}

        {/* Right Side Navigation */}
        <div className="flex items-center space-x-4 text-sm">
          {user ? (
            <>
              {/* Switch between Dashboard / Marketplace */}
              <Link
                href={isDashboard ? '/' : '/dashboard'}
                className="flex items-center space-x-2 text-gray-700 hover:text-teal-600 transition-colors"
                aria-label={isDashboard ? 'Go to marketplace' : 'Go to dashboard'}
              >
                {isDashboard ? <Store className="w-5 h-5" /> : <LayoutDashboard className="w-5 h-5" />}
                <span className="font-medium hidden sm:inline">
                  {isDashboard ? 'Marketplace' : 'Dashboard'}
                </span>
              </Link>

              {/* User Info */}
              <div className="flex items-center space-x-3 text-gray-700">
                <div className="flex items-center space-x-2 max-w-[150px] truncate">
                  <div className="w-8 h-8 bg-gradient-to-br from-teal-400 to-teal-600 rounded-full flex items-center justify-center">
                    <User className="w-4 h-4 text-white" />
                  </div>
                  <span className="font-medium truncate">
                    {user.displayName || user.email?.split('@')[0] || 'User'}
                  </span>
                </div>

                {/* Logout */}
                <button
                  onClick={handleLogout}
                  className="flex items-center space-x-1 px-3 py-1.5 text-red-600 hover:text-red-700 hover:bg-red-50 rounded-md transition-colors"
                  title="Logout"
                  aria-label="Logout"
                >
                  <LogOut className="w-4 h-4" />
                  <span className="text-xs font-medium hidden sm:inline">Logout</span>
                </button>
              </div>
            </>
          ) : (
            <div className="flex items-center space-x-2 text-gray-700">
              <User className="w-5 h-5" />
              <Link href="/login" className="font-medium hover:underline" aria-label="Login">Login</Link>
              <span className="text-gray-400">|</span>
              <Link href="/signup" className="font-medium hover:underline" aria-label="Register">Register</Link>
            </div>
          )}

          {/* Cart - Only show when NOT on dashboard */}
          {!isDashboard && (
            <div className="relative cursor-pointer group" aria-label="Shopping cart">
              <ShoppingCart className="w-6 h-6 text-gray-600 group-hover:text-gray-800 transition" />
              <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs font-semibold rounded-full w-5 h-5 flex items-center justify-center">
                0
              </span>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
}