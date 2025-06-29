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
    { name: 'Overview', icon: BarChart3, iconColor: '#00A79D', textColor: '#205D5A' },
    { name: 'Products', icon: Package, iconColor: '#FCB000', textColor: '#205D5A' },
    { name: 'Orders', icon: ShoppingCart, iconColor: '#FF990B', textColor: '#205D5A' },
    { name: 'Messages', icon: MessageCircle, iconColor: '#BD011F', textColor: '#205D5A', badge: 3 },
  ];

  return (
    <div style={{ backgroundColor: '#FAFBFF' }} className="h-full">
      {/* Sidebar Navigation */}
      <nav className="flex flex-col space-y-2 p-2">
        {navigationItems.map((item) => {
          const IconComponent = item.icon;
          const isActive = activeTab === item.name;

          return (
            <button
              key={item.name}
              onClick={() => setActiveTab(item.name)}
              className={`flex items-center space-x-3 px-4 py-2 rounded-lg transition-all duration-300 relative group ${
                isActive
                  ? 'bg-gradient-to-r from-gray-50 to-gray-100'
                  : 'hover:bg-gray-50'
              }`}
            >
              <div className="relative">
                <IconComponent
                  size={20}
                  style={{ color: item.iconColor }}
                  className="transition-transform duration-200 group-hover:scale-110"
                />
                {item.badge && (
                  <span
                    className="absolute -top-1 -right-1 text-[10px] text-white rounded-full w-4 h-4 flex items-center justify-center font-bold animate-pulse shadow"
                    style={{ backgroundColor: '#BD011F' }}
                  >
                    {item.badge}
                  </span>
                )}
              </div>
              <span
                className="text-sm font-medium whitespace-nowrap transition-colors duration-200"
                style={{ color: item.textColor }}
              >
                {item.name}
              </span>

              {/* Active indicator */}
              {isActive && (
                <div
                  className="absolute left-0 top-1/2 transform -translate-y-1/2 w-1 h-6 rounded-full"
                  style={{ backgroundColor: item.iconColor }}
                />
              )}

              {/* Hover indicator */}
              <div
                className="absolute left-0 top-1/2 transform -translate-y-1/2 w-0 h-6 rounded-full group-hover:w-1 transition-all duration-300"
                style={{ backgroundColor: item.iconColor }}
              />
            </button>
          );
        })}
      </nav>
    </div>
  );
};

export default DashboardNav;