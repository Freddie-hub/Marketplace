"use client";

import { UserPlus, MoreHorizontal, TrendingUp } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/dashboards/warehouse/ui/card";
import { Button } from "@/components/dashboards/warehouse/ui/button";
import { Badge } from "@/components/dashboards/warehouse/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/dashboards/warehouse/ui/avatar";

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
    <Card style={{ backgroundColor: "var(--background)", color: "var(--foreground)" }}>
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle className="flex items-center gap-2" style={{ color: "var(--color-black)" }}>
            Farmers Using This Warehouse
            <Badge style={{ backgroundColor: "var(--color-light-aqua)", color: "var(--color-black)" }} className="ml-2">
              {farmers.length}
            </Badge>
          </CardTitle>
          <Button
            style={{
              backgroundColor: "var(--color-teal)",
              color: "var(--color-black)",
            }}
            className="hover:bg-[var(--color-dark-teal)]"
          >
            <UserPlus className="h-4 w-4 mr-2" />
            Invite New Farmer
          </Button>
        </div>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {farmers.map((farmer, index) => (
            <div
              key={index}
              className="flex items-center justify-between p-4 rounded-lg border hover:bg-[var(--color-pink-lavender)]/20 transition-colors duration-200"
              style={{ borderColor: "var(--color-teal)" }}
            >
              <div className="flex items-center gap-4">
                <Avatar>
                  <AvatarImage src={`/placeholder.svg?text=${farmer.code}`} alt={farmer.name} />
                  <AvatarFallback style={{ backgroundColor: "var(--color-light-aqua)" }}>
                    {farmer.name.split(' ').map(n => n[0]).join('')}
                  </AvatarFallback>
                </Avatar>
                
                <div>
                  <div className="font-semibold" style={{ color: "var(--color-black)" }}>
                    {farmer.name}
                  </div>
                  <div className="text-sm" style={{ color: "var(--color-dark-teal)" }}>
                    {farmer.code}
                  </div>
                  <div className="flex gap-1 mt-1">
                    {farmer.commodities.map((commodity, i) => (
                      <Badge
                        key={i}
                        variant="outline"
                        className="text-xs"
                        style={{
                          borderColor: "var(--color-teal)",
                          color: "var(--color-black)",
                        }}
                      >
                        {commodity}
                      </Badge>
                    ))}
                  </div>
                </div>
              </div>
              
              <div className="text-right">
                <div className="font-semibold" style={{ color: "var(--color-black)" }}>
                  {farmer.totalQuantity}
                </div>
                <div className="text-sm" style={{ color: "var(--color-dark-teal)" }}>
                  {farmer.lastActivity}
                </div>
                <div className="flex items-center gap-1 mt-1">
                  <div
                    className="w-2 h-2 rounded-full"
                    style={{
                      backgroundColor:
                        farmer.status === "active"
                          ? "var(--color-teal)"
                          : "var(--color-dark-burgundy)",
                    }}
                  />
                  <span
                    className="text-xs capitalize"
                    style={{ color: "var(--color-dark-teal)" }}
                  >
                    {farmer.status}
                  </span>
                </div>
              </div>
              
              <Button
                variant="ghost"
                size="icon"
                style={{ color: "var(--color-teal)" }}
              >
                <MoreHorizontal className="h-4 w-4" />
              </Button>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};