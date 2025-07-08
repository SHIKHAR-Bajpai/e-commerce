import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { productsAPI } from '../services/api';
import LoadingSpinner from '../components/LoadingSpinner';
import toast from 'react-hot-toast';

const AdminProductsEdit = () => {
  const { id } = useParams();
  const isEdit = Boolean(id);
  const navigate = useNavigate();
  
  const [product, setProduct] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState(null);

  const [form, setForm] = useState({
    name: '',
    price: '',
    category: '',
    stock: '',
    description: '',
    image: '',
  });

  const fetchProduct = async () => {
    if (!isEdit) return;
    
    try {
      setIsLoading(true);
      setError(null);
      
      const response = await productsAPI.getProductById(id);
      setProduct(response.data);
      
      setForm({
        name: response.data.name,
        price: response.data.price,
        category: response.data.category,
        stock: response.data.stock,
        description: response.data.description,
        image: response.data.image,
      });
      
    } catch (err) {
      setError(err);
      toast.error('Failed to load product');
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchProduct();
  }, [id]);

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (name === 'image' && files.length > 0) {
      setForm((f) => ({ ...f, image: files[0] }));
    } else {
      setForm((f) => ({ ...f, [name]: value }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    try {
      setIsSubmitting(true);
      
      const formData = new FormData();
      Object.entries(form).forEach(([key, value]) => {
        formData.append(key, value);
      });
      
      if (isEdit) {
        await productsAPI.updateProduct(id, formData);
        toast.success('Product updated');
      } else {
        await productsAPI.createProduct(formData);
        toast.success('Product created');
      }
      
      navigate('/admin/products');
      
    } catch (err) {
      toast.error('Failed to save product');
    } finally {
      setIsSubmitting(false);
    }
  };

  if (isEdit && isLoading) return <LoadingSpinner size="lg" />;

  if (error) {
    return (
      <div className="max-w-xl mx-auto px-4 py-8">
        <div className="text-center py-12">
          <h2 className="text-2xl font-bold mb-4">Error loading product</h2>
          <p className="text-gray-600 mb-4">
            {error.message || 'Failed to load product. Please try again.'}
          </p>
          <button 
            onClick={() => fetchProduct()} 
            className="btn btn-primary"
          >
            Retry
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-xl mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold mb-6">{isEdit ? 'Edit Product' : 'Add Product'}</h1>
      <form onSubmit={handleSubmit} className="space-y-4" encType="multipart/form-data">
        <div>
          <label className="block font-medium mb-1">Name</label>
          <input type="text" name="name" value={form.name} onChange={handleChange} className="input w-full" required />
        </div>
        <div>
          <label className="block font-medium mb-1">Price</label>
          <input type="number" name="price" value={form.price} onChange={handleChange} className="input w-full" required />
        </div>
        <div>
          <label className="block font-medium mb-1">Category</label>
          <input type="text" name="category" value={form.category} onChange={handleChange} className="input w-full" required />
        </div>
        <div>
          <label className="block font-medium mb-1">Stock</label>
          <input type="number" name="stock" value={form.stock} onChange={handleChange} className="input w-full" required />
        </div>
        <div>
          <label className="block font-medium mb-1">Description</label>
          <textarea name="description" value={form.description} onChange={handleChange} className="input w-full" required />
        </div>
        <div>
          <label className="block font-medium mb-1">Image</label>
          <input type="file" name="image" accept="image/*" onChange={handleChange} className="input w-full" />
          {form.image && typeof form.image === 'string' && (
            <img src={form.image} alt="Product" className="w-24 h-24 object-cover mt-2 rounded border" />
          )}
        </div>
        <button 
          type="submit" 
          disabled={isSubmitting}
          className="btn btn-primary w-full"
        >
          {isSubmitting ? 'Saving...' : (isEdit ? 'Update' : 'Create') + ' Product'}
        </button>
      </form>
    </div>
  );
};

export default AdminProductsEdit; 