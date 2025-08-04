import { useState } from "react";
import { useMutation, useQuery } from "@apollo/client";
import { gql } from "@apollo/client";
import { InviteFarmerInput, CropInput, InvitationResponse } from '../../../types/InvitationTypes';

const PRODUCTS_BY_WAREHOUSE = gql`
  query ProductsByWarehouse($warehouseId: Int!) {
    ProductsByWarehouse(warehouseId: $warehouseId) {
      product {
        id
        name
      }
    }
  }
`;

const INVITE_FARMER = gql`
  mutation InviteFarmer($input: InviteFarmerInput!) {
    inviteFarmer(input: $input) {
      success
      message
    }
  }
`;

interface InviteFarmerFormProps {
  warehouseId: number;
  onClose: () => void;
}

export default function InviteFarmerForm({ warehouseId, onClose }: InviteFarmerFormProps) {
  const [formData, setFormData] = useState<InviteFarmerInput>({
    name: "",
    email: "",
    crops: [],
    warehouseId,
  });
  const [cropQuantities, setCropQuantities] = useState<{ [key: string]: number }>({});
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);

  const { data, loading: productsLoading, error: productsError } = useQuery(PRODUCTS_BY_WAREHOUSE, {
    variables: { warehouseId },
  });

  const [inviteFarmer, { loading: mutationLoading }] = useMutation(INVITE_FARMER, {
    onCompleted: (data) => {
      if (data.inviteFarmer.success) {
        setSuccess(data.inviteFarmer.message);
        setError(null);
        setFormData({ name: "", email: "", crops: [], warehouseId });
        setCropQuantities({});
        setTimeout(onClose, 3000);
      } else {
        setError(data.inviteFarmer.message);
        setSuccess(null);
      }
    },
    onError: (err) => {
      setError(err.message);
      setSuccess(null);
    },
  });

  const validateEmail = (email: string) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const handleCropChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedOptions = Array.from(e.target.selectedOptions).map((option) => ({
      name: option.text,
      quantity: cropQuantities[option.value] || 1,
    }));
    setFormData({ ...formData, crops: selectedOptions });
  };

  const handleQuantityChange = (productId: string, quantity: number) => {
    setCropQuantities({ ...cropQuantities, [productId]: quantity });
    const updatedCrops = formData.crops.map((crop) =>
      crop.name === data?.ProductsByWarehouse.product.find((p: any) => p.id === Number(productId))?.name
        ? { ...crop, quantity }
        : crop
    );
    setFormData({ ...formData, crops: updatedCrops });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name.trim()) {
      setError("Farmer name is required");
      return;
    }
    if (!validateEmail(formData.email)) {
      setError("Please enter a valid email address");
      return;
    }
    if (formData.crops.length === 0) {
      setError("At least one crop must be selected");
      return;
    }
    if (formData.crops.some((crop) => crop.quantity <= 0)) {
      setError("Crop quantities must be positive");
      return;
    }
    setError(null);
    inviteFarmer({ variables: { input: formData } });
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
      <div className="w-full max-w-md rounded-lg bg-white p-6 shadow-md">
        <h2 className="mb-4 text-xl font-bold text-gray-800">Invite Farmer</h2>
        <p className="mb-4 text-gray-600">Invite a farmer to join your warehouse.</p>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label htmlFor="name" className="block text-sm font-medium text-gray-700">
              Farmer Name
            </label>
            <input
              type="text"
              id="name"
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              className="mt-1 w-full rounded-md border border-gray-300 p-2 focus:border-blue-500 focus:outline-none"
              placeholder="Enter farmer's name"
              disabled={mutationLoading}
            />
          </div>
          <div className="mb-4">
            <label htmlFor="email" className="block text-sm font-medium text-gray-700">
              Email
            </label>
            <input
              type="email"
              id="email"
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              className="mt-1 w-full rounded-md border border-gray-300 p-2 focus:border-blue-500 focus:outline-none"
              placeholder="Enter farmer's email"
              disabled={mutationLoading}
            />
          </div>
          <div className="mb-4">
            <label htmlFor="crops" className="block text-sm font-medium text-gray-700">
              Crops
            </label>
            {productsLoading && <p className="text-gray-600">Loading crops...</p>}
            {productsError && (
              <p className="rounded bg-red-100 p-2 text-sm text-red-700">Error loading crops: {productsError.message}</p>
            )}
            {data && (
              <select
                multiple
                id="crops"
                onChange={handleCropChange}
                className="mt-1 w-full rounded-md border border-gray-300 p-2 focus:border-blue-500 focus:outline-none"
                disabled={mutationLoading}
              >
                {data.ProductsByWarehouse.product.map((product: any) => (
                  <option key={product.id} value={product.id}>
                    {product.name}
                  </option>
                ))}
              </select>
            )}
          </div>
          {formData.crops.length > 0 && (
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700">Crop Quantities</label>
              {formData.crops.map((crop) => (
                <div key={crop.name} className="mt-2 flex items-center">
                  <span className="mr-2 w-1/2 text-sm text-gray-600">{crop.name}</span>
                  <input
                    type="number"
                    min="1"
                    value={crop.quantity}
                    onChange={(e) =>
                      handleQuantityChange(
                        data?.ProductsByWarehouse.product.find((p: any) => p.name === crop.name)?.id.toString(),
                        Number(e.target.value)
                      )
                    }
                    className="w-1/2 rounded-md border border-gray-300 p-2 focus:border-blue-500 focus:outline-none"
                    placeholder="Quantity"
                    disabled={mutationLoading}
                  />
                </div>
              ))}
            </div>
          )}
          {error && (
            <p className="mb-4 rounded bg-red-100 p-2 text-sm text-red-700">{error}</p>
          )}
          {success && (
            <p className="mb-4 rounded bg-green-100 p-2 text-sm text-green-700">{success}</p>
          )}
          <div className="flex justify-end space-x-2">
            <button
              type="button"
              onClick={onClose}
              disabled={mutationLoading}
              className="rounded-md bg-gray-300 px-4 py-2 text-gray-800 hover:bg-gray-400"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={mutationLoading}
              className="rounded-md bg-blue-500 px-4 py-2 text-white hover:bg-blue-600 disabled:bg-gray-400"
            >
              {mutationLoading ? "Sending..." : "Send Invitation"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}