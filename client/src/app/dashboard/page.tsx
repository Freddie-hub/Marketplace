'use client';

import NavigationBar from '@/components/Navbar';
import DashboardNav from '@/components/dashboard/DashboardNav';
import StatsGrid from '@/components/dashboard/StatsGrid';
import QuickActions from '@/components/dashboard/QuickActions';
import RecentSales from '@/components/dashboard/RecentSales';
import Footer from '@/components/footer';

export default function DashboardPage() {
  return (
    <>
      <NavigationBar />

      <div className="p-6 space-y-2">
        {/* Dashboard Top Nav */}
        <div className="w-[95%] mx-auto rounded-xl bg-white shadow-md p-1">
          <DashboardNav />
        </div>



        {/* Bottom Section: Quick Actions and Recent Sales */}
        <div className="w-[95%] mx-auto grid grid-cols-1 md:grid-cols-2 gap-2">
          <div className="rounded-xl bg-white shadow-md p-1">
            <QuickActions />
          </div>
          <div className="rounded-xl bg-white shadow-md p-1">
            <RecentSales />
          </div>
        </div>

                {/* Stats Grid */}
        <div className="w-[95%] mx-auto rounded-xl bg-white shadow-md p-1">
          <StatsGrid />
        </div>
        
      </div>

      <Footer />
    </>
  );
}
