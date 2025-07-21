import React from 'react';
import { Package, DollarSign, ShoppingCart, MessageSquare, TrendingUp } from 'lucide-react';

const StatsGrid = () => {
  const stats = [
    {
      id: 1,
      title: "Products Listed",
      value: "0",
      change: "+0%",
      changeType: "positive",
      icon: Package,
      color: "#0f766e"
    },
    {
      id: 2,
      title: "Monthly Earnings",
      value: "KSh 0",
      change: "+0%",
      changeType: "positive",
      icon: DollarSign,
      color: "#ea580c"
    },
    {
      id: 3,
      title: "Active Orders",
      value: "0",
      change: "+0%",
      changeType: "positive",
      icon: ShoppingCart,
      color: "#7c3aed"
    },
    {
      id: 4,
      title: "New Messages",
      value: "0",
      change: "0%",
      changeType: "neutral",
      icon: MessageSquare,
      color: "#dc2626"
    }
  ];

  return (
    <div>
      <div className="mb-6">
        <h2 className="text-xl font-semibold text-slate-800 mb-1">Business Metrics</h2>
        <p className="text-slate-600 text-sm">Key performance indicators for your business</p>
      </div>
      
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat) => {
          const IconComponent = stat.icon;
          
          return (
            <div
              key={stat.id}
              className="bg-white rounded-xl p-6 border border-slate-200/60 shadow-sm hover:shadow-md transition-all duration-200 group cursor-pointer"
            >
              <div className="flex items-start justify-between mb-4">
                <div 
                  className="p-3 rounded-lg"
                  style={{ backgroundColor: `${stat.color}15` }}
                >
                  <IconComponent 
                    size={24} 
                    style={{ color: stat.color }}
                    className="transition-transform duration-200 group-hover:scale-110"
                  />
                </div>
                
                <div className="flex items-center space-x-1 text-sm">
                  <TrendingUp 
                    size={14} 
                    className={`
                      ${stat.changeType === 'positive' ? 'text-emerald-500' : 
                        stat.changeType === 'negative' ? 'text-red-500' : 'text-slate-400'}
                    `}
                  />
                  <span 
                    className={`font-medium
                      ${stat.changeType === 'positive' ? 'text-emerald-600' : 
                        stat.changeType === 'negative' ? 'text-red-600' : 'text-slate-500'}
                    `}
                  >
                    {stat.change}
                  </span>
                </div>
              </div>

              <div>
                <p className="text-2xl font-bold text-slate-900 mb-1 group-hover:scale-105 transform transition-transform duration-200">
                  {stat.value}
                </p>
                <p className="text-slate-600 text-sm font-medium">
                  {stat.title}
                </p>
              </div>

              <div 
                className="absolute bottom-0 left-0 right-0 h-0.5 rounded-b-xl transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300"
                style={{ backgroundColor: stat.color }}
              />
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default StatsGrid;