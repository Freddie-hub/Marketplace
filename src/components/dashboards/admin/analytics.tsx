"use client"

import { TrendingUp, TrendingDown, Users, Package, DollarSign, MapPin } from "lucide-react"
import { Button } from "@/components/dashboards/admin/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/dashboards/admin/ui/select"

export function Analytics() {
  const topProducts = [
    { name: "Organic Rice", sales: 156, revenue: "KSh 1,200,000", trend: "up" },
    { name: "Fair Trade Coffee", sales: 89, revenue: "KSh 890,000", trend: "up" },
    { name: "Hass Avocados", sales: 234, revenue: "KSh 780,000", trend: "down" },
    { name: "Premium Tea", sales: 67, revenue: "KSh 650,000", trend: "up" },
    { name: "Sweet Potatoes", sales: 123, revenue: "KSh 450,000", trend: "down" },
  ]

  const activeRegions = [
    { name: "Nairobi", users: 1234, listings: 456, volume: "KSh 2.1M" },
    { name: "Kiambu", users: 892, listings: 234, volume: "KSh 1.8M" },
    { name: "Nakuru", users: 567, listings: 189, volume: "KSh 1.2M" },
    { name: "Mombasa", users: 445, listings: 123, volume: "KSh 890K" },
    { name: "Kisumu", users: 334, listings: 98, volume: "KSh 670K" },
  ]

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-bold text-black">Analytics Dashboard</h2>
        <div className="flex gap-2">
          <Select defaultValue="month">
            <SelectTrigger className="w-48">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="week">This Week</SelectItem>
              <SelectItem value="month">This Month</SelectItem>
              <SelectItem value="quarter">This Quarter</SelectItem>
              <SelectItem value="year">This Year</SelectItem>
            </SelectContent>
          </Select>
          <Button variant="outline">Export Report</Button>
        </div>
      </div>

      {/* Key Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="bg-white p-6 rounded-lg border border-gray-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600 mb-2">Total Revenue</p>
              <p className="text-2xl font-bold text-black">KSh 4.2M</p>
              <div className="flex items-center gap-1 mt-2">
                <TrendingUp className="w-4 h-4 text-green-600" />
                <span className="text-sm text-green-600">+12.5%</span>
              </div>
            </div>
            <div
              className="w-12 h-12 rounded-lg flex items-center justify-center"
              style={{ backgroundColor: "#00A79D" }}
            >
              <DollarSign className="w-6 h-6 text-white" />
            </div>
          </div>
        </div>

        <div className="bg-white p-6 rounded-lg border border-gray-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600 mb-2">Active Users</p>
              <p className="text-2xl font-bold text-black">3,472</p>
              <div className="flex items-center gap-1 mt-2">
                <TrendingUp className="w-4 h-4 text-green-600" />
                <span className="text-sm text-green-600">+8.2%</span>
              </div>
            </div>
            <div
              className="w-12 h-12 rounded-lg flex items-center justify-center"
              style={{ backgroundColor: "#FF990B" }}
            >
              <Users className="w-6 h-6 text-white" />
            </div>
          </div>
        </div>

        <div className="bg-white p-6 rounded-lg border border-gray-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600 mb-2">Total Listings</p>
              <p className="text-2xl font-bold text-black">1,100</p>
              <div className="flex items-center gap-1 mt-2">
                <TrendingDown className="w-4 h-4 text-red-600" />
                <span className="text-sm text-red-600">-3.1%</span>
              </div>
            </div>
            <div
              className="w-12 h-12 rounded-lg flex items-center justify-center"
              style={{ backgroundColor: "#205D5A" }}
            >
              <Package className="w-6 h-6 text-white" />
            </div>
          </div>
        </div>

        <div className="bg-white p-6 rounded-lg border border-gray-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600 mb-2">Platform Fees</p>
              <p className="text-2xl font-bold text-black">KSh 126K</p>
              <div className="flex items-center gap-1 mt-2">
                <TrendingUp className="w-4 h-4 text-green-600" />
                <span className="text-sm text-green-600">+15.3%</span>
              </div>
            </div>
            <div
              className="w-12 h-12 rounded-lg flex items-center justify-center"
              style={{ backgroundColor: "#FCB000" }}
            >
              <DollarSign className="w-6 h-6 text-white" />
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Top Selling Products */}
        <div className="bg-white rounded-lg border border-gray-200 p-6">
          <h3 className="text-lg font-semibold text-black mb-4">Top Selling Products</h3>
          <div className="space-y-4">
            {topProducts.map((product, index) => (
              <div key={index} className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-lg bg-gray-100 flex items-center justify-center">
                    <span className="text-sm font-medium text-black">{index + 1}</span>
                  </div>
                  <div>
                    <p className="font-medium text-black">{product.name}</p>
                    <p className="text-sm text-gray-600">{product.sales} sales</p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="font-medium text-black">{product.revenue}</p>
                  <div className="flex items-center gap-1">
                    {product.trend === "up" ? (
                      <TrendingUp className="w-4 h-4 text-green-600" />
                    ) : (
                      <TrendingDown className="w-4 h-4 text-red-600" />
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Active Regions */}
        <div className="bg-white rounded-lg border border-gray-200 p-6">
          <h3 className="text-lg font-semibold text-black mb-4">Active Regions</h3>
          <div className="space-y-4">
            {activeRegions.map((region, index) => (
              <div key={index} className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div
                    className="w-8 h-8 rounded-lg flex items-center justify-center"
                    style={{ backgroundColor: "#00A79D" }}
                  >
                    <MapPin className="w-4 h-4 text-white" />
                  </div>
                  <div>
                    <p className="font-medium text-black">{region.name}</p>
                    <p className="text-sm text-gray-600">{region.users} users</p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="font-medium text-black">{region.volume}</p>
                  <p className="text-sm text-gray-600">{region.listings} listings</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Usage Trends */}
      <div className="bg-white rounded-lg border border-gray-200 p-6">
        <h3 className="text-lg font-semibold text-black mb-4">Platform Usage Trends</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="text-center">
            <div
              className="w-16 h-16 rounded-full mx-auto mb-3 flex items-center justify-center"
              style={{ backgroundColor: "rgba(0, 167, 157, 0.1)" }}
            >
              <Users className="w-8 h-8" style={{ color: "#00A79D" }} />
            </div>
            <p className="text-xl font-bold text-black">+234</p>
            <p className="text-sm text-gray-600">New Sign-ups This Week</p>
          </div>
          <div className="text-center">
            <div
              className="w-16 h-16 rounded-full mx-auto mb-3 flex items-center justify-center"
              style={{ backgroundColor: "rgba(255, 153, 11, 0.1)" }}
            >
              <Package className="w-8 h-8" style={{ color: "#FF990B" }} />
            </div>
            <p className="text-xl font-bold text-black">+89</p>
            <p className="text-sm text-gray-600">New Listings Today</p>
          </div>
          <div className="text-center">
            <div
              className="w-16 h-16 rounded-full mx-auto mb-3 flex items-center justify-center"
              style={{ backgroundColor: "rgba(32, 93, 90, 0.1)" }}
            >
              <TrendingUp className="w-8 h-8" style={{ color: "#205D5A" }} />
            </div>
            <p className="text-xl font-bold text-black">23%</p>
            <p className="text-sm text-gray-600">Growth Rate This Month</p>
          </div>
        </div>
      </div>
    </div>
  )
}
