"use client"

import { useState } from "react"
import { CheckCircle, XCircle, Clock, FileText, AlertTriangle } from "lucide-react"
import { Button } from "@/components/dashboards/admin/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/dashboards/admin/ui/select"

export function VerificationCenter() {
  const [statusFilter, setStatusFilter] = useState("all")

  const verifications = [
    {
      id: 1,
      type: "Organic Certification",
      farmer: "John Kamau",
      product: "Organic Rice",
      status: "Pending",
      submittedDate: "2024-01-15",
      expiryDate: "2025-01-15",
      certificationBody: "KEBS",
      documents: ["certificate.pdf", "inspection_report.pdf"],
    },
    {
      id: 2,
      type: "Quality Grade Certificate",
      farmer: "Mary Wanjiku",
      product: "Premium Coffee",
      status: "Approved",
      submittedDate: "2024-01-10",
      expiryDate: "2024-12-10",
      certificationBody: "Coffee Board of Kenya",
      documents: ["grade_certificate.pdf"],
    },
    {
      id: 3,
      type: "Organic Certification",
      farmer: "Peter Mwangi",
      product: "Organic Avocados",
      status: "Expired",
      submittedDate: "2023-06-01",
      expiryDate: "2024-01-01",
      certificationBody: "Organic Certification Body",
      documents: ["expired_cert.pdf"],
    },
    {
      id: 4,
      type: "Fair Trade Certificate",
      farmer: "Grace Nyong'o",
      product: "Fair Trade Tea",
      status: "Flagged",
      submittedDate: "2024-01-12",
      expiryDate: "2025-06-12",
      certificationBody: "Fair Trade International",
      documents: ["fairtrade_cert.pdf", "audit_report.pdf"],
    },
  ]

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "Approved":
        return <CheckCircle className="w-5 h-5 text-green-600" />
      case "Pending":
        return <Clock className="w-5 h-5 text-yellow-600" />
      case "Expired":
        return <XCircle className="w-5 h-5 text-red-600" />
      case "Flagged":
        return <AlertTriangle className="w-5 h-5 text-orange-600" />
      default:
        return <Clock className="w-5 h-5 text-gray-600" />
    }
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case "Approved":
        return "#00A79D"
      case "Pending":
        return "#FCB000"
      case "Expired":
        return "#BD011F"
      case "Flagged":
        return "#FF990B"
      default:
        return "#000000"
    }
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-bold text-black">Verification Center</h2>
        <div className="flex gap-2">
          <Button variant="outline">Export Report</Button>
          <Button className="bg-black text-white hover:bg-gray-800">Bulk Actions</Button>
        </div>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="bg-white p-4 rounded-lg border border-gray-200">
          <div className="flex items-center gap-3">
            <Clock className="w-8 h-8" style={{ color: "#FCB000" }} />
            <div>
              <p className="text-xl font-bold text-black">23</p>
              <p className="text-sm text-gray-600">Pending Review</p>
            </div>
          </div>
        </div>
        <div className="bg-white p-4 rounded-lg border border-gray-200">
          <div className="flex items-center gap-3">
            <CheckCircle className="w-8 h-8" style={{ color: "#00A79D" }} />
            <div>
              <p className="text-xl font-bold text-black">156</p>
              <p className="text-sm text-gray-600">Approved</p>
            </div>
          </div>
        </div>
        <div className="bg-white p-4 rounded-lg border border-gray-200">
          <div className="flex items-center gap-3">
            <XCircle className="w-8 h-8" style={{ color: "#BD011F" }} />
            <div>
              <p className="text-xl font-bold text-black">12</p>
              <p className="text-sm text-gray-600">Expired</p>
            </div>
          </div>
        </div>
        <div className="bg-white p-4 rounded-lg border border-gray-200">
          <div className="flex items-center gap-3">
            <AlertTriangle className="w-8 h-8" style={{ color: "#FF990B" }} />
            <div>
              <p className="text-xl font-bold text-black">5</p>
              <p className="text-sm text-gray-600">Flagged</p>
            </div>
          </div>
        </div>
      </div>

      {/* Filters */}
      <div className="bg-white p-6 rounded-lg border border-gray-200">
        <div className="flex flex-col md:flex-row gap-4">
          <Select value={statusFilter} onValueChange={setStatusFilter}>
            <SelectTrigger className="w-48">
              <SelectValue placeholder="Filter by status" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Status</SelectItem>
              <SelectItem value="pending">Pending</SelectItem>
              <SelectItem value="approved">Approved</SelectItem>
              <SelectItem value="expired">Expired</SelectItem>
              <SelectItem value="flagged">Flagged</SelectItem>
            </SelectContent>
          </Select>
          <Select>
            <SelectTrigger className="w-48">
              <SelectValue placeholder="Certification Body" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="kebs">KEBS</SelectItem>
              <SelectItem value="organic">Organic Certification Body</SelectItem>
              <SelectItem value="fairtrade">Fair Trade International</SelectItem>
              <SelectItem value="coffee">Coffee Board of Kenya</SelectItem>
            </SelectContent>
          </Select>
          <Select>
            <SelectTrigger className="w-48">
              <SelectValue placeholder="Product Type" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="rice">Rice</SelectItem>
              <SelectItem value="coffee">Coffee</SelectItem>
              <SelectItem value="avocado">Avocado</SelectItem>
              <SelectItem value="tea">Tea</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      {/* Verifications Table */}
      <div className="bg-white rounded-lg border border-gray-200 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50 border-b border-gray-200">
              <tr>
                <th className="text-left p-4 font-medium text-black text-sm">Certification</th>
                <th className="text-left p-4 font-medium text-black text-sm">Farmer</th>
                <th className="text-left p-4 font-medium text-black text-sm">Product</th>
                <th className="text-left p-4 font-medium text-black text-sm">Status</th>
                <th className="text-left p-4 font-medium text-black text-sm">Expiry Date</th>
                <th className="text-left p-4 font-medium text-black text-sm">Actions</th>
              </tr>
            </thead>
            <tbody>
              {verifications
                .filter((verification) => {
                  const matchesStatus =
                    statusFilter === "all" || (verification.status?.toLowerCase() || "") === statusFilter.toLowerCase()
                  return matchesStatus
                })
                .map((verification) => (
                  <tr key={verification.id} className="border-b border-gray-100 hover:bg-gray-50">
                    <td className="p-4">
                      <div>
                        <p className="font-medium text-black">{verification.type || "N/A"}</p>
                        <p className="text-sm text-gray-600">{verification.certificationBody || "N/A"}</p>
                      </div>
                    </td>
                    <td className="p-4">
                      <p className="text-black">{verification.farmer || "N/A"}</p>
                    </td>
                    <td className="p-4">
                      <p className="text-black">{verification.product || "N/A"}</p>
                    </td>
                    <td className="p-4">
                      <div className="flex items-center gap-2">
                        {getStatusIcon(verification.status || "")}
                        <span
                          className="px-3 py-1 rounded-full text-sm font-medium text-white"
                          style={{ backgroundColor: getStatusColor(verification.status || "") }}
                        >
                          {verification.status || "Unknown"}
                        </span>
                      </div>
                    </td>
                    <td className="p-4">
                      <p className="text-black">{verification.expiryDate || "N/A"}</p>
                    </td>
                    <td className="p-4">
                      <div className="flex items-center gap-2">
                        <Button variant="ghost" size="sm">
                          <FileText className="w-4 h-4" />
                        </Button>
                        {verification.status === "Pending" && (
                          <>
                            <Button size="sm" style={{ backgroundColor: "#00A79D" }} className="text-white">
                              Approve
                            </Button>
                            <Button size="sm" variant="outline" className="text-red-600 border-red-600 bg-transparent">
                              Reject
                            </Button>
                          </>
                        )}
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
