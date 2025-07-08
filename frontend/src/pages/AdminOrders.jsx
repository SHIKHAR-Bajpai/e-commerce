import React, { useState, useEffect } from 'react';
import { ordersAPI } from '../services/api';
import { Link } from 'react-router-dom';
import { FiCheck, FiEye } from 'react-icons/fi';
import LoadingSpinner from '../components/LoadingSpinner';
import toast from 'react-hot-toast';

const AdminOrders = () => {
  const [orders, setOrders] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isUpdating, setIsUpdating] = useState(false);

  const fetchOrders = async () => {
    try {
      setIsLoading(true);
      setError(null);
      
      const response = await ordersAPI.getAllOrders();
      
      const ordersData = Array.isArray(response.data) ? response.data : response.data?.orders || [];
      setOrders(ordersData);
      
    } catch (err) {
      setError(err);
      toast.error('Failed to load orders');
    } finally {
      setIsLoading(false);
    }
  };

  const handleDeliver = async (id) => {
    if (!window.confirm('Mark this order as delivered?')) {
      return;
    }

    try {
      setIsUpdating(true);
      
      await ordersAPI.markAsDelivered(id);
      
      toast.success('Order marked as delivered');
      
      await fetchOrders();
      
    } catch (err) {
      toast.error('Failed to update order');
    } finally {
      setIsUpdating(false);
    }
  };

  useEffect(() => {
    fetchOrders();
  }, []);

  if (isLoading) return <LoadingSpinner size="lg" />;

  if (error) {
    return (
      <div className="max-w-5xl mx-auto px-4 py-8">
        <div className="text-center py-12">
          <h2 className="text-2xl font-bold mb-4">Error loading orders</h2>
          <p className="text-gray-600 mb-4">
            {error.message || 'Failed to load orders. Please try again.'}
          </p>
          <button 
            onClick={() => fetchOrders()} 
            className="btn btn-primary"
          >
            Retry
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-5xl mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold mb-6">Manage Orders</h1>
      
      {orders.length === 0 ? (
        <div className="text-center py-12">
          <h3 className="text-lg font-medium text-gray-900 mb-2">No orders found</h3>
          <p className="text-gray-600">
            There are no orders to display
          </p>
        </div>
      ) : (
        <div className="overflow-x-auto">
          <table className="min-w-full bg-white rounded-lg shadow">
            <thead>
              <tr>
                <th className="px-4 py-2">Order ID</th>
                <th className="px-4 py-2">User</th>
                <th className="px-4 py-2">Date</th>
                <th className="px-4 py-2">Total</th>
                <th className="px-4 py-2">Status</th>
                <th className="px-4 py-2">Actions</th>
              </tr>
            </thead>
            <tbody>
              {orders.map((order) => (
                <tr key={order._id} className="border-t">
                  <td className="px-4 py-2">{order._id.slice(-8).toUpperCase()}</td>
                  <td className="px-4 py-2">{order.user?.name || 'N/A'}</td>
                  <td className="px-4 py-2">{new Date(order.createdAt).toLocaleDateString()}</td>
                  <td className="px-4 py-2">${order.totalPrice.toFixed(2)}</td>
                  <td className="px-4 py-2">
                    {order.isDelivered ? (
                      <span className="badge bg-green-100 text-green-800">Delivered</span>
                    ) : (
                      <span className="badge bg-gray-100 text-gray-800">Not Delivered</span>
                    )}
                  </td>
                  <td className="px-4 py-2 space-x-2">
                    <Link 
                      to={`/orders/${order._id}`} 
                      className="btn btn-sm btn-outline"
                    >
                      <FiEye />
                    </Link>
                    {!order.isDelivered && (
                      <button 
                        onClick={() => handleDeliver(order._id)} 
                        disabled={isUpdating}
                        className="btn btn-sm btn-success"
                      >
                        <FiCheck />
                      </button>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default AdminOrders; 