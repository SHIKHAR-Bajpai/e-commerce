import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { cartAPI, ordersAPI } from '../services/api';
import { useCart } from '../contexts/CartContext';
import { FiTrash2, FiShoppingCart, FiArrowLeft, FiCreditCard } from 'react-icons/fi';
import LoadingSpinner from '../components/LoadingSpinner';
import toast from 'react-hot-toast';

const Cart = () => {
  const [cartItems, setCartItems] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isUpdating, setIsUpdating] = useState(false);
  const [isCheckingOut, setIsCheckingOut] = useState(false);
  const { updateCart } = useCart();
  const navigate = useNavigate();

  const fetchCart = async () => {
    try {
      setIsLoading(true);
      setError(null);
      
      const response = await cartAPI.get();
      setCartItems(response.data.items || []);
      
    } catch (err) {
      setError(err);
      toast.error('Failed to load cart');
    } finally {
      setIsLoading(false);
    }
  };

  const handleQuantityChange = async (productId, newQuantity) => {
    try {
      setIsUpdating(true);
      
      await cartAPI.updateItem(productId, newQuantity);
      setCartItems(prev => 
        prev.map(item => 
          item.product._id === productId 
            ? { ...item, quantity: newQuantity }
            : item
        )
      );
      
      toast.success('Cart updated');
      
    } catch (err) {
      toast.error('Failed to update cart');
    } finally {
      setIsUpdating(false);
    }
  };

  const handleRemoveItem = async (productId) => {
    try {
      setIsUpdating(true);
      
      await cartAPI.removeItem(productId);
      setCartItems(prev => prev.filter(item => item.product._id !== productId));
      
      toast.success('Item removed from cart');
      
    } catch (err) {
      toast.error('Failed to remove item');
    } finally {
      setIsUpdating(false);
    }
  };

  const handleClearCart = async () => {
    if (!window.confirm('Are you sure you want to clear your cart?')) {
      return;
    }

    try {
      setIsUpdating(true);
      
      await cartAPI.clear();
      setCartItems([]);
      
      toast.success('Cart cleared');
      
    } catch (err) {
      toast.error('Failed to clear cart');
    } finally {
      setIsUpdating(false);
    }
  };

  const handleCheckout = async () => {
    try {
      setIsCheckingOut(true);
      
      const orderData = {
        shippingAddress: {
          address: '123 Main St',
          city: 'New York',
          postalCode: '10001',
          country: 'USA'
        },
        paymentMethod: 'PayPal'
      };

      const response = await ordersAPI.create(orderData);
      
      await cartAPI.clear();
      setCartItems([]);
      
      toast.success('Order placed successfully!');
      navigate(`/orders/${response.data._id}`);
      
    } catch (err) {
      toast.error('Failed to place order');
    } finally {
      setIsCheckingOut(false);
    }
  };

  useEffect(() => {
    fetchCart();
  }, []);

  const subtotal = cartItems.reduce((sum, item) => sum + (item.product.price * item.quantity), 0);
  const tax = subtotal * 0.1;
  const shipping = subtotal > 100 ? 0 : 10;
  const total = subtotal + tax + shipping;

  if (isLoading) return <LoadingSpinner size="lg" />;

  if (error) {
    return (
      <div className="max-w-4xl mx-auto px-4 py-8">
        <div className="text-center py-12">
          <h2 className="text-2xl font-bold mb-4">Error loading cart</h2>
          <p className="text-gray-600 mb-4">
            {error.message || 'Failed to load cart. Please try again.'}
          </p>
          <button 
            onClick={() => fetchCart()} 
            className="btn btn-primary"
          >
            Retry
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <div className="flex items-center mb-8">
        <Link to="/products" className="btn btn-outline mr-2 flex items-center">
          <FiArrowLeft className="mr-2" />
          Continue Shopping
        </Link>
        <h1 className="text-3xl font-bold">Shopping Cart</h1>
      </div>
      {cartItems.length === 0 ? (
        <div className="text-center py-12">
          <div className="text-gray-400 mb-4">
            <FiShoppingCart className="w-16 h-16 mx-auto" />
          </div>
          <h2 className="text-2xl font-bold mb-4">Your cart is empty</h2>
          <p className="text-gray-600 mb-6">
            Looks like you haven't added any items to your cart yet.
          </p>
          <Link to="/products" className="btn btn-primary">
            Start Shopping
          </Link>
        </div>
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2">
            <div className="bg-white rounded-lg shadow-sm border border-gray-200">
              <div className="p-6 border-b border-gray-200">
                <h2 className="text-xl font-semibold">Cart Items ({cartItems.length})</h2>
              </div>
              <div className="divide-y divide-gray-200">
                {cartItems.map((item) => (
                  <div key={item._id} className="p-6 flex items-center space-x-4">
                    <img
                      src={item.product.image}
                      alt={item.product.name}
                      className="w-20 h-20 object-cover rounded-lg"
                    />
                    <div className="flex-1">
                      <h3 className="text-lg font-semibold">{item.product.name}</h3>
                      <p className="text-gray-600">${item.product.price}</p>
                    </div>
                    <div className="flex items-center space-x-2">
                      <select
                        value={item.quantity}
                        onChange={(e) => handleQuantityChange(item.product._id, parseInt(e.target.value))}
                        disabled={isUpdating}
                        className="input w-20"
                      >
                        {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((num) => (
                          <option key={num} value={num}>
                            {num}
                          </option>
                        ))}
                      </select>
                      <button
                        onClick={() => handleRemoveItem(item.product._id)}
                        disabled={isUpdating}
                        className="btn btn-sm btn-danger"
                      >
                        <FiTrash2 />
                      </button>
                    </div>
                    <div className="text-right">
                      <p className="text-lg font-semibold">
                        ${(item.product.price * item.quantity).toFixed(2)}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
              <div className="p-6 border-t border-gray-200">
                <button
                  onClick={handleClearCart}
                  disabled={isUpdating}
                  className="btn btn-outline btn-danger"
                >
                  Clear Cart
                </button>
              </div>
            </div>
          </div>

          <div className="lg:col-span-1">
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
              <h2 className="text-xl font-semibold mb-4">Order Summary</h2>
              <div className="space-y-3">
                <div className="flex justify-between">
                  <span>Subtotal</span>
                  <span>${subtotal.toFixed(2)}</span>
                </div>
                <div className="flex justify-between">
                  <span>Tax (10%)</span>
                  <span>${tax.toFixed(2)}</span>
                </div>
                <div className="flex justify-between">
                  <span>Shipping</span>
                  <span>{shipping === 0 ? 'Free' : `$${shipping.toFixed(2)}`}</span>
                </div>
                <div className="border-t pt-3">
                  <div className="flex justify-between font-semibold text-lg">
                    <span>Total</span>
                    <span>${total.toFixed(2)}</span>
                  </div>
                </div>
              </div>
              <button
                onClick={handleCheckout}
                disabled={isCheckingOut || cartItems.length === 0}
                className="btn btn-primary w-full mt-6 flex items-center justify-center"
              >
                {isCheckingOut ? (
                  <>
                    <LoadingSpinner size="sm" className="mr-2" />
                    Processing...
                  </>
                ) : (
                  'Proceed to Checkout'
                )}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Cart; 