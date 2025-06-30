'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { onAuthStateChanged, signOut, User as FirebaseUser } from 'firebase/auth';
import {Search,ShoppingCart,User,LayoutDashboard,LogOut,Store,Settings,Package,UserCheck,Shield,Warehouse,} from 'lucide-react';
import { auth } from '@/lib/firebase';
import { toast } from 'react-toastify';
import { StoredUser } from '@/types/StoredUser';

export default function NavigationBar() {
  const [searchQuery, setSearchQuery] = useState('');
  const [user, setUser] = useState<FirebaseUser | null>(null);
  const [storedUser, setStoredUser] = useState<StoredUser | null>(null);
  const [loading, setLoading] = useState(true);
  const pathname = usePathname();
  const router = useRouter();

  const isDashboard = pathname?.startsWith('/dashboard') ?? false;
  const isAdminDashboard = pathname?.startsWith('/admin-dashboard') ?? false;
  const isWarehouseDashboard = pathname?.startsWith('/warehouse-dashboard') ?? false;
  const isBuyerDashboard = pathname?.startsWith('/buyer-dashboard') ?? false;
  const isAnyDashboard = isDashboard || isAdminDashboard || isWarehouseDashboard || isBuyerDashboard;

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (firebaseUser) => {
      setUser(firebaseUser);
      
      try {
        const storedUserData = localStorage.getItem('user');
        if (storedUserData) {
          const parsedUser = JSON.parse(storedUserData) as StoredUser;
          setStoredUser(parsedUser);
        }
      } catch (error) {
        console.error('Error parsing stored user data:', error);
      }
      
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  const handleLogout = async () => {
    try {
      await signOut(auth);
      toast.success("You have been logged out successfully");
      localStorage.removeItem("token");
      localStorage.removeItem("user");
      setStoredUser(null);
      router.push("/");
    } catch (error) {
      console.error('Error signing out:', error);
      toast.error("Error logging out");
    }
  };

  const getDashboardLink = () => {
    if (!storedUser) return '/dashboard';
    
    switch (storedUser.role) {
      case 'ADMINISTRATOR':
        return '/admin-dashboard';
      case 'WAREHOUSE_GUY':
        return '/warehouse-dashboard';
      case 'BUYER':
        return '/buyer-dashboard';
      default:
        return '/dashboard';
    }
  };

  const getDashboardIcon = () => {
    if (!storedUser) return <LayoutDashboard className="w-5 h-5" />;
    
    switch (storedUser.role) {
      case 'ADMINISTRATOR':
        return <Shield className="w-5 h-5" />;
      case 'WAREHOUSE_GUY':
        return <Warehouse className="w-5 h-5" />;
      case 'BUYER':
        return <UserCheck className="w-5 h-5" />;
      default:
        return <LayoutDashboard className="w-5 h-5" />;
    }
  };

  const getDashboardLabel = () => {
    if (!storedUser) return 'Dashboard';
    
    switch (storedUser.role) {
      case 'ADMINISTRATOR':
        return 'Admin Panel';
      case 'WAREHOUSE_GUY':
        return 'Warehouse';
      case 'BUYER':
        return 'Buyer Panel';
      default:
        return 'Dashboard';
    }
  };

  const getUserDisplayName = () => {
    if (storedUser?.firstName && storedUser?.lastName) {
      return `${storedUser.firstName} ${storedUser.lastName}`;
    }
    if (storedUser?.displayName) {
      return storedUser.displayName;
    }
    if (user?.displayName) {
      return user.displayName;
    }
    if (storedUser?.email) {
      return storedUser.email.split('@')[0];
    }
    if (user?.email) {
      return user.email.split('@')[0];
    }
    return 'User';
  };

  const getRoleColor = () => {
    if (!storedUser) return 'from-teal-400 to-teal-600';
    
    switch (storedUser.role) {
      case 'ADMINISTRATOR':
        return 'from-red-400 to-red-600';
      case 'WAREHOUSE_GUY':
        return 'from-orange-400 to-orange-600';
      case 'BUYER':
        return 'from-blue-400 to-blue-600';
      case 'FARMER':
        return 'from-green-400 to-green-600';
      case 'SELLER':
        return 'from-purple-400 to-purple-600';
      default:
        return 'from-teal-400 to-teal-600';
    }
  };

  const shouldShowSearch = () => {
    return !isAnyDashboard || isBuyerDashboard;
  };

  const shouldShowCart = () => {
    return !isAdminDashboard && !isWarehouseDashboard && (!isAnyDashboard || isBuyerDashboard);
  };

  if (loading) {
    return (
      <nav className="sticky top-0 z-50 w-full bg-white border-b border-gray-200 px-6 py-6 shadow-lg">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="w-32 h-6 bg-gray-200 rounded animate-pulse"></div>
          <div className="w-64 h-8 bg-gray-200 rounded animate-pulse"></div>
          <div className="w-24 h-6 bg-gray-200 rounded animate-pulse"></div>
        </div>
      </nav>
    );
  }

  return (
    <nav className="sticky top-0 z-50 w-full bg-white border-b border-gray-200 px-3 py-3 shadow-lg">
      <div className="max-w-7xl mx-auto flex flex-wrap items-center justify-between gap-4">
        {/* Logo */}
        <Link href="/" className="flex items-center space-x-2">
          <div className="w-10 h-10 bg-gradient-to-br from-green-400 to-teal-500 rounded-md flex items-center justify-center shadow-md">
            <span className="text-white font-bold text-lg">N</span>
          </div>
          <span className="text-xl font-bold text-gray-800">NERATION</span>
        </Link>

        {shouldShowSearch() ? (
          <div className="flex-1 max-w-2xl mx-auto w-full">
            <form
              onSubmit={(e) => {
                e.preventDefault();
                // Implement search logic based on user role
                console.log('Search query:', searchQuery);
              }}
              className="relative flex"
              role="search"
            >
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder={
                  isBuyerDashboard 
                    ? "Search marketplace..." 
                    : "Search products..."
                }
                className="w-full px-5 py-3 text-sm text-gray-700 bg-gray-100 border border-gray-300 rounded-l-full focus:outline-none focus:ring-2 focus:ring-teal-500 shadow-sm"
                aria-label="Search"
              />
              <button
                type="submit"
                className="px-6 py-3 bg-teal-500 text-white rounded-r-full hover:bg-teal-600 transition shadow-md hover:shadow-lg"
                aria-label="Submit search"
              >
                <Search className="w-5 h-5" />
              </button>
            </form>
          </div>
        ) : (
          <div className="flex-1"></div>
        )}

        <div className="flex items-center space-x-4 text-sm">
          {user || storedUser ? (
            <>
              <Link
                href={isAnyDashboard ? '/' : getDashboardLink()}
                className="flex items-center space-x-2 text-gray-700 hover:text-teal-600 transition-colors px-3 py-2 rounded-lg hover:bg-gray-50 hover:shadow-sm"
                aria-label={isAnyDashboard ? 'Go to marketplace' : `Go to ${getDashboardLabel()}`}
              >
                {isAnyDashboard ? <Store className="w-5 h-5" /> : getDashboardIcon()}
                <span className="font-medium hidden sm:inline">
                  {isAnyDashboard ? 'Marketplace' : getDashboardLabel()}
                </span>
              </Link>

              {storedUser?.role === 'ADMINISTRATOR' && (
                <Link
                  href="/admin/settings"
                  className="flex items-center space-x-2 text-gray-700 hover:text-teal-600 transition-colors px-3 py-2 rounded-lg hover:bg-gray-50 hover:shadow-sm"
                  title="Settings"
                >
                  <Settings className="w-5 h-5" />
                  <span className="font-medium hidden lg:inline">Settings</span>
                </Link>
              )}

              {storedUser?.role === 'WAREHOUSE_GUY' && (
                <Link
                  href="/warehouse/inventory"
                  className="flex items-center space-x-2 text-gray-700 hover:text-teal-600 transition-colors px-3 py-2 rounded-lg hover:bg-gray-50 hover:shadow-sm"
                  title="Inventory"
                >
                  <Package className="w-5 h-5" />
                  <span className="font-medium hidden lg:inline">Inventory</span>
                </Link>
              )}

              <div className="flex items-center space-x-3 text-gray-700">
                <div className="flex items-center space-x-2 max-w-[200px] truncate px-2 py-1 rounded-lg">
                  <div className={`w-9 h-9 bg-gradient-to-br ${getRoleColor()} rounded-full flex items-center justify-center shadow-md`}>
                    <User className="w-4 h-4 text-white" />
                  </div>
                  <div className="flex flex-col">
                    <span className="font-medium truncate text-sm">
                      {getUserDisplayName()}
                    </span>
                    {storedUser?.role && (
                      <span className="text-xs text-gray-500 uppercase tracking-wide">
                        {storedUser.role.replace('_', ' ')}
                      </span>
                    )}
                  </div>
                </div>

                <button
                  onClick={handleLogout}
                  className="flex items-center space-x-1 px-3 py-2 text-red-600 hover:text-red-700 hover:bg-red-50 rounded-md transition-colors shadow-sm hover:shadow-md"
                  title="Logout"
                  aria-label="Logout"
                >
                  <LogOut className="w-4 h-4" />
                  <span className="text-xs font-medium hidden sm:inline">Logout</span>
                </button>
              </div>
            </>
          ) : (
            <div className="flex items-center space-x-2 text-gray-700 px-3 py-2 rounded-lg hover:bg-gray-50 hover:shadow-sm transition-all">
              <User className="w-5 h-5" />
              <Link href="/login" className="font-medium hover:underline" aria-label="Login">
                Login
              </Link>
              <span className="text-gray-400">|</span>
              <Link href="/signup/farmer" className="font-medium hover:underline" aria-label="Register">
                Register
              </Link>
            </div>
          )}

          {shouldShowCart() && (
            <div className="relative cursor-pointer group p-2 rounded-lg hover:bg-gray-50 hover:shadow-sm transition-all" aria-label="Shopping cart">
              <ShoppingCart className="w-6 h-6 text-gray-600 group-hover:text-gray-800 transition" />
              <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs font-semibold rounded-full w-5 h-5 flex items-center justify-center shadow-md">
                0
              </span>
            </div>
          )}
        </div>
      </div>

      {storedUser?.role === 'ADMINISTRATOR' && isAdminDashboard && (
        <div className="bg-red-50 border-t border-red-200 px-4 py-2">
          <div className="max-w-7xl mx-auto flex items-center space-x-2 text-red-700 text-sm">
            <Shield className="w-4 h-4" />
            <span>Administrator Mode - Full System Access</span>
          </div>
        </div>
      )}

      {storedUser?.role === 'WAREHOUSE_GUY' && isWarehouseDashboard && (
        <div className="bg-orange-50 border-t border-orange-200 px-4 py-2">
          <div className="max-w-7xl mx-auto flex items-center space-x-2 text-orange-700 text-sm">
            <Warehouse className="w-4 h-4" />
            <span>Warehouse Management - Inventory & Orders</span>
          </div>
        </div>
      )}
    </nav>
  );
}