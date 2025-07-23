import { TrendingUp, DollarSign, ShoppingCart, Wallet } from "lucide-react"

const monthlyData = [
  { month: "Jan", spend: 45000, orders: 12 },
  { month: "Feb", spend: 52000, orders: 15 },
  { month: "Mar", spend: 38000, orders: 9 },
  { month: "Apr", spend: 61000, orders: 18 },
  { month: "May", spend: 48000, orders: 14 },
  { month: "Jun", spend: 55000, orders: 16 },
]

const topCrops = [
  { name: "Maize", percentage: 35, amount: "KES 156,000" },
  { name: "Rice", percentage: 28, amount: "KES 124,800" },
  { name: "Beans", percentage: 20, amount: "KES 89,000" },
  { name: "Wheat", percentage: 17, amount: "KES 75,650" },
]

export default function BuyerAnalytics() {
  return (
    <div className="space-y-8">
      <h2 className="text-2xl font-bold text-black">Buyer Analytics</h2>

      {/* Key Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="bg-white p-6 rounded-lg border border-gray-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-600 text-sm">Total Spent (6 months)</p>
              <p className="text-2xl font-bold text-[#FCB000]">KES 445,450</p>
            </div>
            <DollarSign className="h-8 w-8 text-[#FCB000]" />
          </div>
        </div>

        <div className="bg-white p-6 rounded-lg border border-gray-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-600 text-sm">Total Orders</p>
              <p className="text-2xl font-bold text-[#00A79D]">84</p>
            </div>
            <ShoppingCart className="h-8 w-8 text-[#00A79D]" />
          </div>
        </div>

        <div className="bg-white p-6 rounded-lg border border-gray-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-600 text-sm">Avg Order Value</p>
              <p className="text-2xl font-bold text-[#78CCD0]">KES 5,303</p>
            </div>
            <TrendingUp className="h-8 w-8 text-[#78CCD0]" />
          </div>
        </div>

        <div className="bg-white p-6 rounded-lg border border-gray-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-600 text-sm">Wallet Usage</p>
              <p className="text-2xl font-bold text-[#00A79D]">98.5%</p>
            </div>
            <Wallet className="h-8 w-8 text-[#00A79D]" />
          </div>
        </div>
      </div>

      {/* Monthly Spending Chart */}
      <div className="bg-white p-6 rounded-lg border border-gray-200">
        <h3 className="text-lg font-semibold text-black mb-6">Monthly Spending Trend</h3>
        <div className="flex items-end space-x-4 h-64">
          {monthlyData.map((data, index) => (
            <div key={index} className="flex-1 flex flex-col items-center">
              <div className="w-full bg-gray-200 rounded-t relative" style={{ height: "200px" }}>
                <div
                  className="w-full bg-[#00A79D] rounded-t absolute bottom-0"
                  style={{ height: `${(data.spend / 70000) * 100}%` }}
                ></div>
              </div>
              <div className="mt-2 text-center">
                <p className="text-xs font-medium text-black">{data.month}</p>
                <p className="text-xs text-gray-600">KES {data.spend.toLocaleString()}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Top Purchased Crops */}
      <div className="bg-white p-6 rounded-lg border border-gray-200">
        <h3 className="text-lg font-semibold text-black mb-6">Top Purchased Crops</h3>
        <div className="space-y-4">
          {topCrops.map((crop, index) => (
            <div key={index} className="flex items-center justify-between">
              <div className="flex items-center space-x-4 flex-1">
                <span className="font-medium text-black w-16">{crop.name}</span>
                <div className="flex-1 bg-gray-200 rounded-full h-3">
                  <div className="bg-[#FABFFF] h-3 rounded-full" style={{ width: `${crop.percentage}%` }}></div>
                </div>
                <span className="text-sm text-gray-600 w-12">{crop.percentage}%</span>
              </div>
              <span className="font-medium text-[#00A79D] ml-4">{crop.amount}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Wallet Usage Breakdown */}
      <div className="bg-white p-6 rounded-lg border border-gray-200">
        <h3 className="text-lg font-semibold text-black mb-6">Wallet Usage</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="text-center">
            <div className="w-20 h-20 bg-[#78CCD0] rounded-full flex items-center justify-center mx-auto mb-3">
              <span className="text-white font-bold text-lg">98.5%</span>
            </div>
            <p className="font-medium text-black">Wallet Payments</p>
            <p className="text-sm text-gray-600">KES 438,668</p>
          </div>

          <div className="text-center">
            <div className="w-20 h-20 bg-gray-300 rounded-full flex items-center justify-center mx-auto mb-3">
              <span className="text-gray-600 font-bold text-lg">1.5%</span>
            </div>
            <p className="font-medium text-black">Direct Payments</p>
            <p className="text-sm text-gray-600">KES 6,782</p>
          </div>

          <div className="text-center">
            <div className="w-20 h-20 bg-[#FCB000] rounded-full flex items-center justify-center mx-auto mb-3">
              <span className="text-black font-bold text-lg">12</span>
            </div>
            <p className="font-medium text-black">Top-ups This Month</p>
            <p className="text-sm text-gray-600">KES 85,000</p>
          </div>
        </div>
      </div>
    </div>
  )
}
