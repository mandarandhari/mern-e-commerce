import React from 'react';
import AboutBanner from './AboutBanner';
import Header from '../layouts/Header';
import Footer from '../layouts/Footer';
import Testimonial from './Testimonial';
import Gallery from './Gallery';
import Services from './Services';
import Brands from './Brands';
import Contact from './Contact';
import CartPopup from '../popups/CartPopup';

const About = () => {
    return (
        <>
            <Header />
            <AboutBanner />
            <Testimonial />
            <Gallery />
            <Services />
            <Brands />
            <Contact />
            <CartPopup />
            <Footer />
        </>
    )
}

export default About;