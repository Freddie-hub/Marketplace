import React from 'react';
import { Package, MessageSquare, DollarSign, TrendingUp } from 'lucide-react';

const QuickActions = () => {
  const actions = [
    {
      id: 1,
      title: "Add Product",
      icon: Package,
      bgColor: "bg-gradient-to-br from-[#00A79D] to-[#78CCD0]",
      hoverColor: "hover:from-[#205D5A] hover:to-[#00A79D]",
      iconColor: "text-white",
      delay: "0ms"
    },
    {
      id: 2,
      title: "Check Messages",
      icon: MessageSquare,
      bgColor: "bg-gradient-to-br from-[#FCB000] to-[#FF990B]",
      hoverColor: "hover:from-[#FF990B] hover:to-[#FCB000]",
      iconColor: "text-white",
      delay: "100ms"
    },
    {
      id: 3,
      title: "View Payments",
      icon: DollarSign,
      bgColor: "bg-gradient-to-br from-[#BD011F] to-[#720218]",
      hoverColor: "hover:from-[#720218] hover:to-[#BD011F]",
      iconColor: "text-white",
      delay: "200ms"
    },
    {
      id: 4,
      title: "Sales Report",
      icon: TrendingUp,
      bgColor: "bg-gradient-to-br from-[#FABFFF] to-[#78CCD0]",
      hoverColor: "hover:from-[#78CCD0] hover:to-[#FABFFF]",
      iconColor: "text-[#205D5A]",
      delay: "300ms"
    }
  ];

  return (
    <div className="max-w-4xl mx-auto p-8 bg-gradient-to-br from-gray-50 to-white min-h-screen">
      <div className="mb-8">
        <h1 className="text-4xl font-bold bg-gradient-to-r from-[#00A79D] to-[#205D5A] bg-clip-text text-transparent">
          Quick Actions
        </h1>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {actions.map((action) => {
          const IconComponent = action.icon;
          return (
            <div
              key={action.id}
              className={`
                ${action.bgColor} ${action.hoverColor}
                rounded-2xl p-8 cursor-pointer
                transform transition-all duration-500 ease-out
                hover:scale-105 hover:-translate-y-2
                shadow-lg hover:shadow-2xl
                group relative overflow-hidden
                animate-pulse
              `}
            >
              {/* Animated background overlay */}
              <div className="absolute inset-0 bg-white/10 translate-y-full group-hover:translate-y-0 transition-transform duration-500 ease-out"></div>
              
              {/* Floating particles effect */}
              <div className="absolute top-2 right-2 w-2 h-2 bg-white/30 rounded-full animate-ping"></div>
              <div className="absolute top-4 right-8 w-1 h-1 bg-white/40 rounded-full animate-ping animate-delay-1000"></div>
              
              <div className="relative z-10 flex flex-col items-center text-center space-y-4">
                <div className={`
                  ${action.iconColor} 
                  transform transition-all duration-300 
                  group-hover:scale-110 group-hover:rotate-12
                  drop-shadow-lg
                `}>
                  <IconComponent size={48} strokeWidth={2} />
                </div>
                
                <h3 className={`
                  text-xl font-semibold ${action.iconColor}
                  transform transition-all duration-300
                  group-hover:scale-105
                  drop-shadow-sm
                `}>
                  {action.title}
                </h3>
              </div>
              
              {/* Subtle shimmer effect */}
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent transform -skew-x-12 -translate-x-full group-hover:translate-x-full transition-transform duration-1000 ease-out"></div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default QuickActions;