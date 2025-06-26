'use client';

import React, { useState } from 'react';

interface CoffeeFormProps {
  onBack: () => void;
}

const CoffeeForm: React.FC<CoffeeFormProps> = ({ onBack }) => {
  const [formData, setFormData] = useState({
    productId: `COFFEE-${Date.now()}`,
    transactionDateTime: new Date().toISOString().slice(0, 16),
    farmer: '',
    miller: '',
    quantity: '',
    totalWeight: '',
    warehouseDetails: '',
    warehouseWarrant: '',
    type: '',
    processingMethod: '',
    lotNumber: '',
    outturnNumber: '',
    grade: '',
    cupProfile: '',
    cuppingScore: '',
    cupperDetails: '',
    certification: [] as string[],
    location: '',
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Basic validation for required fields
    if (!formData.farmer || !formData.quantity) {
      alert('Please fill in all required fields (Farmer, Quantity).');
      return;
    }

    alert(`Coffee listing submitted successfully! Product ID: ${formData.productId}`);
    console.log('Coffee form submitted:', formData);
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
    <div className="min-h-screen" style={{ background: 'linear-gradient(135deg, #78CCD0 0%, #00A79D 100%)' }}>
      <style jsx>{`
        ::placeholder {
          color: #205D5A !important;
          opacity: 0.8 !important;
          font-weight: 500 !important;
        }
        
        input::placeholder,
        textarea::placeholder,
        select::placeholder,
        option[value=""]:not(:checked) {
          color: #205D5A !important;
          opacity: 0.8 !important;
          font-weight: 500 !important;
        }
        
        input:focus::placeholder,
        textarea:focus::placeholder,
        select:focus::placeholder {
          color: #00A79D !important;
          opacity: 0.6 !important;
        }
      `}</style>
      <div className="container mx-auto px-4 py-8 max-w-4xl"> 
        <div className="bg-white rounded-lg shadow-lg overflow-hidden">
          <div className="px-8 py-6" style={{ backgroundColor: '#00A79D' }}>
            <div className="flex items-center gap-4"> 
              <button
                onClick={onBack}
                className="flex items-center gap-2 text-white hover:text-gray-200 transition-colors"
              >
                ← Back to Products
              </button>
              <div className="flex items-center gap-3">
                <h1 className="text-3xl font-bold text-white">Coffee Listing</h1>
              </div>
            </div>
          </div>

          <div className="px-8 py-6">
            <div className="space-y-8">
              {/* Basic Information */}
              <div className="border-l-4 pl-6" style={{ borderColor: '#FCB000' }}>
                <h2 className="text-xl font-semibold mb-6" style={{ color: '#205D5A' }}>Basic Information</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label htmlFor="productId" className="block text-sm font-medium" style={{ color: '#205D5A' }}>
                      Product ID
                    </label>
                    <input
                      id="productId"
                      value={formData.productId}
                      readOnly
                      className="mt-1 block w-full border rounded-md p-3 bg-gray-50 font-medium"
                      style={{ borderColor: '#78CCD0', color: '#205D5A' }}
                    />
                  </div>
                  <div>
                    <label htmlFor="transactionDateTime" className="block text-sm font-medium" style={{ color: '#205D5A' }}>
                      Transaction Date & Time
                    </label>
                    <input
                      id="transactionDateTime"
                      type="datetime-local"
                      value={formData.transactionDateTime}
                      onChange={(e) => handleInputChange('transactionDateTime', e.target.value)}
                      className="mt-1 block w-full border rounded-md p-3 focus:ring-2 focus:border-transparent font-medium"
                      style={{ borderColor: '#78CCD0', color: '#205D5A' }}
                    />
                  </div>
                  <div>
                    <label htmlFor="farmer" className="block text-sm font-medium" style={{ color: '#205D5A' }}>
                      Farmer *
                    </label>
                    <select
                      id="farmer"
                      value={formData.farmer}
                      onChange={(e) => handleInputChange('farmer', e.target.value)}
                      className="mt-1 block w-full border rounded-md p-3 focus:ring-2 focus:border-transparent font-medium"
                      style={{ borderColor: '#78CCD0', color: '#205D5A' }}
                      required
                    >
                      <option value="">Select farmer</option>
                      <option value="michael-gitonga">Michael Gitonga Co-op</option>
                      <option value="esther-wanjiru">Esther Wanjiru Farms</option>
                      <option value="francis-kimani">Francis Kimani Estate</option>
                    </select>
                  </div>
                  <div>
                    <label htmlFor="miller" className="block text-sm font-medium" style={{ color: '#205D5A' }}>
                      Miller
                    </label>
                    <select
                      id="miller"
                      value={formData.miller}
                      onChange={(e) => handleInputChange('miller', e.target.value)}
                      className="mt-1 block w-full border rounded-md p-3 focus:ring-2 focus:border-transparent font-medium"
                      style={{ borderColor: '#78CCD0', color: '#205D5A' }}
                    >
                      <option value="">Select miller</option>
                      <option value="central-coffee-mills">Central Coffee Mills</option>
                      <option value="mountain-coffee-processors">Mountain Coffee Processors</option>
                      <option value="highland-coffee-mills">Highland Coffee Mills</option>
                    </select>
                  </div>
                </div>
              </div>

              {/* Quantity & Storage */}
              <div className="border-l-4 pl-6" style={{ borderColor: '#FF990B' }}>
                <h2 className="text-xl font-semibold mb-6" style={{ color: '#205D5A' }}>Quantity & Storage</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label htmlFor="quantity" className="block text-sm font-medium" style={{ color: '#205D5A' }}>
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
                      className="mt-1 block w-full border rounded-md p-3 focus:ring-2 focus:border-transparent font-medium"
                      style={{ borderColor: '#78CCD0', color: '#205D5A' }}
                    />
                  </div>
                  <div>
                    <label htmlFor="totalWeight" className="block text-sm font-medium" style={{ color: '#205D5A' }}>
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
                      className="mt-1 block w-full border rounded-md p-3 focus:ring-2 focus:border-transparent"
                      style={{ borderColor: '#78CCD0' }}
                    />
                  </div>
                  <div className="md:col-span-2">
                    <label htmlFor="warehouseDetails" className="block text-sm font-medium" style={{ color: '#205D5A' }}>
                      Warehouse Details
                    </label>
                    <textarea
                      id="warehouseDetails"
                      placeholder="Enter warehouse location and details"
                      value={formData.warehouseDetails}
                      onChange={(e) => handleInputChange('warehouseDetails', e.target.value)}
                      className="mt-1 block w-full border rounded-md p-3 focus:ring-2 focus:border-transparent"
                      style={{ borderColor: '#78CCD0' }}
                      rows={4}
                    />
                  </div>
                  <div className="md:col-span-2">
                    <label htmlFor="warehouseWarrant" className="block text-sm font-medium" style={{ color: '#205D5A' }}>
                      Warehouse Warrant
                    </label>
                    <div className="flex gap-2">
                      <input
                        id="warehouseWarrant"
                        placeholder="Warrant number or upload document"
                        value={formData.warehouseWarrant}
                        onChange={(e) => handleInputChange('warehouseWarrant', e.target.value)}
                        className="mt-1 block w-full border rounded-md p-3 focus:ring-2 focus:border-transparent"
                        style={{ borderColor: '#78CCD0' }}
                      />
                      <button
                        type="button"
                        className="mt-1 border rounded-md p-3 hover:opacity-90 transition-opacity text-white font-medium"
                        style={{ borderColor: '#FCB000', backgroundColor: '#FCB000' }}
                      >
                        Upload
                      </button>
                    </div>
                  </div>
                </div>
              </div>

              {/* Product Specifications */}
              <div className="border-l-4 pl-6" style={{ borderColor: '#BD011F' }}>
                <h2 className="text-xl font-semibold mb-6" style={{ color: '#205D5A' }}>Product Specifications</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label htmlFor="type" className="block text-sm font-medium" style={{ color: '#205D5A' }}>
                      Coffee Type
                    </label>
                    <select
                      id="type"
                      value={formData.type}
                      onChange={(e) => handleInputChange('type', e.target.value)}
                      className="mt-1 block w-full border rounded-md p-3 focus:ring-2 focus:border-transparent"
                      style={{ borderColor: '#78CCD0' }}
                    >
                      <option value="">Select coffee type</option>
                      <option value="arabica">Arabica</option>
                      <option value="robusta">Robusta</option>
                    </select>
                  </div>
                  <div>
                    <label htmlFor="processingMethod" className="block text-sm font-medium" style={{ color: '#205D5A' }}>
                      Processing Method
                    </label>
                    <input
                      id="processingMethod"
                      placeholder="Enter processing method"
                      value={formData.processingMethod}
                      onChange={(e) => handleInputChange('processingMethod', e.target.value)}
                      className="mt-1 block w-full border rounded-md p-3 focus:ring-2 focus:border-transparent"
                      style={{ borderColor: '#78CCD0' }}
                    />
                  </div>
                  <div>
                    <label htmlFor="lotNumber" className="block text-sm font-medium" style={{ color: '#205D5A' }}>
                      Lot Number
                    </label>
                    <input
                      id="lotNumber"
                      placeholder="Enter lot number"
                      value={formData.lotNumber}
                      onChange={(e) => handleInputChange('lotNumber', e.target.value)}
                      className="mt-1 block w-full border rounded-md p-3 focus:ring-2 focus:border-transparent"
                      style={{ borderColor: '#78CCD0' }}
                    />
                  </div>
                  <div>
                    <label htmlFor="outturnNumber" className="block text-sm font-medium" style={{ color: '#205D5A' }}>
                      Outturn Number
                    </label>
                    <input
                      id="outturnNumber"
                      placeholder="Enter outturn number"
                      value={formData.outturnNumber}
                      onChange={(e) => handleInputChange('outturnNumber', e.target.value)}
                      className="mt-1 block w-full border rounded-md p-3 focus:ring-2 focus:border-transparent"
                      style={{ borderColor: '#78CCD0' }}
                    />
                  </div>
                  <div>
                    <label htmlFor="grade" className="block text-sm font-medium" style={{ color: '#205D5A' }}>
                      Grade
                    </label>
                    <input
                      id="grade"
                      placeholder="Enter grade"
                      value={formData.grade}
                      onChange={(e) => handleInputChange('grade', e.target.value)}
                      className="mt-1 block w-full border rounded-md p-3 focus:ring-2 focus:border-transparent"
                      style={{ borderColor: '#78CCD0' }}
                    />
                  </div>
                  <div>
                    <label htmlFor="cuppingScore" className="block text-sm font-medium" style={{ color: '#205D5A' }}>
                      Cupping Score/Class
                    </label>
                    <input
                      id="cuppingScore"
                      placeholder="Enter cupping score"
                      value={formData.cuppingScore}
                      onChange={(e) => handleInputChange('cuppingScore', e.target.value)}
                      className="mt-1 block w-full border rounded-md p-3 focus:ring-2 focus:border-transparent"
                      style={{ borderColor: '#78CCD0' }}
                    />
                  </div>
                </div>
              </div>

              {/* Quality & Certification */}
              <div className="border-l-4 pl-6" style={{ borderColor: '#720218' }}>
                <h2 className="text-xl font-semibold mb-6" style={{ color: '#205D5A' }}>Quality & Certification</h2>
                <div className="space-y-6">
                  <div>
                    <label htmlFor="cupProfile" className="block text-sm font-medium" style={{ color: '#205D5A' }}>
                      Cup Profile
                    </label>
                    <textarea
                      id="cupProfile"
                      placeholder="Describe the cup profile (aroma, flavor, body, acidity, etc.)"
                      value={formData.cupProfile}
                      onChange={(e) => handleInputChange('cupProfile', e.target.value)}
                      className="mt-1 block w-full border rounded-md p-3 focus:ring-2 focus:border-transparent"
                      style={{ borderColor: '#78CCD0' }}
                      rows={4}
                    />
                  </div>
                  <div>
                    <label htmlFor="cupperDetails" className="block text-sm font-medium" style={{ color: '#205D5A' }}>
                      Cupper Details
                    </label>
                    <input
                      id="cupperDetails"
                      placeholder="Enter cupper name and credentials"
                      value={formData.cupperDetails}
                      onChange={(e) => handleInputChange('cupperDetails', e.target.value)}
                      className="mt-1 block w-full border rounded-md p-3 focus:ring-2 focus:border-transparent"
                      style={{ borderColor: '#78CCD0' }}
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium" style={{ color: '#205D5A' }}>Certification</label>
                    <div className="flex flex-wrap gap-4 mt-2">
                      {['Organic', 'Fairtrade', 'Rainforest Alliance', 'UTZ'].map((cert) => (
                        <div key={cert} className="flex items-center space-x-2">
                          <input
                            id={cert}
                            type="checkbox"
                            checked={formData.certification.includes(cert)}
                            onChange={(e) => handleCertificationChange(cert, e.target.checked)}
                            className="h-4 w-4 rounded border-2"
                            style={{ accentColor: '#00A79D', borderColor: '#78CCD0' }}
                          />
                          <label htmlFor={cert} className="text-sm" style={{ color: '#205D5A' }}>
                            {cert}
                          </label>
                        </div>
                      ))}
                    </div>
                  </div>
                  <div>
                    <label htmlFor="location" className="block text-sm font-medium" style={{ color: '#205D5A' }}>
                      Location
                    </label>
                    <select
                      id="location"
                      value={formData.location}
                      onChange={(e) => handleInputChange('location', e.target.value)}
                      className="mt-1 block w-full border rounded-md p-3 focus:ring-2 focus:border-transparent"
                      style={{ borderColor: '#78CCD0', color: '#205D5A' }}
                    >
                      <option value="">Enter location</option>
                      <option value="nairobi">Nairobi</option>
                      <option value="nakuru">Nakuru</option>
                      <option value="mombasa">Mombasa</option>
                      <option value="kisumu">Kisumu</option>
                    </select>
                  </div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex flex-col sm:flex-row gap-4 justify-between pt-8 border-t" style={{ borderColor: '#78CCD0' }}>
                <div className="flex gap-2">
                  <button
                    type="button"
                    onClick={() => alert('QR Code generation not implemented.')}
                    className="border rounded-md px-4 py-2 hover:opacity-90 transition-opacity flex items-center gap-2 font-medium"
                    style={{ borderColor: '#78CCD0', color: '#205D5A' }}
                  >
                    Generate QR Code
                  </button>
                  <button
                    type="button"
                    onClick={() => alert('Preview not implemented.')}
                    className="border rounded-md px-4 py-2 hover:opacity-90 transition-opacity font-medium"
                    style={{ borderColor: '#78CCD0', color: '#205D5A' }}
                  >
                    Preview Listing
                  </button>
                </div>
                <div className="flex gap-2">
                  <button
                    type="button"
                    onClick={() => alert('Draft saved.')}
                    className="border rounded-md px-4 py-2 hover:opacity-90 transition-opacity text-white font-medium"
                    style={{ borderColor: '#FF990B', backgroundColor: '#FF990B' }}
                  >
                    Save Draft
                  </button>
                  <button
                    type="submit"
                    className="rounded-md px-6 py-2 hover:opacity-90 transition-opacity text-white font-medium"
                    style={{ backgroundColor: '#00A79D' }}
                  >
                    Submit Listing
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CoffeeForm;