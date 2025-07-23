import { CheckCircle, Truck, Package } from "lucide-react"

const orders = [
  {
    id: "ORD-2024-001",
    product: "Premium White Maize",
    seller: "Farm Code: F2847",
    status: "shipped",
    expectedDelivery: "2024-01-25",
    progress: [
      { step: "Ordered", completed: true, icon: CheckCircle },
      { step: "Packed", completed: true, icon: Package },
      { step: "Shipped", completed: true, icon: Truck },
      { step: "Delivered", completed: false, icon: CheckCircle },
    ],
  },
  {
    id: "ORD-2024-002",
    product: "Basmati Rice",
    seller: "Farm Code: F1923",
    status: "packed",
    expectedDelivery: "2024-01-28",
    progress: [
      { step: "Ordered", completed: true, icon: CheckCircle },
      { step: "Packed", completed: true, icon: Package },
      { step: "Shipped", completed: false, icon: Truck },
      { step: "Delivered", completed: false, icon: CheckCircle },
    ],
  },
  {
    id: "ORD-2024-003",
    product: "Red Kidney Beans",
    seller: "Farm Code: F3456",
    status: "ordered",
    expectedDelivery: "2024-01-30",
    progress: [
      { step: "Ordered", completed: true, icon: CheckCircle },
      { step: "Packed", completed: false, icon: Package },
      { step: "Shipped", completed: false, icon: Truck },
      { step: "Delivered", completed: false, icon: CheckCircle },
    ],
  },
]

export default function OrderTracking() {
  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold text-black">Order Tracking</h2>

      {orders.map((order) => (
        <div key={order.id} className="bg-white p-6 rounded-lg border border-gray-200">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h3 className="font-semibold text-black">{order.product}</h3>
              <p className="text-sm text-gray-600">
                {order.id} • {order.seller}
              </p>
            </div>
            <div className="text-right">
              <p className="text-sm text-gray-600">Expected Delivery</p>
              <p className="font-medium text-black">{order.expectedDelivery}</p>
            </div>
          </div>

          <div className="flex items-center justify-between">
            {order.progress.map((step, index) => (
              <div key={index} className="flex flex-col items-center flex-1">
                <div
                  className={`w-10 h-10 rounded-full flex items-center justify-center mb-2 ${
                    step.completed
                      ? "bg-[#00A79D] text-white"
                      : index === order.progress.findIndex((s) => !s.completed)
                        ? "bg-[#78CCD0] text-white"
                        : "bg-gray-200 text-gray-400"
                  }`}
                >
                  <step.icon className="h-5 w-5" />
                </div>
                <span
                  className={`text-xs font-medium ${
                    step.completed
                      ? "text-[#00A79D]"
                      : index === order.progress.findIndex((s) => !s.completed)
                        ? "text-[#78CCD0]"
                        : "text-gray-400"
                  }`}
                >
                  {step.step}
                </span>
                {index < order.progress.length - 1 && (
                  <div
                    className={`absolute h-0.5 w-full mt-5 ${step.completed ? "bg-[#00A79D]" : "bg-gray-200"}`}
                    style={{ left: "50%", width: "calc(100% - 2.5rem)" }}
                  />
                )}
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  )
}
