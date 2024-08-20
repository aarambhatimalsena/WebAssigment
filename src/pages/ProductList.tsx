import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './ProductList.css';
import AddProductModal from './AddProductModal';
import EditProductModal from './EditProductModal';
import {Link, useNavigate} from "react-router-dom";

const ProductList: React.FC = () => {
    const navigate = useNavigate();
    const [isAddModalVisible, setIsAddModalVisible] = useState(false);
    const [isEditModalVisible, setIsEditModalVisible] = useState(false);
    const [selectedProduct, setSelectedProduct] = useState<any>(null);
    const [products, setProducts] = useState<any[]>([]);

    useEffect(() => {
        // Fetch initial product list
        const fetchProducts = async () => {
            try {
                const response = await axios.get('http://localhost:8080/api/items');
                
                if (response.data.success) {
                    setProducts(response.data.data);
                }
            } catch (error) {
                console.error('Error fetching products:', error);
            }
        };
        fetchProducts();
    }, []);

    const handleAddProductClick = () => {
        setIsAddModalVisible(true);
    };

    const handleCloseAddModal = () => {
        setIsAddModalVisible(false);
    };

    const handleCloseEditModal = () => {
        setIsEditModalVisible(false);
        setSelectedProduct(null);
    };

    const handleEditClick = (product: any) => {
        setSelectedProduct(product);
        setIsEditModalVisible(true);
    };

    const handleDeleteClick = async (id: number) => {
        try {
            await axios.delete(`http://localhost:8080/api/items/${id}`);
            setProducts(products.filter(product => product.id !== id));
        } catch (error) {
            console.error('Error deleting product:', error);
        }
    };

    const handleProductUpdate = () => {
        // Refresh product list after update
        const fetchProducts = async () => {
            try {
                const response = await axios.get('http://localhost:8080/api/items');
                if (response.data.success) {
                    setProducts(response.data.data);
                }
            } catch (error) {
                console.error('Error fetching products:', error);
            }
        };
        fetchProducts();
    };

    const handleLogout = () => {
        // Perform logout operations if needed, then navigate to the home page
        navigate('/');
    };


    return (
        <div className="container">
            <header className="header">
                <div className="container header-container">
                    <a className="logo" href="/dashboard">
                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none"
                             stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"
                             className="icon">
                            <path
                                d="M20 16V7a2 2 0 0 0-2-2H6a2 2 0 0 0-2 2v9m16 0H4m16 0 1.28 2.55a1 1 0 0 1-.9 1.45H3.62a1 1 0 0 1-.9-1.45L4 16"/>
                        </svg>
                        <span className="logo-text">Computer Shop</span>
                    </a>
                    <div className="search-container">
                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none"
                             stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"
                             className="search-icon">
                            <circle cx="11" cy="11" r="8"/>
                            <path d="m21 21-4.3-4.3"/>
                        </svg>
                        <input className="search-input" placeholder="Search products..." type="search"/>
                    </div>

                    <nav className="nav">
                        <a className="nav-link" href="#">
                            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"
                                 fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"
                                 strokeLinejoin="round" className="icon">
                                <path d="m3 9 9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/>
                                <polyline points="9 22 9 12 15 12 15 22"/>
                            </svg>
                            <Link to="/add-products" style={{
                                color: "black"
                            }}>
                                <span>Add Products</span>
                            </Link>
                        </a>
                        <a className="nav-link" href="#">
                            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"
                                 fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"
                                 strokeLinejoin="round" className="icon">
                                <path d="m7.5 4.27 9 5.15"/>
                                <path
                                    d="M21 8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16Z"/>
                                <path d="m3.3 7 8.7 5 8.7-5"/>
                                <path d="M12 22V12"/>
                            </svg>
                            <Link to="/add-users" style={{
                                color: "black"
                            }}>
                                <span>Add User</span>
                            </Link>
                        </a>

                    </nav>

                    <div className="auth-buttons">
                        <button className="auth-button login-button" onClick={handleLogout}>
                            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"
                                 fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"
                                 strokeLinejoin="round" className="icon">
                                <path d="M15 3h4a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2h-4"/>
                                <polyline points="10 17 15 12 10 7"/>
                                <line x1="15" x2="3" y1="12" y2="12"/>
                            </svg>
                            <span>Logout</span>
                        </button>
                        <button className="auth-button cart-button">
                            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"
                                 fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"
                                 strokeLinejoin="round" className="icon">
                                <circle cx="8" cy="21" r="1"/>
                                <circle cx="19" cy="21" r="1"/>
                                <path
                                    d="M2.05 2.05h2l2.66 12.42a2 2 0 0 0 2 1.58h9.78a2 2 0 0 0 1.95-1.57l1.65-7.43H5.12"/>
                            </svg>
                            <Link to="/cart" style={{
                                color: "white"
                            }}>
                                <span>Cart</span>
                            </Link>
                        </button>
                        <button className="auth-button favorite-button">
                            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"
                                 fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"
                                 strokeLinejoin="round" className="icon">
                                <path
                                    d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"/>
                            </svg>
                            <Link to="/wishlist" style={{
                                color: "white"
                            }}>
                                <span>Wishlist</span>
                            </Link>
                        </button>
                    </div>
                </div>
            </header>
            <div className="header">
                <h1 className="title">Product List</h1>
                <button className="add-button" onClick={handleAddProductClick}>Add Product</button>
            </div>
            <div className="table-container">
                <table className="product-table">
                    <thead>
                    <tr className="table-header">
                        <th className="header-cell">Name</th>
                        <th className="header-cell">Description</th>
                        <th className="header-cell">Price</th>
                        <th className="header-cell">Quantity</th>
                        <th className="header-cell">Actions</th>
                    </tr>
                    </thead>
                    <tbody>
                    {products.map(product => (
                        <tr key={product.id} className="table-row">
                            <td className="cell">{product.itemName}</td>
                            <td className="cell text-muted">{product.itemDescription}</td>
                            <td className="cell text-right">${product.itemPerPrice}</td>
                            <td className="cell text-right">{product.itemQuantity}</td>
                            <td className="cell text-right action-buttons">
                                <button className="action-button edit-button" onClick={() => handleEditClick(product)}>
                                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"
                                         fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"
                                         strokeLinejoin="round">
                                        <path d="M12 22h6a2 2 0 0 0 2-2V7l-5-5H6a2 2 0 0 0-2 2v10"></path>
                                        <path d="M14 2v4a2 2 0 0 0 2 2h4"></path>
                                        <path d="M10.4 12.6a2 2 0 1 1 3 3L8 21l-4 1 1-4Z"></path>
                                    </svg>
                                    <span className="sr-only">Edit</span>
                                </button>
                                <button className="action-button delete-button"
                                        onClick={() => handleDeleteClick(product.id)}>
                                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"
                                         fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"
                                         strokeLinejoin="round">
                                        <path d="M3 6h18"></path>
                                        <path d="M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6"></path>
                                        <path d="M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2"></path>
                                    </svg>
                                    <span className="sr-only">Delete</span>
                                </button>
                            </td>
                        </tr>
                    ))}
                    </tbody>
                </table>
            </div>

            {/* Render Add Product Modal */}
            <AddProductModal isVisible={isAddModalVisible} onClose={handleCloseAddModal}/>

            {/* Render Edit Product Modal */}
            {selectedProduct && (
                <EditProductModal
                    isVisible={isEditModalVisible}
                    product={selectedProduct}
                    onClose={handleCloseEditModal}
                    onUpdate={handleProductUpdate}
                />
            )}
        </div>
    );
};

export default ProductList;
