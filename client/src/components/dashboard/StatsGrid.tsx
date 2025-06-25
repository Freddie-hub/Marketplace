import React from 'react';
import { Package, DollarSign, ShoppingCart, MessageSquare } from 'lucide-react';

const StatsGrid = () => {
  const stats = [
    {
      id: 1,
      title: "Products Listed",
      value: "24",
      icon: Package,
      bgColor: "bg-white",
      valueColor: "text-[#00A79D]",
      iconColor: "text-[#00A79D]",
      titleColor: "text-gray-600"
    },
    {
      id: 2,
      title: "This Month Earnings",
      value: "KSh 45,200",
      icon: DollarSign,
      bgColor: "bg-white",
      valueColor: "text-[#00A79D]",
      iconColor: "text-[#00A79D]", 
      titleColor: "text-gray-600"
    },
    {
      id: 3,
      title: "Ongoing Sales",
      value: "8",
      icon: ShoppingCart,
      bgColor: "bg-white",
      valueColor: "text-[#00A79D]",
      iconColor: "text-[#00A79D]",
      titleColor: "text-gray-600"
    },
    {
      id: 4,
      title: "Unread Messages",
      value: "3",
      icon: MessageSquare,
      bgColor: "bg-white",
      valueColor: "text-[#00A79D]",
      iconColor: "text-[#00A79D]",
      titleColor: "text-gray-600"
    }
  ];

  return (
    <div className="w-full p-6 bg-gradient-to-br from-gray-50 to-[#78CCD0]/10">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, index) => {
          const IconComponent = stat.icon;
          return (
            <div
              key={stat.id}
              className={`
                ${stat.bgColor}
                rounded-2xl p-6 
                border border-gray-100
                shadow-sm hover:shadow-lg
                transform transition-all duration-300 ease-out
                hover:scale-105 hover:-translate-y-1
                group cursor-pointer
                animate-pulse
              `}
              style={{
                animationDelay: `${index * 100}ms`,
                animationDuration: '2s',
                animationIterationCount: '1'
              }}
            >
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <p className={`${stat.titleColor} text-sm font-medium mb-2 group-hover:text-[#205D5A] transition-colors duration-200`}>
                    {stat.title}
                  </p>
                  <p className={`${stat.valueColor} text-3xl font-bold group-hover:scale-110 transform transition-transform duration-200`}>
                    {stat.value}
                  </p>
                </div>
                
                <div className={`
                  ${stat.iconColor} 
                  transform transition-all duration-300
                  group-hover:scale-110 group-hover:rotate-6
                  opacity-80 group-hover:opacity-100
                `}>
                  <IconComponent size={32} strokeWidth={2} />
                </div>
              </div>
              
              {/* Subtle hover effect background */}
              <div className="absolute inset-0 bg-gradient-to-br from-[#00A79D]/5 to-[#78CCD0]/5 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              
              {/* Bottom accent line */}
              <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-[#00A79D] to-[#78CCD0] rounded-b-2xl transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left"></div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default StatsGrid;