"use client";

import { 
  UserPlus, 
  Package, 
  Send, 
  Truck, 
  FileText, 
  BarChart3 
} from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/dashboards/warehouse/ui/card";
import { Button } from "@/components/dashboards/warehouse/ui/button";

const quickActions = [
  {
    title: "Invite Farmer",
    description: "Invite farmers to join the platform",
    icon: UserPlus,
    color: "var(--color-teal)",
    action: () => console.log("Invite farmer")
  },
  {
    title: "Manage Inventory", 
    description: "View commodities by farmer and crop",
    icon: Package,
    color: "var(--color-bright-orange)",
    action: () => console.log("Manage inventory")
  },
  {
    title: "Process Releases",
    description: "Fulfill release orders from sales", 
    icon: Send,
    color: "var(--color-vivid-orange)",
    action: () => console.log("Process releases")
  },
  {
    title: "Manage Logistics",
    description: "Schedule and track pickups",
    icon: Truck,
    color: "var(--color-deep-red)",
    action: () => console.log("Manage logistics")
  },
  {
    title: "View Receipts",
    description: "Generate warehouse receipts",
    icon: FileText,
    color: "var(--color-dark-teal)",
    action: () => console.log("View receipts")
  },
  {
    title: "Analytics & Reports",
    description: "Visualize trends and insights",
    icon: BarChart3,
    color: "var(--color-pink-lavender)",
    action: () => console.log("Analytics")
  }
];

export const QuickActions = () => {
  return (
    <Card style={{ backgroundColor: "var(--background)", color: "var(--foreground)" }}>
      <CardHeader>
        <CardTitle className="flex items-center gap-2" style={{ color: "var(--color-black)" }}>
          Quick Actions
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {quickActions.map((action, index) => (
            <Button 
              key={index}
              variant="outline"
              className="h-auto p-4 flex flex-col items-start gap-3 group hover:shadow-md transition-all duration-200"
              style={{ borderColor: "var(--color-teal)", color: "var(--color-black)" }}
              onClick={action.action}
            >
              <div
                className="p-2 rounded-lg group-hover:scale-110 transition-transform duration-200"
                style={{ backgroundColor: action.color, color: "var(--color-black)" }}
              >
                <action.icon className="h-5 w-5" />
              </div>
              <div className="text-left">
                <div className="font-semibold" style={{ color: "var(--color-black)" }}>
                  {action.title}
                </div>
                <div className="text-sm" style={{ color: "var(--color-dark-teal)" }}>
                  {action.description}
                </div>
              </div>
            </Button>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};