import React, { useState, useEffect } from 'react';
import { productsAPI } from '../services/api';
import { Link } from 'react-router-dom';
import { FiEdit, FiTrash2, FiPlus } from 'react-icons/fi';
import LoadingSpinner from '../components/LoadingSpinner';
import toast from 'react-hot-toast';

const AdminProducts = () => {
  const [products, setProducts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isDeleting, setIsDeleting] = useState(false);

  const fetchProducts = async () => {
    try {
      setIsLoading(true);
      setError(null);
      
      const response = await productsAPI.getAllForAdmin();
      setProducts(response.data);
      
    } catch (err) {
      setError(err);
      toast.error('Failed to load products');
    } finally {
      setIsLoading(false);
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Are you sure you want to delete this product?')) {
      return;
    }

    try {
      setIsDeleting(true);
      
      await productsAPI.deleteProduct(id);
      
      toast.success('Product deleted');
      
      await fetchProducts();
      
    } catch (err) {
      toast.error('Failed to delete product');
    } finally {
      setIsDeleting(false);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  if (isLoading) return <LoadingSpinner size="lg" />;

  if (error) {
    return (
      <div className="max-w-5xl mx-auto px-4 py-8">
        <div className="text-center py-12">
          <h2 className="text-2xl font-bold mb-4">Error loading products</h2>
          <p className="text-gray-600 mb-4">
            {error.message || 'Failed to load products. Please try again.'}
          </p>
          <button 
            onClick={() => fetchProducts()} 
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
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Manage Products</h1>
        <Link to="/admin/products/new" className="btn btn-primary inline-flex items-center">
          <FiPlus className="mr-2" />
          Add Product
        </Link>
      </div>
      
      <div className="overflow-x-auto">
        <table className="min-w-full bg-white rounded-lg shadow">
          <thead>
            <tr className='text-left'>
              <th className="px-4 py-2">Name</th>
              <th className="px-4 py-2">Category</th>
              <th className="px-4 py-2 text-center">Price</th>
              <th className="px-4 py-2 text-center">Stock</th>
              <th className="px-4 py-2 text-center">Actions</th>
            </tr>
          </thead>
          <tbody>
            {products.map((product) => (
              <tr key={product._id} className="border-t">
                <td className="px-4 py-2">{product.name}</td>
                <td className="px-4 py-2 ">{product.category}</td>
                <td className="px-4 py-2 text-center">${product.price.toFixed(2)}</td>
                <td className="px-4 py-2 text-center">{product.stock}</td>
                <td className="px-4 py-2 space-x-2 flex justify-center items-center">
                  <Link 
                    to={`/admin/products/edit/${product._id}`} 
                    className="btn btn-sm btn-outline"
                  >
                    <FiEdit />
                  </Link>
                  <button 
                    onClick={() => handleDelete(product._id)} 
                    disabled={isDeleting}
                    className="btn btn-sm btn-danger"
                  >
                    <FiTrash2 />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      
      {products.length === 0 && !isLoading && (
        <div className="text-center py-12">
          <h3 className="text-lg font-medium text-gray-900 mb-2">No products found</h3>
          <p className="text-gray-600">
            Start by adding your first product
          </p>
        </div>
      )}
    </div>
  );
};

export default AdminProducts; 