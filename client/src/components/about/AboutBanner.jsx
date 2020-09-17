import React from 'react';
import { Link } from 'react-router-dom';

const AboutBanner = () => {
    return (
        <>
            <section className="hero pt-0 pb-0" style={{ background: `url(${require('./../../utils/img/about-us-banner.jpg')}) no-repeat` }}>
                <div className="overlay" style={{ background: 'rgba(0, 0, 0, 0.7)', padding: '100px 0' }}>
                    <div className="container">
                        <nav className="breadcrumb">
                            <ul className="breadcrumb">
                                <li className="breadcrumb-item"><Link to="/"><strong>Home</strong></Link></li>
                                <li className="breadcrumb-item active" style={{ color: '#ffffff' }}><strong>About</strong></li>
                            </ul>
                        </nav>
                        <h1 style={{ color: '#ffffff' }}>About Us</h1>
                        <p className="lead" style={{ color: '#ffffff' }}>In egestas turpis quam, ut sollicitudin dui malesuada at. Suspendisse sit amet aliquet odio. Sed ac sapien ac libero aliquam iaculis.</p>
                    </div>
                </div>
            </section>
        </>
    )
}

export default AboutBanner;