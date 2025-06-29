import React from 'react';
import { TrendingUp, MoreHorizontal, Eye } from 'lucide-react';

const RecentSales = () => {
  const sales = [
    {
      id: 1,
      product: "Organic Tomatoes",
      buyer: "Buyer #024",
      amount: "KSh 3,200",
      status: "Delivered",
      statusColor: "bg-black text-white",
      statusBg: "bg-black"
    },
    {
      id: 2,
      product: "Fresh Spinach",
      buyer: "Buyer #018",
      amount: "KSh 1,800",
      status: "Shipped",
      statusColor: "bg-gray-100 text-gray-700",
      statusBg: "bg-gray-100"
    },
    {
      id: 3,
      product: "Sweet Potatoes",
      buyer: "Buyer #031",
      amount: "KSh 2,400",
      status: "Confirmed",
      statusColor: "bg-gray-100 text-gray-700",
      statusBg: "bg-gray-100"
    }
  ];

  return (
    <div className="w-full max-w-2xl mx-auto p-6 bg-gradient-to-br from-gray-50 to-[#78CCD0]/10">
      <div className="bg-white rounded-2xl p-8 shadow-sm border border-gray-100 hover:shadow-lg transition-shadow duration-300">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center gap-3">
            <div className="text-[#00A79D]">
              <TrendingUp size={24} strokeWidth={2} />
            </div>
            <h2 className="text-2xl font-bold text-[#00A79D]">Recent Sales</h2>
          </div>
          
          <button className="flex items-center gap-2 px-4 py-2 text-[#00A79D] hover:bg-[#00A79D]/10 rounded-lg transition-colors duration-200 group">
            <Eye size={16} className="group-hover:scale-110 transition-transform duration-200" />
            <span className="text-sm font-medium">View All Sales</span>
          </button>
        </div>

        {/* Sales List */}
        <div className="space-y-6">
          {sales.map((sale, index) => (
            <div
              key={sale.id}
              className="flex items-center justify-between p-4 rounded-xl hover:bg-gray-50 transition-colors duration-200 group cursor-pointer"
              style={{
                animationDelay: `${index * 100}ms`
              }}
            >
              <div className="flex-1">
                <h3 className="text-lg font-semibold text-[#00A79D] group-hover:text-[#205D5A] transition-colors duration-200">
                  {sale.product}
                </h3>
                <p className="text-gray-600 text-sm mt-1">{sale.buyer}</p>
              </div>
              
              <div className="flex items-center gap-4">
                <p className="text-lg font-bold text-[#00A79D] group-hover:scale-105 transition-transform duration-200">
                  {sale.amount}
                </p>
                
                <span className={`
                  ${sale.statusColor} 
                  px-4 py-2 rounded-full text-sm font-medium
                  transform group-hover:scale-105 transition-transform duration-200
                `}>
                  {sale.status}
                </span>
              </div>
            </div>
          ))}
        </div>

        {/* Load More Button */}
        <div className="flex justify-center mt-8 pt-6 border-t border-gray-100">
          <button className="flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-[#00A79D] to-[#78CCD0] text-white rounded-xl hover:from-[#205D5A] hover:to-[#00A79D] transform hover:scale-105 transition-all duration-300 shadow-md hover:shadow-lg group">
            <MoreHorizontal size={18} className="group-hover:rotate-90 transition-transform duration-300" />
            <span className="font-medium">Load More</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default RecentSales;