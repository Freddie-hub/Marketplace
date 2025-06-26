"use client";

import React from "react";
import { useRouter } from "next/navigation";
import { Package, MessageSquare, DollarSign, TrendingUp } from "lucide-react";

const QuickActions = () => {
  const router = useRouter();

  const actions = [
    {
      id: 1,
      title: "Add Product",
      icon: Package,
      bgColor: "bg-gradient-to-br from-[#00A79D] to-[#78CCD0]",
      iconColor: "text-white",
      onClick: () => router.push("/listing"),
    },
    {
      id: 2,
      title: "Check Messages",
      icon: MessageSquare,
      bgColor: "bg-gradient-to-br from-[#FCB000] to-[#FF990B]",
      iconColor: "text-white",
    },
    {
      id: 3,
      title: "View Payments",
      icon: DollarSign,
      bgColor: "bg-gradient-to-br from-[#BD011F] to-[#720218]",
      iconColor: "text-white",
    },
    {
      id: 4,
      title: "Sales Report",
      icon: TrendingUp,
      bgColor: "bg-gradient-to-br from-[#FABFFF] to-[#78CCD0]",
      iconColor: "text-[#205D5A]",
    },
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
              onClick={action.onClick}
              className={`
                ${action.bgColor}
                rounded-2xl p-8 cursor-pointer
                shadow-md
              `}
            >
              <div className="flex flex-col items-center text-center space-y-4">
                <div className={`${action.iconColor}`}>
                  <IconComponent size={48} strokeWidth={2} />
                </div>
                <h3 className={`text-xl font-semibold ${action.iconColor}`}>
                  {action.title}
                </h3>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default QuickActions;
