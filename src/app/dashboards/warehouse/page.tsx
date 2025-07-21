import { DashboardHeader } from "@/components/DashboardHeader";
import { SummaryCards } from "@/components/SummaryCards";
import { QuickActions } from "@/components/QuickActions";
import { FarmerManagement } from "@/components/FarmerManagement";
import { InventoryView } from "@/components/InventoryView";
import { ReleaseProcessing } from "@/components/ReleaseProcessing";

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <DashboardHeader />
      
      <main className="container mx-auto px-6 py-8">
        <SummaryCards />
        
        <div className="mt-8">
          <QuickActions />
        </div>
        
        <div className="grid lg:grid-cols-2 gap-8 mt-8">
          <FarmerManagement />
          <InventoryView />
        </div>
        
        <div className="mt-8">
          <ReleaseProcessing />
        </div>
      </main>
    </div>
  );
};

export default Index;
