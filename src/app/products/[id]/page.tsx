'use client';

import { useState } from 'react';
import { mockProducts } from '@/lib/mock-data';
import type { Product } from '@/lib/mock-data';
import Navbar from "@/components/Navbar"
import Image from 'next/image';


export default function ProductDetailPage({ params }: { params: { id: string } }) {
  const [quantity, setQuantity] = useState(1);

  const product: Product | undefined = mockProducts.find(p => p.id === parseInt(params.id));

  if (!product) {
    return <div>Product not found.</div>;
  }
  
  const handleQuantityChange = (amount: number) => {
    setQuantity(prev => Math.max(1, prev + amount));
  };

  return (
    <div className="bg-gray-50 min-h-screen">
      <Navbar/>
      <main className="container mx-auto p-4 md:p-8 mt-6">
        <div className="bg-white rounded-2xl shadow-xl p-6 md:p-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 md:gap-12">
            
            <div>
              <Image
                width={900}
                height={900}
                src={product.image} 
                alt={product.name} 
                className="w-full h-auto rounded-xl shadow-lg object-cover"
              />
            </div>

            <div className="flex flex-col space-y-4">
              <h1 className="text-4xl font-extrabold text-[#205D5A]">{product.name}</h1>
              <span className="text-lg font-medium text-gray-500">{product.variety} Variety - Grade {product.grade}</span>
              
              <p className="text-3xl font-black text-[#476869]">
                Ksh {product.price.toFixed(2)}
                <span className="text-lg font-normal text-gray-600"> / per kg</span>
              </p>

              <div className="border-t border-gray-200 pt-4">
                <h3 className="text-lg font-semibold text-[#205D5A] mb-2">Description</h3>
                <p className="text-gray-700 leading-relaxed">{product.description}</p>
              </div>

              <div className="bg-teal-50 border-l-4 border-[#00A79D] p-4 rounded-r-lg space-y-2">
                <div className="flex items-center">
                  <span className="font-bold text-[#205D5A] w-28">Available:</span>
                  <span className="font-semibold text-gray-800">{product.currentStock} kg left in stock</span>
                </div>
                <div className="flex items-center">
                  <span className="font-bold text-[#205D5A] w-28">Warehouse:</span>
                  <span className="text-gray-800">{product.warehouse.name}</span>
                </div>
                <div className="flex items-center">
                  <span className="font-bold text-[#205D5A] w-28">Location:</span>
                  <span className="text-gray-800">{product.warehouse.location}</span>
                </div>
              </div>

              <div className="flex flex-col sm:flex-row items-center gap-4 pt-4">
                <div className="flex items-center border-2 border-gray-200 rounded-xl">
                  <button onClick={() => handleQuantityChange(-1)} className="px-4 py-2 font-bold text-2xl text-gray-600 hover:bg-gray-100 rounded-l-lg">-</button>
                  <input type="text" value={quantity} readOnly className="w-16 text-center font-bold text-lg border-none focus:ring-0" />
                  <button onClick={() => handleQuantityChange(1)} className="px-4 py-2 font-bold text-2xl text-gray-600 hover:bg-gray-100 rounded-r-lg">+</button>
                </div>
                <button className="w-full sm:w-auto flex-grow bg-[#FF990B] text-white py-3 px-8 rounded-xl hover:bg-orange-500 transition-colors duration-300 font-bold text-lg">
                  Add to Cart
                </button>
              </div>

            </div>
          </div>
        </div>
      </main>
    </div>
  );
}