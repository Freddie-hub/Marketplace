"use client";
import React from "react";
import { useRouter } from "next/navigation";
import { Package, MessageSquare, DollarSign, TrendingUp, Plus, ArrowRight } from "lucide-react";

const QuickActions = () => {
  const router = useRouter();
  
  const actions = [
    {
      id: 1,
      title: "Add New Product",
      description: "List a new product for sale",
      icon: Package,
      color: "#0f766e",
      onClick: () => router.push("/dashboard/productForm"),
    },
    {
      id: 2,
      title: "Check Messages",
      description: "View customer inquiries",
      icon: MessageSquare,
      color: "#dc2626",
      badge: "0 new"
    },
    {
      id: 3,
      title: "View Payments",
      description: "Check transaction history",
      icon: DollarSign,
      color: "#ea580c",
    },
    {
      id: 4,
      title: "Sales Analytics",
      description: "Review performance metrics",
      icon: TrendingUp,
      color: "#7c3aed",
    },
  ];

  return (
    <div className="p-6">
      <div className="mb-6">
        <h2 className="text-xl font-semibold text-slate-800 mb-1">Quick Actions</h2>
        <p className="text-slate-600 text-sm">Frequently used features and shortcuts</p>
      </div>
      
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {actions.map((action) => {
          const IconComponent = action.icon;
          
          return (
            <button
              key={action.id}
              onClick={action.onClick}
              className="group relative bg-white rounded-xl p-6 border border-slate-200/60 shadow-sm hover:shadow-md transition-all duration-200 text-left hover:-translate-y-0.5"
            >
              <div className="flex items-start justify-between mb-4">
                <div 
                  className="p-3 rounded-lg"
                  style={{ backgroundColor: `${action.color}15` }}
                >
                  <IconComponent 
                    size={24} 
                    style={{ color: action.color }}
                    className="transition-transform duration-200 group-hover:scale-110"
                  />
                </div>
                
                {action.badge && (
                  <span className="px-2 py-1 bg-red-100 text-red-700 text-xs font-medium rounded-full">
                    {action.badge}
                  </span>
                )}
                
                <ArrowRight 
                  size={16} 
                  className="text-slate-400 opacity-0 group-hover:opacity-100 transition-opacity duration-200"
                />
              </div>

              <div>
                <h3 className="font-semibold text-slate-900 mb-1 group-hover:text-slate-700 transition-colors duration-200">
                  {action.title}
                </h3>
                <p className="text-slate-600 text-sm">
                  {action.description}
                </p>
              </div>

              {/* Subtle hover effect */}
              <div 
                className="absolute inset-0 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none"
                style={{ backgroundColor: `${action.color}05` }}
              />
            </button>
          );
        })}
      </div>

      <div className="mt-6 pt-6 border-t border-slate-200/60">
        <button 
          className="w-full flex items-center justify-center space-x-2 px-4 py-3 bg-slate-900 text-white rounded-xl hover:bg-slate-800 transition-colors duration-200 group"
          onClick={() => router.push("/dashboard/productFormgit aff")}
        >
          <Plus size={18} className="group-hover:rotate-90 transition-transform duration-200" />
          <span className="font-medium">Create New Listing</span>
        </button>
      </div>
    </div>
  );
};

export default QuickActions;