'use client';

import React, { JSX, useState } from 'react';
import Image from 'next/image';
import Navbar from '@/components/Navbar';
import CoffeeForm from '@/components/forms/CoffeeForm';
import PotatoForm from '@/components/forms/PotatoForm';
import AvocadoForm from '@/components/forms/AvocadoForm';
import RiceForm from '@/components/forms/RiceForm';

type Product = {
  name: string;
  image: string;
  form: (onBack: () => void) => JSX.Element;
};

export default function ListingPage() {
  const [selectedProduct, setSelectedProduct] = useState<string | null>(null);

  const handleBack = () => setSelectedProduct(null);

  const products: Product[] = [
    {
      name: 'Coffee',
      image: '/images/Products_Images/Coffee.jpg',
      form: (onBack) => <CoffeeForm onBack={onBack} />,
    },
    {
      name: 'Potatoes',
      image: '/images/Products_Images/Potatoes.jpg',
      form: (onBack) => <PotatoForm onBack={onBack} />,
    },
    {
      name: 'Avocados',
      image: '/images/Products_Images/Avocado.jpg',
      form: (onBack) => <AvocadoForm onBack={onBack} />,
    },
    {
      name: 'Rice',
      image: '/images/Products_Images/Rice.jpg',
      form: (onBack) => <RiceForm onBack={onBack} />,
    },
  ];

  const selected = products.find((p) => p.name === selectedProduct);

  return (
    <>
      <Navbar />
      <main className="min-h-screen px-6 py-6 bg-white">
    
        {!selected && (
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-6xl mx-auto">
            {products.map((product) => (
              <div
                key={product.name}
                className={`border rounded-xl p-4 shadow-md cursor-pointer hover:shadow-lg transition ${
                  selectedProduct === product.name ? 'ring-2 ring-blue-500' : ''
                }`}
                onClick={() => setSelectedProduct(product.name)}
              >
                <Image
                  src={product.image}
                  alt={product.name}
                  width={300}
                  height={200}
                  className="rounded-md object-cover"
                />
                <p className="mt-2 text-center font-semibold text-gray-700">
                  {product.name}
                </p>
              </div>
            ))}
          </div>
        )}

        <div className="mt-4 max-w-3xl mx-auto">
          {selected ? (
            <>
            
              {selected.form(handleBack)}
            </>
          ) : (
            <p className="text-center text-gray-500 text-lg">
              Please select a product above to begin listing.
            </p>
          )}
        </div>
      </main>
    </>
  );
}
