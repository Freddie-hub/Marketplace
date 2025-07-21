import React from 'react';
import Navbar from '../components/Navbar';
import HeroBanner from '../components/HeroBanner'; 
import Footer from '@/components/footer';
import ProductCard from '@/components/ProductCard';
import { mockProducts } from '@/lib/mock-data';

const Home = () => {
  return (
    <>
      <Navbar />
      <HeroBanner />
      <main className="container mx-auto px-4 py-8 md:py-12">
        <div className="text-center mb-10">
          <h2 className="text-4xl font-extrabold text-[#205D5A]">Freshly Harvested Coffee</h2>
          <p className="mt-2 text-lg text-gray-600">Directly from our network of dedicated farmers.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {mockProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </main>
      <Footer />
    </>
  );
};

export default Home;
