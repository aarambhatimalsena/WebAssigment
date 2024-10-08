import React, { useState, useEffect } from 'react';
import {Link, useNavigate} from 'react-router-dom';
import axios from 'axios';
import './Dashboard.css';

const Dashboard: React.FC = () => {
    const navigate = useNavigate();
    const [products, setProducts] = useState<any[]>([]);

    useEffect(() => {
        // Fetch products from API
        axios.get('http://localhost:8080/api/items')
            // Adjust the API endpoint as needed
            .then(response => {
                setProducts(response.data.data);
                console.log(response.data.data)
            })
            .catch(error => {
                console.error('Error fetching products:', error);
            });
    }, []);

    const handleLogout = () => {
        // Perform logout operations if needed, then navigate to the home page
        navigate('/');
    };

    const handleAddToCart = (product: any) => {
        axios.post('/api/cart', {
            name: product.name,
            price: product.price,
            // Include other product details if needed
        })
            .then(response => {
                console.log('Product added to cart:', response.data);
            })
            .catch(error => {
                console.error('Error adding product to cart:', error);
            });
    };

    const handleAddToFavorites = (product: any) => {
        axios.post('/api/favorites', {
            name: product.name,
            price: product.price,
            // Include other product details if needed
        })
            .then(response => {
                console.log('Product added to favorites:', response.data);
            })
            .catch(error => {
                console.error('Error adding product to favorites:', error);
            });
    };

    // @ts-ignore
    return (
        <div>
            {/* Header Component */}
            <header className="header">
                <div className="container header-container">
                    <a className="logo" href="#">
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

            {/* MainSection Component */}
            <main>
                <section className="hero-section">
                    <div className="container hero-container">
                        <div className="hero-text">
                            <h1 className="hero-title">Find the Perfect Computer for You</h1>
                            <p className="hero-description">Discover a wide range of</p>
                            <p className="hero-description">the latest and greatest computers</p>
                            <a className="hero-button" href="#">Shop Now</a>
                        </div>
                        <div className="hero-image">
                            <img
                                src="https://images.pexels.com/photos/842548/pexels-photo-842548.jpeg?auto=compress&cs=tinysrgb&w=600"
                                alt="Hero"/>
                        </div>
                    </div>
                </section>
            </main>

            {/* Product Cards */}

            <section className="featured-products bg-red-800">
                <div className="container featured-products-container">
                    <h2 className="section-title">Featured Products</h2>
                    <div className="products-grid">
                        <main className="product-cards" style={{
                            maxHeight: "17rem"
                        }}>
                            {products.map((product) => (
                                <div key={product.id} className="product-card bg-red-900" style={{
                                    maxHeight: "max-content"
                                }}>
                                    <img src={product.itemImage} alt={product.name} className="product-image"/>
                                    <div className="product-details">
                                        <p className="product-price">${product.itemPerPrice}</p>
                                        <h2 className="product-name">{product.itemName}</h2>
                                        <p className="product-price">${product.itemDescription}</p>
                                        <button className="btn btn-primary" onClick={() => handleAddToCart(product)}>Add
                                            to Cart
                                        </button>
                                        <button className="btn btn-secondary"
                                                onClick={() => handleAddToFavorites(product)}>
                                            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24"
                                                 viewBox="0 0 24 24"
                                                 fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"
                                                 strokeLinejoin="round" className="icon">
                                                <path
                                                    d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"/>
                                            </svg>
                                        </button>
                                    </div>
                                </div>
                            ))}
                        </main>
                    </div>
                </div>
            </section>

        </div>
    );
};

export default Dashboard;
