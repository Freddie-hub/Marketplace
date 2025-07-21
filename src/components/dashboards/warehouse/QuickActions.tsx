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
    color: "bg-primary",
    action: () => console.log("Invite farmer")
  },
  {
    title: "Manage Inventory", 
    description: "View commodities by farmer and crop",
    icon: Package,
    color: "bg-success",
    action: () => console.log("Manage inventory")
  },
  {
    title: "Process Releases",
    description: "Fulfill release orders from sales", 
    icon: Send,
    color: "bg-info",
    action: () => console.log("Process releases")
  },
  {
    title: "Manage Logistics",
    description: "Schedule and track pickups",
    icon: Truck,
    color: "bg-warning",
    action: () => console.log("Manage logistics")
  },
  {
    title: "View Receipts",
    description: "Generate warehouse receipts",
    icon: FileText,
    color: "bg-earth-brown",
    action: () => console.log("View receipts")
  },
  {
    title: "Analytics & Reports",
    description: "Visualize trends and insights",
    icon: BarChart3,
    color: "bg-primary-light",
    action: () => console.log("Analytics")
  }
];

export const QuickActions = () => {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
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
              onClick={action.action}
            >
              <div className={`p-2 rounded-lg ${action.color} text-white group-hover:scale-110 transition-transform duration-200`}>
                <action.icon className="h-5 w-5" />
              </div>
              <div className="text-left">
                <div className="font-semibold text-foreground">{action.title}</div>
                <div className="text-sm text-muted-foreground">{action.description}</div>
              </div>
            </Button>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};