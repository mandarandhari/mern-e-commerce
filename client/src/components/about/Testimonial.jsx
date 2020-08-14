import React from 'react';

const Testimonial = () => {
    return (
        <>
            <section className="testimonials">
                <div className="container">
                    <div className="row">
                        <div className="col-md-6">
                            <h2 className="heading-left">How Our Clients <br /> Appreciate Our <br />Service</h2>
                        </div>
                        <div className="col-md-6 text-left text-md-center slider">
                            <i className="icon-quote d-none d-md-inline-block"></i>
                            <div className="owl-carousel testimonials-slider">
                                <div className="quote">
                                    <p className="lead">
                                    Many desktop publishing packages and web page editors now use Lorem Ipsum as their default model
                                    text, and a search for 'lorem ipsum' will uncover many web sites still in their infancy.
                                    </p>
                                    <div className="user">
                                        <div className="user-profile">
                                            <img src="https://d19m59y37dris4.cloudfront.net/shirt/2-1-1/img/user-1.jpg" alt="user" className="rounded-circle" />
                                        </div>
                                        <div className="user-title text-left">
                                            <h6 className="h5">Steven Robinson</h6><span>Rome, Italy</span>
                                        </div>
                                    </div>
                                </div>
                                <div className="quote">
                                    <p className="lead">
                                    Many desktop publishing packages and web page editors now use Lorem Ipsum as their default model
                                    text, and a search for 'lorem ipsum' will uncover many web sites still in their infancy.
                                    </p>
                                    <div className="user">
                                        <div className="user-profile">
                                            <img src="https://d19m59y37dris4.cloudfront.net/shirt/2-1-1/img/user-2.jpg" alt="user" className="rounded-circle" />
                                        </div>
                                        <div className="user-title text-left">
                                            <h6 className="h5">Arya Smith</h6><span>Berlin, Germany</span>
                                        </div>
                                    </div>
                                </div>
                                <div className="quote">
                                    <p className="lead">
                                    Many desktop publishing packages and web page editors now use Lorem Ipsum as their default model
                                    text, and a search for 'lorem ipsum' will uncover many web sites still in their infancy.
                                    </p>
                                    <div className="user">
                                        <div className="user-profile">
                                            <img src="https://d19m59y37dris4.cloudfront.net/shirt/2-1-1/img/user-3.jpg" alt="user" className="rounded-circle" />
                                        </div>
                                        <div className="user-title text-left">
                                            <h6 className="h5">Frank Williams</h6><span>San Francisco, US</span>
                                        </div>
                                    </div>
                                </div>
                                <div className="quote">
                                    <p className="lead">
                                    Many desktop publishing packages and web page editors now use Lorem Ipsum as their default model
                                    text, and a search for 'lorem ipsum' will uncover many web sites still in their infancy.
                                    </p>
                                    <div className="user">
                                        <div className="user-profile">
                                            <img src="https://d19m59y37dris4.cloudfront.net/shirt/2-1-1/img/user-4.jpg" alt="user" className="rounded-circle" />
                                        </div>
                                        <div className="user-title text-left">
                                            <h6 className="h5">Ashley Wood</h6><span>Ostrava, Czech republic</span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </>
    )
}

export default Testimonial;