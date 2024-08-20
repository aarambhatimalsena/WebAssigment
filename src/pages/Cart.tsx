// Cart.tsx
import React from 'react';
import { useCart } from './CartContext';

const Cart: React.FC = () => {
    const { cartItems } = useCart();

    return (
        <div>
            <h2>Your Cart</h2>
            <ul>
                {cartItems.map((item, index) => (
                    <li key={index}>
                        <h3>{item.itemName}</h3>
                        <p>${item.itemPerPrice}</p>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default Cart;
