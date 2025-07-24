"use client"

import { Users, Warehouse, ShoppingCart } from "lucide-react"

export function DashboardOverview() {
  const userStats = [
    {
      label: "Registered Farmers",
      count: "2,847",
      icon: Users,
      color: "#00A79D", // Teal
      bgColor: "rgba(0, 167, 157, 0.1)",
    },
    {
      label: "Registered Warehouses",
      count: "156",
      icon: Warehouse,
      color: "#205D5A", // Dark Teal Green
      bgColor: "rgba(32, 93, 90, 0.1)",
    },
    {
      label: "Registered Buyers",
      count: "1,923",
      icon: ShoppingCart,
      color: "#FF990B", // Orange
      bgColor: "rgba(255, 153, 11, 0.1)",
    },
  ]

  return (
    <div className="space-y-8">
      {/* User Statistics Overview */}
      <section>
        <h2 className="text-xl font-bold text-black mb-6">Total Registered Users</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {userStats.map((stat, index) => {
            const Icon = stat.icon
            return (
              <div
                key={index}
                className="bg-white p-6 rounded-lg border border-gray-200"
                style={{ backgroundColor: stat.bgColor }}
              >
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-600 mb-2">{stat.label}</p>
                    <p className="text-2xl font-bold text-black">{stat.count}</p>
                  </div>
                  <div className="p-3 rounded-lg" style={{ backgroundColor: stat.color }}>
                    <Icon className="w-6 h-6 text-white" />
                  </div>
                </div>
              </div>
            )
          })}
        </div>
      </section>

      {/* Quick Actions */}
      <section>
        <h2 className="text-xl font-bold text-black mb-6">Quick Actions</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <button className="bg-white p-4 rounded-lg border border-gray-200 text-left hover:bg-gray-50 transition-colors">
            <h3 className="font-semibold text-black mb-2">Pending Verifications</h3>
            <p className="text-xl font-bold" style={{ color: "#FCB000" }}>
              23
            </p>
          </button>
          <button className="bg-white p-4 rounded-lg border border-gray-200 text-left hover:bg-gray-50 transition-colors">
            <h3 className="font-semibold text-black mb-2">Active Transactions</h3>
            <p className="text-xl font-bold" style={{ color: "#00A79D" }}>
              156
            </p>
          </button>
          <button className="bg-white p-4 rounded-lg border border-gray-200 text-left hover:bg-gray-50 transition-colors">
            <h3 className="font-semibold text-black mb-2">New Listings Today</h3>
            <p className="text-xl font-bold" style={{ color: "#FF990B" }}>
              89
            </p>
          </button>
          <button className="bg-white p-4 rounded-lg border border-gray-200 text-left hover:bg-gray-50 transition-colors">
            <h3 className="font-semibold text-black mb-2">Platform Revenue</h3>
            <p className="text-xl font-bold" style={{ color: "#205D5A" }}>
              $12,450
            </p>
          </button>
        </div>
      </section>

      {/* Recent Activity */}
      <section>
        <h2 className="text-xl font-bold text-black mb-6">Recent Activity</h2>
        <div className="bg-white rounded-lg border border-gray-200">
          <div className="p-6 space-y-4">
            {[
              { action: "New farmer registration", user: "John Kamau", time: "2 minutes ago", type: "farmer" },
              {
                action: "Product verification completed",
                user: "Organic Rice Batch #1234",
                time: "15 minutes ago",
                type: "verification",
              },
              {
                action: "Transaction completed",
                user: "Buyer #456 → Farmer #789",
                time: "1 hour ago",
                type: "transaction",
              },
              {
                action: "Warehouse capacity updated",
                user: "Nairobi Central Warehouse",
                time: "2 hours ago",
                type: "warehouse",
              },
              { action: "New buyer registration", user: "Fresh Foods Ltd", time: "3 hours ago", type: "buyer" },
            ].map((activity, index) => (
              <div
                key={index}
                className="flex items-center justify-between py-3 border-b border-gray-100 last:border-b-0"
              >
                <div>
                  <p className="font-medium text-black">{activity.action}</p>
                  <p className="text-sm text-gray-600">{activity.user}</p>
                </div>
                <span className="text-sm text-gray-500">{activity.time}</span>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  )
}
