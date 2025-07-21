import { Package, Users, TrendingUp, DollarSign, Truck } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/dashboards/warehouse/ui/card";

const summaryData = [
  {
    title: "Total Inventory",
    value: "2,847 kg",
    change: "+12% from last week",
    icon: Package,
    color: "text-primary"
  },
  {
    title: "Farmers Using Warehouse",
    value: "24",
    change: "2 new this month",
    icon: Users,
    color: "text-success"
  },
  {
    title: "Goods Released This Week",
    value: "1,234 kg",
    change: "+8% from last week", 
    icon: TrendingUp,
    color: "text-info"
  },
  {
    title: "Inventory Value",
    value: "$85,420",
    change: "+15% from last month",
    icon: DollarSign,
    color: "text-warning"
  },
  {
    title: "Pending Pickups",
    value: "7",
    change: "2 scheduled today",
    icon: Truck,
    color: "text-earth-brown"
  }
];

export const SummaryCards = () => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6">
      {summaryData.map((item, index) => (
        <Card 
          key={index} 
          className="hover:shadow-lg transition-all duration-300 cursor-pointer group hover:scale-105"
        >
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              {item.title}
            </CardTitle>
            <item.icon className={`h-5 w-5 ${item.color} group-hover:scale-110 transition-transform duration-200`} />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-foreground">{item.value}</div>
            <p className="text-xs text-muted-foreground mt-1">{item.change}</p>
          </CardContent>
        </Card>
      ))}
    </div>
  );
};