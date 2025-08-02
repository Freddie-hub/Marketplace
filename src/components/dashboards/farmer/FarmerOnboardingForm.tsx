import { useState } from "react";
import { useMutation } from "@apollo/client";
import { UPDATE_FARMER_PAYMENT_DETAILS } from "../../../app/graphql/updateFarmerPaymentDetailsMutation";

export default function FarmerOnboardingForm({ onSuccess }: { onSuccess: () => void }) {
  const [mpesaNumber, setMpesaNumber] = useState("");
  const [error, setError] = useState<string | null>(null);

  const [updateFarmerPaymentDetails, { loading }] = useMutation(UPDATE_FARMER_PAYMENT_DETAILS, {
    onCompleted: (data) => {
      if (data.updateFarmerPaymentDetails.success) {
        setError(null);
        setMpesaNumber("");
        onSuccess();
      } else {
        setError(data.updateFarmerPaymentDetails.message);
      }
    },
    onError: (err) => {
      setError(err.message);
    },
  });

  const validateMpesaNumber = (number: string) => {
    const mpesaRegex = /^07\d{8}$/;
    return mpesaRegex.test(number);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateMpesaNumber(mpesaNumber)) {
      setError("Please enter a valid 10-digit Mpesa number starting with 07");
      return;
    }
    updateFarmerPaymentDetails({ variables: { mpesaNumber } });
  };

  return (
    <div className="w-full max-w-md rounded-lg bg-white p-6 shadow-md">
      <h2 className="mb-4 text-xl font-bold text-gray-800">Complete Your Onboarding</h2>
      <p className="mb-4 text-gray-600">Please provide your Mpesa number to receive payments.</p>
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label htmlFor="mpesaNumber" className="block text-sm font-medium text-gray-700">
            Mpesa Number
          </label>
          <input
            type="text"
            id="mpesaNumber"
            value={mpesaNumber}
            onChange={(e) => setMpesaNumber(e.target.value)}
            className="mt-1 w-full rounded-md border border-gray-300 p-2 focus:border-blue-500 focus:outline-none"
            placeholder="e.g., 07xxxxxxxx"
            disabled={loading}
          />
        </div>
        {error && (
          <p className="mb-4 rounded bg-red-100 p-2 text-sm text-red-700">{error}</p>
        )}
        <button
          type="submit"
          disabled={loading}
          className="w-full rounded-md bg-blue-500 px-4 py-2 text-white hover:bg-blue-600 disabled:bg-gray-400"
        >
          {loading ? "Submitting..." : "Submit"}
        </button>
      </form>
    </div>
  );
}