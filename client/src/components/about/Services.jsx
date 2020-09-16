import React from 'react';

const Services = () => {
    return (
        <>
            <section className="services">
                <div className="container">
                    <div className="row">
                        <div className="col-md-4">
                            <div className="service">
                                <div className="icon"><i className="fa fa-truck"></i></div>
                                <div className="text">
                                    <h4>Advanced Shipping</h4>
                                    <p>Free shipping over Rs.300</p>
                                </div>
                            </div>
                        </div>
                        <div className="col-md-4">
                            <div className="service">
                                <div className="icon"><i className="fa fa-headphones-alt"></i></div>
                                <div className="text">
                                    <h4>Premium Support</h4>
                                    <p>Free shipping over Rs.300</p>
                                </div>
                            </div>
                        </div>
                        <div className="col-md-4">
                            <div className="service">
                                <div className="icon"><i className="fa fa-reply"></i></div>
                                <div className="text">
                                    <h4>30 Day Return</h4>
                                    <p>Free shipping over Rs.300</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </>
    )
}

export default Services;