"use client"

import {
  Users,
  CheckCircle,
  Package,
  CreditCard,
  Warehouse,
  BarChart3,
  MessageSquare,
  Wallet,
  Settings,
  LayoutDashboard,
} from "lucide-react"
import { cn } from "@/lib/utils"

interface AdminSidebarProps {
  activeSection: string
  setActiveSection: (section: string) => void
}

const menuItems = [
  { id: "overview", label: "Overview", icon: LayoutDashboard },
  { id: "users", label: "User Management", icon: Users },
  { id: "verification", label: "Verification Center", icon: CheckCircle },
  { id: "products", label: "Product Oversight", icon: Package },
  { id: "transactions", label: "Transactions", icon: CreditCard },
  { id: "warehouses", label: "Warehouse Oversight", icon: Warehouse },
  { id: "analytics", label: "Analytics", icon: BarChart3 },
  { id: "messaging", label: "Messaging Logs", icon: MessageSquare },
  { id: "wallet", label: "Wallet Overview", icon: Wallet },
  { id: "settings", label: "System Settings", icon: Settings },
]

export function AdminSidebar({ activeSection, setActiveSection }: AdminSidebarProps) {
  return (
    <div className="h-full w-full bg-white border-r border-gray-200">
      {/* Sidebar header */}
      <div className="p-6 border-b border-gray-200">
        <h2 className="text-lg font-bold text-black">AgriMarket Admin</h2>
      </div>

      {/* Scrollable nav */}
      <nav className="p-4 overflow-y-auto h-[calc(100vh-64px-65px)]">
        {/* 64px = navbar height, 65px = sidebar header */}
        <ul className="space-y-2">
          {menuItems.map((item) => {
            const Icon = item.icon
            return (
              <li key={item.id}>
                <button
                  onClick={() => setActiveSection(item.id)}
                  className={cn(
                    "w-full flex items-center gap-3 px-4 py-3 text-left text-sm rounded-lg transition-colors",
                    activeSection === item.id
                      ? "bg-gray-100 text-black font-medium"
                      : "text-gray-600 hover:bg-gray-50 hover:text-black",
                  )}
                >
                  <Icon className="w-5 h-5" />
                  <span>{item.label}</span>
                </button>
              </li>
            )
          })}
        </ul>
      </nav>
    </div>
  )
}
