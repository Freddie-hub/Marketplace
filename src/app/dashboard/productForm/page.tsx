/* eslint-disable jsx-a11y/alt-text */
"use client"
import React, { useState, ChangeEvent, FormEvent } from 'react';
import { Package, Upload, MapPin, DollarSign, Hash, FileText, Star,Scale,Sprout,Save,X,
  Image,AlertCircle,ArrowLeft
} from 'lucide-react';
import { FormData } from '@/types/FormData';
import { FormErrors } from '@/types/FormErrors';
import { SubmitData } from '@/types/SubmitData';
import { GradeOption } from '@/types/GradeOptions';
import { toast } from 'react-toastify';

const ProductForm: React.FC = () => {
  const [formData, setFormData] = useState<FormData>({
    name: '',
    grade: '',
    quantity: '',
    price: '',
    variety: '',
    location: '',
    image: '',
    description: ''
  });

  const [errors, setErrors] = useState<FormErrors>({});
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const [imagePreview, setImagePreview] = useState<string | null>(null);

  const gradeOptions: GradeOption[] = ['Grade A', 'Grade B', 'Grade C', 'Premium', 'Standard'];

  const handleInputChange = (e: ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>): void => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
  };

  const handleImageChange = (e: ChangeEvent<HTMLInputElement>): void => {
    const file: File | null = e.target.files?.[0] || null;
    if (file) {
      const reader = new FileReader();
      reader.onloadend = (): void => {
        const result = reader.result as string;
        setImagePreview(result);
        setFormData(prev => ({
          ...prev,
          image: result
        }));
      };
      reader.readAsDataURL(file);
    }
  };

  const validateForm = (): boolean => {
    const newErrors: FormErrors = {};
    
    if (!formData.name.trim()) newErrors.name = 'Product name is required';
    if (!formData.grade) newErrors.grade = 'Grade is required';
    if (!formData.quantity || parseFloat(formData.quantity) <= 0) newErrors.quantity = 'Valid quantity is required';
    if (!formData.price || parseFloat(formData.price) <= 0) newErrors.price = 'Valid price is required';
    if (!formData.variety.trim()) newErrors.variety = 'Variety is required';
    if (!formData.location.trim()) newErrors.location = 'Location is required';

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: FormEvent<HTMLButtonElement>): Promise<void> => {
    e.preventDefault();
    
    if (!validateForm()) return;

    setIsSubmitting(true);
    
    try {
      const submitData: SubmitData = {
        ...formData,
        quantity: parseInt(formData.quantity, 10),
        price: parseFloat(formData.price),
        farmerId: 1, 
        warehouseId: 1 
      };

      console.log('Submitting product data:', submitData);
      
      // await createProduct({ variables: { args: submitData } });
      
      await new Promise<void>(resolve => setTimeout(resolve, 2000));
      
      toast.success("Product created successfully!")
      setFormData({
        name: '',
        grade: '',
        quantity: '',
        price: '',
        variety: '',
        location: '',
        image: '',
        description: ''
      });
      setImagePreview(null);
      
    } catch (error: unknown) {
      console.error('Error creating product:', error);
      const errorMessage = error instanceof Error ? error.message : 'Unknown error occurred';
      alert(`Error creating product: ${errorMessage}. Please try again.`);
    } finally {
      setIsSubmitting(false);
    }
  };

  const removeImage = (): void => {
    setImagePreview(null);
    setFormData(prev => ({ ...prev, image: '' }));
  };

  const handleBack = (): void => {
    window.history.back();
  };

  const handleCancel = (): void => {
    setFormData({
      name: '',
      grade: '',
      quantity: '',
      price: '',
      variety: '',
      location: '',
      image: '',
      description: ''
    });
    setImagePreview(null);
    setErrors({});
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50/30 to-indigo-50/20 p-8">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center space-x-3">
              <div className="p-3 bg-emerald-100 rounded-xl">
                <Package className="w-8 h-8 text-emerald-600" />
              </div>
              <div>
                <h1 className="text-3xl font-bold text-slate-900">Add New Product</h1>
                <p className="text-slate-600">Create a new product listing for your inventory</p>
              </div>
            </div>
            <button
              onClick={handleBack}
              className="flex items-center space-x-2 px-4 py-2 text-slate-600 bg-white rounded-xl border border-slate-300 hover:bg-slate-50 transition-colors"
              type="button"
            >
              <ArrowLeft className="w-5 h-5" />
              <span>Back to Dashboard</span>
            </button>
          </div>
        </div>

        <div className="bg-white/80 backdrop-blur-sm rounded-2xl border border-slate-200/60 shadow-sm p-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            
            <div className="space-y-6">
              <div>
                <label className="flex items-center space-x-2 text-sm font-medium text-slate-700 mb-2">
                  <Sprout className="w-4 h-4" />
                  <span>Product Name *</span>
                </label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  placeholder="e.g., Organic Tomatoes"
                  className={`w-full px-4 py-3 border rounded-xl focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 transition-colors ${
                    errors.name ? 'border-red-300 bg-red-50' : 'border-slate-300'
                  }`}
                />
                {errors.name && (
                  <p className="mt-1 text-sm text-red-600 flex items-center space-x-1">
                    <AlertCircle className="w-4 h-4" />
                    <span>{errors.name}</span>
                  </p>
                )}
              </div>

              <div>
                <label className="flex items-center space-x-2 text-sm font-medium text-slate-700 mb-2">
                  <Star className="w-4 h-4" />
                  <span>Grade *</span>
                </label>
                <select
                  name="grade"
                  value={formData.grade}
                  onChange={handleInputChange}
                  className={`w-full px-4 py-3 border rounded-xl focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 transition-colors ${
                    errors.grade ? 'border-red-300 bg-red-50' : 'border-slate-300'
                  }`}
                >
                  <option value="">Select Grade</option>
                  {gradeOptions.map((grade: GradeOption) => (
                    <option key={grade} value={grade}>{grade}</option>
                  ))}
                </select>
                {errors.grade && (
                  <p className="mt-1 text-sm text-red-600 flex items-center space-x-1">
                    <AlertCircle className="w-4 h-4" />
                    <span>{errors.grade}</span>
                  </p>
                )}
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="flex items-center space-x-2 text-sm font-medium text-slate-700 mb-2">
                    <Hash className="w-4 h-4" />
                    <span>Quantity *</span>
                  </label>
                  <input
                    type="number"
                    name="quantity"
                    value={formData.quantity}
                    onChange={handleInputChange}
                    placeholder="100"
                    min="1"
                    className={`w-full px-4 py-3 border rounded-xl focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 transition-colors ${
                      errors.quantity ? 'border-red-300 bg-red-50' : 'border-slate-300'
                    }`}
                  />
                  {errors.quantity && (
                    <p className="mt-1 text-sm text-red-600 flex items-center space-x-1">
                      <AlertCircle className="w-4 h-4" />
                      <span>{errors.quantity}</span>
                    </p>
                  )}
                </div>
                
                <div>
                  <label className="flex items-center space-x-2 text-sm font-medium text-slate-700 mb-2">
                    <DollarSign className="w-4 h-4" />
                    <span>Price (KSh) *</span>
                  </label>
                  <input
                    type="number"
                    name="price"
                    value={formData.price}
                    onChange={handleInputChange}
                    placeholder="50.00"
                    min="0"
                    step="0.01"
                    className={`w-full px-4 py-3 border rounded-xl focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 transition-colors ${
                      errors.price ? 'border-red-300 bg-red-50' : 'border-slate-300'
                    }`}
                  />
                  {errors.price && (
                    <p className="mt-1 text-sm text-red-600 flex items-center space-x-1">
                      <AlertCircle className="w-4 h-4" />
                      <span>{errors.price}</span>
                    </p>
                  )}
                </div>
              </div>

              {/* Variety */}
              <div>
                <label className="flex items-center space-x-2 text-sm font-medium text-slate-700 mb-2">
                  <Scale className="w-4 h-4" />
                  <span>Variety *</span>
                </label>
                <input
                  type="text"
                  name="variety"
                  value={formData.variety}
                  onChange={handleInputChange}
                  placeholder="e.g., Cherry, Roma, Beefsteak"
                  className={`w-full px-4 py-3 border rounded-xl focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 transition-colors ${
                    errors.variety ? 'border-red-300 bg-red-50' : 'border-slate-300'
                  }`}
                />
                {errors.variety && (
                  <p className="mt-1 text-sm text-red-600 flex items-center space-x-1">
                    <AlertCircle className="w-4 h-4" />
                    <span>{errors.variety}</span>
                  </p>
                )}
              </div>

              {/* Location */}
              <div>
                <label className="flex items-center space-x-2 text-sm font-medium text-slate-700 mb-2">
                  <MapPin className="w-4 h-4" />
                  <span>Location *</span>
                </label>
                <input
                  type="text"
                  name="location"
                  value={formData.location}
                  onChange={handleInputChange}
                  placeholder="e.g., Nakuru, Kenya"
                  className={`w-full px-4 py-3 border rounded-xl focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 transition-colors ${
                    errors.location ? 'border-red-300 bg-red-50' : 'border-slate-300'
                  }`}
                />
                {errors.location && (
                  <p className="mt-1 text-sm text-red-600 flex items-center space-x-1">
                    <AlertCircle className="w-4 h-4" />
                    <span>{errors.location}</span>
                  </p>
                )}
              </div>
            </div>

            {/* Right Column */}
            <div className="space-y-6">
              {/* Image Upload */}
              <div>
                <label className="flex items-center space-x-2 text-sm font-medium text-slate-700 mb-2">
                  <Image className="w-4 h-4" />
                  <span>Product Image</span>
                </label>
                
                {imagePreview ? (
                  <div className="relative">
                    <img
                      src={imagePreview}
                      alt="Product preview"
                      className="w-full h-48 object-cover rounded-xl border border-slate-300"
                    />
                    <button
                      type="button"
                      onClick={removeImage}
                      className="absolute top-2 right-2 p-1 bg-red-500 text-white rounded-full hover:bg-red-600 transition-colors"
                    >
                      <X className="w-4 h-4" />
                    </button>
                  </div>
                ) : (
                  <div className="border-2 border-dashed border-slate-300 rounded-xl p-8 text-center hover:border-emerald-400 transition-colors">
                    <Upload className="w-12 h-12 text-slate-400 mx-auto mb-4" />
                    <p className="text-slate-600 mb-2">Click to upload product image</p>
                    <input
                      type="file"
                      accept="image/*"
                      onChange={handleImageChange}
                      className="hidden"
                      id="image-upload"
                    />
                    <label
                      htmlFor="image-upload"
                      className="cursor-pointer bg-emerald-500 text-white px-4 py-2 rounded-lg hover:bg-emerald-600 transition-colors"
                    >
                      Choose File
                    </label>
                  </div>
                )}
              </div>

              <div>
                <label className="flex items-center space-x-2 text-sm font-medium text-slate-700 mb-2">
                  <FileText className="w-4 h-4" />
                  <span>Description</span>
                </label>
                <textarea
                  name="description"
                  value={formData.description}
                  onChange={handleInputChange}
                  placeholder="Additional details about the product..."
                  rows={6}
                  className="w-full px-4 py-3 border border-slate-300 rounded-xl focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 transition-colors resize-none"
                />
              </div>
            </div>
          </div>

          <div className="mt-8 pt-6 border-t border-slate-200">
            <div className="flex space-x-4">
              <button
                type="button"
                onClick={handleSubmit}
                disabled={isSubmitting}
                className="flex-1 flex items-center justify-center space-x-2 bg-emerald-600 text-white px-6 py-3 rounded-xl font-medium hover:bg-emerald-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
              >
                {isSubmitting ? (
                  <>
                    <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                    <span>Creating Product...</span>
                  </>
                ) : (
                  <>
                    <Save className="w-5 h-5" />
                    <span>Create Product</span>
                  </>
                )}
              </button>
              
              <button
                type="button"
                onClick={handleCancel}
                className="px-6 py-3 border border-slate-300 text-slate-700 rounded-xl font-medium hover:bg-slate-50 transition-colors"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductForm;