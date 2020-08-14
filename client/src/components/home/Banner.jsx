import React from 'react';
import hero_shirt from '../../utils/img/hero-shirt.jpg';

const Banner = () => {
    return (
        <>
            <section className="home-hero">
                <div className="container">
                    <div className="row align-items-stretch">
                        <div className="col-lg-6 d-flex align-items-center">
                            <div className="content">
                                <h1>T-shirt Store</h1>
                                <p className="hero-text">A single-product Bootstrap template.</p>
                                <p className="hero-text"><strong>6 colour variants</strong> and <strong>SASS files</strong> for an easy customisation.</p><a href=".big-product" className="buy btn btn-primary">Buy Now <i className="fas fa-shopping-bag"></i></a>
                            </div>
                        </div>
                        <div className="col-lg-6">               
                            <div className="image d-none d-lg-block"><img src={hero_shirt} alt="t-shirt" className="img-fluid mx-auto d-block" /></div>
                        </div>
                    </div>
                </div>
            </section>
        </>
    )
}

export default Banner;