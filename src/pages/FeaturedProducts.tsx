import React from 'react';
import './Dashboard.css';

const FeaturedProducts: React.FC = () => {
    return (
        <section className="featured-products">
            <div className="container featured-products-container">
                <h2 className="section-title">Featured Products</h2>
                <div className="products-grid">
                    {/* Map through your product data here */}
                    <div className="product-card">
                        <img
                            src="https://images.pexels.com/photos/18105/pexels-photo.jpg?auto=compress&cs=tinysrgb&w=600"
                            alt="Product"/>
                        <h3 className="product-title">Product Name</h3>
                        <p className="product-price">Npr 100,00,00</p>
                        <div className="product-buttons">
                            <button className="btn add-to-cart bg-black text-white" style={{
                                marginRight: '0.3rem'
                            }}>Add to Cart
                            </button>
                            <button className="btn buy-now bg-black text-white" style={{
                                marginRight: '0.3rem'
                            }}>Buy Now
                            </button>
                            <button className="btn heart bg-black">
                                <span className="heart-icon">❤️</span>
                            </button>
                        </div>
                    </div>
                    <div className="product-card">
                        <img
                            src="https://images.pexels.com/photos/18105/pexels-photo.jpg?auto=compress&cs=tinysrgb&w=600"
                            alt="Product"/>
                        <h3 className="product-title">Product Name</h3>
                        <p className="product-price">Npr 100,00,00</p>
                        <div className="product-buttons">
                            <button className="btn add-to-cart bg-black text-white" style={{
                                marginRight: '0.3rem'
                            }}>Add to Cart
                            </button>
                            <button className="btn buy-now bg-black text-white" style={{
                                marginRight: '0.3rem'
                            }}>Buy Now
                            </button>
                            <button className="btn heart bg-black">
                                <span className="heart-icon">❤️</span>
                            </button>
                        </div>
                    </div>
                    <div className="product-card">
                        <img
                            src="https://images.pexels.com/photos/18105/pexels-photo.jpg?auto=compress&cs=tinysrgb&w=600"
                            alt="Product"/>
                        <h3 className="product-title">Product Name</h3>
                        <p className="product-price">Npr 100,00,00</p>
                        <div className="product-buttons">
                            <button className="btn add-to-cart bg-black text-white" style={{
                                marginRight: '0.3rem'
                            }}>Add to Cart
                            </button>
                            <button className="btn buy-now bg-black text-white" style={{
                                marginRight: '0.3rem'
                            }}>Buy Now
                            </button>
                            <button className="btn heart bg-black">
                                <span className="heart-icon">❤️</span>
                            </button>
                        </div>
                    </div>
                    <div className="product-card">
                        <img
                            src="https://images.pexels.com/photos/18105/pexels-photo.jpg?auto=compress&cs=tinysrgb&w=600"
                            alt="Product"/>
                        <h3 className="product-title">Product Name</h3>
                        <p className="product-price">Npr 100,00,00</p>
                        <div className="product-buttons">
                            <button className="btn add-to-cart bg-black text-white" style={{
                                marginRight: '0.3rem'
                            }}>Add to Cart
                            </button>
                            <button className="btn buy-now bg-black text-white" style={{
                                marginRight: '0.3rem'
                            }}>Buy Now
                            </button>
                            <button className="btn heart bg-black">
                                <span className="heart-icon">❤️</span>
                            </button>
                        </div>
                    </div>
                    {/* Repeat product-card for each product */}
                </div>
            </div>
        </section>
    );
};

export default FeaturedProducts;
