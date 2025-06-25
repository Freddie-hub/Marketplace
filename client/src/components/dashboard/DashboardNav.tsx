import React, { useState } from 'react';
import {
  BarChart3,
  Package,
  ShoppingCart,
  MessageCircle
} from 'lucide-react';

const DashboardNav = () => {
  const [activeTab, setActiveTab] = useState('Overview');

  const navigationItems = [
    { name: 'Overview', icon: BarChart3, iconColor: '#00A79D', textColor: '#205D5A' },
    { name: 'Products', icon: Package, iconColor: '#FCB000', textColor: '#205D5A' },
    { name: 'Orders', icon: ShoppingCart, iconColor: '#FF990B', textColor: '#205D5A' },
    { name: 'Messages', icon: MessageCircle, iconColor: '#BD011F', textColor: '#205D5A', badge: 3 }
  ];

  return (
    <div style={{ backgroundColor: '#FAFBFF' }} className="w-full">
      {/* Navigation Bar */}
      <nav className="mx-4 mt-2 border-b border-gray-200">
        <div className="px-2 py-0">
          <div className="flex justify-between items-center h-10">
            {navigationItems.map((item) => {
              const IconComponent = item.icon;
              const isActive = activeTab === item.name;

              return (
                <button
                  key={item.name}
                  onClick={() => setActiveTab(item.name)}
                  className={`flex items-center space-x-1 px-3 py-1.5 transition-all duration-300 relative group ${
                    isActive
                      ? 'bg-gradient-to-r from-gray-50 to-gray-100 transform scale-105'
                      : 'hover:bg-gray-50 hover:scale-102'
                  }`}
                >
                  <div className="relative">
                    <IconComponent
                      size={16}
                      style={{ color: item.iconColor }}
                      className="transition-transform duration-200 group-hover:scale-110"
                    />
                    {item.badge && (
                      <span
                        className="absolute -top-2 -right-2 text-[10px] text-white rounded-full w-4 h-4 flex items-center justify-center font-bold animate-pulse shadow"
                        style={{ backgroundColor: '#BD011F' }}
                      >
                        {item.badge}
                      </span>
                    )}
                  </div>
                  <span
                    className="text-xs font-medium whitespace-nowrap transition-colors duration-200"
                    style={{ color: item.textColor }}
                  >
                    {item.name}
                  </span>

                  {/* Active indicator */}
                  {isActive && (
                    <div
                      className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-6 h-0.5 rounded-full"
                      style={{ backgroundColor: item.iconColor }}
                    />
                  )}

                  {/* Hover indicator */}
                  <div
                    className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-0 h-0.5 rounded-full group-hover:w-5 transition-all duration-300"
                    style={{ backgroundColor: item.iconColor }}
                  />
                </button>
              );
            })}
          </div>
        </div>
      </nav>
    </div>
  );
};

export default DashboardNav;
