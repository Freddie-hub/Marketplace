"use client"

import { useState } from "react"
import NavigationBar from '@/components/Navbar'
import Footer from '@/components/footer'
import { AdminSidebar } from "@/components/dashboards/admin/admin-sidebar"
import { DashboardOverview } from "@/components/dashboards/admin/dashboard-overview"
import { UserManagement } from "@/components/dashboards/admin/user-management"
import { VerificationCenter } from "@/components/dashboards/admin/verification-center"
import { ProductOversight } from "@/components/dashboards/admin/product-oversight"
import { Transactions } from "@/components/dashboards/admin/transactions"
import { WarehouseOversight } from "@/components/dashboards/admin/warehouse-oversight"
import { Analytics } from "@/components/dashboards/admin/analytics"
import { MessagingLogs } from "@/components/dashboards/admin/messaging-logs"
import { WalletOverview } from "@/components/dashboards/admin/wallet-overview"
import { SystemSettings } from "@/components/dashboards/admin/system-settings"
import { SidebarProvider } from "@/components/dashboards/admin/ui/sidebar"

export default function AdminDashboard() {
  const [activeSection, setActiveSection] = useState("overview")

  const renderContent = () => {
    switch (activeSection) {
      case "overview":
        return <DashboardOverview />
      case "users":
        return <UserManagement />
      case "verification":
        return <VerificationCenter />
      case "products":
        return <ProductOversight />
      case "transactions":
        return <Transactions />
      case "warehouses":
        return <WarehouseOversight />
      case "analytics":
        return <Analytics />
      case "messaging":
        return <MessagingLogs />
      case "wallet":
        return <WalletOverview />
      case "settings":
        return <SystemSettings />
      default:
        return <DashboardOverview />
    }
  }

  return (
    <div className="min-h-screen bg-[#f0f0f0] flex flex-col">
      {/* Top Navbar */}
      <NavigationBar />

      <SidebarProvider>
        {/* Sidebar (fixed below the navbar) */}
        <div className="fixed top-16 left-0 h-[calc(100vh-64px)] w-64 bg-white border-r border-gray-200 z-40">
          <AdminSidebar activeSection={activeSection} setActiveSection={setActiveSection} />
        </div>

        {/* Main Content (pushed right by sidebar width) */}
        <main className="flex-1 pt-8 ml-64 px-6">
          <div className="max-w-7xl mx-auto">
            <header className="mb-8">
              <h1 className="text-2xl font-bold text-black">Admin Dashboard</h1>
              <p className="text-sm text-gray-600 mt-2">
                Manage your agricultural marketplace platform
              </p>
            </header>
            {renderContent()}
          </div>
        </main>
      </SidebarProvider>

     
        <Footer />
    </div>
  )
}
