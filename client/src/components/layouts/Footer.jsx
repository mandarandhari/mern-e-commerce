import React from 'react';
import { Link } from 'react-router-dom';

import logo_e_footer from '../../utils/img/logo-e-footer.png';

const Footer = () => {
    const newsletterFormSubmit = e => {
        e.preventDefault();
    }

    return (
        <>
            <footer>
                <div className="container">
                    <div className="contact-details text-center">
                        <div className="row">
                            <div className="col-sm-4">
                                <div className="icon">
                                    <i className="fas fa-map-marker-alt"></i>
                                </div>
                                <div className="text">
                                    <p>T-Shirt Store, Hasicska, <br />Ostrava, Czech republic</p>
                                </div>
                            </div>
                            <div className="col-sm-4">
                                <div className="icon">
                                    <i className="fas fa-phone-alt"></i>
                                </div>
                                <div className="text">
                                    <p>(040)23233434545</p>
                                    <p>(040)23233434545</p>
                                </div>
                            </div>
                            <div className="col-sm-4">
                                <div className="icon"><i className="fas fa-envelope"></i></div>
                                <div className="text">
                                    <p><a href="mailto:support@shirtstore.com">Support@Shirtstore.com</a></p>
                                    <p><a href="mailto:shirtstore@example.com">Shirtstore@example.com</a></p>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="social text-center">
                        <ul className="social-list list-inline">
                            <li className="list-inline-item"><a href="/#" target="_blank"><i className="fab fa-facebook-f"></i></a></li>
                            <li className="list-inline-item"><a href="/#" target="_blank"><i className="fab fa-twitter"></i></a></li>
                            <li className="list-inline-item"><a href="/#" target="_blank"><i className="fab fa-linkedin"></i></a></li>
                            <li className="list-inline-item"><a href="/#" target="_blank"><i className="fab fa-tumblr"></i></a></li>
                            <li className="list-inline-item"><a href="/#" target="_blank"><i className="fab fa-pinterest"></i></a></li>
                            <li className="list-inline-item"><a href="/#" target="_blank"><i className="fab fa-instagram"></i></a></li>
                            <li className="list-inline-item"><a href="/#" target="_blank"><i className="fab fa-google-plus"></i></a></li>
                            <li className="list-inline-item"><a href="/#" target="_blank"><i className="fab fa-behance"></i></a></li>
                        </ul>
                    </div>
                    <div className="site-links">
                        <div className="row">
                            <div className="col-lg-4 col-md-6">
                                <img src={logo_e_footer} alt="Shirt Store" width="180" />
                                <p>
                                    Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore
                                    et dolore.
                                </p>
                            </div>
                            <div className="col-lg-3 col-md-6">
                                <h4>This Template</h4>
                                <ul className="list-unstyled">
                                    <li><Link to="/">Home</Link></li>
                                    <li><Link to="/about-us">About</Link></li>
                                    <li><Link to="/cart">Shopping Cart</Link></li>
                                </ul>
                            </div>
                            <div className="col-lg-2 col-md-6">
                                <h4>Our Services</h4>
                                <ul className="list-unstyled">
                                    <li><Link to="/#">Page Link</Link></li>
                                    <li><Link to="/#">Page Link</Link></li>
                                    <li><Link to="/#">Page Link</Link></li>
                                </ul>
                            </div>
                            <div className="col-lg-3 col-md-6">
                                <h4>Newsletter</h4>
                                <p>Lorem ipsum amet, consectetur adipiscing elit</p>
                                <form id="newsletter-form" action="#" onSubmit={newsletterFormSubmit}>
                                    <input id="usermail" type="email" name="useremail" placeholder="Enter Your Email" />
                                    <button type="submit">Subscribe <i className="fa fa-circle"></i></button>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="copyrights">
                    <div className="container">
                        <div className="row">
                            <div className="col-md-12">
                                <p>© 2020 ShirtStore.com. All rights reserved.</p>
                            </div>
                        </div>
                    </div>
                </div>
            </footer>
            <div id="scrollTop"><i className="fa fa-angle-up"></i></div>
        </>
    )
}

export default Footer;