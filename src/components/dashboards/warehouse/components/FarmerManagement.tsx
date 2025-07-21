import { UserPlus, MoreHorizontal, TrendingUp } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

const farmers = [
  {
    name: "John Kamau",
    code: "FK001",
    commodities: ["Coffee", "Rice"],
    totalQuantity: "450 kg",
    lastActivity: "2 days ago",
    status: "active"
  },
  {
    name: "Mary Wanjiku",
    code: "FK002", 
    commodities: ["Maize", "Beans"],
    totalQuantity: "380 kg",
    lastActivity: "1 day ago",
    status: "active"
  },
  {
    name: "Peter Mwangi",
    code: "FK003",
    commodities: ["Coffee"],
    totalQuantity: "275 kg", 
    lastActivity: "5 days ago",
    status: "inactive"
  },
  {
    name: "Grace Akinyi",
    code: "FK004",
    commodities: ["Rice", "Sorghum"],
    totalQuantity: "520 kg",
    lastActivity: "1 hour ago",
    status: "active"
  }
];

export const FarmerManagement = () => {
  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle className="flex items-center gap-2">
            Farmers Using This Warehouse
            <Badge variant="secondary" className="ml-2">{farmers.length}</Badge>
          </CardTitle>
          <Button className="bg-primary hover:bg-primary-dark text-primary-foreground">
            <UserPlus className="h-4 w-4 mr-2" />
            Invite New Farmer
          </Button>
        </div>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {farmers.map((farmer, index) => (
            <div key={index} className="flex items-center justify-between p-4 rounded-lg border hover:bg-accent/50 transition-colors duration-200">
              <div className="flex items-center gap-4">
                <Avatar>
                  <AvatarImage src={`/placeholder.svg?text=${farmer.code}`} alt={farmer.name} />
                  <AvatarFallback>{farmer.name.split(' ').map(n => n[0]).join('')}</AvatarFallback>
                </Avatar>
                
                <div>
                  <div className="font-semibold text-foreground">{farmer.name}</div>
                  <div className="text-sm text-muted-foreground">{farmer.code}</div>
                  <div className="flex gap-1 mt-1">
                    {farmer.commodities.map((commodity, i) => (
                      <Badge key={i} variant="outline" className="text-xs">
                        {commodity}
                      </Badge>
                    ))}
                  </div>
                </div>
              </div>
              
              <div className="text-right">
                <div className="font-semibold text-foreground">{farmer.totalQuantity}</div>
                <div className="text-sm text-muted-foreground">{farmer.lastActivity}</div>
                <div className="flex items-center gap-1 mt-1">
                  <div className={`w-2 h-2 rounded-full ${farmer.status === 'active' ? 'bg-success' : 'bg-muted-foreground'}`} />
                  <span className="text-xs capitalize text-muted-foreground">{farmer.status}</span>
                </div>
              </div>
              
              <Button variant="ghost" size="icon">
                <MoreHorizontal className="h-4 w-4" />
              </Button>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};