import React, { createContext, useContext, useState, useEffect } from 'react';
import axios from 'axios';
const CartContext = createContext();

export const useCart = () => useContext(CartContext);

export default function CartContextGlobal({ children }) {
    const [cartItems, setCartItems] = useState([]);

    useEffect(() => {
        const fetchCartItems = async () => {
            const token = sessionStorage.getItem('access_token');
            if (!token) return;

            try {
                const response = await axios.get(
                    `${import.meta.env.VITE_API_URL}/cart_items/cart`,
                    {
                        headers: {
                            Authorization: `Bearer ${token}`
                        }
                    }
                );
                setCartItems(response.data);
            } catch (error) {
                console.error('Error fetching cart items:', error);
            }
        };

        fetchCartItems();
    }, []);

    const addToCart = async (product) => {
        const token = sessionStorage.getItem('access_token');
        if (!token) {
            window.location.href = '/login';
            return;
        }

        try {
            const response = await axios.post(
                `${import.meta.env.VITE_API_URL}/cart_items/cart`,
                {
                    product_id: product.id, // Changed from product.product.id
                    quantity: 1,
                },
                {
                    headers: {
                        'Content-Type': 'application/json',
                        Authorization: `Bearer ${token}`
                    }
                }
            );
            // Fetch updated cart items after adding
            const updatedCart = await axios.get(
                `${import.meta.env.VITE_API_URL}/cart_items/cart`,
                {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                }
            );
            setCartItems(updatedCart.data);
        } catch (error) {
            console.error('Error adding to cart:', error.response?.data || error.message);
        }
    };

    const removeFromCart = async (cartItem) => {
        const token = sessionStorage.getItem('access_token');
        if (!token) {
            window.location.href = '/login';
            return;
        }

        try {
            await axios.delete(
                `${import.meta.env.VITE_API_URL}/cart_items/cart/${cartItem.id}`, // Use cartItem.id (the cart item ID)
                {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                }
            );
            setCartItems(prevItems => prevItems.filter(item => item.id !== cartItem.id));
        } catch (error) {
            console.error('Error removing from cart:', error.response?.data || error.message);
        }
    };

    return (
        <CartContext.Provider value={{ cartItems, addToCart, removeFromCart }}>
            {children}
        </CartContext.Provider>
    );
}