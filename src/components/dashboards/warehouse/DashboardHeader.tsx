import { Bell, Settings, User } from "lucide-react";
import { Button } from "@/components/dashboards/warehouse/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/dashboards/warehouse/ui/avatar";

export const DashboardHeader = () => {
  return (
    <header className="bg-card shadow-sm border-b">
      <div className="container mx-auto px-6 py-4">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-foreground">Warehouse Dashboard</h1>
            <p className="text-muted-foreground mt-1">Welcome back, Manager</p>
          </div>
          
          <div className="flex items-center gap-4">
            <Button variant="outline" size="icon" className="relative">
              <Bell className="h-4 w-4" />
              <span className="absolute -top-1 -right-1 bg-primary text-primary-foreground rounded-full text-xs w-5 h-5 flex items-center justify-center">
                3
              </span>
            </Button>
            
            <Button variant="outline" size="icon">
              <Settings className="h-4 w-4" />
            </Button>
            
            <Avatar>
              <AvatarImage src="/placeholder.svg" alt="Manager" />
              <AvatarFallback>
                <User className="h-4 w-4" />
              </AvatarFallback>
            </Avatar>
          </div>
        </div>
      </div>
    </header>
  );
};