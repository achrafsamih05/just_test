'use client';

import Link from 'next/link';

export default function DashboardHomePage() {
  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold text-gray-900">Welcome back</h2>
        <p className="text-gray-600 mt-1">Manage your store from here.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Link
          href="/dashboard/products"
          className="bg-white border border-gray-200 rounded-lg p-6 hover:border-blue-500 hover:shadow transition"
        >
          <h3 className="text-lg font-semibold text-gray-900 mb-1">Products</h3>
          <p className="text-sm text-gray-600">Create, edit and remove products in your catalog.</p>
        </Link>
      </div>
    </div>
  );
}
