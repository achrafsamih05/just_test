'use client';

import { useState, useEffect } from 'react';
import { getToken } from '@/lib/auth';
import Toast from '@/components/Toast';
import ProductTable from '@/components/dashboard/ProductTable';
import AddProductModal from '@/components/dashboard/modals/AddProductModal';
import EditProductModal from '@/components/dashboard/modals/EditProductModal';
import DeleteConfirmModal from '@/components/dashboard/modals/DeleteConfirmModal';
import type { Product } from '@/types';

type ToastType = 'success' | 'error' | 'info';

interface ToastMessage {
  id: string;
  type: ToastType;
  message: string;
}

export default function ProductsPage() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [toasts, setToasts] = useState<ToastMessage[]>([]);
  const [showAddModal, setShowAddModal] = useState(false);
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);
  const [deletingProduct, setDeletingProduct] = useState<Product | null>(null);

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      setLoading(true);
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/products?limit=100`);
      const data = await response.json();
      setProducts(data.data || []);
    } catch (error) {
      addToast('Failed to load products', 'error');
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const addToast = (message: string, type: ToastType = 'info') => {
    const id = Math.random().toString(36).slice(2, 11);
    const toast: ToastMessage = { id, type, message };
    setToasts((prev) => [...prev, toast]);

    setTimeout(() => {
      setToasts((prev) => prev.filter((t) => t.id !== id));
    }, 4000);
  };

  const handleAddProduct = async (formData: Partial<Product>) => {
    try {
      const token = getToken();
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/products/admin/products`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.error || 'Failed to create product');
      }

      const { product } = await response.json();
      setProducts((prev) => [product, ...prev]);
      setShowAddModal(false);
      addToast('Product added successfully', 'success');
    } catch (error: unknown) {
      const message = error instanceof Error ? error.message : 'Failed to add product';
      addToast(message, 'error');
      console.error(error);
    }
  };

  const handleEditProduct = async (formData: Partial<Product>) => {
    if (!editingProduct) return;

    try {
      const token = getToken();
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/products/admin/products/${editingProduct.id}`,
        {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify(formData),
        }
      );

      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.error || 'Failed to update product');
      }

      const { product } = await response.json();
      setProducts((prev) => prev.map((p) => (p.id === product.id ? product : p)));
      setEditingProduct(null);
      addToast('Product updated successfully', 'success');
    } catch (error: unknown) {
      const message = error instanceof Error ? error.message : 'Failed to update product';
      addToast(message, 'error');
      console.error(error);
    }
  };

  const handleDeleteProduct = async () => {
    if (!deletingProduct) return;

    try {
      const token = getToken();
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/products/admin/products/${deletingProduct.id}`,
        {
          method: 'DELETE',
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.error || 'Failed to delete product');
      }

      setProducts((prev) => prev.filter((p) => p.id !== deletingProduct.id));
      setDeletingProduct(null);
      addToast('Product deleted successfully', 'success');
    } catch (error: unknown) {
      const message = error instanceof Error ? error.message : 'Failed to delete product';
      addToast(message, 'error');
      console.error(error);
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold text-gray-900">Product Management</h2>
        <button
          onClick={() => setShowAddModal(true)}
          className="flex items-center px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition font-medium"
        >
          <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
          </svg>
          Add Product
        </button>
      </div>

      {loading ? (
        <div className="flex items-center justify-center py-12">
          <div className="animate-spin">
            <svg className="w-8 h-8 text-blue-600" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
            </svg>
          </div>
        </div>
      ) : products.length === 0 ? (
        <div className="text-center py-12 bg-white rounded-lg border border-gray-200">
          <svg className="w-12 h-12 text-gray-400 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-2.586a1 1 0 00-.707.293l-2.414 2.414a1 1 0 01-.707.293h-3.172a1 1 0 01-.707-.293l-2.414-2.414A1 1 0 006.586 13H4" />
          </svg>
          <p className="text-gray-500 text-lg">No products yet</p>
          <p className="text-gray-400 text-sm">Click &quot;Add Product&quot; to get started</p>
        </div>
      ) : (
        <ProductTable
          products={products}
          onEdit={setEditingProduct}
          onDelete={setDeletingProduct}
        />
      )}

      <div className="fixed bottom-4 right-4 space-y-2 z-50">
        {toasts.map((toast) => (
          <Toast key={toast.id} type={toast.type} message={toast.message} />
        ))}
      </div>

      {showAddModal && (
        <AddProductModal
          onClose={() => setShowAddModal(false)}
          onSubmit={handleAddProduct}
        />
      )}

      {editingProduct && (
        <EditProductModal
          product={editingProduct}
          onClose={() => setEditingProduct(null)}
          onSubmit={handleEditProduct}
        />
      )}

      {deletingProduct && (
        <DeleteConfirmModal
          product={deletingProduct}
          onConfirm={handleDeleteProduct}
          onCancel={() => setDeletingProduct(null)}
        />
      )}
    </div>
  );
}
