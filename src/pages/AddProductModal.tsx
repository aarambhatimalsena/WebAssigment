// AddProductModal.tsx

import React, { useState } from 'react';
import axios from 'axios';
import './AddProductModal.css';

interface AddProductModalProps {
    isVisible: boolean;
    onClose: () => void;
}

const AddProductModal: React.FC<AddProductModalProps> = ({ isVisible, onClose }) => {
    const [formData, setFormData] = useState({
        itemName: '',
        itemImage: '',
        itemDescription: '',
        itemQuantity: 0,
        itemPerPrice: 0,
    });

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setFormData((prevState) => ({
            ...prevState,
            [name]: value,
        }));
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            await axios.post('http://localhost:8080/api/items', formData);
            // Notify user of success or update UI
            onClose(); // Close the modal
        } catch (error) {
            console.error('Error adding product:', error);
        }
    };

    if (!isVisible) return null;

    return (
        <div className="modal-overlay">
            <div className="modal-content">
                <h2>Add New Product</h2>
                <form onSubmit={handleSubmit}>
                    <label>
                        Product Name:
                        <input type="text" name="itemName" value={formData.itemName} onChange={handleChange} required />
                    </label>
                    <label>
                        Image URL:
                        <input type="text" name="itemImage" value={formData.itemImage} onChange={handleChange} />
                    </label>
                    <label>
                        Description:
                        <textarea name="itemDescription" value={formData.itemDescription} onChange={handleChange} required />
                    </label>
                    <label>
                        Quantity:
                        <input type="number" name="itemQuantity" value={formData.itemQuantity} onChange={handleChange} required />
                    </label>
                    <label>
                        Price:
                        <input type="number" name="itemPerPrice" value={formData.itemPerPrice} onChange={handleChange} required />
                    </label>
                    <button type="submit">Save</button>
                    <button type="button" onClick={onClose}>Cancel</button>
                </form>
            </div>
        </div>
    );
};

export default AddProductModal;
