import React from 'react';
import { TrendingUp, ExternalLink, CheckCircle, Truck, Clock } from 'lucide-react';

const RecentSales = () => {
  const sales = [
    {
      id: 1,
      product: "Organic Tomatoes",
      buyer: "Buyer #024",
      amount: "KSh 3,200",
      status: "Delivered",
      statusColor: "text-emerald-700",
      statusBg: "bg-emerald-100",
      statusIcon: CheckCircle,
      time: "2 hours ago"
    },
    {
      id: 2,
      product: "Fresh Spinach",
      buyer: "Buyer #018",
      amount: "KSh 1,800",
      status: "Shipped",
      statusColor: "text-blue-700",
      statusBg: "bg-blue-100",
      statusIcon: Truck,
      time: "5 hours ago"
    },
    {
      id: 3,
      product: "Sweet Potatoes",
      buyer: "Buyer #031",
      amount: "KSh 2,400",
      status: "Pending",
      statusColor: "text-amber-700",
      statusBg: "bg-amber-100",
      statusIcon: Clock,
      time: "1 day ago"
    }
  ];

  return (
    <div className="p-6">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div>
          <h2 className="text-xl font-semibold text-slate-800 mb-1">Recent Sales</h2>
          <p className="text-slate-600 text-sm">Latest transactions and orders</p>
        </div>
        <button className="flex items-center space-x-2 px-4 py-2 text-slate-600 hover:text-slate-900 hover:bg-slate-100 rounded-lg transition-colors duration-200 group">
          <span className="text-sm font-medium">View All</span>
          <ExternalLink size={14} className="group-hover:translate-x-0.5 transition-transform duration-200" />
        </button>
      </div>

      {/* Sales List */}
      <div className="space-y-4">
        {sales.map((sale, index) => {
          const StatusIcon = sale.statusIcon;
          
          return (
            <div
              key={sale.id}
              className="bg-white rounded-xl p-5 border border-slate-200/60 hover:border-slate-300/60 hover:shadow-sm transition-all duration-200 group cursor-pointer"
              style={{ animationDelay: `${index * 100}ms` }}
            >
              <div className="flex items-center justify-between">
                <div className="flex-1 min-w-0">
                  <div className="flex items-start justify-between mb-2">
                    <div>
                      <h3 className="font-semibold text-slate-900 group-hover:text-slate-700 transition-colors duration-200">
                        {sale.product}
                      </h3>
                      <p className="text-slate-500 text-sm mt-1">{sale.buyer}</p>
                    </div>
                    <div className="text-right">
                      <p className="font-bold text-slate-900 text-lg">
                        {sale.amount}
                      </p>
                      <p className="text-slate-400 text-xs mt-1">{sale.time}</p>
                    </div>
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <span className={`
                      inline-flex items-center space-x-1.5 px-3 py-1.5 rounded-full text-sm font-medium
                      ${sale.statusBg} ${sale.statusColor}
                    `}>
                      <StatusIcon size={14} />
                      <span>{sale.status}</span>
                    </span>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Summary Footer */}
      <div className="mt-6 pt-6 border-t border-slate-200/60">
        <div className="flex items-center justify-between text-sm">
          <div className="flex items-center space-x-2 text-slate-600">
            <TrendingUp size={16} className="text-emerald-500" />
            <span>Total sales this week</span>
          </div>
          <span className="font-bold text-slate-900">KSh 12,400</span>
        </div>
      </div>
    </div>
  );
};

export default RecentSales;