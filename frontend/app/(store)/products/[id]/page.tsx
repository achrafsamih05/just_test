'use client';

import { useEffect, useState } from 'react';
import { Product } from '@/types';
import { useCart } from '@/lib/store';
import Link from 'next/link';

interface ProductDetailPageProps {
  params: {
    id: string;
  };
}

export default function ProductDetailPage({ params }: ProductDetailPageProps) {
  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState(true);
  const [quantity, setQuantity] = useState(1);
  const [addedToCart, setAddedToCart] = useState(false);
  const addItem = useCart((state) => state.addItem);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        setLoading(true);
        const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/products/${params.id}`);
        const data = await response.json();
        setProduct(data.product);
      } catch (error) {
        console.error('Failed to load product:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchProduct();
  }, [params.id]);

  const handleAddToCart = () => {
    if (product) {
      addItem({
        id: product.id,
        name: product.name,
        price: product.price,
        quantity,
        image_url: product.image_url,
      });

      setAddedToCart(true);
      setTimeout(() => setAddedToCart(false), 2000);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin">
          <svg className="w-8 h-8 text-blue-600" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
          </svg>
        </div>
      </div>
    );
  }

  if (!product) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-900 mb-2">Product Not Found</h1>
          <p className="text-gray-600 mb-4">The product you're looking for doesn't exist.</p>
          <Link href="/shop" className="text-blue-600 hover:text-blue-700 font-medium">
            Back to Shop
          </Link>
        </div>
      </div>
    );
  }

  const isOutOfStock = product.stock_quantity === 0;

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Breadcrumb */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
        <Link href="/shop" className="text-blue-600 hover:text-blue-700 font-medium">
          ← Back to Shop
        </Link>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Product Image */}
          <div className="bg-white rounded-lg shadow overflow-hidden">
            {product.image_url ? (
              <img
                src={product.image_url}
                alt={product.name}
                className="w-full h-96 object-cover"
              />
            ) : (
              <div className="w-full h-96 bg-gray-200 flex items-center justify-center">
                <svg className="w-16 h-16 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
              </div>
            )}
          </div>

          {/* Product Info */}
          <div className="space-y-6">
            {/* Title and Rating */}
            <div>
              <h1 className="text-4xl font-bold text-gray-900 mb-2">{product.name}</h1>
              <div className="flex items-center space-x-4">
                <div className="flex text-yellow-400">
                  {[...Array(5)].map((_, i) => (
                    <svg
                      key={i}
                      className={`w-5 h-5 ${
                        i < Math.floor(product.rating) ? 'fill-current' : 'text-gray-300'
                      }`}
                      viewBox="0 0 20 20"
                    >
                      <path d="M10 15l-5.878 3.09 1.123-6.545L.489 6.91l6.572-.955L10 0l2.939 5.955 6.572.955-4.756 4.635 1.123 6.545z" />
                    </svg>
                  ))}
                </div>
                <span className="text-gray-600">({product.rating.toFixed(1)})</span>
              </div>
            </div>

            {/* Price and SKU */}
            <div className="bg-blue-50 rounded-lg p-6 space-y-2">
              <p className="text-3xl font-bold text-blue-600">${product.price.toFixed(2)}</p>
              {product.sku && (
                <p className="text-sm text-gray-600">SKU: {product.sku}</p>
              )}
            </div>

            {/* Stock Status */}
            <div className="space-y-2">
              <p className="font-semibold text-gray-900">Availability</p>
              {isOutOfStock ? (
                <p className="text-red-600 font-medium">Out of Stock</p>
              ) : (
                <p className="text-green-600 font-medium">
                  {product.stock_quantity} {product.stock_quantity === 1 ? 'unit' : 'units'} in stock
                </p>
              )}
            </div>

            {/* Description */}
            <div className="space-y-2">
              <p className="font-semibold text-gray-900">Description</p>
              <p className="text-gray-600 leading-relaxed">{product.description}</p>
            </div>

            {/* Add to Cart */}
            {!isOutOfStock ? (
              <div className="space-y-4 pt-4 border-t border-gray-200">
                <div className="space-y-2">
                  <label className="block font-semibold text-gray-900">Quantity</label>
                  <div className="flex items-center border border-gray-300 rounded-lg w-fit">
                    <button
                      onClick={() => setQuantity(Math.max(1, quantity - 1))}
                      disabled={quantity <= 1}
                      className="px-4 py-2 text-gray-600 hover:text-gray-900 disabled:text-gray-300"
                    >
                      −
                    </button>
                    <span className="px-6 py-2 text-lg font-medium border-l border-r border-gray-300">
                      {quantity}
                    </span>
                    <button
                      onClick={() => setQuantity(quantity + 1)}
                      className="px-4 py-2 text-gray-600 hover:text-gray-900"
                    >
                      +
                    </button>
                  </div>
                </div>

                <button
                  onClick={handleAddToCart}
                  className={`w-full px-6 py-3 rounded-lg font-semibold transition text-white ${
                    addedToCart
                      ? 'bg-green-500'
                      : 'bg-blue-600 hover:bg-blue-700'
                  }`}
                >
                  {addedToCart ? '✓ Added to Cart' : 'Add to Cart'}
                </button>
              </div>
            ) : (
              <button disabled className="w-full px-6 py-3 bg-gray-300 text-gray-600 rounded-lg font-semibold cursor-not-allowed">
                Out of Stock
              </button>
            )}

            {/* Related Info */}
            <div className="bg-gray-100 rounded-lg p-4 space-y-2 text-sm text-gray-600">
              <p>✓ Free shipping on orders over $50</p>
              <p>✓ 30-day money back guarantee</p>
              <p>✓ Secure checkout</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
