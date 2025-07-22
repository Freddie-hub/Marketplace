"use client";

import { Package, Users, TrendingUp, DollarSign, Truck } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/dashboards/warehouse/ui/card";

const summaryData = [
  {
    title: "Total Inventory",
    value: "2,847 kg",
    change: "+12% from last week",
    icon: Package,
    color: "text-teal-500",
    bgGradient: "from-teal-50 to-teal-100",
    trend: "up"
  },
  {
    title: "Farmers Using Warehouse",
    value: "24",
    change: "2 new this month",
    icon: Users,
    color: "text-orange-500",
    bgGradient: "from-orange-50 to-orange-100",
    trend: "up"
  },
  {
    title: "Goods Released This Week",
    value: "1,234 kg",
    change: "+8% from last week", 
    icon: TrendingUp,
    color: "text-amber-500",
    bgGradient: "from-amber-50 to-amber-100",
    trend: "up"
  },
  {
    title: "Inventory Value",
    value: "$85,420",
    change: "+15% from last month",
    icon: DollarSign,
    color: "text-emerald-500",
    bgGradient: "from-emerald-50 to-emerald-100",
    trend: "up"
  },
  {
    title: "Pending Pickups",
    value: "7",
    change: "2 scheduled today",
    icon: Truck,
    color: "text-blue-500",
    bgGradient: "from-blue-50 to-blue-100",
    trend: "neutral"
  }
];

export const SummaryCards = () => {
  const getTrendColor = (trend: string) => {
    switch(trend) {
      case 'up': return 'text-green-600';
      case 'down': return 'text-red-600';
      default: return 'text-gray-600';
    }
  };

  const getTrendIcon = (trend: string) => {
    if (trend === 'up') return '↗';
    if (trend === 'down') return '↘';
    return '→';
  };

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-6">
      {summaryData.map((item, index) => (
        <Card 
          key={index} 
          className="group relative overflow-hidden border-0 shadow-md hover:shadow-2xl transition-all duration-500 cursor-pointer transform hover:-translate-y-1 bg-white"
        >
          {/* Gradient Background */}
          <div className={`absolute inset-0 bg-gradient-to-br ${item.bgGradient} opacity-30 group-hover:opacity-50 transition-opacity duration-300`} />
          
          {/* Subtle Pattern Overlay */}
          <div className="absolute inset-0 opacity-5 group-hover:opacity-10 transition-opacity duration-300">
            <div className="w-full h-full bg-[radial-gradient(circle_at_1px_1px,_rgba(0,0,0,0.15)_1px,_transparent_0)] bg-[length:20px_20px]" />
          </div>

          <CardHeader className="relative flex flex-row items-center justify-between space-y-0 pb-3 pt-6">
            <CardTitle className="text-sm font-semibold text-gray-700 group-hover:text-gray-900 transition-colors duration-200">
              {item.title}
            </CardTitle>
            <div className={`p-3 rounded-xl ${item.color} bg-white/80 backdrop-blur-sm shadow-sm group-hover:shadow-md group-hover:scale-110 transition-all duration-300`}>
              <item.icon className="h-5 w-5" />
            </div>
          </CardHeader>
          
          <CardContent className="relative pb-6">
            <div className="space-y-2">
              <div className="text-3xl font-bold text-gray-900 group-hover:text-gray-800 transition-colors duration-200">
                {item.value}
              </div>
              <div className="flex items-center space-x-2">
                <span className={`text-sm font-medium ${getTrendColor(item.trend)}`}>
                  {getTrendIcon(item.trend)}
                </span>
                <p className="text-sm text-gray-600 group-hover:text-gray-700 transition-colors duration-200">
                  {item.change}
                </p>
              </div>
            </div>
            
            {/* Progress bar for visual appeal */}
            <div className="mt-4 w-full bg-gray-200 rounded-full h-1.5 overflow-hidden">
              <div 
                className={`h-full rounded-full bg-gradient-to-r ${item.color.replace('text-', 'from-').replace('-500', '-400')} to-${item.color.replace('text-', '').replace('-500', '-600')} transition-all duration-1000 group-hover:animate-pulse`}
                style={{ 
                  width: `${Math.min(85 + index * 3, 95)}%`,
                  transition: 'width 1.5s ease-out'
                }}
              />
            </div>
          </CardContent>

          {/* Subtle border highlight on hover */}
          <div className="absolute inset-0 rounded-lg border-2 border-transparent group-hover:border-gray-200/50 transition-all duration-300 pointer-events-none" />
        </Card>
      ))}
    </div>
  );
};