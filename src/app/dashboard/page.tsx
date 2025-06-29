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

      <div className="flex min-h-screen">
        {/* Sidebar */}
        <div className="w-64 bg-white shadow-md p-4">
          <DashboardNav />
        </div>

        {/* Main Content */}
        <div className="flex-1 p-6 space-y-2">
          {/* Stats Grid */}
          <div className="w-[95%] mx-auto rounded-xl bg-white shadow-md p-1">
            <StatsGrid />
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
        </div>
      </div>

      <Footer />
    </>
  );
}