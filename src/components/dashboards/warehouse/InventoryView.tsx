"use client";

import { Package, Calendar, User, ShieldCheck, Search, Filter, MoreVertical, Truck, Eye, AlertCircle, TrendingUp } from "lucide-react";
import { useState } from "react";
import { ReactElement } from "react";

const inventory = [
  {
    commodity: "Premium Coffee",
    farmer: "John Kamau (FK001)",
    batch: "CF-2024-001",
    quantity: "25 bags",
    weight: "150 kg",
    dateStored: "Jan 15, 2024",
    certification: "Organic",
    status: "In Stock",
    value: "$1,250",
    daysStored: 7,
    priority: "high"
  },
  {
    commodity: "Jasmine Rice",
    farmer: "Mary Wanjiku (FK002)", 
    batch: "RC-2024-003",
    quantity: "40 bags",
    weight: "200 kg",
    dateStored: "Jan 18, 2024",
    certification: "Fair Trade",
    status: "Scheduled for Pickup",
    value: "$950",
    daysStored: 4,
    priority: "medium"
  },
  {
    commodity: "Yellow Maize",
    farmer: "Peter Mwangi (FK003)",
    batch: "MZ-2024-002",
    quantity: "30 bags",
    weight: "180 kg",
    dateStored: "Jan 12, 2024", 
    certification: "None",
    status: "In Stock",
    value: "$540",
    daysStored: 10,
    priority: "low"
  },
  {
    commodity: "Red Beans",
    farmer: "Grace Akinyi (FK004)",
    batch: "BN-2024-001",
    quantity: "20 crates",
    weight: "120 kg",
    dateStored: "Jan 20, 2024",
    certification: "Organic",
    status: "In Stock",
    value: "$480",
    daysStored: 2,
    priority: "high"
  }
];

const statusConfig: Record<string, { bg: string; text: string; dot: string; icon: ReactElement }> = {
  "In Stock": { 
    bg: "bg-emerald-50", 
    text: "text-emerald-700", 
    dot: "bg-emerald-500",
    icon: <Package className="h-3 w-3" />
  },
  "Scheduled for Pickup": { 
    bg: "bg-amber-50", 
    text: "text-amber-700", 
    dot: "bg-amber-500",
    icon: <Truck className="h-3 w-3" />
  }
};

const certificationConfig: Record<string, string> = {
  "Organic": "bg-green-100 text-green-800 border-green-200",
  "Fair Trade": "bg-blue-100 text-blue-800 border-blue-200",
  "None": "bg-gray-100 text-gray-600 border-gray-200"
};

const priorityConfig: Record<string, { color: string; ring: string }> = {
  "high": { color: "border-l-red-500", ring: "ring-red-100" },
  "medium": { color: "border-l-amber-500", ring: "ring-amber-100" },
  "low": { color: "border-l-green-500", ring: "ring-green-100" }
};

export const InventoryView = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedStatus, setSelectedStatus] = useState("all");

  const totalValue = inventory.reduce((acc, item) => acc + parseInt(item.value.replace(/[$,]/g, "")), 0);
  const inStockCount = inventory.filter(item => item.status === "In Stock").length;
  const totalWeight = inventory.reduce((acc, item) => acc + parseInt(item.weight.replace(/[^\d]/g, "")), 0);

  return (
    <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
      {/* Premium Header */}
      <div className="relative bg-gradient-to-br from-slate-50 via-emerald-50/30 to-teal-50/20 px-6 py-6">
        <div className="flex items-center justify-between mb-4">
          <div>
            <div className="flex items-center gap-3 mb-2">
              <div className="p-2.5 bg-gradient-to-br from-emerald-500 to-teal-600 rounded-xl shadow-sm">
                <Package className="h-5 w-5 text-white" />
              </div>
              <div>
                <h2 className="text-2xl font-bold text-gray-900">Inventory Management</h2>
                <p className="text-sm text-gray-600">Track and manage stored commodities</p>
              </div>
            </div>
            
            {/* Enhanced Stats */}
            <div className="flex items-center gap-4 mt-3">
              <div className="bg-white/80 backdrop-blur-sm rounded-full px-3 py-1.5 border border-white/60 shadow-sm">
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-emerald-500 rounded-full animate-pulse"></div>
                  <span className="text-sm font-medium text-gray-700">{inStockCount} In Stock</span>
                </div>
              </div>
              <div className="bg-white/80 backdrop-blur-sm rounded-full px-3 py-1.5 border border-white/60 shadow-sm">
                <div className="flex items-center gap-2">
                  <TrendingUp className="h-3 w-3 text-teal-600" />
                  <span className="text-sm font-medium text-gray-700">${totalValue.toLocaleString()}</span>
                </div>
              </div>
              <div className="bg-white/80 backdrop-blur-sm rounded-full px-3 py-1.5 border border-white/60 shadow-sm">
                <span className="text-sm font-medium text-gray-700">{totalWeight}kg Total</span>
              </div>
            </div>
          </div>

          <div className="flex gap-3">
            <button className="bg-white/80 hover:bg-white border border-gray-200 text-gray-700 px-4 py-2.5 rounded-xl shadow-sm hover:shadow-md transition-all duration-200 flex items-center gap-2 font-medium">
              <Filter className="h-4 w-4" />
              Filter
            </button>
            <button className="bg-gradient-to-r from-teal-600 to-emerald-600 hover:from-teal-700 hover:to-emerald-700 text-white px-5 py-2.5 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 flex items-center gap-2 font-medium hover:scale-105 active:scale-95">
              <Package className="h-4 w-4" />
              Add Item
            </button>
          </div>
        </div>

        {/* Search Bar */}
        <div className="relative max-w-md">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
          <input
            type="text"
            placeholder="Search inventory..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-2.5 bg-white/90 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-teal-500/20 focus:border-teal-500 transition-all duration-200"
          />
        </div>
      </div>

      {/* Inventory Grid */}
      <div className="p-6">
        <div className="space-y-4">
          {inventory.map((item, index) => {
            const status = statusConfig[item.status];
            const priority = priorityConfig[item.priority];
            
            return (
              <div
                key={index}
                className={`group relative bg-gray-50/30 hover:bg-white border-l-4 ${priority.color} border-r border-t border-b border-gray-100 hover:border-gray-200 rounded-2xl rounded-l-none p-6 transition-all duration-300 hover:shadow-lg hover:shadow-teal-100/30 ${priority.ring} hover:ring-4`}
              >
                {/* Gradient Overlay */}
                <div className="absolute inset-0 bg-gradient-to-r from-teal-500/3 to-emerald-500/3 rounded-2xl rounded-l-none opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                
                <div className="relative">
                  {/* Header */}
                  <div className="flex justify-between items-start mb-4">
                    <div className="space-y-2">
                      <div className="flex items-center gap-3">
                        <h3 className="font-bold text-lg text-gray-900 group-hover:text-teal-900 transition-colors">
                          {item.commodity}
                        </h3>
                        <span className="text-xs font-mono text-gray-500 bg-gray-100 px-2.5 py-1 rounded-md">
                          {item.batch}
                        </span>
                      </div>
                      
                      <div className="flex items-center gap-2 text-sm text-gray-600">
                        <div className="flex items-center gap-1">
                          <User className="h-3 w-3" />
                          <span>{item.farmer}</span>
                        </div>
                        <span className="text-gray-300">•</span>
                        <div className="flex items-center gap-1">
                          <Calendar className="h-3 w-3" />
                          <span>{item.dateStored}</span>
                        </div>
                        <span className="text-gray-300">•</span>
                        <span className="text-xs bg-blue-50 text-blue-700 px-2 py-0.5 rounded-full">
                          {item.daysStored} days stored
                        </span>
                      </div>
                    </div>

                    <div className="flex items-center gap-3">
                      <div className={`inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-sm font-medium ${status.bg} ${status.text} border border-current/10`}>
                        {status.icon}
                        {item.status}
                      </div>
                      <button className="opacity-0 group-hover:opacity-100 p-2 hover:bg-gray-100 rounded-lg transition-all duration-200">
                        <MoreVertical className="h-4 w-4 text-gray-400" />
                      </button>
                    </div>
                  </div>

                  {/* Stats Grid */}
                  <div className="grid grid-cols-4 gap-6 mb-4">
                    <div className="bg-white/60 rounded-lg p-3 border border-gray-100">
                      <div className="text-xs text-gray-500 mb-1">Quantity</div>
                      <div className="font-semibold text-gray-900">{item.quantity}</div>
                    </div>
                    <div className="bg-white/60 rounded-lg p-3 border border-gray-100">
                      <div className="text-xs text-gray-500 mb-1">Weight</div>
                      <div className="font-semibold text-gray-900">{item.weight}</div>
                    </div>
                    <div className="bg-white/60 rounded-lg p-3 border border-gray-100">
                      <div className="text-xs text-gray-500 mb-1">Value</div>
                      <div className="font-semibold text-emerald-600">{item.value}</div>
                    </div>
                    <div className="bg-white/60 rounded-lg p-3 border border-gray-100">
                      <div className="text-xs text-gray-500 mb-1">Certification</div>
                      <div className={`inline-flex text-xs font-medium px-2 py-1 rounded-lg border ${certificationConfig[item.certification]}`}>
                        {item.certification !== "None" && <ShieldCheck className="h-3 w-3 mr-1" />}
                        {item.certification}
                      </div>
                    </div>
                  </div>

                  {/* Actions */}
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      {item.daysStored > 7 && (
                        <div className="flex items-center gap-1 text-xs text-amber-600 bg-amber-50 px-2 py-1 rounded-full">
                          <AlertCircle className="h-3 w-3" />
                          Long-term storage
                        </div>
                      )}
                    </div>

                    <div className="flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                      <button className="flex items-center gap-1 px-3 py-1.5 text-sm text-gray-600 hover:text-teal-600 hover:bg-teal-50 rounded-lg transition-all duration-200">
                        <Eye className="h-3 w-3" />
                        Details
                      </button>
                      {item.status === "In Stock" && (
                        <button className="flex items-center gap-1 px-3 py-1.5 text-sm bg-gradient-to-r from-orange-500 to-red-500 text-white rounded-lg hover:shadow-lg transition-all duration-200 hover:scale-105 active:scale-95">
                          <Truck className="h-3 w-3" />
                          Release
                        </button>
                      )}
                    </div>
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
            Showing {inventory.length} items • Total value: ${totalValue.toLocaleString()}
          </p>
          <div className="flex items-center gap-2">
            <button className="text-sm text-teal-600 hover:text-teal-700 font-medium hover:underline transition-colors">
              Export Inventory
            </button>
            <span className="text-gray-300">•</span>
            <button className="text-sm text-teal-600 hover:text-teal-700 font-medium hover:underline transition-colors">
              Generate Report
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};