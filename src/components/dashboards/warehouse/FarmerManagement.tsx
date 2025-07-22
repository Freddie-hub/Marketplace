"use client";

import { UserPlus, MoreHorizontal, TrendingUp, Search, Filter, Users, Package2 } from "lucide-react";
import { useState } from "react";

const farmers = [
  {
    name: "John Kamau",
    code: "FK001",
    commodities: ["Coffee", "Rice"],
    totalQuantity: "450 kg",
    value: "$1,250",
    lastActivity: "2 days ago",
    status: "active",
    avatar: "JK"
  },
  {
    name: "Mary Wanjiku",
    code: "FK002", 
    commodities: ["Maize", "Beans"],
    totalQuantity: "380 kg",
    value: "$950",
    lastActivity: "1 day ago",
    status: "active",
    avatar: "MW"
  },
  {
    name: "Peter Mwangi",
    code: "FK003",
    commodities: ["Coffee"],
    totalQuantity: "275 kg",
    value: "$720",
    lastActivity: "5 days ago",
    status: "inactive",
    avatar: "PM"
  },
  {
    name: "Grace Akinyi",
    code: "FK004",
    commodities: ["Rice", "Sorghum"],
    totalQuantity: "520 kg",
    value: "$1,450",
    lastActivity: "1 hour ago",
    status: "active",
    avatar: "GA"
  }
];

const statusColors: Record<string, { bg: string; text: string; dot: string }> = {
  active: { bg: "bg-emerald-100", text: "text-emerald-700", dot: "bg-emerald-500" },
  inactive: { bg: "bg-gray-100", text: "text-gray-600", dot: "bg-gray-400" }
};

const commodityColors: Record<string, string> = {
  "Coffee": "bg-amber-100 text-amber-800 border-amber-200",
  "Rice": "bg-green-100 text-green-800 border-green-200", 
  "Maize": "bg-yellow-100 text-yellow-800 border-yellow-200",
  "Beans": "bg-purple-100 text-purple-800 border-purple-200",
  "Sorghum": "bg-orange-100 text-orange-800 border-orange-200"
};

export const FarmerManagement = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedStatus, setSelectedStatus] = useState("all");

  const activeCount = farmers.filter(f => f.status === "active").length;
  const totalValue = farmers.reduce((acc, farmer) => acc + parseInt(farmer.value.replace(/[$,]/g, "")), 0);

  return (
    <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
      {/* Enhanced Header */}
      <div className="relative bg-gradient-to-br from-slate-50 via-blue-50/30 to-indigo-50/20 px-6 py-6">
        <div className="flex items-center justify-between mb-4">
          <div>
            <div className="flex items-center gap-3 mb-2">
              <div className="p-2 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-lg shadow-sm">
                <Users className="h-5 w-5 text-white" />
              </div>
              <div>
                <h2 className="text-2xl font-bold text-gray-900">Farmer Network</h2>
                <p className="text-sm text-gray-600">Manage your warehouse partners</p>
              </div>
            </div>
            
            {/* Stats Pills */}
            <div className="flex items-center gap-4 mt-3">
              <div className="bg-white/80 backdrop-blur-sm rounded-full px-3 py-1.5 border border-white/60 shadow-sm">
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-emerald-500 rounded-full animate-pulse"></div>
                  <span className="text-sm font-medium text-gray-700">{activeCount} Active</span>
                </div>
              </div>
              <div className="bg-white/80 backdrop-blur-sm rounded-full px-3 py-1.5 border border-white/60 shadow-sm">
                <div className="flex items-center gap-2">
                  <Package2 className="h-3 w-3 text-blue-600" />
                  <span className="text-sm font-medium text-gray-700">${totalValue.toLocaleString()} Total</span>
                </div>
              </div>
            </div>
          </div>

          <button className="bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white px-5 py-2.5 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 flex items-center gap-2 font-medium hover:scale-105 active:scale-95">
            <UserPlus className="h-4 w-4" />
            Add Farmer
          </button>
        </div>

        {/* Search and Filter */}
        <div className="flex gap-3">
          <div className="relative flex-1 max-w-md">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
            <input
              type="text"
              placeholder="Search farmers..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2.5 bg-white/90 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all duration-200"
            />
          </div>
          <select 
            value={selectedStatus}
            onChange={(e) => setSelectedStatus(e.target.value)}
            className="px-4 py-2.5 bg-white/90 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500/20 text-gray-700"
          >
            <option value="all">All Status</option>
            <option value="active">Active Only</option>
            <option value="inactive">Inactive Only</option>
          </select>
        </div>
      </div>

      {/* Farmer Grid */}
      <div className="p-6">
        <div className="space-y-3">
          {farmers.map((farmer, index) => {
            const status = statusColors[farmer.status];
            
            return (
              <div
                key={index}
                className="group relative bg-gray-50/50 hover:bg-white border border-gray-100 hover:border-blue-200 rounded-2xl p-5 transition-all duration-300 hover:shadow-lg hover:shadow-blue-100/50"
              >
                {/* Subtle gradient overlay */}
                <div className="absolute inset-0 bg-gradient-to-r from-blue-500/5 to-indigo-500/5 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                
                <div className="relative flex items-center justify-between">
                  <div className="flex items-center gap-4">
                    {/* Enhanced Avatar */}
                    <div className="relative">
                      <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-xl flex items-center justify-center text-white font-bold shadow-md group-hover:shadow-lg group-hover:scale-105 transition-all duration-300">
                        {farmer.avatar}
                      </div>
                      <div className={`absolute -bottom-1 -right-1 w-4 h-4 ${status.dot} rounded-full border-2 border-white shadow-sm`}></div>
                    </div>
                    
                    <div className="space-y-1">
                      <div className="flex items-center gap-3">
                        <h3 className="font-semibold text-gray-900 group-hover:text-blue-900 transition-colors">
                          {farmer.name}
                        </h3>
                        <span className="text-xs font-mono text-gray-500 bg-gray-100 px-2 py-0.5 rounded-md">
                          {farmer.code}
                        </span>
                      </div>
                      
                      {/* Commodity Tags */}
                      <div className="flex gap-1.5">
                        {farmer.commodities.map((commodity, i) => (
                          <span
                            key={i}
                            className={`text-xs font-medium px-2.5 py-1 rounded-lg border ${commodityColors[commodity] || "bg-gray-100 text-gray-700 border-gray-200"} transition-all duration-200 hover:scale-105`}
                          >
                            {commodity}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                  
                  {/* Stats Section */}
                  <div className="flex items-center gap-8">
                    <div className="text-right">
                      <div className="font-bold text-lg text-gray-900">{farmer.totalQuantity}</div>
                      <div className="text-sm font-medium text-blue-600">{farmer.value}</div>
                    </div>
                    
                    <div className="text-right">
                      <div className="text-sm text-gray-600 mb-1">{farmer.lastActivity}</div>
                      <div className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium ${status.bg} ${status.text}`}>
                        <div className={`w-1.5 h-1.5 ${status.dot} rounded-full`}></div>
                        {farmer.status}
                      </div>
                    </div>
                    
                    {/* Action Button */}
                    <button className="opacity-0 group-hover:opacity-100 p-2 hover:bg-gray-100 rounded-lg transition-all duration-200 hover:scale-110">
                      <MoreHorizontal className="h-5 w-5 text-gray-400 hover:text-gray-600" />
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Enhanced Footer */}
      <div className="bg-gradient-to-r from-gray-50 to-slate-50 px-6 py-4 border-t border-gray-100">
        <div className="flex items-center justify-between">
          <p className="text-sm text-gray-600">
            Showing {farmers.length} farmers • Last updated 5 minutes ago
          </p>
          <div className="flex items-center gap-2">
            <button className="text-sm text-blue-600 hover:text-blue-700 font-medium hover:underline transition-colors">
              Export List
            </button>
            <span className="text-gray-300">•</span>
            <button className="text-sm text-blue-600 hover:text-blue-700 font-medium hover:underline transition-colors">
              View Analytics
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};