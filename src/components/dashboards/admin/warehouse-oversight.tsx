"use client"

import { useState } from "react"
import { Search, MapPin, Package, TrendingUp, TrendingDown } from "lucide-react"
import { Button } from "@/components/dashboards/admin/ui/button"
import { Input } from "@/components/dashboards/admin/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/dashboards/admin/ui/select"

export function WarehouseOversight() {
  const [searchTerm, setSearchTerm] = useState("")
  const [locationFilter, setLocationFilter] = useState("all")
  const [utilizationFilter, setUtilizationFilter] = useState("all")

  const warehouses = [
    {
      id: 1,
      name: "Nairobi Central Warehouse",
      location: "Nairobi",
      capacity: "10,000 kg",
      currentStock: "7,500 kg",
      utilization: 75,
      commodities: [
        { name: "Rice", quantity: "3,000 kg", farmers: 12 },
        { name: "Coffee", quantity: "2,500 kg", farmers: 8 },
        { name: "Maize", quantity: "2,000 kg", farmers: 15 },
      ],
      recentActivity: [
        { type: "in", product: "Organic Rice", quantity: "500 kg", farmer: "John Kamau", time: "2 hours ago" },
        { type: "out", product: "Coffee Beans", quantity: "200 kg", buyer: "Fresh Foods Ltd", time: "4 hours ago" },
      ],
    },
    {
      id: 2,
      name: "Kiambu Storage Hub",
      location: "Kiambu",
      capacity: "8,000 kg",
      currentStock: "5,200 kg",
      utilization: 65,
      commodities: [
        { name: "Coffee", quantity: "2,800 kg", farmers: 18 },
        { name: "Avocados", quantity: "1,400 kg", farmers: 6 },
        { name: "Tea", quantity: "1,000 kg", farmers: 4 },
      ],
      recentActivity: [
        { type: "in", product: "Fair Trade Coffee", quantity: "300 kg", farmer: "Mary Wanjiku", time: "1 hour ago" },
        { type: "in", product: "Hass Avocados", quantity: "150 kg", farmer: "Peter Mwangi", time: "3 hours ago" },
      ],
    },
    {
      id: 3,
      name: "Nakuru Agricultural Depot",
      location: "Nakuru",
      capacity: "15,000 kg",
      currentStock: "12,300 kg",
      utilization: 82,
      commodities: [
        { name: "Potatoes", quantity: "5,000 kg", farmers: 25 },
        { name: "Maize", quantity: "4,300 kg", farmers: 20 },
        { name: "Beans", quantity: "3,000 kg", farmers: 12 },
      ],
      recentActivity: [
        {
          type: "out",
          product: "Sweet Potatoes",
          quantity: "800 kg",
          buyer: "SuperMart Chain",
          time: "30 minutes ago",
        },
        { type: "in", product: "White Maize", quantity: "1,200 kg", farmer: "Grace Nyong'o", time: "2 hours ago" },
      ],
    },
  ]

  const getUtilizationColor = (utilization: number) => {
    if (utilization >= 80) return "#BD011F"
    if (utilization >= 60) return "#FCB000"
    return "#00A79D"
  }

  const filteredWarehouses = warehouses.filter((warehouse) => {
    const matchesSearch =
      (warehouse.name?.toLowerCase() || "").includes((searchTerm || "").toLowerCase()) ||
      (warehouse.location?.toLowerCase() || "").includes((searchTerm || "").toLowerCase())
    const matchesLocation =
      locationFilter === "all" || (warehouse.location?.toLowerCase() || "") === (locationFilter || "").toLowerCase()
    const matchesUtilization =
      utilizationFilter === "all" ||
      (utilizationFilter === "high" && warehouse.utilization >= 80) ||
      (utilizationFilter === "medium" && warehouse.utilization >= 60 && warehouse.utilization < 80) ||
      (utilizationFilter === "low" && warehouse.utilization < 60)

    return matchesSearch && matchesLocation && matchesUtilization
  })

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-bold text-black">Warehouse Oversight</h2>
        <div className="flex gap-2">
          <Button variant="outline">Capacity Report</Button>
          <Button className="bg-black text-white hover:bg-gray-800">Add Warehouse</Button>
        </div>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="bg-white p-4 rounded-lg border border-gray-200">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg flex items-center justify-center" style={{ backgroundColor: "#00A79D" }}>
              <Package className="w-5 h-5 text-white" />
            </div>
            <div>
              <p className="text-xl font-bold text-black">156</p>
              <p className="text-sm text-gray-600">Total Warehouses</p>
            </div>
          </div>
        </div>
        <div className="bg-white p-4 rounded-lg border border-gray-200">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg flex items-center justify-center" style={{ backgroundColor: "#FCB000" }}>
              <TrendingUp className="w-5 h-5 text-white" />
            </div>
            <div>
              <p className="text-xl font-bold text-black">73%</p>
              <p className="text-sm text-gray-600">Avg Utilization</p>
            </div>
          </div>
        </div>
        <div className="bg-white p-4 rounded-lg border border-gray-200">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg flex items-center justify-center" style={{ backgroundColor: "#FF990B" }}>
              <Package className="w-5 h-5 text-white" />
            </div>
            <div>
              <p className="text-xl font-bold text-black">25,000</p>
              <p className="text-sm text-gray-600">Total Stock (kg)</p>
            </div>
          </div>
        </div>
        <div className="bg-white p-4 rounded-lg border border-gray-200">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg flex items-center justify-center" style={{ backgroundColor: "#205D5A" }}>
              <MapPin className="w-5 h-5 text-white" />
            </div>
            <div>
              <p className="text-xl font-bold text-black">12</p>
              <p className="text-sm text-gray-600">Active Regions</p>
            </div>
          </div>
        </div>
      </div>

      {/* Filters */}
      <div className="bg-white p-6 rounded-lg border border-gray-200">
        <div className="flex flex-col md:flex-row gap-4">
          <div className="flex-1">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
              <Input
                placeholder="Search warehouses by name or location..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
          </div>
          <Select value={locationFilter} onValueChange={setLocationFilter}>
            <SelectTrigger className="w-48">
              <SelectValue placeholder="Filter by location" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Locations</SelectItem>
              <SelectItem value="nairobi">Nairobi</SelectItem>
              <SelectItem value="kiambu">Kiambu</SelectItem>
              <SelectItem value="nakuru">Nakuru</SelectItem>
              <SelectItem value="mombasa">Mombasa</SelectItem>
            </SelectContent>
          </Select>
          <Select value={utilizationFilter} onValueChange={setUtilizationFilter}>
            <SelectTrigger className="w-48">
              <SelectValue placeholder="Utilization Level" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Levels</SelectItem>
              <SelectItem value="high">High (80%+)</SelectItem>
              <SelectItem value="medium">Medium (60-79%)</SelectItem>
              <SelectItem value="low">Low (&lt;60%)</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      {/* Warehouses Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
        {filteredWarehouses.map((warehouse) => (
          <div key={warehouse.id} className="bg-white rounded-lg border border-gray-200 p-6">
            {/* Warehouse Header */}
            <div className="flex items-start justify-between mb-4">
              <div>
                <h3 className="text-lg font-semibold text-black">{warehouse.name}</h3>
                <div className="flex items-center gap-1 text-gray-600 mt-1">
                  <MapPin className="w-4 h-4" />
                  <span className="text-sm">{warehouse.location}</span>
                </div>
              </div>
              <div className="text-right">
                <p className="text-sm text-gray-600">Utilization</p>
                <p className="text-2xl font-bold" style={{ color: getUtilizationColor(warehouse.utilization) }}>
                  {warehouse.utilization}%
                </p>
              </div>
            </div>

            {/* Capacity Bar */}
            <div className="mb-4">
              <div className="flex justify-between text-sm text-gray-600 mb-2">
                <span>Capacity</span>
                <span>
                  {warehouse.currentStock} / {warehouse.capacity}
                </span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div
                  className="h-2 rounded-full transition-all duration-300"
                  style={{
                    width: `${warehouse.utilization}%`,
                    backgroundColor: getUtilizationColor(warehouse.utilization),
                  }}
                />
              </div>
            </div>

            {/* Commodities */}
            <div className="mb-4">
              <h4 className="font-medium text-black mb-2">Current Stock</h4>
              <div className="space-y-2">
                {warehouse.commodities.map((commodity, index) => (
                  <div key={index} className="flex justify-between items-center text-sm">
                    <span className="text-gray-600">{commodity.name}</span>
                    <div className="text-right">
                      <p className="font-medium text-black">{commodity.quantity}</p>
                      <p className="text-xs text-gray-500">{commodity.farmers} farmers</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Recent Activity */}
            <div>
              <h4 className="font-medium text-black mb-2">Recent Activity</h4>
              <div className="space-y-2">
                {warehouse.recentActivity.map((activity, index) => (
                  <div key={index} className="flex items-center gap-2 text-sm">
                    {activity.type === "in" ? (
                      <TrendingUp className="w-4 h-4 text-green-600" />
                    ) : (
                      <TrendingDown className="w-4 h-4 text-red-600" />
                    )}
                    <div className="flex-1">
                      <p className="text-black">
                        {activity.type === "in" ? "Received" : "Dispatched"} {activity.quantity} of {activity.product}
                      </p>
                      <p className="text-xs text-gray-500">
                        {activity.type === "in" ? `from ${activity.farmer}` : `to ${activity.buyer}`} • {activity.time}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
