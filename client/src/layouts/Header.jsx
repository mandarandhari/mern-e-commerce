import React from 'react';
import logo_e from '../utils/img/logo-e.png';

const Header = () => {
    return (
        <>
            <header className="header">
                <div className="top-bar d-none d-lg-block">
                    <div className="container">
                        <div className="row">
                            <div className="col-sm-6 text-left">
                                <p>Free Shipping on orders over 59$</p>
                            </div>
                            <div className="col-sm-6 text-right">
                                <p>Customer Service 456-532-342</p>
                            </div>
                        </div>
                    </div>
                </div>
                <nav className="navbar navbar-expand-lg">
                    <div className="container">
                        <a href="#" className="navbar-brand">
                            <img src={logo_e} alt="Shirt Store" />
                        </a>
                        <button type="button" data-toggle="collapse" data-target="#navigation" aria-controls="navigation" aria-expanded="false" aria-label="Toggle navigation" className="navbar-toggler navbar-toggler-right">Menu<i className="fa fa-align-justify"></i></button>
                        <div id="navigation" className="collapse navbar-collapse">
                            <ul className="navbar-nav ml-auto">
                                <li className="active">
                                    <a href="" className="nav-link">Home</a>
                                </li>
                                <li>
                                    <a href="" className="nav-link">Text Page</a>
                                </li>
                                <li>
                                    <a href="" className="nav-link cart">
                                        <i className="fas fa-shopping-cart"></i>
                                        <span className="items">1</span>
                                    </a>
                                </li>
                            </ul>
                        </div>
                    </div>
                </nav>
            </header>
        </>
    )
}

export default Header;