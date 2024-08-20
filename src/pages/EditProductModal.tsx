import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './EditProductModal.css'; // Ensure you have the CSS for modal styling

interface EditProductModalProps {
    isVisible: boolean;
    product: any;
    onClose: () => void;
    onUpdate: () => void;
}

const EditProductModal: React.FC<EditProductModalProps> = ({ isVisible, product, onClose, onUpdate }) => {
    const [formData, setFormData] = useState({
        itemName: '',
        itemImage: '',
        itemDescription: '',
        itemQuantity: 0,
        itemPerPrice: 0,
    });

    useEffect(() => {
        if (product) {
            setFormData({
                itemName: product.itemName || '',
                itemImage: product.itemImage || '',
                itemDescription: product.itemDescription || '',
                itemQuantity: product.itemQuantity || 0,
                itemPerPrice: product.itemPerPrice || 0,
            });
        }
    }, [product]);

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
            await axios.put(`http://localhost:8080/api/items/${product.id}`, formData);
            onUpdate(); // Notify parent to refresh data
            onClose(); // Close the modal
        } catch (error) {
            console.error('Error updating product:', error);
        }
    };

    if (!isVisible) return null;

    return (
        <div className="modal-overlay">
            <div className="modal-content">
                <h2>Edit Product</h2>
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

export default EditProductModal;
