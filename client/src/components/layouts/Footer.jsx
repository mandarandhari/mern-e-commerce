import React from 'react';
import logo_e_footer from '../../utils/img/logo-e-footer.png';
import template_mac from '../../utils/img/template-mac.png';

const Footer = () => {
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
                            <li className="list-inline-item"><a href="#" target="_blank"><i className="fab fa-facebook-f"></i></a></li>
                            <li className="list-inline-item"><a href="#" target="_blank"><i className="fab fa-twitter"></i></a></li>
                            <li className="list-inline-item"><a href="#" target="_blank"><i className="fab fa-linkedin"></i></a></li>
                            <li className="list-inline-item"><a href="#" target="_blank"><i className="fab fa-tumblr"></i></a></li>
                            <li className="list-inline-item"><a href="#" target="_blank"><i className="fab fa-pinterest"></i></a></li>
                            <li className="list-inline-item"><a href="#" target="_blank"><i className="fab fa-instagram"></i></a></li>
                            <li className="list-inline-item"><a href="#" target="_blank"><i className="fab fa-google-plus"></i></a></li>
                            <li className="list-inline-item"><a href="#" target="_blank"><i className="fab fa-behance"></i></a></li>
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
                                    <li><a href="index.html">Home</a></li>
                                    <li><a href="text-page.html">Text Page</a></li>
                                    <li><a href="cart-page.html">Shopping Cart</a></li>
                                </ul>
                            </div>
                            <div className="col-lg-2 col-md-6">
                                <h4>Our Services</h4>
                                <ul className="list-unstyled">
                                    <li><a href="#">Page Link</a></li>
                                    <li><a href="#">Page Link</a></li>
                                    <li><a href="#">Page Link</a></li>
                                </ul>
                            </div>
                            <div className="col-lg-3 col-md-6">
                                <h4>Newsletter</h4>
                                <p>Lorem ipsum amet, consectetur adipiscing elit</p>
                                <form id="newsletter-form" action="#">
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
                            <div className="col-md-6">
                                <p>© 2018 ShirtStore.com. All rights reserved.</p>
                            </div>
                            <div className="col-md-6 text-right">
                                <p>Template By <a href="https://ondrejsvestka.cz/" target="_blank">Ondrej Svestka</a></p>
                            </div>
                        </div>
                    </div>
                </div>
            </footer>
            <div id="scrollTop"><i className="fa fa-angle-up"></i></div>
            <button type="button" data-toggle="collapse" data-target="#style-switch" id="style-switch-button" className="btn btn-primary d-none d-lg-block">
                <i className="fa fa-cog fa-2x"></i>
            </button>
            <div id="style-switch" className="collapse">
                <h4 className="text-uppercase">Select theme colour</h4>
                <form className="mb-3">
                    <select name="colour" id="colour" className="form-control">
                        <option value="">select colour variant</option>
                        <option value="default">red</option>
                        <option value="pink">pink</option>
                        <option value="green">green</option>
                        <option value="violet">violet</option>
                        <option value="sea">sea</option>
                        <option value="blue">blue</option>
                    </select>
                </form>
                <p><img src={template_mac} alt="" className="img-fluid" /></p>
                <p className="text-muted text-small">Stylesheet switching is done via JavaScript and can cause a blink while page loads. This will not happen in your production code.</p>
            </div>
        </>
    )
}

export default Footer;