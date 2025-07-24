"use client"

import { useState } from "react"
import { Search, Filter, Eye, Download, CreditCard, Clock, CheckCircle } from "lucide-react"
import { Button } from "@/components/dashboards/admin/ui/button"
import { Input } from "@/components/dashboards/admin/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/dashboards/admin/ui/select"

export function Transactions() {
  const [searchTerm, setSearchTerm] = useState("")
  const [statusFilter, setStatusFilter] = useState("all")

  const transactions = [
    {
      id: "TXN-001",
      buyer: "Fresh Foods Ltd",
      seller: "John Kamau",
      product: "Organic Rice",
      amount: "KSh 60,000",
      quantity: "500 kg",
      status: "Completed",
      date: "2024-01-15",
      escrowAmount: "KSh 6,000",
      platformFee: "KSh 1,800",
    },
    {
      id: "TXN-002",
      buyer: "SuperMart Chain",
      seller: "Mary Wanjiku",
      product: "Fair Trade Coffee",
      amount: "KSh 90,000",
      quantity: "200 kg",
      status: "In Escrow",
      date: "2024-01-14",
      escrowAmount: "KSh 90,000",
      platformFee: "KSh 2,700",
    },
    {
      id: "TXN-003",
      buyer: "Local Restaurant",
      seller: "Peter Mwangi",
      product: "Hass Avocados",
      amount: "KSh 80,000",
      quantity: "1000 pieces",
      status: "Pending",
      date: "2024-01-13",
      escrowAmount: "KSh 0",
      platformFee: "KSh 2,400",
    },
    {
      id: "TXN-004",
      buyer: "Export Company",
      seller: "Grace Nyong'o",
      product: "Premium Tea",
      amount: "KSh 150,000",
      quantity: "300 kg",
      status: "Completed",
      date: "2024-01-12",
      escrowAmount: "KSh 0",
      platformFee: "KSh 4,500",
    },
  ]

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "Completed":
        return <CheckCircle className="w-5 h-5 text-green-600" />
      case "In Escrow":
        return <CreditCard className="w-5 h-5 text-blue-600" />
      case "Pending":
        return <Clock className="w-5 h-5 text-yellow-600" />
      default:
        return <Clock className="w-5 h-5 text-gray-600" />
    }
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case "Completed":
        return "#00A79D"
      case "In Escrow":
        return "#205D5A"
      case "Pending":
        return "#FCB000"
      default:
        return "#000000"
    }
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-bold text-black">Transactions</h2>
        <div className="flex gap-2">
          <Button variant="outline" className="flex items-center gap-2 bg-transparent">
            <Download className="w-4 h-4" />
            Export Report
          </Button>
          <Button className="bg-black text-white hover:bg-gray-800">Transaction Analytics</Button>
        </div>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="bg-white p-4 rounded-lg border border-gray-200">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg flex items-center justify-center" style={{ backgroundColor: "#00A79D" }}>
              <CheckCircle className="w-5 h-5 text-white" />
            </div>
            <div>
              <p className="text-xl font-bold text-black">156</p>
              <p className="text-sm text-gray-600">Completed</p>
            </div>
          </div>
        </div>
        <div className="bg-white p-4 rounded-lg border border-gray-200">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg flex items-center justify-center" style={{ backgroundColor: "#205D5A" }}>
              <CreditCard className="w-5 h-5 text-white" />
            </div>
            <div>
              <p className="text-xl font-bold text-black">23</p>
              <p className="text-sm text-gray-600">In Escrow</p>
            </div>
          </div>
        </div>
        <div className="bg-white p-4 rounded-lg border border-gray-200">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg flex items-center justify-center" style={{ backgroundColor: "#FCB000" }}>
              <Clock className="w-5 h-5 text-white" />
            </div>
            <div>
              <p className="text-xl font-bold text-black">12</p>
              <p className="text-sm text-gray-600">Pending</p>
            </div>
          </div>
        </div>
        <div className="bg-white p-4 rounded-lg border border-gray-200">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg flex items-center justify-center" style={{ backgroundColor: "#FF990B" }}>
              <CreditCard className="w-5 h-5 text-white" />
            </div>
            <div>
              <p className="text-xl font-bold text-black">KSh 2.4M</p>
              <p className="text-sm text-gray-600">Total Volume</p>
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
                placeholder="Search by transaction ID, buyer, or seller..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
          </div>
          <Select value={statusFilter} onValueChange={setStatusFilter}>
            <SelectTrigger className="w-48">
              <SelectValue placeholder="Transaction Status" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Status</SelectItem>
              <SelectItem value="completed">Completed</SelectItem>
              <SelectItem value="escrow">In Escrow</SelectItem>
              <SelectItem value="pending">Pending</SelectItem>
            </SelectContent>
          </Select>
          <Select>
            <SelectTrigger className="w-48">
              <SelectValue placeholder="Date Range" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="today">Today</SelectItem>
              <SelectItem value="week">This Week</SelectItem>
              <SelectItem value="month">This Month</SelectItem>
              <SelectItem value="quarter">This Quarter</SelectItem>
            </SelectContent>
          </Select>
          <Button variant="outline" className="flex items-center gap-2 bg-transparent">
            <Filter className="w-4 h-4" />
            More Filters
          </Button>
        </div>
      </div>

      {/* Transactions Table */}
      <div className="bg-white rounded-lg border border-gray-200 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50 border-b border-gray-200">
              <tr>
                <th className="text-left p-4 font-medium text-black text-sm">Transaction ID</th>
                <th className="text-left p-4 font-medium text-black text-sm">Buyer</th>
                <th className="text-left p-4 font-medium text-black text-sm">Seller</th>
                <th className="text-left p-4 font-medium text-black text-sm">Product</th>
                <th className="text-left p-4 font-medium text-black text-sm">Amount</th>
                <th className="text-left p-4 font-medium text-black text-sm">Status</th>
                <th className="text-left p-4 font-medium text-black text-sm">Platform Fee</th>
                <th className="text-left p-4 font-medium text-black text-sm">Actions</th>
              </tr>
            </thead>
            <tbody>
              {transactions
                .filter((transaction) => {
                  const searchLower = (searchTerm || "").toLowerCase()
                  const matchesSearch =
                    !searchTerm ||
                    (transaction.id?.toLowerCase() || "").includes(searchLower) ||
                    (transaction.buyer?.toLowerCase() || "").includes(searchLower) ||
                    (transaction.seller?.toLowerCase() || "").includes(searchLower)
                  const matchesStatus =
                    statusFilter === "all" || (transaction.status?.toLowerCase() || "") === statusFilter.toLowerCase()
                  return matchesSearch && matchesStatus
                })
                .map((transaction) => (
                  <tr key={transaction.id} className="border-b border-gray-100 hover:bg-gray-50">
                    <td className="p-4">
                      <p className="font-medium text-black">{transaction.id || "N/A"}</p>
                      <p className="text-sm text-gray-600">{transaction.date || "N/A"}</p>
                    </td>
                    <td className="p-4">
                      <p className="text-black">{transaction.buyer || "N/A"}</p>
                    </td>
                    <td className="p-4">
                      <p className="text-black">{transaction.seller || "N/A"}</p>
                    </td>
                    <td className="p-4">
                      <div>
                        <p className="font-medium text-black">{transaction.product || "N/A"}</p>
                        <p className="text-sm text-gray-600">{transaction.quantity || "N/A"}</p>
                      </div>
                    </td>
                    <td className="p-4">
                      <p className="font-medium text-black">{transaction.amount || "N/A"}</p>
                    </td>
                    <td className="p-4">
                      <div className="flex items-center gap-2">
                        {getStatusIcon(transaction.status || "")}
                        <span
                          className="px-3 py-1 rounded-full text-sm font-medium text-white"
                          style={{ backgroundColor: getStatusColor(transaction.status || "") }}
                        >
                          {transaction.status || "Unknown"}
                        </span>
                      </div>
                    </td>
                    <td className="p-4">
                      <p className="font-medium text-black">{transaction.platformFee || "N/A"}</p>
                    </td>
                    <td className="p-4">
                      <div className="flex items-center gap-2">
                        <Button variant="ghost" size="sm">
                          <Eye className="w-4 h-4" />
                        </Button>
                        <Button variant="ghost" size="sm">
                          <Download className="w-4 h-4" />
                        </Button>
                      </div>
                    </td>
                  </tr>
                ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}
