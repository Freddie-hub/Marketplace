'use client';
import { useQuery } from "@apollo/client";
import { gql } from "@apollo/client";
import NavigationBar from '@/components/Navbar';
import DashboardNav from '@/components/dashboards/farmer/DashboardNav';
import StatsGrid from '@/components/dashboards/farmer/StatsGrid';
import QuickActions from '@/components/dashboards/farmer/QuickActions';
import RecentSales from '@/components/dashboards/farmer/RecentSales';
import Footer from '@/components/footer';
import FarmerOnboardingForm from '@/components/dashboards/farmer/FarmerOnboardingForm';
import useAuth from '@/lib/useAuth';

const GET_USER_PAYMENT_DETAILS = gql`
  query GetUser {
    User {
      id
      paymentDetails
    }
  }
`;

export default function DashboardPage() {
  const { user, loading: authLoading } = useAuth();
  const { data, loading: queryLoading, error, refetch } = useQuery(GET_USER_PAYMENT_DETAILS, {
    skip: !user,
    context: { headers: { Authorization: `Bearer ${localStorage.getItem('token')}` } },
  });

  const isLoading = authLoading || queryLoading;
  const paymentDetails = data?.User?.paymentDetails;

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50/30 to-indigo-50/20">
      <NavigationBar />
      
      <div className="flex">
        {/* Sidebar */}
        <div className="w-72 bg-white/80 backdrop-blur-sm border-r border-slate-200/60 shadow-sm">
          <DashboardNav />
        </div>

        {/* Main Content */}
        <div className="flex-1 p-8">
          <div className="max-w-7xl mx-auto space-y-8">
            {/* Page Header */}
            <div className="mb-8">
              <h1 className="text-3xl font-bold text-slate-900 mb-2">Dashboard Overview</h1>
              <p className="text-slate-600">Welcome back! Here's what's happening with your business today.</p>
            </div>

            {isLoading && (
              <p className="text-center text-gray-600">Loading...</p>
            )}
            {error && (
              <p className="rounded bg-red-100 p-3 text-center text-red-700">
                Error: {error.message}
              </p>
            )}
            {!isLoading && !error && !paymentDetails && (
              <div className="bg-white/70 backdrop-blur-sm rounded-2xl border border-slate-200/60 shadow-sm p-6">
                <FarmerOnboardingForm onSuccess={refetch} />
              </div>
            )}
            {!isLoading && !error && paymentDetails && (
              <>
                <div className="bg-white/70 backdrop-blur-sm rounded-2xl border border-slate-200/60 shadow-sm p-6">
                  <StatsGrid />
                </div>

                <div className="grid grid-cols-1 xl:grid-cols-2 gap-8">
                  <div className="bg-white/70 backdrop-blur-sm rounded-2xl border border-slate-200/60 shadow-sm">
                    <QuickActions />
                  </div>
                  <div className="bg-white/70 backdrop-blur-sm rounded-2xl border border-slate-200/60 shadow-sm">
                    <RecentSales />
                  </div>
                </div>
              </>
            )}
          </div>
        </div>
      </div>
      
      <Footer />
    </div>
  );
}