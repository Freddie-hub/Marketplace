"use client"

import { useState } from "react"
import { Search, Filter, Eye, Flag, CheckCircle, DollarSign } from "lucide-react"
import { Button } from "@/components/dashboards/admin/ui/button"
import { Input } from "@/components/dashboards/admin/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/dashboards/admin/ui/select"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/dashboards/admin/ui/dialog"
import { Label } from "@/components/dashboards/admin/ui/label"

export function ProductOversight() {
  const [searchTerm, setSearchTerm] = useState("")
  const [productFilter, setProductFilter] = useState("all")
  const [minPrice, setMinPrice] = useState("")
  const [maxPrice, setMaxPrice] = useState("")

  const products = [
    {
      id: 1,
      name: "Premium Organic Rice",
      farmer: "John Kamau",
      type: "Rice",
      grade: "Grade A",
      price: "KSh 120/kg",
      quantity: "500 kg",
      certification: "Organic",
      warehouse: "Nairobi Central",
      status: "Available",
      listedDate: "2024-01-15",
    },
    {
      id: 2,
      name: "Fair Trade Coffee Beans",
      farmer: "Mary Wanjiku",
      type: "Coffee",
      grade: "AA",
      price: "KSh 450/kg",
      quantity: "200 kg",
      certification: "Fair Trade",
      warehouse: "Kiambu Storage",
      status: "Reserved",
      listedDate: "2024-01-14",
    },
    {
      id: 3,
      name: "Fresh Hass Avocados",
      farmer: "Peter Mwangi",
      type: "Avocado",
      grade: "Premium",
      price: "KSh 80/piece",
      quantity: "1000 pieces",
      certification: "Organic",
      warehouse: "Murang'a Hub",
      status: "Sold",
      listedDate: "2024-01-12",
    },
    {
      id: 4,
      name: "Sweet Potatoes",
      farmer: "Grace Nyong'o",
      type: "Potatoes",
      grade: "Grade B",
      price: "KSh 45/kg",
      quantity: "800 kg",
      certification: "None",
      warehouse: "Nakuru Depot",
      status: "Available",
      listedDate: "2024-01-13",
    },
  ]

  const getStatusColor = (status: string) => {
    switch (status) {
      case "Available":
        return "#00A79D"
      case "Reserved":
        return "#FCB000"
      case "Sold":
        return "#205D5A"
      default:
        return "#000000"
    }
  }

  const getCertificationColor = (certification: string) => {
    switch (certification) {
      case "Organic":
        return "#00A79D"
      case "Fair Trade":
        return "#FF990B"
      case "KEBS":
        return "#205D5A"
      case "None":
        return "#BD011F"
      default:
        return "#000000"
    }
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-bold text-black">Product Oversight</h2>
        <div className="flex gap-2">
          <Dialog>
            <DialogTrigger asChild>
              <Button variant="outline" className="flex items-center gap-2 bg-transparent">
                <DollarSign className="w-4 h-4" />
                Set Price Limits
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px]">
              <DialogHeader>
                <DialogTitle>Set Product Price Limits</DialogTitle>
                <DialogDescription>Configure minimum and maximum price limits for product listings.</DialogDescription>
              </DialogHeader>
              <div className="grid gap-4 py-4">
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="product-type" className="text-right">
                    Product Type
                  </Label>
                  <Select>
                    <SelectTrigger className="col-span-3">
                      <SelectValue placeholder="Select product type" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="rice">Rice</SelectItem>
                      <SelectItem value="coffee">Coffee</SelectItem>
                      <SelectItem value="avocado">Avocado</SelectItem>
                      <SelectItem value="potatoes">Potatoes</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="min-price" className="text-right">
                    Min Price (KSh)
                  </Label>
                  <Input
                    id="min-price"
                    value={minPrice}
                    onChange={(e) => setMinPrice(e.target.value)}
                    className="col-span-3"
                    placeholder="0"
                  />
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="max-price" className="text-right">
                    Max Price (KSh)
                  </Label>
                  <Input
                    id="max-price"
                    value={maxPrice}
                    onChange={(e) => setMaxPrice(e.target.value)}
                    className="col-span-3"
                    placeholder="1000"
                  />
                </div>
              </div>
              <DialogFooter>
                <Button type="submit" className="bg-black text-white hover:bg-gray-800">
                  Save Price Limits
                </Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
          <Button variant="outline">Export Data</Button>
          <Button className="bg-black text-white hover:bg-gray-800">Bulk Actions</Button>
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
              <p className="text-xl font-bold text-black">342</p>
              <p className="text-xs text-gray-600">Total Listings</p>
            </div>
          </div>
        </div>
        <div className="bg-white p-4 rounded-lg border border-gray-200">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg flex items-center justify-center" style={{ backgroundColor: "#FCB000" }}>
              <Eye className="w-5 h-5 text-white" />
            </div>
            <div>
              <p className="text-xl font-bold text-black">89</p>
              <p className="text-xs text-gray-600">Available Today</p>
            </div>
          </div>
        </div>
        <div className="bg-white p-4 rounded-lg border border-gray-200">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg flex items-center justify-center" style={{ backgroundColor: "#FF990B" }}>
              <Flag className="w-5 h-5 text-white" />
            </div>
            <div>
              <p className="text-xl font-bold text-black">23</p>
              <p className="text-xs text-gray-600">Reserved</p>
            </div>
          </div>
        </div>
        <div className="bg-white p-4 rounded-lg border border-gray-200">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg flex items-center justify-center" style={{ backgroundColor: "#205D5A" }}>
              <CheckCircle className="w-5 h-5 text-white" />
            </div>
            <div>
              <p className="text-xl font-bold text-black">156</p>
              <p className="text-xs text-gray-600">Sold This Week</p>
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
                placeholder="Search products by name or farmer..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
          </div>
          <Select value={productFilter} onValueChange={setProductFilter}>
            <SelectTrigger className="w-48">
              <SelectValue placeholder="Product Type" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Products</SelectItem>
              <SelectItem value="rice">Rice</SelectItem>
              <SelectItem value="coffee">Coffee</SelectItem>
              <SelectItem value="avocado">Avocado</SelectItem>
              <SelectItem value="potatoes">Potatoes</SelectItem>
            </SelectContent>
          </Select>
          <Select>
            <SelectTrigger className="w-48">
              <SelectValue placeholder="Grade" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Grades</SelectItem>
              <SelectItem value="a">Grade A</SelectItem>
              <SelectItem value="aa">Grade AA</SelectItem>
              <SelectItem value="b">Grade B</SelectItem>
              <SelectItem value="premium">Premium</SelectItem>
            </SelectContent>
          </Select>
          <Button variant="outline" className="flex items-center gap-2 bg-transparent">
            <Filter className="w-4 h-4" />
            More Filters
          </Button>
        </div>
      </div>

      {/* Products Table */}
      <div className="bg-white rounded-lg border border-gray-200 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50 border-b border-gray-200">
              <tr>
                <th className="text-left p-4 font-medium text-black text-sm">Product</th>
                <th className="text-left p-4 font-medium text-black text-sm">Farmer</th>
                <th className="text-left p-4 font-medium text-black text-sm">Grade</th>
                <th className="text-left p-4 font-medium text-black text-sm">Price</th>
                <th className="text-left p-4 font-medium text-black text-sm">Quantity</th>
                <th className="text-left p-4 font-medium text-black text-sm">Certification</th>
                <th className="text-left p-4 font-medium text-black text-sm">Status</th>
                <th className="text-left p-4 font-medium text-black text-sm">Actions</th>
              </tr>
            </thead>
            <tbody>
              {products
                .filter((product) => {
                  const searchLower = (searchTerm || "").toLowerCase()
                  const matchesSearch =
                    !searchTerm ||
                    (product.name?.toLowerCase() || "").includes(searchLower) ||
                    (product.farmer?.toLowerCase() || "").includes(searchLower)
                  const matchesProduct =
                    productFilter === "all" || (product.type?.toLowerCase() || "") === productFilter.toLowerCase()
                  return matchesSearch && matchesProduct
                })
                .map((product) => (
                  <tr key={product.id} className="border-b border-gray-100 hover:bg-gray-50">
                    <td className="p-4">
                      <div>
                        <p className="font-medium text-black text-sm">{product.name || "N/A"}</p>
                        <p className="text-xs text-gray-600">{product.type || "N/A"}</p>
                      </div>
                    </td>
                    <td className="p-4">
                      <p className="text-sm text-black">{product.farmer || "N/A"}</p>
                    </td>
                    <td className="p-4">
                      <span className="px-2 py-1 rounded-full text-xs font-medium bg-gray-100 text-black">
                        {product.grade || "N/A"}
                      </span>
                    </td>
                    <td className="p-4">
                      <p className="font-medium text-black text-sm">{product.price || "N/A"}</p>
                    </td>
                    <td className="p-4">
                      <p className="text-sm text-black">{product.quantity || "N/A"}</p>
                    </td>
                    <td className="p-4">
                      <span
                        className="px-2 py-1 rounded-full text-xs font-medium text-white"
                        style={{ backgroundColor: getCertificationColor(product.certification || "") }}
                      >
                        {product.certification || "None"}
                      </span>
                    </td>
                    <td className="p-4">
                      <span
                        className="px-2 py-1 rounded-full text-xs font-medium text-white"
                        style={{ backgroundColor: getStatusColor(product.status || "") }}
                      >
                        {product.status || "Unknown"}
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
