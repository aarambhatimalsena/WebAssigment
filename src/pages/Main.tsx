import React from 'react';
import './Dashboard.css'

const MainSection: React.FC = () => {
    return (
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
                        <img src="https://images.pexels.com/photos/842548/pexels-photo-842548.jpeg?auto=compress&cs=tinysrgb&w=600" alt="Hero" />
                    </div>
                </div>
            </section>
        </main>
    );
};

export default MainSection;
