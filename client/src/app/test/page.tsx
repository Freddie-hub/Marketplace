'use client';

import { db } from "@/lib/firebase";
import { addDoc, collection, serverTimestamp } from "firebase/firestore";
import { useState } from "react";

export default function TestPage() {
  const [loading, setLoading] = useState(false);

  const handleAddCoffee = async () => {
    setLoading(true);
    try {
      await addDoc(collection(db, "coffeeListings"), {
        farmerId: "F123",
        county: "Kirinyaga",
        createdAt: serverTimestamp(),
        unitPrice: 350,
        quantity: {
          unit: "kg",
          count: 10,
          minOrder: 2,
          totalWeight: 500
        },
        warehouse: {
          name: "CoffeeCo Warehouse",
          code: "WH-001"
        },
        metadata: {
          millerCode: "M456",
          processingMethod: "washed",
          grade: "AA",
          cuppingScore: 85,
          cupperDetails: "John Doe"
        }
      });
      alert("Coffee listing added.");
    } catch (err) {
      console.error(err);
      alert("Failed to add.");
    }
    setLoading(false);
  };

  return (
    <div className="p-8">
      <h1 className="text-xl font-bold mb-4">Test Coffee Listing</h1>
      <button
        className="px-4 py-2 bg-green-600 text-white rounded"
        onClick={handleAddCoffee}
        disabled={loading}
      >
        {loading ? "Adding..." : "Add Coffee Listing"}
      </button>
    </div>
  );
}
