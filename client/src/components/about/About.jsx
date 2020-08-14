import React from 'react';
import AboutBanner from './AboutBanner';
import Testimonial from './Testimonial';
import Gallery from './Gallery';
import Services from './Services';
import Brands from './Brands';
import Contact from './Contact';
import CartPopup from '../popups/CartPopup';

const About = () => {
    return (
        <>
            <AboutBanner />
            <Testimonial />
            <Gallery />
            <Services />
            <Brands />
            <Contact />
            <CartPopup />
        </>
    )
}

export default About;