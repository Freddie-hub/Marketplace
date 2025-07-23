import { Package, DollarSign, Truck, Receipt } from "lucide-react"

const stats = [
  {
    title: "Active Orders",
    value: "12",
    icon: Package,
    color: "text-[#00A79D]",
  },
  {
    title: "Monthly Spend",
    value: "KES 89,450",
    icon: DollarSign,
    color: "text-[#FCB000]",
  },
  {
    title: "In Transit",
    value: "5",
    icon: Truck,
    color: "text-[#78CCD0]",
  },
  {
    title: "Receipts Available",
    value: "28",
    icon: Receipt,
    color: "text-[#00A79D]",
  },
]

export default function OverviewSection() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
      {stats.map((stat, index) => (
        <div key={index} className="bg-white p-6 border-l-4 border-[#78CCD0]">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-600 text-sm font-medium">{stat.title}</p>
              <p className="text-2xl font-bold text-black mt-1">{stat.value}</p>
            </div>
            <stat.icon className={`h-8 w-8 ${stat.color}`} />
          </div>
        </div>
      ))}
    </div>
  )
}
