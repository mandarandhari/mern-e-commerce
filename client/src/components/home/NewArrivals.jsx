import React from 'react';

const NewArrivals = () => {
    return (
        <>
            <section className="new-arrivals">
                <div className="container text-center">
                    <h2 className="heading-center">New Arrivals</h2>
                    <div className="items">
                        <div className="row">
                            <div className="col-lg-4 item">
                                <div className="item-image">
                                    <img src="https://d19m59y37dris4.cloudfront.net/shirt/2-1-1/img/f-shirt-blue.jpg" alt="shirt" />
                                    <div className="hover-overlay">
                                    <ul className="list-inline">
                                        <li className="list-inline-item"><a href="/#" className="cart"><i className="fa fa-shopping-cart"></i></a></li>
                                        <li className="list-inline-item"><a href="/#" className="wishlist"><i className="fa fa-heart"></i></a></li>
                                        <li className="list-inline-item"><a href="/#" data-target="#cart-popup-1" className="expand"><i className="fa fa-expand-arrows-alt"></i></a></li>
                                    </ul>
                                    </div>
                                </div>
                                <div className="item-info">
                                    <h5>Elegant Blue</h5>
                                    <ul className="price list-inline">
                                        <li className="list-inline-item current"><i className="fas fa-rupee-sign"></i>&nbsp;70.00</li>
                                    </ul>
                                </div>
                            </div>
                            <div className="col-lg-4 item">
                                <div className="item-image">
                                    <img src="https://d19m59y37dris4.cloudfront.net/shirt/2-1-1/img/f-shirt-cyan.jpg" alt="shirt" />
                                    <div className="labels"><span className="new">NEW</span><span className="sale">SALE</span></div>
                                    <div className="hover-overlay">
                                        <ul className="list-inline">
                                            <li className="list-inline-item"><a href="/#" className="cart"><i className="fa fa-shopping-cart"></i></a></li>
                                            <li className="list-inline-item"><a href="/#" className="wishlist"><i className="fa fa-heart"></i></a></li>
                                            <li className="list-inline-item"><a href="/#" data-target="#cart-popup-1" className="expand"><i className="fa fa-expand-arrows-alt"></i></a></li>
                                        </ul>
                                    </div>
                                </div>
                                <div className="item-info">
                                    <h5>Elegant Cyan</h5>
                                    <ul className="price list-inline">
                                        <li className="old list-inline-item"><i className="fas fa-rupee-sign"></i>&nbsp;70.00</li>
                                        <li className="current list-inline-item"><i className="fas fa-rupee-sign"></i>&nbsp;40.00</li>
                                    </ul>
                                </div>
                            </div>
                            <div className="col-lg-4 item">
                                <div className="item-image">
                                    <img src="https://d19m59y37dris4.cloudfront.net/shirt/2-1-1/img/f-shirt-green.jpg" alt="shirt" />
                                    <div className="labels"><span className="new">NEW</span></div>
                                    <div className="hover-overlay">
                                        <ul className="list-inline">
                                            <li className="list-inline-item"><a href="/#" className="cart"><i className="fa fa-shopping-cart"></i></a></li>
                                            <li className="list-inline-item"><a href="/#" className="wishlist"><i className="fa fa-heart"></i></a></li>
                                            <li className="list-inline-item"><a href="/#" data-target="#cart-popup-1" className="expand"><i className="fa fa-expand-arrows-alt"></i></a></li>
                                        </ul>
                                    </div>
                                </div>
                                <div className="item-info">
                                    <h5>Awesome Green</h5>
                                    <ul className="price list-inline">
                                        <li className="list-inline-item current"><i className="fas fa-rupee-sign"></i>&nbsp;70.00</li>
                                    </ul>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </>
    )
}

export default NewArrivals;