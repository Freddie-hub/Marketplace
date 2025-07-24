"use client"

import { useState } from "react"
import { Search, Filter, MoreHorizontal, Eye, UserCheck, UserX, User, Edit, Key, Ban } from "lucide-react"
import { Button } from "@/components/dashboards/admin/ui/button"
import { Input } from "@/components/dashboards/admin/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/dashboards/admin/ui/select"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/dashboards/admin/ui/dropdown-menu"

export function UserManagement() {
  const [searchTerm, setSearchTerm] = useState("")
  const [roleFilter, setRoleFilter] = useState("all")

  const users = [
    {
      id: 1,
      name: "John Kamau",
      email: "john@example.com",
      role: "Farmer",
      status: "Active",
      verified: true,
      location: "Nairobi",
    },
    {
      id: 2,
      name: "Fresh Foods Ltd",
      email: "contact@freshfoods.com",
      role: "Buyer",
      status: "Active",
      verified: true,
      location: "Mombasa",
    },
    {
      id: 3,
      name: "Nairobi Warehouse",
      email: "info@nrbwarehouse.com",
      role: "Warehouseman",
      status: "Pending",
      verified: false,
      location: "Nairobi",
    },
    {
      id: 4,
      name: "Mary Wanjiku",
      email: "mary@example.com",
      role: "Farmer",
      status: "Active",
      verified: true,
      location: "Kiambu",
    },
    {
      id: 5,
      name: "AgriMill Co.",
      email: "ops@agrimill.com",
      role: "Miller",
      status: "Active",
      verified: true,
      location: "Nakuru",
    },
  ]

  const getRoleColor = (role: string) => {
    switch (role) {
      case "Farmer":
        return "#00A79D"
      case "Buyer":
        return "#FF990B"
      case "Warehouseman":
        return "#205D5A"
      case "Miller":
        return "#FCB000"
      default:
        return "#000000"
    }
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case "Active":
        return "#00A79D"
      case "Pending":
        return "#FCB000"
      case "Inactive":
        return "#BD011F"
      default:
        return "#000000"
    }
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-bold text-black">User Management</h2>
        <Button className="bg-black text-white hover:bg-gray-800">Add New User</Button>
      </div>

      {/* Filters */}
      <div className="bg-white p-6 rounded-lg border border-gray-200">
        <div className="flex flex-col md:flex-row gap-4">
          <div className="flex-1">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
              <Input
                placeholder="Search users by name or email..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
          </div>
          <Select value={roleFilter} onValueChange={setRoleFilter}>
            <SelectTrigger className="w-48">
              <SelectValue placeholder="Filter by role" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Roles</SelectItem>
              <SelectItem value="farmer">Farmer</SelectItem>
              <SelectItem value="buyer">Buyer</SelectItem>
              <SelectItem value="warehouseman">Warehouseman</SelectItem>
              <SelectItem value="miller">Miller</SelectItem>
            </SelectContent>
          </Select>
          <Button variant="outline" className="flex items-center gap-2 bg-transparent">
            <Filter className="w-4 h-4" />
            More Filters
          </Button>
        </div>
      </div>

      {/* Users Table */}
      <div className="bg-white rounded-lg border border-gray-200 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50 border-b border-gray-200">
              <tr>
                <th className="text-left p-4 font-medium text-black text-sm">User</th>
                <th className="text-left p-4 font-medium text-black text-sm">Role</th>
                <th className="text-left p-4 font-medium text-black text-sm">Status</th>
                <th className="text-left p-4 font-medium text-black text-sm">Verified</th>
                <th className="text-left p-4 font-medium text-black text-sm">Location</th>
                <th className="text-left p-4 font-medium text-black text-sm">Actions</th>
              </tr>
            </thead>
            <tbody>
              {users
                .filter((user) => {
                  const searchLower = (searchTerm || "").toLowerCase()
                  const matchesSearch =
                    !searchTerm ||
                    (user.name?.toLowerCase() || "").includes(searchLower) ||
                    (user.email?.toLowerCase() || "").includes(searchLower)
                  const matchesRole =
                    roleFilter === "all" || (user.role?.toLowerCase() || "") === roleFilter.toLowerCase()
                  return matchesSearch && matchesRole
                })
                .map((user) => (
                  <tr key={user.id} className="border-b border-gray-100 hover:bg-gray-50">
                    <td className="p-4">
                      <div>
                        <p className="font-medium text-black text-sm">{user.name || "N/A"}</p>
                        <p className="text-xs text-gray-600">{user.email || "N/A"}</p>
                      </div>
                    </td>
                    <td className="p-4">
                      <span
                        className="px-2 py-1 rounded-full text-xs font-medium text-white"
                        style={{ backgroundColor: getRoleColor(user.role || "") }}
                      >
                        {user.role || "Unknown"}
                      </span>
                    </td>
                    <td className="p-4">
                      <span
                        className="px-2 py-1 rounded-full text-xs font-medium text-white"
                        style={{ backgroundColor: getStatusColor(user.status || "") }}
                      >
                        {user.status || "Unknown"}
                      </span>
                    </td>
                    <td className="p-4">
                      {user.verified ? (
                        <UserCheck className="w-4 h-4 text-green-600" />
                      ) : (
                        <UserX className="w-4 h-4 text-red-600" />
                      )}
                    </td>
                    <td className="p-4">
                      <span className="text-sm text-gray-600">{user.location || "N/A"}</span>
                    </td>
                    <td className="p-4">
                      <div className="flex items-center gap-2">
                        <Button variant="ghost" size="sm">
                          <Eye className="w-4 h-4" />
                        </Button>
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button variant="ghost" size="sm">
                              <MoreHorizontal className="w-4 h-4" />
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="end" className="w-48">
                            <DropdownMenuItem className="flex items-center gap-2">
                              <User className="w-4 h-4" />
                              View Profile
                            </DropdownMenuItem>
                            <DropdownMenuItem className="flex items-center gap-2">
                              <Edit className="w-4 h-4" />
                              Edit Details
                            </DropdownMenuItem>
                            <DropdownMenuItem className="flex items-center gap-2">
                              <Key className="w-4 h-4" />
                              Reset Password
                            </DropdownMenuItem>
                            <DropdownMenuSeparator />
                            <DropdownMenuItem className="flex items-center gap-2 text-red-600">
                              <Ban className="w-4 h-4" />
                              Suspend Account
                            </DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
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
