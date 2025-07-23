import NavigationBar from '@/components/Navbar';
import Header from "@/components/dashboards/buyer/Header"
import OverviewSection from "@/components/dashboards/buyer/OverviewSection"
import MarketplaceView from "@/components/dashboards/buyer/MarketplaceView"
import OrderTracking from "@/components/dashboards/buyer/OrderTracking"
import ReceiptsPayments from "@/components/dashboards/buyer/ReceiptsPayments"
import Messages from "@/components/dashboards/buyer/Messages"
import BuyerAnalytics from "@/components/dashboards/buyer/BuyerAnalytics"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/dashboards/buyer/ui/tabs"
import Footer from '@/components/footer';

export default function BuyerDashboard() {
  return (
    <div className="min-h-screen bg-[#f0f0f0]">
      <NavigationBar />

      <main className="container mx-auto px-6 py-8">
        <OverviewSection />

        <Tabs defaultValue="marketplace" className="mt-8">
          <TabsList className="grid w-full grid-cols-6 bg-white border-b border-gray-200">
            <TabsTrigger
              value="marketplace"
              className="data-[state=active]:bg-[#00A79D] data-[state=active]:text-white"
            >
              Marketplace
            </TabsTrigger>
            <TabsTrigger value="orders" className="data-[state=active]:bg-[#00A79D] data-[state=active]:text-white">
              Order Tracking
            </TabsTrigger>
            <TabsTrigger value="receipts" className="data-[state=active]:bg-[#00A79D] data-[state=active]:text-white">
              Receipts
            </TabsTrigger>
            <TabsTrigger value="messages" className="data-[state=active]:bg-[#00A79D] data-[state=active]:text-white">
              Messages
            </TabsTrigger>
            <TabsTrigger value="analytics" className="data-[state=active]:bg-[#00A79D] data-[state=active]:text-white">
              Analytics
            </TabsTrigger>
            <TabsTrigger
              value="custom-order"
              className="data-[state=active]:bg-[#FCB000] data-[state=active]:text-black"
            >
              Custom Order
            </TabsTrigger>
          </TabsList>

          <TabsContent value="marketplace" className="mt-6">
            <MarketplaceView />
          </TabsContent>

          <TabsContent value="orders" className="mt-6">
            <OrderTracking />
          </TabsContent>

          <TabsContent value="receipts" className="mt-6">
            <ReceiptsPayments />
          </TabsContent>

          <TabsContent value="messages" className="mt-6">
            <Messages />
          </TabsContent>

          <TabsContent value="analytics" className="mt-6">
            <BuyerAnalytics />
          </TabsContent>

          <TabsContent value="custom-order" className="mt-6">
            <div className="bg-white p-8 rounded-lg border border-gray-200">
              <h2 className="text-2xl font-bold text-black mb-6">Create Custom Order</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-black mb-2">Commodity Type</label>
                  <select className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#00A79D] focus:border-transparent">
                    <option>Select commodity...</option>
                    <option>Maize</option>
                    <option>Rice</option>
                    <option>Wheat</option>
                    <option>Beans</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-black mb-2">Quantity (kg)</label>
                  <input
                    type="number"
                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#00A79D] focus:border-transparent"
                    placeholder="Enter quantity"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-black mb-2">Certification Required</label>
                  <select className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#00A79D] focus:border-transparent">
                    <option>None</option>
                    <option>Organic</option>
                    <option>Fair Trade</option>
                    <option>GAP Certified</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-black mb-2">Packaging</label>
                  <select className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#00A79D] focus:border-transparent">
                    <option>Standard Bags</option>
                    <option>Vacuum Sealed</option>
                    <option>Bulk</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-black mb-2">Delivery Location</label>
                  <input
                    type="text"
                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#00A79D] focus:border-transparent"
                    placeholder="Enter delivery address"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-black mb-2">Budget (KES)</label>
                  <input
                    type="number"
                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#00A79D] focus:border-transparent"
                    placeholder="Enter budget"
                  />
                </div>
              </div>
              <div className="mt-6">
                <label className="block text-sm font-medium text-black mb-2">Additional Requirements</label>
                <textarea
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#00A79D] focus:border-transparent"
                  rows={4}
                  placeholder="Any specific requirements or notes..."
                ></textarea>
              </div>
              <button className="mt-6 bg-[#00A79D] text-white px-8 py-3 rounded-lg font-medium hover:bg-[#008a7a] transition-colors">
                Submit Custom Order
              </button>
            </div>
          </TabsContent>
        </Tabs>
      </main>
      <Footer />
    </div>
  )
}
