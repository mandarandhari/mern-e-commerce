import React from 'react';

const AboutBanner = () => {
    return (
        <>
            <section className="hero">
                <div className="container">
                    <nav className="breadcrumb">
                        <ul className="breadcrumb">
                            <li className="breadcrumb-item"><a href="index.html">Home</a></li>
                            <li className="breadcrumb-item active">About</li>
                        </ul>
                    </nav>
                    <h1>About Us</h1>
                    <p className="lead">In egestas turpis quam, ut sollicitudin dui malesuada at. Suspendisse sit amet aliquet odio. Sed ac sapien ac libero aliquam iaculis.</p>
                </div>
            </section>
        </>
    )
}

export default AboutBanner;