import { Send, Clock, CheckCircle, Truck } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

const releaseOrders = [
  {
    id: "RO-2024-015",
    buyer: "Greenmart Supermarket",
    farmer: "John Kamau (FK001)",
    product: "Premium Coffee",
    quantity: "10 bags (60 kg)",
    destination: "Nairobi Central Market",
    status: "Pending",
    requestedDate: "Jan 22, 2024",
    pickupInstructions: "Morning pickup preferred, loading dock B"
  },
  {
    id: "RO-2024-016", 
    buyer: "Fresh Foods Ltd",
    farmer: "Mary Wanjiku (FK002)",
    product: "Jasmine Rice", 
    quantity: "15 bags (75 kg)",
    destination: "Mombasa Distribution Center",
    status: "Released",
    requestedDate: "Jan 21, 2024",
    pickupInstructions: "Standard pickup, no special requirements"
  },
  {
    id: "RO-2024-017",
    buyer: "Local Restaurant Chain", 
    farmer: "Grace Akinyi (FK004)",
    product: "Red Beans",
    quantity: "8 crates (48 kg)",
    destination: "Kisumu Branch",
    status: "In Transit",
    requestedDate: "Jan 20, 2024", 
    pickupInstructions: "Refrigerated transport required"
  },
  {
    id: "RO-2024-018",
    buyer: "Export Company ABC",
    farmer: "Peter Mwangi (FK003)",
    product: "Yellow Maize",
    quantity: "25 bags (150 kg)", 
    destination: "Port of Mombasa",
    status: "Pending",
    requestedDate: "Jan 23, 2024",
    pickupInstructions: "Documentation required for export"
  }
];

const getStatusIcon = (status: string) => {
  switch (status) {
    case 'Pending':
      return <Clock className="h-4 w-4" />;
    case 'Released':
      return <CheckCircle className="h-4 w-4" />;
    case 'In Transit':
      return <Truck className="h-4 w-4" />;
    default:
      return <Send className="h-4 w-4" />;
  }
};

const getStatusColor = (status: string) => {
  switch (status) {
    case 'Pending':
      return 'bg-warning text-warning-foreground';
    case 'Released':
      return 'bg-success text-success-foreground';
    case 'In Transit':
      return 'bg-info text-info-foreground';
    default:
      return 'bg-muted text-muted-foreground';
  }
};

export const ReleaseProcessing = () => {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Send className="h-5 w-5 text-primary" />
          Release Processing
          <Badge variant="secondary" className="ml-2">
            {releaseOrders.filter(order => order.status === 'Pending').length} pending
          </Badge>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {releaseOrders.map((order, index) => (
            <div key={index} className="border rounded-lg p-4 hover:shadow-md transition-all duration-200">
              <div className="flex justify-between items-start mb-4">
                <div>
                  <h4 className="font-semibold text-foreground">{order.id}</h4>
                  <p className="text-sm text-muted-foreground">{order.requestedDate}</p>
                </div>
                <Badge className={`${getStatusColor(order.status)} flex items-center gap-1`}>
                  {getStatusIcon(order.status)}
                  {order.status}
                </Badge>
              </div>
              
              <div className="space-y-3 text-sm">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <span className="text-muted-foreground">Buyer:</span>
                    <p className="font-medium">{order.buyer}</p>
                  </div>
                  <div>
                    <span className="text-muted-foreground">Farmer:</span>
                    <p className="font-medium">{order.farmer}</p>
                  </div>
                </div>
                
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <span className="text-muted-foreground">Product:</span>
                    <p className="font-medium">{order.product}</p>
                  </div>
                  <div>
                    <span className="text-muted-foreground">Quantity:</span>
                    <p className="font-medium">{order.quantity}</p>
                  </div>
                </div>
                
                <div>
                  <span className="text-muted-foreground">Destination:</span>
                  <p className="font-medium">{order.destination}</p>
                </div>
                
                <div>
                  <span className="text-muted-foreground">Instructions:</span>
                  <p className="text-muted-foreground italic">{order.pickupInstructions}</p>
                </div>
              </div>
              
              <div className="flex gap-2 mt-4">
                {order.status === 'Pending' && (
                  <>
                    <Button 
                      size="sm" 
                      className="bg-success hover:bg-success/90 text-success-foreground flex-1"
                    >
                      Mark as Released
                    </Button>
                    <Button variant="outline" size="sm">
                      Contact Logistics
                    </Button>
                  </>
                )}
                {order.status === 'Released' && (
                  <Button variant="outline" size="sm" className="w-full">
                    Track Shipment
                  </Button>
                )}
                {order.status === 'In Transit' && (
                  <Button variant="outline" size="sm" className="w-full">
                    Update Status
                  </Button>
                )}
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};