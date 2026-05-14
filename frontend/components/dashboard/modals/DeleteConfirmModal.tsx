'use client';

import Modal from '@/components/Modal';
import { Product } from '@/types';

interface DeleteConfirmModalProps {
  product: Product;
  onConfirm: () => Promise<void>;
  onCancel: () => void;
}

export default function DeleteConfirmModal({ product, onConfirm, onCancel }: DeleteConfirmModalProps) {
  return (
    <Modal title="Delete Product" onClose={onCancel}>
      <div className="space-y-4">
        <p className="text-gray-600">
          Are you sure you want to delete <strong>{product.name}</strong>? This action cannot be undone.
        </p>

        <div className="bg-red-50 border border-red-200 rounded-lg p-4">
          <p className="text-sm text-red-800">
            <strong>Warning:</strong> This will permanently remove the product from your catalog.
          </p>
        </div>

        <div className="flex items-center justify-end space-x-3 mt-6 pt-4 border-t border-gray-200">
          <button
            onClick={onCancel}
            className="px-4 py-2 text-gray-700 hover:text-gray-900 font-medium"
          >
            Cancel
          </button>
          <button
            onClick={onConfirm}
            className="px-4 py-2 bg-red-600 hover:bg-red-700 text-white rounded-lg font-medium transition"
          >
            Delete Product
          </button>
        </div>
      </div>
    </Modal>
  );
}
