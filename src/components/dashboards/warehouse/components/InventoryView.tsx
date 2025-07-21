import { Package, Calendar, User, ShieldCheck } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

const inventory = [
  {
    commodity: "Premium Coffee",
    farmer: "John Kamau (FK001)",
    batch: "CF-2024-001",
    quantity: "25 bags",
    weight: "150 kg",
    dateStored: "Jan 15, 2024",
    certification: "Organic",
    status: "In Stock"
  },
  {
    commodity: "Jasmine Rice",
    farmer: "Mary Wanjiku (FK002)", 
    batch: "RC-2024-003",
    quantity: "40 bags",
    weight: "200 kg",
    dateStored: "Jan 18, 2024",
    certification: "Fair Trade",
    status: "Scheduled for Pickup"
  },
  {
    commodity: "Yellow Maize",
    farmer: "Peter Mwangi (FK003)",
    batch: "MZ-2024-002",
    quantity: "30 bags",
    weight: "180 kg",
    dateStored: "Jan 12, 2024", 
    certification: "None",
    status: "In Stock"
  },
  {
    commodity: "Red Beans",
    farmer: "Grace Akinyi (FK004)",
    batch: "BN-2024-001",
    quantity: "20 crates",
    weight: "120 kg",
    dateStored: "Jan 20, 2024",
    certification: "Organic",
    status: "In Stock"
  }
];

export const InventoryView = () => {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Package className="h-5 w-5 text-primary" />
          Current Inventory
          <Badge variant="secondary" className="ml-2">{inventory.length} items</Badge>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {inventory.map((item, index) => (
            <div key={index} className="border rounded-lg p-4 hover:shadow-md transition-all duration-200">
              <div className="flex justify-between items-start mb-3">
                <div>
                  <h4 className="font-semibold text-foreground">{item.commodity}</h4>
                  <div className="flex items-center gap-1 text-sm text-muted-foreground mt-1">
                    <User className="h-3 w-3" />
                    {item.farmer}
                  </div>
                </div>
                <Badge 
                  variant={item.status === 'In Stock' ? 'default' : 'secondary'}
                  className={item.status === 'In Stock' ? 'bg-success text-success-foreground' : ''}
                >
                  {item.status}
                </Badge>
              </div>
              
              <div className="grid grid-cols-2 gap-4 text-sm mb-3">
                <div>
                  <span className="text-muted-foreground">Batch:</span>
                  <span className="ml-2 font-medium">{item.batch}</span>
                </div>
                <div>
                  <span className="text-muted-foreground">Quantity:</span>
                  <span className="ml-2 font-medium">{item.quantity} ({item.weight})</span>
                </div>
              </div>
              
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-4 text-sm">
                  <div className="flex items-center gap-1 text-muted-foreground">
                    <Calendar className="h-3 w-3" />
                    {item.dateStored}
                  </div>
                  {item.certification !== 'None' && (
                    <div className="flex items-center gap-1">
                      <ShieldCheck className="h-3 w-3 text-success" />
                      <Badge variant="outline" className="text-xs">
                        {item.certification}
                      </Badge>
                    </div>
                  )}
                </div>
                
                <div className="flex gap-2">
                  <Button variant="outline" size="sm">View Details</Button>
                  {item.status === 'In Stock' && (
                    <Button size="sm" className="bg-primary hover:bg-primary-dark text-primary-foreground">
                      Release
                    </Button>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};