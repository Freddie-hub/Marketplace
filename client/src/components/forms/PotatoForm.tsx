import React, { useState } from 'react';

interface PotatoFormProps {
  onBack: () => void;
}

const PotatoForm: React.FC<PotatoFormProps> = ({ onBack }) => {
  const [formData, setFormData] = useState({
    productId: `POTATO-${Date.now()}`,
    transactionDateTime: new Date().toISOString().slice(0, 16),
    farmer: '',
    quantity: '',
    totalWeight: '',
    storageDetails: '',
    storageReceipt: '',
    variety: '',
    processingMethod: 'sorted',
    lotNumber: '',
    packagingType: '',
    grade: '',
    harvestDate: '',
    certification: [] as string[],
    storageCondition: '',
    unitPrice: '',
    location: '',
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Basic validation for required fields
    if (!formData.farmer || !formData.quantity || !formData.unitPrice) {
      alert('Please fill in all required fields (Farmer, Quantity, Unit Price).');
      return;
    }

    alert(`Potato listing submitted successfully! Product ID: ${formData.productId}`);
    console.log('Potato form submitted:', formData);
    // TODO: Add API call to submit form data to server
  };

  const handleCertificationChange = (cert: string, checked: boolean) => {
    setFormData((prev) => ({
      ...prev,
      certification: checked
        ? [...prev.certification, cert]
        : prev.certification.filter((c) => c !== cert),
    }));
  };

  const handleInputChange = (field: keyof typeof formData, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  return (
    <div className="container mx-auto px-4 py-8 max-w-4xl">
      <div className="flex items-center gap-4 mb-8">
        <button
          onClick={onBack}
          className="flex items-center gap-2 text-gray-600 hover:text-gray-800"
        >
          ← Back to Products
        </button>
        <div className="flex items-center gap-3">
          <span className="text-3xl">🥔</span>
          <h1 className="text-3xl font-bold text-gray-800">Potato Listing</h1>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="space-y-8">
        {/* Basic Information */}
        <div className="border-l-4 border-green-500 pl-6">
          <h2 className="text-xl font-semibold text-green-700 mb-6">Basic Information</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label htmlFor="productId" className="block text-sm font-medium text-gray-700">
                Product ID
              </label>
              <input
                id="productId"
                value={formData.productId}
                readOnly
                className="mt-1 block w-full border border-gray-300 rounded-md p-2 bg-gray-50"
              />
            </div>
            <div>
              <label htmlFor="transactionDateTime" className="block text-sm font-medium text-gray-700">
                Transaction Date & Time
              </label>
              <input
                id="transactionDateTime"
                type="datetime-local"
                value={formData.transactionDateTime}
                onChange={(e) => handleInputChange('transactionDateTime', e.target.value)}
                className="mt-1 block w-full border border-gray-300 rounded-md p-2"
              />
            </div>
            <div className="md:col-span-2">
              <label htmlFor="farmer" className="block text-sm font-medium text-gray-700">
                Farmer *
              </label>
              <select
                id="farmer"
                value={formData.farmer}
                onChange={(e) => handleInputChange('farmer', e.target.value)}
                className="mt-1 block w-full border border-gray-300 rounded-md p-2"
                required
              >
                <option value="">Select farmer</option>
                <option value="daniel-kiprop">Daniel Kiprop Farms</option>
                <option value="rose-wanjiku">Rose Wanjiku Co-op</option>
                <option value="joseph-maina">Joseph Maina Agriculture</option>
              </select>
            </div>
          </div>
        </div>

        {/* Quantity & Storage */}
        <div className="border-l-4 border-green-500 pl-6">
          <h2 className="text-xl font-semibold text-green-700 mb-6">Quantity & Storage</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label htmlFor="quantity" className="block text-sm font-medium text-gray-700">
                Quantity (bags) *
              </label>
              <input
                id="quantity"
                type="number"
                placeholder="Enter number of bags"
                value={formData.quantity}
                onChange={(e) => handleInputChange('quantity', e.target.value)}
                min="1"
                required
                className="mt-1 block w-full border border-gray-300 rounded-md p-2"
              />
            </div>
            <div>
              <label htmlFor="totalWeight" className="block text-sm font-medium text-gray-700">
                Total Weight (kg)
              </label>
              <input
                id="totalWeight"
                type="number"
                step="0.01"
                placeholder="Enter total weight"
                value={formData.totalWeight}
                onChange={(e) => handleInputChange('totalWeight', e.target.value)}
                min="0"
                className="mt-1 block w-full border border-gray-300 rounded-md p-2"
              />
            </div>
            <div className="md:col-span-2">
              <label htmlFor="storageDetails" className="block text-sm font-medium text-gray-700">
                Storage Details
              </label>
              <textarea
                id="storageDetails"
                placeholder="Enter storage facility details"
                value={formData.storageDetails}
                onChange={(e) => handleInputChange('storageDetails', e.target.value)}
                className="mt-1 block w-full border border-gray-300 rounded-md p-2"
                rows={4}
              />
            </div>
            <div className="md:col-span-2">
              <label htmlFor="storageReceipt" className="block text-sm font-medium text-gray-700">
                Storage Receipt
              </label>
              <div className="flex gap-2">
                <input
                  id="storageReceipt"
                  placeholder="Receipt number or upload document"
                  value={formData.storageReceipt}
                  onChange={(e) => handleInputChange('storageReceipt', e.target.value)}
                  className="mt-1 block w-full border border-gray-300 rounded-md p-2"
                />
                <button
                  type="button"
                  className="mt-1 border border-gray-300 rounded-md p-2 hover:bg-gray-100"
                >
                  Upload
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Product Specifications */}
        <div className="border-l-4 border-green-500 pl-6">
          <h2 className="text-xl font-semibold text-green-700 mb-6">Product Specifications</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label htmlFor="variety" className="block text-sm font-medium text-gray-700">
                Variety
              </label>
              <select
                id="variety"
                value={formData.variety}
                onChange={(e) => handleInputChange('variety', e.target.value)}
                className="mt-1 block w-full border border-gray-300 rounded-md p-2"
              >
                <option value="">Select variety</option>
                <option value="shangi">Shangi</option>
                <option value="dutch-robjin">Dutch Robjin</option>
                <option value="other">Other</option>
              </select>
            </div>
            <div>
              <label htmlFor="processingMethod" className="block text-sm font-medium text-gray-700">
                Processing Method
              </label>
              <input
                id="processingMethod"
                value="Sorted"
                readOnly
                className="mt-1 block w-full border border-gray-300 rounded-md p-2 bg-gray-50"
              />
            </div>
            <div>
              <label htmlFor="lotNumber" className="block text-sm font-medium text-gray-700">
                Lot Number
              </label>
              <input
                id="lotNumber"
                placeholder="Enter lot number"
                value={formData.lotNumber}
                onChange={(e) => handleInputChange('lotNumber', e.target.value)}
                className="mt-1 block w-full border border-gray-300 rounded-md p-2"
              />
            </div>
            <div>
              <label htmlFor="packagingType" className="block text-sm font-medium text-gray-700">
                Packaging Type
              </label>
              <input
                id="packagingType"
                placeholder="Enter packaging type"
                value={formData.packagingType}
                onChange={(e) => handleInputChange('packagingType', e.target.value)}
                className="mt-1 block w-full border border-gray-300 rounded-md p-2"
              />
            </div>
            <div>
              <label htmlFor="grade" className="block text-sm font-medium text-gray-700">
                Grade/Quality
              </label>
              <input
                id="grade"
                placeholder="Enter grade or quality"
                value={formData.grade}
                onChange={(e) => handleInputChange('grade', e.target.value)}
                className="mt-1 block w-full border border-gray-300 rounded-md p-2"
              />
            </div>
            <div>
              <label htmlFor="harvestDate" className="block text-sm font-medium text-gray-700">
                Harvest Date
              </label>
              <input
                id="harvestDate"
                type="date"
                value={formData.harvestDate}
                onChange={(e) => handleInputChange('harvestDate', e.target.value)}
                className="mt-1 block w-full border border-gray-300 rounded-md p-2"
              />
            </div>
          </div>
        </div>

        {/* Certification & Pricing */}
        <div className="border-l-4 border-green-500 pl-6">
          <h2 className="text-xl font-semibold text-green-700 mb-6">Certification & Pricing</h2>
          <div className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-gray-700">Certification</label>
              <div className="flex items-center space-x-2 mt-2">
                <input
                  id="kephis"
                  type="checkbox"
                  checked={formData.certification.includes('KEPHIS')}
                  onChange={(e) => handleCertificationChange('KEPHIS', e.target.checked)}
                  className="h-4 w-4 text-green-600 border-gray-300 rounded"
                />
                <label htmlFor="kephis" className="text-sm text-gray-700">
                  KEPHIS
                </label>
              </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label htmlFor="storageCondition" className="block text-sm font-medium text-gray-700">
                  Storage Condition
                </label>
                <input
                  id="storageCondition"
                  placeholder="Enter storage condition"
                  value={formData.storageCondition}
                  onChange={(e) => handleInputChange('storageCondition', e.target.value)}
                  className="mt-1 block w-full border border-gray-300 rounded-md p-2"
                />
              </div>
              <div>
                <label htmlFor="unitPrice" className="block text-sm font-medium text-gray-700">
                  Unit Price (KES per kg) *
                </label>
                <input
                  id="unitPrice"
                  type="number"
                  step="0.01"
                  placeholder="Enter unit price"
                  value={formData.unitPrice}
                  onChange={(e) => handleInputChange('unitPrice', e.target.value)}
                  min="0"
                  required
                  className="mt-1 block w-full border border-gray-300 rounded-md p-2"
                />
              </div>
            </div>
            <div>
              <label htmlFor="location" className="block text-sm font-medium text-gray-700">
                Location
              </label>
              <select
                id="location"
                value={formData.location}
                onChange={(e) => handleInputChange('location', e.target.value)}
                className="mt-1 block w-full border border-gray-300 rounded-md p-2"
              >
                <option value="">Select location</option>
                <option value="nairobi">Nairobi</option>
                <option value="nakuru">Nakuru</option>
                <option value="mombasa">Mombasa</option>
                <option value="kisumu">Kisumu</option>
              </select>
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 justify-between pt-8 border-t">
          <div className="flex gap-2">
            <button
              type="button"
              onClick={() => alert('QR Code generation not implemented.')}
              className="border border-gray-300 rounded-md p-2 hover:bg-gray-100 flex items-center gap-2"
            >
              Generate QR Code
            </button>
            <button
              type="button"
              onClick={() => alert('Preview not implemented.')}
              className="border border-gray-300 rounded-md p-2 hover:bg-gray-100"
            >
              Preview Listing
            </button>
          </div>
          <div className="flex gap-2">
            <button
              type="button"
              onClick={() => alert('Draft saved.')}
              className="border border-gray-300 rounded-md p-2 hover:bg-gray-100"
            >
              Save Draft
            </button>
            <button
              type="submit"
              className="bg-green-600 text-white rounded-md p-2 hover:bg-green-700"
            >
              Submit Listing
            </button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default PotatoForm;