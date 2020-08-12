import React from 'react';
import { Link } from 'react-router-dom';
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
                                    <Link to="/" className="nav-link">Home</Link>
                                </li>
                                <li>
                                    <Link to="/about-us" className="nav-link">About</Link>
                                </li>
                                <li>
                                    <a href="#" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false" className="nav-link langs"><i className="fa fa-cog"></i></a>
                                    <ul className="dropdown-menu">
                                        <li><a href="#">Login</a></li>
                                        <li><a href="#">Register</a></li>
                                    </ul>
                                </li>
                                <li>
                                    <Link to="/cart" className="nav-link cart">
                                        <i className="fas fa-shopping-cart"></i>
                                        <span className="items">1</span>
                                    </Link>
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