"use client"

import { useState } from "react"
import { Search, MessageSquare, Flag, Eye, Filter } from "lucide-react"
import { Button } from "@/components/dashboards/admin/ui/button"
import { Input } from "@/components/dashboards/admin/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/dashboards/admin/ui/select"

export function MessagingLogs() {
  const [searchTerm, setSearchTerm] = useState("")
  const [statusFilter, setStatusFilter] = useState("all")

  const messageThreads = [
    {
      id: "MSG-001",
      transactionId: "TXN-001",
      buyer: "Fresh Foods Ltd",
      seller: "John Kamau",
      product: "Organic Rice",
      messageCount: 12,
      lastMessage: "Delivery confirmed, thank you!",
      lastActivity: "2 hours ago",
      status: "Active",
      flagged: false,
    },
    {
      id: "MSG-002",
      transactionId: "TXN-002",
      buyer: "SuperMart Chain",
      seller: "Mary Wanjiku",
      product: "Fair Trade Coffee",
      messageCount: 8,
      lastMessage: "When can we schedule pickup?",
      lastActivity: "4 hours ago",
      status: "Active",
      flagged: false,
    },
    {
      id: "MSG-003",
      transactionId: "TXN-003",
      buyer: "Local Restaurant",
      seller: "Peter Mwangi",
      product: "Hass Avocados",
      messageCount: 15,
      lastMessage: "Quality looks great, proceeding with order",
      lastActivity: "1 day ago",
      status: "Closed",
      flagged: false,
    },
    {
      id: "MSG-004",
      transactionId: "TXN-004",
      buyer: "Export Company",
      seller: "Grace Nyong'o",
      product: "Premium Tea",
      messageCount: 23,
      lastMessage: "This is unacceptable quality!",
      lastActivity: "3 hours ago",
      status: "Active",
      flagged: true,
    },
  ]

  const getStatusColor = (status: string) => {
    switch (status) {
      case "Active":
        return "#00A79D"
      case "Closed":
        return "#205D5A"
      case "Flagged":
        return "#BD011F"
      default:
        return "#000000"
    }
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-bold text-black">Messaging Logs</h2>
        <div className="flex gap-2">
          <Button variant="outline">Export Logs</Button>
          <Button className="bg-black text-white hover:bg-gray-800">Moderation Tools</Button>
        </div>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="bg-white p-4 rounded-lg border border-gray-200">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg flex items-center justify-center" style={{ backgroundColor: "#00A79D" }}>
              <MessageSquare className="w-5 h-5 text-white" />
            </div>
            <div>
              <p className="text-xl font-bold text-black">1,234</p>
              <p className="text-sm text-gray-600">Total Threads</p>
            </div>
          </div>
        </div>
        <div className="bg-white p-4 rounded-lg border border-gray-200">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg flex items-center justify-center" style={{ backgroundColor: "#FCB000" }}>
              <MessageSquare className="w-5 h-5 text-white" />
            </div>
            <div>
              <p className="text-xl font-bold text-black">89</p>
              <p className="text-sm text-gray-600">Active Threads</p>
            </div>
          </div>
        </div>
        <div className="bg-white p-4 rounded-lg border border-gray-200">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg flex items-center justify-center" style={{ backgroundColor: "#BD011F" }}>
              <Flag className="w-5 h-5 text-white" />
            </div>
            <div>
              <p className="text-xl font-bold text-black">5</p>
              <p className="text-sm text-gray-600">Flagged</p>
            </div>
          </div>
        </div>
        <div className="bg-white p-4 rounded-lg border border-gray-200">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg flex items-center justify-center" style={{ backgroundColor: "#FF990B" }}>
              <MessageSquare className="w-5 h-5 text-white" />
            </div>
            <div>
              <p className="text-xl font-bold text-black">12,456</p>
              <p className="text-sm text-gray-600">Total Messages</p>
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
              <SelectValue placeholder="Thread Status" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Status</SelectItem>
              <SelectItem value="active">Active</SelectItem>
              <SelectItem value="closed">Closed</SelectItem>
              <SelectItem value="flagged">Flagged</SelectItem>
            </SelectContent>
          </Select>
          <Select>
            <SelectTrigger className="w-48">
              <SelectValue placeholder="Time Period" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="today">Today</SelectItem>
              <SelectItem value="week">This Week</SelectItem>
              <SelectItem value="month">This Month</SelectItem>
            </SelectContent>
          </Select>
          <Button variant="outline" className="flex items-center gap-2 bg-transparent">
            <Filter className="w-4 h-4" />
            More Filters
          </Button>
        </div>
      </div>

      {/* Message Threads Table */}
      <div className="bg-white rounded-lg border border-gray-200 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50 border-b border-gray-200">
              <tr>
                <th className="text-left p-4 font-medium text-black text-sm">Thread ID</th>
                <th className="text-left p-4 font-medium text-black text-sm">Transaction</th>
                <th className="text-left p-4 font-medium text-black text-sm">Participants</th>
                <th className="text-left p-4 font-medium text-black text-sm">Product</th>
                <th className="text-left p-4 font-medium text-black text-sm">Messages</th>
                <th className="text-left p-4 font-medium text-black text-sm">Last Activity</th>
                <th className="text-left p-4 font-medium text-black text-sm">Status</th>
                <th className="text-left p-4 font-medium text-black text-sm">Actions</th>
              </tr>
            </thead>
            <tbody>
              {messageThreads
                .filter((thread) => {
                  const searchLower = (searchTerm || "").toLowerCase()
                  const matchesSearch =
                    !searchTerm ||
                    (thread.id?.toLowerCase() || "").includes(searchLower) ||
                    (thread.buyer?.toLowerCase() || "").includes(searchLower) ||
                    (thread.seller?.toLowerCase() || "").includes(searchLower) ||
                    (thread.transactionId?.toLowerCase() || "").includes(searchLower)
                  const matchesStatus =
                    statusFilter === "all" || (thread.status?.toLowerCase() || "") === statusFilter.toLowerCase()
                  return matchesSearch && matchesStatus
                })
                .map((thread) => (
                  <tr key={thread.id} className="border-b border-gray-100 hover:bg-gray-50">
                    <td className="p-4">
                      <div className="flex items-center gap-2">
                        <p className="font-medium text-black">{thread.id || "N/A"}</p>
                        {thread.flagged && <Flag className="w-4 h-4 text-red-600" />}
                      </div>
                    </td>
                    <td className="p-4">
                      <p className="text-black">{thread.transactionId || "N/A"}</p>
                    </td>
                    <td className="p-4">
                      <div>
                        <p className="font-medium text-black">{thread.buyer || "N/A"}</p>
                        <p className="text-sm text-gray-600">↔ {thread.seller || "N/A"}</p>
                      </div>
                    </td>
                    <td className="p-4">
                      <p className="text-black">{thread.product || "N/A"}</p>
                    </td>
                    <td className="p-4">
                      <div className="text-center">
                        <p className="font-medium text-black">{thread.messageCount || 0}</p>
                        <p className="text-xs text-gray-600">messages</p>
                      </div>
                    </td>
                    <td className="p-4">
                      <div>
                        <p className="text-sm text-black">{(thread.lastMessage || "").substring(0, 30)}...</p>
                        <p className="text-xs text-gray-600">{thread.lastActivity || "N/A"}</p>
                      </div>
                    </td>
                    <td className="p-4">
                      <span
                        className="px-3 py-1 rounded-full text-sm font-medium text-white"
                        style={{ backgroundColor: getStatusColor(thread.status || "") }}
                      >
                        {thread.status || "Unknown"}
                      </span>
                    </td>
                    <td className="p-4">
                      <div className="flex items-center gap-2">
                        <Button variant="ghost" size="sm">
                          <Eye className="w-4 h-4" />
                        </Button>
                        <Button variant="ghost" size="sm">
                          <Flag className="w-4 h-4" />
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
