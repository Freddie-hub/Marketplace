'use client';

import React, { useState } from 'react';

interface AvocadoFormProps {
  onBack: () => void;
}

const AvocadoForm: React.FC<AvocadoFormProps> = ({ onBack }) => {
  const [formData, setFormData] = useState({
    productId: `AVOCADO-${Date.now()}`,
    transactionDateTime: new Date().toISOString().slice(0, 16),
    farmer: '',
    quantity: '',
    totalWeight: '',
    warehouseDetails: '',
    warehouseReceipt: '',
    variety: '',
    processingMethod: [] as string[],
    lotNumber: '',
    sizeCount: '',
    grade: '',
    maturityIndicators: '',
    certification: [] as string[],
    packagingDetails: '',
    unitWeight: '',
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

    alert(`Avocado listing submitted successfully! Product ID: ${formData.productId}`);
    console.log('Avocado form submitted:', formData);
    // TODO: Add API call to submit form data to server
  };

  const handleProcessingMethodChange = (method: string, checked: boolean) => {
    setFormData((prev) => ({
      ...prev,
      processingMethod: checked
        ? [...prev.processingMethod, method]
        : prev.processingMethod.filter((m) => m !== method),
    }));
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
    <div className="container mx-auto px-4 py-4 max-w-4xl"> 
      <div className="flex items-center gap-4 mb-4"> 
        <button
          onClick={onBack}
          className="flex items-center gap-2 text-gray-600 hover:text-gray-800"
        >
          ← Back to Products
        </button>
        <div className="flex items-center gap-3">
          <h1 className="text-3xl font-bold text-gray-800">Avocado Listing</h1>
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
                <option value="jane-kiprotich">Jane Kiprotich Farms</option>
                <option value="samuel-mwangi">Samuel Mwangi Co-op</option>
                <option value="grace-achieng">Grace Achieng Agriculture</option>
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
                Quantity (cartons) *
              </label>
              <input
                id="quantity"
                type="number"
                placeholder="Enter number of cartons"
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
              <label htmlFor="warehouseDetails" className="block text-sm font-medium text-gray-700">
                Warehouse/Packhouse Details
              </label>
              <textarea
                id="warehouseDetails"
                placeholder="Enter warehouse or packhouse details"
                value={formData.warehouseDetails}
                onChange={(e) => handleInputChange('warehouseDetails', e.target.value)}
                className="mt-1 block w-full border border-gray-300 rounded-md p-2"
                rows={4}
              />
            </div>
            <div className="md:col-span-2">
              <label htmlFor="warehouseReceipt" className="block text-sm font-medium text-gray-700">
                Warehouse Receipt
              </label>
              <div className="flex gap-2">
                <input
                  id="warehouseReceipt"
                  placeholder="Receipt number or upload document"
                  value={formData.warehouseReceipt}
                  onChange={(e) => handleInputChange('warehouseReceipt', e.target.value)}
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
          <div className="space-y-6">
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
                  <option value="hass">Hass</option>
                  <option value="fuerte">Fuerte</option>
                  <option value="other">Other</option>
                </select>
              </div>
              <div>
                <label htmlFor="grade" className="block text-sm font-medium text-gray-700">
                  Grade
                </label>
                <select
                  id="grade"
                  value={formData.grade}
                  onChange={(e) => handleInputChange('grade', e.target.value)}
                  className="mt-1 block w-full border border-gray-300 rounded-md p-2"
                >
                  <option value="">Select grade</option>
                  <option value="1">Grade 1</option>
                  <option value="2">Grade 2</option>
                </select>
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">Processing Method</label>
              <div className="flex flex-wrap gap-4 mt-2">
                {['Sorted', 'Cleaned', 'Waxed'].map((method) => (
                  <div key={method} className="flex items-center space-x-2">
                    <input
                      id={method}
                      type="checkbox"
                      checked={formData.processingMethod.includes(method)}
                      onChange={(e) => handleProcessingMethodChange(method, e.target.checked)}
                      className="h-4 w-4 text-green-600 border-gray-300 rounded"
                    />
                    <label htmlFor={method} className="text-sm text-gray-700">
                      {method}
                    </label>
                  </div>
                ))}
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
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
                <label htmlFor="sizeCount" className="block text-sm font-medium text-gray-700">
                  Size Count
                </label>
                <input
                  id="sizeCount"
                  placeholder="Enter size count"
                  value={formData.sizeCount}
                  onChange={(e) => handleInputChange('sizeCount', e.target.value)}
                  className="mt-1 block w-full border border-gray-300 rounded-md p-2"
                />
              </div>
            </div>

            <div>
              <label htmlFor="maturityIndicators" className="block text-sm font-medium text-gray-700">
                Maturity Indicators
              </label>
              <textarea
                id="maturityIndicators"
                placeholder="Enter maturity indicators"
                value={formData.maturityIndicators}
                onChange={(e) => handleInputChange('maturityIndicators', e.target.value)}
                className="mt-1 block w-full border border-gray-300 rounded-md p-2"
                rows={4}
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
              <div className="flex flex-wrap gap-4 mt-2">
                {['Organic', 'GlobalG.A.P.', 'Fairtrade'].map((cert) => (
                  <div key={cert} className="flex items-center space-x-2">
                    <input
                      id={cert}
                      type="checkbox"
                      checked={formData.certification.includes(cert)}
                      onChange={(e) => handleCertificationChange(cert, e.target.checked)}
                      className="h-4 w-4 text-green-600 border-gray-300 rounded"
                    />
                    <label htmlFor={cert} className="text-sm text-gray-700">
                      {cert}
                    </label>
                  </div>
                ))}
              </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div>
                <label htmlFor="packagingDetails" className="block text-sm font-medium text-gray-700">
                  Packaging Details
                </label>
                <input
                  id="packagingDetails"
                  placeholder="Enter packaging details"
                  value={formData.packagingDetails}
                  onChange={(e) => handleInputChange('packagingDetails', e.target.value)}
                  className="mt-1 block w-full border border-gray-300 rounded-md p-2"
                />
              </div>
              <div>
                <label htmlFor="unitWeight" className="block text-sm font-medium text-gray-700">
                  Unit Weight (kg)
                </label>
                <input
                  id="unitWeight"
                  type="number"
                  step="0.01"
                  placeholder="Enter unit weight"
                  value={formData.unitWeight}
                  onChange={(e) => handleInputChange('unitWeight', e.target.value)}
                  min="0"
                  className="mt-1 block w-full border border-gray-300 rounded-md p-2"
                />
              </div>
              <div>
                <label htmlFor="unitPrice" className="block text-sm font-medium text-gray-700">
                  Unit Price (KES) *
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

export default AvocadoForm;