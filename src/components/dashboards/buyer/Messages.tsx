import { Send, Paperclip, Search } from "lucide-react"
import { Button } from "@/components/dashboards/buyer/ui/button"
import { Input } from "@/components/dashboards/buyer/ui/input"

const conversations = [
  {
    id: 1,
    farmerCode: "F2847",
    lastMessage: "Your maize order has been packed and ready for shipping.",
    timestamp: "2 hours ago",
    unread: 2,
    orderId: "ORD-2024-001",
  },
  {
    id: 2,
    farmerCode: "F1923",
    lastMessage: "Thank you for your rice order. Quality certificates attached.",
    timestamp: "1 day ago",
    unread: 0,
    orderId: "ORD-2024-002",
  },
  {
    id: 3,
    farmerCode: "F3456",
    lastMessage: "Beans are being processed. Expected completion tomorrow.",
    timestamp: "2 days ago",
    unread: 1,
    orderId: "ORD-2024-003",
  },
]

const messages = [
  {
    id: 1,
    sender: "farmer",
    content: "Hello! Thank you for your maize order. The quality is excellent this season.",
    timestamp: "10:30 AM",
    attachment: null,
  },
  {
    id: 2,
    sender: "buyer",
    content: "Great! When can I expect the delivery?",
    timestamp: "10:35 AM",
    attachment: null,
  },
  {
    id: 3,
    sender: "farmer",
    content: "Your order has been packed and ready for shipping. Expected delivery is January 25th.",
    timestamp: "2:15 PM",
    attachment: "shipping_label.pdf",
  },
]

export default function Messages() {
  return (
    <div className="flex h-[600px] bg-white rounded-lg border border-gray-200 overflow-hidden">
      {/* Conversations List */}
      <div className="w-1/3 border-r border-gray-200">
        <div className="p-4 border-b border-gray-200">
          <h3 className="font-semibold text-black mb-3">Messages</h3>
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
            <Input className="pl-10" placeholder="Search conversations..." />
          </div>
        </div>

        <div className="overflow-y-auto">
          {conversations.map((conversation) => (
            <div key={conversation.id} className="p-4 border-b border-gray-100 hover:bg-gray-50 cursor-pointer">
              <div className="flex items-center justify-between mb-2">
                <span className="font-medium text-black">Farm Code: {conversation.farmerCode}</span>
                {conversation.unread > 0 && (
                  <span className="bg-[#FCB000] text-black text-xs rounded-full px-2 py-1">{conversation.unread}</span>
                )}
              </div>
              <p className="text-sm text-gray-600 mb-1 line-clamp-2">{conversation.lastMessage}</p>
              <div className="flex items-center justify-between text-xs text-gray-500">
                <span>{conversation.orderId}</span>
                <span>{conversation.timestamp}</span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Chat Area */}
      <div className="flex-1 flex flex-col">
        {/* Chat Header */}
        <div className="p-4 border-b border-gray-200">
          <div className="flex items-center justify-between">
            <div>
              <h4 className="font-semibold text-black">Farm Code: F2847</h4>
              <p className="text-sm text-gray-600">Order: ORD-2024-001</p>
            </div>
            <div className="w-8 h-8 bg-[#00A79D] rounded-full flex items-center justify-center">
              <span className="text-white text-sm font-medium">F</span>
            </div>
          </div>
        </div>

        {/* Messages */}
        <div className="flex-1 overflow-y-auto p-4 space-y-4">
          {messages.map((message) => (
            <div key={message.id} className={`flex ${message.sender === "buyer" ? "justify-end" : "justify-start"}`}>
              <div
                className={`max-w-xs lg:max-w-md px-4 py-2 rounded-lg ${
                  message.sender === "buyer" ? "bg-[#00A79D] text-white" : "bg-gray-100 text-black"
                }`}
              >
                <p className="text-sm">{message.content}</p>
                {message.attachment && (
                  <div className="mt-2 p-2 bg-white bg-opacity-20 rounded text-xs">
                    <Paperclip className="h-3 w-3 inline mr-1" />
                    {message.attachment}
                  </div>
                )}
                <p
                  className={`text-xs mt-1 ${
                    message.sender === "buyer" ? "text-white text-opacity-70" : "text-gray-500"
                  }`}
                >
                  {message.timestamp}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* Message Input */}
        <div className="p-4 border-t border-gray-200">
          <div className="flex items-center space-x-2">
            <Button variant="outline" size="icon">
              <Paperclip className="h-4 w-4" />
            </Button>
            <Input className="flex-1" placeholder="Type your message..." />
            <Button className="bg-[#00A79D] hover:bg-[#008a7a] text-white">
              <Send className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}
