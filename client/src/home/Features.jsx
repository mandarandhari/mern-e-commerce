import React from 'react';

const Features = () => {
    return (
        <>
            <section className="features">
                <div className="container">
                    <div className="row">
                        <div className="col-lg-6 info">
                            <h2 className="heading-left">Our Products' <br />Specialities</h2>
                            <h3>More than just a look</h3>
                            <p className="lead">
                            There are many variations of passages of Lorem Ipsum available, but the majority have suffered alteration
                            in some form, by injected humour, or randomised words which don't look even slightly believable.
                            If you are going to use a passage of Lorem Ipsum.
                            </p><a href="#" className="read-more btn btn-primary d-none d-lg-inline-block">Read More</a>
                        </div>
                        <div className="col-lg-6 items">
                            <div className="row">
                                <div className="col-md-6 feature">
                                    <div className="icon"><i className="fab fa-black-tie"></i></div>
                                    <div className="text">
                                        <h4>Unique Design</h4>
                                        <p>Suspendisse posuere, diam in bibendum posuere, diam</p>
                                    </div>
                                </div>
                                <div className="col-md-6 feature">
                                    <div className="icon"><i className="fas fa-tshirt"></i></div>
                                    <div className="text">
                                        <h4>Perfect fit clothes</h4>
                                        <p>Suspendisse posuere, diam in bibendum posuere, diam</p>
                                    </div>
                                </div>
                                <div className="col-md-6 feature">
                                    <div className="icon"><i className="fas fa-percent"></i></div>
                                    <div className="text">
                                        <h4>Original Quality</h4>
                                        <p>Suspendisse posuere, diam in bibendum posuere, diam</p>
                                    </div>
                                </div>
                                <div className="col-md-6 feature">
                                    <div className="icon"><i className="fas fa-tag"></i></div>
                                    <div className="text">
                                        <h4>Competitive Prices</h4>
                                        <p>Suspendisse posuere, diam in bibendum posuere, diam</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="col-md-12 text-center"><a href="#" className="read-more btn btn-primary d-lg-none">Read More</a></div>
                    </div>
                </div>
            </section>
        </>
    )
}

export default Features;