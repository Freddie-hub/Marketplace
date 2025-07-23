import { Bell, ChevronDown, Wallet, User } from "lucide-react"
import { Button } from "@/components/dashboards/buyer/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/dashboards/buyer/ui/dropdown-menu"

export default function Header() {
  return (
    <header className="bg-white border-b border-gray-200 px-6 py-4">
      <div className="container mx-auto flex items-center justify-between">
        <h1 className="text-2xl font-bold text-black">Buyer Dashboard</h1>

        <div className="flex items-center space-x-4">
          {/* Wallet Balance */}
          <div className="flex items-center space-x-2 bg-[#78CCD0] bg-opacity-20 px-4 py-2 rounded-lg">
            <Wallet className="h-5 w-5 text-[#00A79D]" />
            <div className="text-sm">
              <div className="font-medium text-black">KES 45,230</div>
              <div className="text-gray-600">USD $312</div>
            </div>
            <div className="flex flex-col space-y-1">
              <Button size="sm" className="bg-[#00A79D] hover:bg-[#008a7a] text-white text-xs px-2 py-1 h-6">
                Top Up
              </Button>
              <Button
                size="sm"
                variant="outline"
                className="border-[#00A79D] text-[#00A79D] text-xs px-2 py-1 h-6 bg-transparent"
              >
                Withdraw
              </Button>
            </div>
          </div>

          {/* Notifications */}
          <Button variant="ghost" size="icon" className="relative">
            <Bell className="h-5 w-5 text-gray-600" />
            <span className="absolute -top-1 -right-1 bg-[#FCB000] text-black text-xs rounded-full h-5 w-5 flex items-center justify-center">
              3
            </span>
          </Button>

          {/* Profile Dropdown */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" className="flex items-center space-x-2">
                <div className="w-8 h-8 bg-[#00A79D] rounded-full flex items-center justify-center">
                  <User className="h-4 w-4 text-white" />
                </div>
                <span className="text-black font-medium">John Buyer</span>
                <ChevronDown className="h-4 w-4 text-gray-600" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-56">
              <DropdownMenuItem>Profile Settings</DropdownMenuItem>
              <DropdownMenuItem>Payment Methods</DropdownMenuItem>
              <DropdownMenuItem>Delivery Addresses</DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem>Help & Support</DropdownMenuItem>
              <DropdownMenuItem className="text-red-600">Sign Out</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
    </header>
  )
}
