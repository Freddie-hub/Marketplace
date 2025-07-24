"use client"

import { useState } from "react"
import { Save, RefreshCw, Shield, DollarSign, Star, Users, Construction } from "lucide-react"
import { Button } from "@/components/dashboards/admin/ui/button"
import { Input } from "@/components/dashboards/admin/ui/input"
import { Switch } from "@/components/dashboards/admin/ui/switch"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/dashboards/admin/ui/select"
import { Textarea } from "@/components/dashboards/admin/ui/textarea"

export function SystemSettings() {
  const [settings, setSettings] = useState({
    commissionRate: "3",
    listingFee: "100",
    premiumListingFee: "500",
    escrowHoldDays: "7",
    autoVerification: false,
    allowReselling: true,
    featuredProductsLimit: "10",
    maxListingDuration: "30",
    enableNotifications: true,
    maintenanceMode: false,
  })

  const handleSettingChange = (key: string, value: any) => {
    setSettings((prev) => ({ ...prev, [key]: value }))
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold text-black">System Settings</h2>
        <div className="flex gap-2">
          <Button variant="outline" className="flex items-center gap-2 bg-transparent">
            <RefreshCw className="w-4 h-4" />
            Reset to Defaults
          </Button>
          <Button className="bg-black text-white hover:bg-gray-800 flex items-center gap-2">
            <Save className="w-4 h-4" />
            Save Changes
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Commission & Fees */}
        <div className="bg-white rounded-lg border border-gray-200 p-6">
          <div className="flex items-center gap-3 mb-6">
            <div
              className="w-10 h-10 rounded-lg flex items-center justify-center"
              style={{ backgroundColor: "#00A79D" }}
            >
              <DollarSign className="w-5 h-5 text-white" />
            </div>
            <h3 className="text-lg font-semibold text-black">Commission & Fees</h3>
          </div>

          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-black mb-2">Transaction Commission Rate (%)</label>
              <Input
                type="number"
                value={settings.commissionRate}
                onChange={(e) => handleSettingChange("commissionRate", e.target.value)}
                placeholder="3"
              />
              <p className="text-xs text-gray-600 mt-1">Percentage charged on each completed transaction</p>
            </div>

            <div>
              <label className="block text-sm font-medium text-black mb-2">Basic Listing Fee (KSh)</label>
              <Input
                type="number"
                value={settings.listingFee}
                onChange={(e) => handleSettingChange("listingFee", e.target.value)}
                placeholder="100"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-black mb-2">Premium Listing Fee (KSh)</label>
              <Input
                type="number"
                value={settings.premiumListingFee}
                onChange={(e) => handleSettingChange("premiumListingFee", e.target.value)}
                placeholder="500"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-black mb-2">Escrow Hold Period (Days)</label>
              <Select
                value={settings.escrowHoldDays}
                onValueChange={(value) => handleSettingChange("escrowHoldDays", value)}
              >
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="3">3 Days</SelectItem>
                  <SelectItem value="7">7 Days</SelectItem>
                  <SelectItem value="14">14 Days</SelectItem>
                  <SelectItem value="30">30 Days</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </div>

        {/* Platform Features */}
        <div className="bg-white rounded-lg border border-gray-200 p-6">
          <div className="flex items-center gap-3 mb-6">
            <div
              className="w-10 h-10 rounded-lg flex items-center justify-center"
              style={{ backgroundColor: "#FF990B" }}
            >
              <Star className="w-5 h-5 text-white" />
            </div>
            <h3 className="text-lg font-semibold text-black">Platform Features</h3>
          </div>

          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-black mb-2">Featured Products Limit</label>
              <Input
                type="number"
                value={settings.featuredProductsLimit}
                onChange={(e) => handleSettingChange("featuredProductsLimit", e.target.value)}
                placeholder="10"
              />
              <p className="text-xs text-gray-600 mt-1">
                Maximum number of products that can be featured simultaneously
              </p>
            </div>

            <div>
              <label className="block text-sm font-medium text-black mb-2">Maximum Listing Duration (Days)</label>
              <Select
                value={settings.maxListingDuration}
                onValueChange={(value) => handleSettingChange("maxListingDuration", value)}
              >
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="7">7 Days</SelectItem>
                  <SelectItem value="14">14 Days</SelectItem>
                  <SelectItem value="30">30 Days</SelectItem>
                  <SelectItem value="60">60 Days</SelectItem>
                  <SelectItem value="90">90 Days</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="flex items-center justify-between">
              <div>
                <p className="font-medium text-black">Allow Product Reselling</p>
                <p className="text-sm text-gray-600">Enable buyers to resell purchased products</p>
              </div>
              <Switch
                checked={settings.allowReselling}
                onCheckedChange={(checked) => handleSettingChange("allowReselling", checked)}
              />
            </div>

            <div className="flex items-center justify-between">
              <div>
                <p className="font-medium text-black">Auto-Verification</p>
                <p className="text-sm text-gray-600">Automatically verify certain certifications</p>
              </div>
              <Switch
                checked={settings.autoVerification}
                onCheckedChange={(checked) => handleSettingChange("autoVerification", checked)}
              />
            </div>
          </div>
        </div>

        {/* User Management */}
        <div className="bg-white rounded-lg border border-gray-200 p-6">
          <div className="flex items-center gap-3 mb-6">
            <div
              className="w-10 h-10 rounded-lg flex items-center justify-center"
              style={{ backgroundColor: "#205D5A" }}
            >
              <Users className="w-5 h-5 text-white" />
            </div>
            <h3 className="text-lg font-semibold text-black">User Management</h3>
          </div>

          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="font-medium text-black">Email Notifications</p>
                <p className="text-sm text-gray-600">Send email notifications to users</p>
              </div>
              <Switch
                checked={settings.enableNotifications}
                onCheckedChange={(checked) => handleSettingChange("enableNotifications", checked)}
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-black mb-2">User Registration Rules</label>
              <Textarea placeholder="Define rules for user registration..." className="min-h-[100px]" />
            </div>

            <div>
              <label className="block text-sm font-medium text-black mb-2">Verification Requirements</label>
              <Select defaultValue="standard">
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="basic">Basic Verification</SelectItem>
                  <SelectItem value="standard">Standard Verification</SelectItem>
                  <SelectItem value="strict">Strict Verification</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </div>

        {/* System Maintenance */}
        <div className="bg-white rounded-lg border border-gray-200 p-6">
          <div className="flex items-center gap-3 mb-6">
            <div
              className="w-10 h-10 rounded-lg flex items-center justify-center"
              style={{ backgroundColor: "#FCB000" }}
            >
              <Shield className="w-5 h-5 text-white" />
            </div>
            <h3 className="text-lg font-semibold text-black">System Maintenance</h3>
          </div>

          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="font-medium text-black">Maintenance Mode</p>
                <p className="text-sm text-gray-600">Temporarily disable platform access</p>
              </div>
              <Switch
                checked={settings.maintenanceMode}
                onCheckedChange={(checked) => handleSettingChange("maintenanceMode", checked)}
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-black mb-2">Maintenance Message</label>
              <Textarea
                placeholder="Message to display during maintenance..."
                defaultValue="The platform is currently under maintenance. Please check back later."
                className="min-h-[80px]"
              />
            </div>

            <div className="space-y-2">
              <Button variant="outline" className="w-full bg-transparent">
                Clear Cache
              </Button>
              <Button variant="outline" className="w-full bg-transparent">
                Backup Database
              </Button>
              <Button variant="outline" className="w-full text-red-600 border-red-600 hover:bg-red-50 bg-transparent">
                Reset All Settings
              </Button>
            </div>
          </div>
        </div>

        {/* API Configuration */}
        <div className="bg-white rounded-lg border border-gray-200 p-6">
          <h3 className="text-lg font-semibold text-black mb-6">API Configuration</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-black mb-2">Payment Gateway API Key</label>
              <Input type="password" placeholder="••••••••••••••••" className="font-mono" />
            </div>
            <div>
              <label className="block text-sm font-medium text-black mb-2">SMS Service API Key</label>
              <Input type="password" placeholder="••••••••••••••••" className="font-mono" />
            </div>
            <div>
              <label className="block text-sm font-medium text-black mb-2">Email Service Configuration</label>
              <Input placeholder="SMTP Server Configuration" />
            </div>
            <div>
              <label className="block text-sm font-medium text-black mb-2">Analytics Tracking ID</label>
              <Input placeholder="GA-XXXXXXXXX-X" className="font-mono" />
            </div>
          </div>
        </div>

        {/* Under Development */}
        <div className="bg-white rounded-lg border border-gray-200 p-6">
          <div className="flex flex-col items-center justify-center min-h-[60vh] space-y-6">
            <div className="text-center">
              <div
                className="w-24 h-24 rounded-full mx-auto mb-6 flex items-center justify-center"
                style={{ backgroundColor: "rgba(252, 176, 0, 0.1)" }}
              >
                <Construction className="w-12 h-12" style={{ color: "#FCB000" }} />
              </div>
              <h2 className="text-xl font-bold text-black mb-4">System Settings</h2>
              <p className="text-gray-600 text-sm max-w-md mx-auto">
                Advanced system configuration and settings management features are currently under development.
              </p>
              <div className="mt-8">
                <div
                  className="inline-flex items-center px-4 py-2 rounded-full text-sm font-medium"
                  style={{ backgroundColor: "rgba(252, 176, 0, 0.1)", color: "#FCB000" }}
                >
                  Coming Soon
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
