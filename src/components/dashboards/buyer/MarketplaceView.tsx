import { Search, Filter, Star } from "lucide-react"
import { Button } from "@/components/dashboards/buyer/ui/button"
import { Input } from "@/components/dashboards/buyer/ui/input"

const products = [
  {
    id: 1,
    name: "Premium White Maize",
    seller: "Farm Code: F2847",
    region: "Nakuru",
    grade: "Grade A",
    price: "KES 45/kg",
    quantity: "500 kg available",
    certification: "Organic",
    rating: 4.8,
    image: "/placeholder.svg?height=200&width=200",
  },
  {
    id: 2,
    name: "Basmati Rice",
    seller: "Farm Code: F1923",
    region: "Mwea",
    grade: "Premium",
    price: "KES 120/kg",
    quantity: "200 kg available",
    certification: "GAP Certified",
    rating: 4.9,
    image: "/placeholder.svg?height=200&width=200",
  },
  {
    id: 3,
    name: "Red Kidney Beans",
    seller: "Farm Code: F3456",
    region: "Embu",
    grade: "Grade A",
    price: "KES 85/kg",
    quantity: "150 kg available",
    certification: "Fair Trade",
    rating: 4.7,
    image: "/placeholder.svg?height=200&width=200",
  },
  {
    id: 4,
    name: "Wheat Flour",
    seller: "Farm Code: F7891",
    region: "Uasin Gishu",
    grade: "Premium",
    price: "KES 65/kg",
    quantity: "300 kg available",
    certification: "Organic",
    rating: 4.6,
    image: "/placeholder.svg?height=200&width=200",
  },
]

export default function MarketplaceView() {
  return (
    <div className="flex gap-8">
      {/* Filter Panel */}
      <div className="w-80 bg-white p-6 rounded-lg border border-gray-200 h-fit">
        <div className="flex items-center space-x-2 mb-6">
          <Filter className="h-5 w-5 text-[#00A79D]" />
          <h3 className="font-semibold text-black">Filters</h3>
        </div>

        <div className="space-y-6">
          <div>
            <label className="block text-sm font-medium text-black mb-2">Search Products</label>
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
              <Input className="pl-10" placeholder="Search commodities..." />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-black mb-2">Commodity Type</label>
            <select className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#00A79D] focus:border-transparent">
              <option>All Types</option>
              <option>Cereals</option>
              <option>Legumes</option>
              <option>Vegetables</option>
              <option>Fruits</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-black mb-2">Region</label>
            <select className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#00A79D] focus:border-transparent">
              <option>All Regions</option>
              <option>Nakuru</option>
              <option>Mwea</option>
              <option>Embu</option>
              <option>Uasin Gishu</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-black mb-2">Grade</label>
            <select className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#00A79D] focus:border-transparent">
              <option>All Grades</option>
              <option>Premium</option>
              <option>Grade A</option>
              <option>Grade B</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-black mb-2">Certification</label>
            <div className="space-y-2">
              <label className="flex items-center">
                <input type="checkbox" className="mr-2 accent-[#00A79D]" />
                <span className="text-sm">Organic</span>
              </label>
              <label className="flex items-center">
                <input type="checkbox" className="mr-2 accent-[#00A79D]" />
                <span className="text-sm">Fair Trade</span>
              </label>
              <label className="flex items-center">
                <input type="checkbox" className="mr-2 accent-[#00A79D]" />
                <span className="text-sm">GAP Certified</span>
              </label>
            </div>
          </div>
        </div>
      </div>

      {/* Product Grid */}
      <div className="flex-1">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {products.map((product) => (
            <div
              key={product.id}
              className="bg-white rounded-lg border border-gray-200 overflow-hidden hover:shadow-lg transition-shadow"
            >
              <img src={product.image || "/placeholder.svg"} alt={product.name} className="w-full h-48 object-cover" />
              <div className="p-4">
                <div className="flex items-center justify-between mb-2">
                  <h3 className="font-semibold text-black">{product.name}</h3>
                  <div className="flex items-center space-x-1">
                    <Star className="h-4 w-4 text-[#FCB000] fill-current" />
                    <span className="text-sm text-gray-600">{product.rating}</span>
                  </div>
                </div>

                <p className="text-sm text-gray-600 mb-1">{product.seller}</p>
                <p className="text-sm text-gray-600 mb-2">
                  {product.region} • {product.grade}
                </p>

                <div className="flex items-center justify-between mb-3">
                  <span className="text-lg font-bold text-[#00A79D]">{product.price}</span>
                  <span className="text-sm bg-[#78CCD0] bg-opacity-20 px-2 py-1 rounded">{product.certification}</span>
                </div>

                <p className="text-sm text-gray-600 mb-4">{product.quantity}</p>

                <Button className="w-full bg-[#00A79D] hover:bg-[#008a7a] text-white">Buy Now</Button>
              </div>
            </div>
          ))}
        </div>

        {/* No Results Prompt */}
        <div className="mt-12 text-center p-8 bg-white rounded-lg border border-gray-200">
          <p className="text-gray-600 mb-4">Can't find what you need?</p>
          <Button className="bg-[#FCB000] hover:bg-[#e6a600] text-black font-medium">Create a Custom Order</Button>
        </div>
      </div>
    </div>
  )
}
