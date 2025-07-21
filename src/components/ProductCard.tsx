import Link from 'next/link';
import type { Product } from '@/lib/mock-data';
import Image from 'next/image';

interface ProductCardProps {
  product: Product;
}

export default function ProductCard({ product }: ProductCardProps) {
  return (
    <div className="bg-white rounded-2xl shadow-lg overflow-hidden group transition-all duration-300 hover:shadow-xl hover:-translate-y-1">
      <div className="relative">
        <Image
          src={product.image}
          width={900}
          height={600}
          alt={product.name} 
          className="w-full h-48 object-cover" 
        />
        <div className="absolute top-2 right-2 bg-[#FF990B] text-white text-xs font-bold px-3 py-1 rounded-full">
          Grade {product.grade}
        </div>
      </div>

      <div className="p-5">
        <h3 className="text-xl font-bold text-[#205D5A] truncate">{product.name}</h3>
        <p className="text-sm text-gray-500 mb-3">{product.variety} Variety</p>
        
        <p className="text-2xl font-black text-[#476869] mb-4">
          Ksh{product.price.toFixed(2)} <span className="text-base font-normal text-gray-600">/ kg</span>
        </p>

        <div className="flex items-center text-sm text-gray-600 mb-4">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1.5 text-[#00A79D]" viewBox="0 0 20 20" fill="currentColor">
            <path d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" />
          </svg>
          <span>Farmer: {product.farmer.Fname} {product.farmer.Lname}</span>
        </div>

        <Link href={`/products/${product.id}`}>
          <button className="w-full bg-[#00A79D] text-white py-2.5 rounded-xl hover:bg-[#205D5A] transition-colors duration-300 font-semibold focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#00A79D]">
            View Details
          </button>
        </Link>
      </div>
    </div>
  );
}