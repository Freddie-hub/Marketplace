import NavigationBar from '@/components/Navbar';
import { SummaryCards } from "@/components/dashboards/warehouse/SummaryCards";
import { QuickActions } from "@/components/dashboards/warehouse/QuickActions";
import { FarmerManagement } from "@/components/dashboards/warehouse/FarmerManagement";
import { InventoryView } from "@/components/dashboards/warehouse/InventoryView";
import { ReleaseProcessing } from "@/components/dashboards/warehouse/ReleaseProcessing";
import Footer from '@/components/footer';

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <NavigationBar />
      
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
      <Footer />
    </div>
  );
};

export default Index;
