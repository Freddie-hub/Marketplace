import React, { useState } from 'react';
import {
  BarChart3,
  Package,
  ShoppingCart,
  MessageCircle,
} from 'lucide-react';

const DashboardNav = () => {
  const [activeTab, setActiveTab] = useState('Overview');

  const navigationItems = [
    { name: 'Overview', icon: BarChart3, color: '#0f766e' },
    { name: 'Products', icon: Package, color: '#ea580c' },
    { name: 'Orders', icon: ShoppingCart, color: '#7c3aed' },
    { name: 'Messages', icon: MessageCircle, color: '#dc2626', badge: 3 },
  ];

  return (
    <div className="h-full p-6">
      {/* Logo/Brand Section */}
      <div className="mb-8 pb-6 border-b border-slate-200/60">
        <h2 className="text-xl font-bold text-slate-800">Dashboard</h2>
        <p className="text-sm text-slate-500 mt-1">Manage your business</p>
      </div>

      {/* Navigation Items */}
      <nav className="space-y-2">
        {navigationItems.map((item) => {
          const IconComponent = item.icon;
          const isActive = activeTab === item.name;
          
          return (
            <button
              key={item.name}
              onClick={() => setActiveTab(item.name)}
              className={`
                w-full flex items-center space-x-3 px-4 py-3 rounded-xl font-medium text-sm
                transition-all duration-200 relative group
                ${isActive 
                  ? 'bg-slate-100 text-slate-900 shadow-sm' 
                  : 'text-slate-600 hover:bg-slate-50 hover:text-slate-900'
                }
              `}
            >
              {/* Active indicator */}
              {isActive && (
                <div 
                  className="absolute left-0 top-1/2 transform -translate-y-1/2 w-1 h-8 rounded-full"
                  style={{ backgroundColor: item.color }}
                />
              )}

              <div className="relative flex items-center">
                <IconComponent
                  size={20}
                  style={{ color: isActive ? item.color : 'inherit' }}
                  className="transition-colors duration-200"
                />
                {item.badge && (
                  <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center font-bold">
                    {item.badge}
                  </span>
                )}
              </div>
              
              <span className="flex-1 text-left">
                {item.name}
              </span>

              {/* Hover indicator */}
              {!isActive && (
                <div
                  className="absolute left-0 top-1/2 transform -translate-y-1/2 w-0 h-8 rounded-full transition-all duration-200 group-hover:w-1"
                  style={{ backgroundColor: item.color }}
                />
              )}
            </button>
          );
        })}
      </nav>

      {/* Bottom section */}
      <div className="mt-auto pt-8 border-t border-slate-200/60">
        <div className="text-xs text-slate-400 text-center">
          Version 2.1.0
        </div>
      </div>
    </div>
  );
};

export default DashboardNav;