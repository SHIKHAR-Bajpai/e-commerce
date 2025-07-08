import React, { createContext, useContext, useState, useEffect } from 'react';
import { cartAPI } from '../services/api';
import toast from 'react-hot-toast';

const CartContext = createContext();

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
};

export const CartProvider = ({ children }) => {
  const [cart, setCart] = useState({ items: [], total: 0 });
  const [isLoading, setIsLoading] = useState(false);

  const fetchCart = async () => {
    try {
      setIsLoading(true);
      
      const response = await cartAPI.get();
      
      setCart({
        items: response.data.items || [],
        total: response.data.total || 0
      });
      
    } catch (err) {
    } finally {
      setIsLoading(false);
    }
  };

  const addToCart = async (productId, quantity = 1) => {
    try {
      const response = await cartAPI.addItem(productId, quantity);
      
      setCart({
        items: response.data.items || [],
        total: response.data.total || 0
      });
      
      toast.success('Added to cart!');
      return { success: true };
      
    } catch (err) {
      toast.error('Failed to add to cart');
      return { success: false, error: err.message };
    }
  };

  const updateCartItem = async (productId, quantity) => {
    try {
      const response = await cartAPI.updateItem(productId, quantity);
      
      setCart({
        items: response.data.items || [],
        total: response.data.total || 0
      });
      
      return { success: true };
      
    } catch (err) {
      toast.error('Failed to update cart');
      return { success: false, error: err.message };
    }
  };

  const removeFromCart = async (productId) => {
    try {
      const response = await cartAPI.removeItem(productId);
      
      setCart({
        items: response.data.items || [],
        total: response.data.total || 0
      });
      
      toast.success('Item removed from cart');
      return { success: true };
      
    } catch (err) {
      toast.error('Failed to remove item');
      return { success: false, error: err.message };
    }
  };

  const clearCart = async () => {
    try {
      await cartAPI.clear();
      
      setCart({ items: [], total: 0 });
      
      return { success: true };
      
    } catch (err) {
      toast.error('Failed to clear cart');
      return { success: false, error: err.message };
    }
  };

  const updateCart = async () => {
    await fetchCart();
  };

  useEffect(() => {
    fetchCart();
  }, []);

  const value = {
    cart,
    isLoading,
    addToCart,
    updateCartItem,
    removeFromCart,
    clearCart,
    updateCart
  };

  return (
    <CartContext.Provider value={value}>
      {children}
    </CartContext.Provider>
  );
}; 