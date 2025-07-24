"use client"

import { Wallet, TrendingUp, TrendingDown, DollarSign, CreditCard } from "lucide-react"
import { Button } from "@/components/dashboards/admin/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/dashboards/admin/ui/select"

export function WalletOverview() {
  const walletData = [
    {
      type: "Buyer Wallets",
      totalBalance: "KSh 2,450,000",
      activeWallets: 1923,
      avgBalance: "KSh 1,274",
      trend: "up",
      change: "+12.5%",
    },
    {
      type: "Seller Wallets",
      totalBalance: "KSh 1,890,000",
      activeWallets: 2847,
      avgBalance: "KSh 664",
      trend: "up",
      change: "+8.3%",
    },
    {
      type: "Escrow Account",
      totalBalance: "KSh 340,000",
      activeTransactions: 23,
      avgAmount: "KSh 14,783",
      trend: "down",
      change: "-5.2%",
    },
    {
      type: "Platform Commission",
      totalEarnings: "KSh 126,000",
      thisMonth: "KSh 45,600",
      avgCommission: "3%",
      trend: "up",
      change: "+15.3%",
    },
  ]

  const recentTransactions = [
    {
      id: "TXN-001",
      type: "Commission",
      amount: "KSh 1,800",
      from: "Transaction TXN-001",
      timestamp: "2 hours ago",
      status: "Completed",
    },
    {
      id: "TXN-002",
      type: "Escrow Release",
      amount: "KSh 90,000",
      from: "Buyer Wallet → Seller Wallet",
      timestamp: "4 hours ago",
      status: "Completed",
    },
    {
      id: "TXN-003",
      type: "Escrow Hold",
      amount: "KSh 80,000",
      from: "Buyer Wallet → Escrow",
      timestamp: "6 hours ago",
      status: "Held",
    },
    {
      id: "TXN-004",
      type: "Wallet Top-up",
      amount: "KSh 50,000",
      from: "Bank Transfer",
      timestamp: "1 day ago",
      status: "Completed",
    },
  ]

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-bold text-black">Wallet Overview</h2>
        <div className="flex gap-2">
          <Select defaultValue="month">
            <SelectTrigger className="w-48">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="week">This Week</SelectItem>
              <SelectItem value="month">This Month</SelectItem>
              <SelectItem value="quarter">This Quarter</SelectItem>
            </SelectContent>
          </Select>
          <Button variant="outline">Export Report</Button>
        </div>
      </div>

      {/* Wallet Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {walletData.map((wallet, index) => (
          <div key={index} className="bg-white p-6 rounded-lg border border-gray-200">
            <div className="flex items-center justify-between mb-4">
              <div
                className="w-12 h-12 rounded-lg flex items-center justify-center"
                style={{
                  backgroundColor:
                    index === 0 ? "#00A79D" : index === 1 ? "#FF990B" : index === 2 ? "#205D5A" : "#FCB000",
                }}
              >
                {index === 2 ? (
                  <CreditCard className="w-6 h-6 text-white" />
                ) : (
                  <Wallet className="w-6 h-6 text-white" />
                )}
              </div>
              <div className="flex items-center gap-1">
                {wallet.trend === "up" ? (
                  <TrendingUp className="w-4 h-4 text-green-600" />
                ) : (
                  <TrendingDown className="w-4 h-4 text-red-600" />
                )}
                <span className={`text-sm ${wallet.trend === "up" ? "text-green-600" : "text-red-600"}`}>
                  {wallet.change}
                </span>
              </div>
            </div>

            <h3 className="font-semibold text-black mb-2">{wallet.type}</h3>

            <div className="space-y-2">
              <div>
                <p className="text-sm text-gray-600">
                  {index < 2 ? "Total Balance" : index === 2 ? "Total in Escrow" : "Total Earnings"}
                </p>
                <p className="text-xl font-bold text-black">
                  {index < 2 ? wallet.totalBalance : index === 2 ? wallet.totalBalance : wallet.totalEarnings}
                </p>
              </div>

              <div className="flex justify-between text-sm">
                <span className="text-gray-600">
                  {index < 2 ? "Active Wallets" : index === 2 ? "Active Transactions" : "This Month"}
                </span>
                <span className="font-medium text-black">
                  {index < 2 ? wallet.activeWallets : index === 2 ? wallet.activeTransactions : wallet.thisMonth}
                </span>
              </div>

              <div className="flex justify-between text-sm">
                <span className="text-gray-600">
                  {index < 2 ? "Avg Balance" : index === 2 ? "Avg Amount" : "Avg Commission"}
                </span>
                <span className="font-medium text-black">
                  {index < 2 ? wallet.avgBalance : index === 2 ? wallet.avgAmount : wallet.avgCommission}
                </span>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Recent Transactions */}
      <div className="bg-white rounded-lg border border-gray-200">
        <div className="p-6 border-b border-gray-200">
          <h3 className="text-lg font-semibold text-black">Recent Wallet Transactions</h3>
        </div>
        <div className="p-6">
          <div className="space-y-4">
            {recentTransactions.map((transaction, index) => (
              <div
                key={index}
                className="flex items-center justify-between py-3 border-b border-gray-100 last:border-b-0"
              >
                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 rounded-lg bg-gray-100 flex items-center justify-center">
                    <DollarSign className="w-5 h-5 text-gray-600" />
                  </div>
                  <div>
                    <p className="font-medium text-black">{transaction.type}</p>
                    <p className="text-sm text-gray-600">{transaction.from}</p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="font-medium text-black">{transaction.amount}</p>
                  <div className="flex items-center gap-2">
                    <span
                      className={`text-xs px-2 py-1 rounded-full ${
                        transaction.status === "Completed"
                          ? "bg-green-100 text-green-800"
                          : "bg-yellow-100 text-yellow-800"
                      }`}
                    >
                      {transaction.status}
                    </span>
                    <span className="text-sm text-gray-500">{transaction.timestamp}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Financial Summary */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white rounded-lg border border-gray-200 p-6">
          <h3 className="text-lg font-semibold text-black mb-4">Platform Revenue Breakdown</h3>
          <div className="space-y-4">
            <div className="flex justify-between items-center">
              <span className="text-gray-600">Transaction Fees (3%)</span>
              <span className="font-medium text-black">KSh 89,400</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-gray-600">Listing Fees</span>
              <span className="font-medium text-black">KSh 23,600</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-gray-600">Premium Features</span>
              <span className="font-medium text-black">KSh 13,000</span>
            </div>
            <div className="border-t border-gray-200 pt-4">
              <div className="flex justify-between items-center">
                <span className="font-semibold text-black">Total Revenue</span>
                <span className="font-bold text-black text-lg">KSh 126,000</span>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg border border-gray-200 p-6">
          <h3 className="text-lg font-semibold text-black mb-4">Wallet Health Metrics</h3>
          <div className="space-y-4">
            <div className="flex justify-between items-center">
              <span className="text-gray-600">Active Wallet Ratio</span>
              <span className="font-medium text-black">78.5%</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-gray-600">Avg Transaction Size</span>
              <span className="font-medium text-black">KSh 45,600</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-gray-600">Escrow Success Rate</span>
              <span className="font-medium text-black">96.8%</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-gray-600">Commission Collection Rate</span>
              <span className="font-medium text-black">99.2%</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
