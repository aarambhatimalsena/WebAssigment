// CartContext.tsx
import React, { createContext, useState, useContext, ReactNode } from 'react';

interface Product {
    id: number;
    name: string;
    price: number;
    itemImage: string;
    itemPerPrice: number;
    itemName: string;
    itemDescription: string;
}

interface CartContextType {
    cartItems: Product[];
    addToCart: (product: Product) => void;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export const useCart = (): CartContextType => {
    const context = useContext(CartContext);
    if (!context) {
        throw new Error('useCart must be used within a CartProvider');
    }
    return context;
};

export const CartProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
    const [cartItems, setCartItems] = useState<Product[]>([]);

    const addToCart = (product: Product) => {
        setCartItems(prevItems => [...prevItems, product]);
    };

    return (
        <CartContext.Provider value={{ cartItems, addToCart }}>
            {children}
        </CartContext.Provider>
    );
};
