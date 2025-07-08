import React from 'react';
import { Link } from 'react-router-dom';
import { FiBox, FiClipboard } from 'react-icons/fi';

const AdminDashboard = () => (
  <div className="max-w-3xl mx-auto px-4 py-12">
    <h1 className="text-3xl font-bold mb-6">Admin Dashboard</h1>
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      <Link to="/admin/products" className="bg-white rounded-lg shadow p-6 flex items-center hover:bg-gray-50 transition">
        <FiBox className="w-8 h-8 text-blue-600 mr-4" />
        <span className="text-lg font-semibold">Manage Products</span>
      </Link>
      <Link to="/admin/orders" className="bg-white rounded-lg shadow p-6 flex items-center hover:bg-gray-50 transition">
        <FiClipboard className="w-8 h-8 text-green-600 mr-4" />
        <span className="text-lg font-semibold">Manage Orders</span>
      </Link>
    </div>
  </div>
);

export default AdminDashboard; 