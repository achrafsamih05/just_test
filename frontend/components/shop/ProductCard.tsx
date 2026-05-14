'use client';

import Image from 'next/image';
import Link from 'next/link';
import { Product } from '@/types';
import { useCart } from '@/lib/store';
import { useState } from 'react';

interface ProductCardProps {
  product: Product;
}

export default function ProductCard({ product }: ProductCardProps) {
  const addItem = useCart((state) => state.addItem);
  const [quantity, setQuantity] = useState(1);
  const [addedToCart, setAddedToCart] = useState(false);

  const handleAddToCart = () => {
    addItem({
      id: product.id,
      name: product.name,
      price: product.price,
      quantity,
      image_url: product.image_url,
    });

    setAddedToCart(true);
    setTimeout(() => setAddedToCart(false), 2000);
    setQuantity(1);
  };

  const isOutOfStock = product.stock_quantity === 0;

  return (
    <div className="bg-white rounded-lg shadow hover:shadow-lg transition overflow-hidden flex flex-col h-full">
      {/* Image */}
      <Link href={`/products/${product.id}`} className="block relative bg-gray-100 overflow-hidden h-48">
        {product.image_url ? (
          <img
            src={product.image_url}
            alt={product.name}
            className="w-full h-full object-cover hover:scale-105 transition duration-300"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center bg-gray-200">
            <svg className="w-12 h-12 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
              />
            </svg>
          </div>
        )}

        {/* Out of Stock Badge */}
        {isOutOfStock && (
          <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center">
            <span className="text-white font-bold text-lg">Out of Stock</span>
          </div>
        )}

        {/* Stock Badge */}
        {!isOutOfStock && (
          <div className="absolute top-3 right-3 bg-green-500 text-white px-3 py-1 rounded-full text-xs font-medium">
            In Stock
          </div>
        )}
      </Link>

      {/* Content */}
      <div className="flex flex-col flex-1 p-4">
        {/* Title */}
        <Link href={`/products/${product.id}`} className="group">
          <h3 className="font-semibold text-gray-900 line-clamp-2 group-hover:text-blue-600 transition">
            {product.name}
          </h3>
        </Link>

        {/* Description */}
        <p className="text-sm text-gray-600 line-clamp-2 mt-1 mb-2">
          {product.description}
        </p>

        {/* Rating */}
        <div className="flex items-center mb-2">
          <div className="flex text-yellow-400">
            {[...Array(5)].map((_, i) => (
              <svg
                key={i}
                className={`w-4 h-4 ${
                  i < Math.floor(product.rating) ? 'fill-current' : 'text-gray-300'
                }`}
                viewBox="0 0 20 20"
              >
                <path d="M10 15l-5.878 3.09 1.123-6.545L.489 6.91l6.572-.955L10 0l2.939 5.955 6.572.955-4.756 4.635 1.123 6.545z" />
              </svg>
            ))}
          </div>
          <span className="ml-2 text-sm text-gray-600">({product.rating.toFixed(1)})</span>
        </div>

        {/* Price and Stock */}
        <div className="flex items-center justify-between mt-auto pt-2 border-t border-gray-200">
          <div>
            <p className="text-xl font-bold text-blue-600">${product.price.toFixed(2)}</p>
            <p className="text-xs text-gray-500 mt-1">
              {product.stock_quantity} {product.stock_quantity === 1 ? 'unit' : 'units'} available
            </p>
          </div>
        </div>

        {/* Actions */}
        <div className="flex items-center gap-2 mt-4">
          {!isOutOfStock ? (
            <>
              <div className="flex items-center border border-gray-300 rounded-lg">
                <button
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  disabled={quantity <= 1}
                  className="px-2 py-1 text-gray-600 hover:text-gray-900 disabled:text-gray-300"
                >
                  −
                </button>
                <span className="px-3 py-1 text-sm font-medium border-l border-r border-gray-300">
                  {quantity}
                </span>
                <button
                  onClick={() => setQuantity(quantity + 1)}
                  className="px-2 py-1 text-gray-600 hover:text-gray-900"
                >
                  +
                </button>
              </div>
              <button
                onClick={handleAddToCart}
                className={`flex-1 px-4 py-2 rounded-lg font-medium transition ${
                  addedToCart
                    ? 'bg-green-500 text-white'
                    : 'bg-blue-600 hover:bg-blue-700 text-white'
                }`}
              >
                {addedToCart ? '✓ Added' : 'Add to Cart'}
              </button>
            </>
          ) : (
            <button disabled className="w-full px-4 py-2 bg-gray-300 text-gray-600 rounded-lg font-medium cursor-not-allowed">
              Out of Stock
            </button>
          )}
        </div>

        {/* View Details */}
        <Link
          href={`/products/${product.id}`}
          className="mt-2 w-full px-4 py-2 border border-gray-300 hover:bg-gray-50 rounded-lg text-center text-sm font-medium transition"
        >
          View Details
        </Link>
      </div>
    </div>
  );
}
