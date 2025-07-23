import { Download, Eye } from "lucide-react"
import { Button } from "@/components/dashboards/buyer/ui/button"

const receipts = [
  {
    orderId: "ORD-2024-001",
    product: "Premium White Maize",
    date: "2024-01-20",
    amount: "KES 22,500",
    paymentStatus: "Completed",
    paymentMethod: "Wallet",
  },
  {
    orderId: "ORD-2024-002",
    product: "Basmati Rice",
    date: "2024-01-18",
    amount: "KES 24,000",
    paymentStatus: "Completed",
    paymentMethod: "Wallet",
  },
  {
    orderId: "ORD-2024-003",
    product: "Red Kidney Beans",
    date: "2024-01-15",
    amount: "KES 12,750",
    paymentStatus: "Completed",
    paymentMethod: "Wallet",
  },
  {
    orderId: "ORD-2024-004",
    product: "Wheat Flour",
    date: "2024-01-12",
    amount: "KES 19,500",
    paymentStatus: "Completed",
    paymentMethod: "Wallet",
  },
  {
    orderId: "ORD-2024-005",
    product: "Yellow Maize",
    date: "2024-01-10",
    amount: "KES 18,000",
    paymentStatus: "Completed",
    paymentMethod: "Wallet",
  },
]

export default function ReceiptsPayments() {
  return (
    <div className="bg-white rounded-lg border border-gray-200">
      <div className="p-6 border-b border-gray-200">
        <h2 className="text-2xl font-bold text-black">Receipts & Payments</h2>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Order ID
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Product
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Amount</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Payment Status
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {receipts.map((receipt) => (
              <tr key={receipt.orderId} className="hover:bg-gray-50">
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-black">{receipt.orderId}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">{receipt.product}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">{receipt.date}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-[#00A79D]">{receipt.amount}</td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span className="inline-flex px-2 py-1 text-xs font-semibold rounded-full bg-green-100 text-green-800">
                    {receipt.paymentStatus}
                  </span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium space-x-2">
                  <Button size="sm" variant="outline" className="border-[#00A79D] text-[#00A79D] bg-transparent">
                    <Eye className="h-4 w-4 mr-1" />
                    View
                  </Button>
                  <Button size="sm" className="bg-[#00A79D] hover:bg-[#008a7a] text-white">
                    <Download className="h-4 w-4 mr-1" />
                    PDF
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}
