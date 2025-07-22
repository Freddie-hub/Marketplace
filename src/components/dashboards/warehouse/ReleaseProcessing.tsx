"use client";

import { Send, Clock, CheckCircle, Truck, Package, MapPin, User, Calendar, FileText, Phone, Eye, MoreHorizontal } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/dashboards/warehouse/ui/card";
import { Badge } from "@/components/dashboards/warehouse/ui/badge";
import { Button } from "@/components/dashboards/warehouse/ui/button";
import { useState } from "react";

type OrderStatus = 'Pending' | 'Released' | 'In Transit';
type OrderPriority = 'High' | 'Medium' | 'Low';

const releaseOrders = [
  {
    id: "RO-2024-015",
    buyer: "Greenmart Supermarket",
    farmer: "John Kamau (FK001)",
    product: "Premium Coffee",
    quantity: "10 bags (60 kg)",
    destination: "Nairobi Central Market",
    status: "Pending" as OrderStatus,
    requestedDate: "Jan 22, 2024",
    pickupInstructions: "Morning pickup preferred, loading dock B",
    priority: "High" as OrderPriority,
    estimatedValue: "$1,200"
  },
  {
    id: "RO-2024-016", 
    buyer: "Fresh Foods Ltd",
    farmer: "Mary Wanjiku (FK002)",
    product: "Jasmine Rice", 
    quantity: "15 bags (75 kg)",
    destination: "Mombasa Distribution Center",
    status: "Released" as OrderStatus,
    requestedDate: "Jan 21, 2024",
    pickupInstructions: "Standard pickup, no special requirements",
    priority: "Medium" as OrderPriority,
    estimatedValue: "$950"
  },
  {
    id: "RO-2024-017",
    buyer: "Local Restaurant Chain", 
    farmer: "Grace Akinyi (FK004)",
    product: "Red Beans",
    quantity: "8 crates (48 kg)",
    destination: "Kisumu Branch",
    status: "In Transit" as OrderStatus,
    requestedDate: "Jan 20, 2024", 
    pickupInstructions: "Refrigerated transport required",
    priority: "High" as OrderPriority,
    estimatedValue: "$720"
  },
  {
    id: "RO-2024-018",
    buyer: "Export Company ABC",
    farmer: "Peter Mwangi (FK003)",
    product: "Yellow Maize",
    quantity: "25 bags (150 kg)", 
    destination: "Port of Mombasa",
    status: "Pending" as OrderStatus,
    requestedDate: "Jan 23, 2024",
    pickupInstructions: "Documentation required for export",
    priority: "Medium" as OrderPriority,
    estimatedValue: "$2,100"
  }
];

const getStatusIcon = (status: OrderStatus) => {
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

const getStatusStyles = (status: OrderStatus) => {
  switch (status) {
    case 'Pending':
      return 'bg-amber-100 text-amber-800 border-amber-200';
    case 'Released':
      return 'bg-emerald-100 text-emerald-800 border-emerald-200';
    case 'In Transit':
      return 'bg-blue-100 text-blue-800 border-blue-200';
    default:
      return 'bg-gray-100 text-gray-800 border-gray-200';
  }
};

const getPriorityStyles = (priority: OrderPriority) => {
  switch (priority) {
    case 'High':
      return 'bg-red-100 text-red-800 border-red-200';
    case 'Medium':
      return 'bg-yellow-100 text-yellow-800 border-yellow-200';
    case 'Low':
      return 'bg-green-100 text-green-800 border-green-200';
    default:
      return 'bg-gray-100 text-gray-800 border-gray-200';
  }
};

export const ReleaseProcessing = () => {
  const [selectedOrder, setSelectedOrder] = useState<number | null>(null);
  const [hoveredCard, setHoveredCard] = useState<number | null>(null);

  const pendingCount = releaseOrders.filter(order => order.status === 'Pending').length;
  const releasedCount = releaseOrders.filter(order => order.status === 'Released').length;
  const transitCount = releaseOrders.filter(order => order.status === 'In Transit').length;

  return (
    <div className="space-y-6">
      {/* Header with Statistics */}
      <Card className="bg-gradient-to-r from-slate-50 to-slate-100 border-0 shadow-lg">
        <CardHeader className="pb-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-teal-500 rounded-lg shadow-sm">
                <Send className="h-6 w-6 text-white" />
              </div>
              <div>
                <CardTitle className="text-2xl font-bold text-slate-800">
                  Release Processing
                </CardTitle>
                <p className="text-slate-600 text-sm mt-1">Manage warehouse releases and shipments</p>
              </div>
            </div>
            <Button className="bg-teal-500 hover:bg-teal-600 text-white shadow-sm">
              <Package className="h-4 w-4 mr-2" />
              New Release
            </Button>
          </div>
        </CardHeader>
        <CardContent className="pt-0">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="bg-white rounded-lg p-4 border border-amber-200 shadow-sm">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-amber-100 rounded-lg">
                  <Clock className="h-5 w-5 text-amber-600" />
                </div>
                <div>
                  <p className="text-2xl font-bold text-slate-800">{pendingCount}</p>
                  <p className="text-sm text-slate-600">Pending Release</p>
                </div>
              </div>
            </div>
            <div className="bg-white rounded-lg p-4 border border-emerald-200 shadow-sm">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-emerald-100 rounded-lg">
                  <CheckCircle className="h-5 w-5 text-emerald-600" />
                </div>
                <div>
                  <p className="text-2xl font-bold text-slate-800">{releasedCount}</p>
                  <p className="text-sm text-slate-600">Released</p>
                </div>
              </div>
            </div>
            <div className="bg-white rounded-lg p-4 border border-blue-200 shadow-sm">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-blue-100 rounded-lg">
                  <Truck className="h-5 w-5 text-blue-600" />
                </div>
                <div>
                  <p className="text-2xl font-bold text-slate-800">{transitCount}</p>
                  <p className="text-sm text-slate-600">In Transit</p>
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Orders Grid */}
      <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
        {releaseOrders.map((order, index) => (
          <Card
            key={index}
            className={`transition-all duration-300 cursor-pointer border-0 shadow-lg hover:shadow-xl transform hover:-translate-y-1 ${
              hoveredCard === index ? 'ring-2 ring-teal-300' : ''
            }`}
            onMouseEnter={() => setHoveredCard(index)}
            onMouseLeave={() => setHoveredCard(null)}
          >
            <CardHeader className="pb-4">
              <div className="flex justify-between items-start">
                <div className="flex items-start gap-3">
                  <div className="p-2 bg-slate-100 rounded-lg">
                    <Package className="h-5 w-5 text-slate-600" />
                  </div>
                  <div>
                    <h4 className="font-bold text-lg text-slate-800">{order.id}</h4>
                    <div className="flex items-center gap-2 mt-1">
                      <Calendar className="h-4 w-4 text-slate-500" />
                      <p className="text-sm text-slate-600">{order.requestedDate}</p>
                      <Badge className={`text-xs px-2 py-1 ${getPriorityStyles(order.priority)}`}>
                        {order.priority}
                      </Badge>
                    </div>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <Badge className={`flex items-center gap-2 px-3 py-1 ${getStatusStyles(order.status)}`}>
                    {getStatusIcon(order.status)}
                    {order.status}
                  </Badge>
                  <Button variant="ghost" size="sm" className="p-1">
                    <MoreHorizontal className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </CardHeader>
            
            <CardContent className="space-y-4">
              {/* Key Information */}
              <div className="grid grid-cols-2 gap-4">
                <div className="bg-slate-50 rounded-lg p-3">
                  <div className="flex items-center gap-2 mb-1">
                    <User className="h-4 w-4 text-teal-600" />
                    <span className="text-xs font-medium text-slate-700 uppercase tracking-wide">Buyer</span>
                  </div>
                  <p className="font-semibold text-slate-800">{order.buyer}</p>
                </div>
                <div className="bg-slate-50 rounded-lg p-3">
                  <div className="flex items-center gap-2 mb-1">
                    <User className="h-4 w-4 text-emerald-600" />
                    <span className="text-xs font-medium text-slate-700 uppercase tracking-wide">Farmer</span>
                  </div>
                  <p className="font-semibold text-slate-800">{order.farmer}</p>
                </div>
              </div>
              
              {/* Product Details */}
              <div className="bg-gradient-to-r from-teal-50 to-emerald-50 rounded-lg p-4 border border-teal-100">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <div className="flex items-center gap-2 mb-1">
                      <Package className="h-4 w-4 text-teal-600" />
                      <span className="text-xs font-medium text-slate-700 uppercase tracking-wide">Product</span>
                    </div>
                    <p className="font-semibold text-slate-800">{order.product}</p>
                    <p className="text-sm text-slate-600 mt-1">{order.quantity}</p>
                  </div>
                  <div>
                    <div className="flex items-center gap-2 mb-1">
                      <MapPin className="h-4 w-4 text-teal-600" />
                      <span className="text-xs font-medium text-slate-700 uppercase tracking-wide">Destination</span>
                    </div>
                    <p className="font-semibold text-slate-800">{order.destination}</p>
                    <p className="text-sm text-teal-600 font-medium mt-1">{order.estimatedValue}</p>
                  </div>
                </div>
              </div>
              
              {/* Instructions */}
              <div className="bg-blue-50 rounded-lg p-3 border border-blue-100">
                <div className="flex items-start gap-2">
                  <FileText className="h-4 w-4 text-blue-600 mt-0.5" />
                  <div>
                    <span className="text-xs font-medium text-slate-700 uppercase tracking-wide">Pickup Instructions</span>
                    <p className="text-sm text-slate-700 mt-1 leading-relaxed">{order.pickupInstructions}</p>
                  </div>
                </div>
              </div>
              
              {/* Action Buttons */}
              <div className="flex gap-2 pt-2">
                {order.status === 'Pending' && (
                  <>
                    <Button 
                      className="bg-teal-500 hover:bg-teal-600 text-white flex-1 shadow-sm transition-all duration-200 hover:shadow-md"
                    >
                      <CheckCircle className="h-4 w-4 mr-2" />
                      Mark as Released
                    </Button>
                    <Button
                      variant="outline"
                      className="border-slate-300 hover:border-teal-400 hover:text-teal-600 shadow-sm"
                    >
                      <Phone className="h-4 w-4 mr-2" />
                      Contact
                    </Button>
                  </>
                )}
                {order.status === 'Released' && (
                  <Button
                    variant="outline"
                    className="w-full border-emerald-300 text-emerald-700 hover:bg-emerald-50 shadow-sm"
                  >
                    <Eye className="h-4 w-4 mr-2" />
                    Track Shipment
                  </Button>
                )}
                {order.status === 'In Transit' && (
                  <Button
                    variant="outline"
                    className="w-full border-blue-300 text-blue-700 hover:bg-blue-50 shadow-sm"
                  >
                    <Truck className="h-4 w-4 mr-2" />
                    Update Status
                  </Button>
                )}
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};