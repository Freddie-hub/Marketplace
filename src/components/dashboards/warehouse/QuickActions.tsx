"use client";
import { useRouter } from "next/navigation";
import {
  UserPlus,
  Package,
  Send,
  Truck,
  FileText,
  BarChart3,
} from "lucide-react";

interface QuickAction {
  title: string;
  description: string;
  icon: React.ComponentType<{ className?: string }>;
  gradient: string;
  bgColor: string;
  hoverColor: string;
  action: () => void;
}

interface QuickActionsProps {
  warehouseId: number;
}

const quickActions: QuickAction[] = [
  {
    title: "Invite Farmer",
    description: "Invite farmers to join the platform",
    icon: UserPlus,
    gradient: "from-teal-500 to-teal-600",
    bgColor: "bg-teal-50",
    hoverColor: "hover:bg-teal-100",
    action: () => {}, // Replaced with navigation in component
  },
  {
    title: "Manage Inventory",
    description: "View commodities by farmer and crop",
    icon: Package,
    gradient: "from-orange-500 to-orange-600",
    bgColor: "bg-orange-50",
    hoverColor: "hover:bg-orange-100",
    action: () => console.log("Manage inventory"),
  },
  {
    title: "Process Releases",
    description: "Fulfill release orders from sales",
    icon: Send,
    gradient: "from-amber-500 to-orange-500",
    bgColor: "bg-amber-50",
    hoverColor: "hover:bg-amber-100",
    action: () => console.log("Process releases"),
  },
  {
    title: "Manage Logistics",
    description: "Schedule and track pickups",
    icon: Truck,
    gradient: "from-red-500 to-red-600",
    bgColor: "bg-red-50",
    hoverColor: "hover:bg-red-100",
    action: () => console.log("Manage logistics"),
  },
  {
    title: "View Receipts",
    description: "Generate warehouse receipts",
    icon: FileText,
    gradient: "from-slate-500 to-slate-600",
    bgColor: "bg-slate-50",
    hoverColor: "hover:bg-slate-100",
    action: () => console.log("View receipts"),
  },
  {
    title: "Analytics & Reports",
    description: "Visualize trends and insights",
    icon: BarChart3,
    gradient: "from-purple-500 to-pink-500",
    bgColor: "bg-purple-50",
    hoverColor: "hover:bg-purple-100",
    action: () => console.log("Analytics"),
  },
];

export const QuickActions = ({ warehouseId }: QuickActionsProps) => {
  const router = useRouter();

  const handleInviteFarmer = () => {
    router.push(`/dashboards/warehouse/invite?warehouseId=${warehouseId}`);
  };

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
      {/* Header with subtle gradient background */}
      <div className="bg-gradient-to-r from-slate-50 to-gray-50 px-6 py-4 border-b border-gray-100">
        <h2 className="text-xl font-bold text-gray-900 flex items-center gap-2">
          <div className="w-2 h-8 bg-gradient-to-b from-teal-500 to-teal-600 rounded-full"></div>
          Quick Actions
        </h2>
        <p className="text-sm text-gray-600 mt-1">Streamline your warehouse operations</p>
      </div>

      {/* Actions Grid */}
      <div className="p-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {quickActions.map((action, index) => (
            <button
              key={index}
              className={`
                relative group p-5 rounded-xl border-2 border-gray-100 
                ${action.bgColor} ${action.hoverColor}
                hover:border-gray-200 hover:shadow-lg hover:-translate-y-1
                transition-all duration-300 ease-out text-left
                focus:outline-none focus:ring-2 focus:ring-teal-500 focus:ring-offset-2
                active:scale-95
              `}
              onClick={action.title === "Invite Farmer" ? handleInviteFarmer : action.action}
            >
              {/* Subtle gradient overlay on hover */}
              <div className="absolute inset-0 bg-gradient-to-br from-white/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-xl"></div>

              {/* Content */}
              <div className="relative">
                {/* Icon with gradient background */}
                <div
                  className={`
                    inline-flex p-3 rounded-lg bg-gradient-to-br ${action.gradient}
                    shadow-sm group-hover:shadow-md group-hover:scale-110
                    transition-all duration-300 mb-4
                  `}
                >
                  <action.icon className="h-6 w-6 text-white" />
                </div>

                {/* Content */}
                <div className="space-y-2">
                  <h3 className="font-semibold text-gray-900 text-base group-hover:text-gray-800 transition-colors">
                    {action.title}
                  </h3>
                  <p className="text-sm text-gray-600 leading-relaxed group-hover:text-gray-700 transition-colors">
                    {action.description}
                  </p>
                </div>

                {/* Hover indicator */}
                <div className="absolute top-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <div className="w-2 h-2 bg-teal-500 rounded-full animate-pulse"></div>
                </div>
              </div>
            </button>
          ))}
        </div>
      </div>

      {/* Footer with helpful tip */}
      <div className="px-6 py-3 bg-gray-50 border-t border-gray-100">
        <p className="text-xs text-gray-500 text-center">
          💡 Tip: Use keyboard shortcuts to access these actions quickly
        </p>
      </div>
    </div>
  );
};