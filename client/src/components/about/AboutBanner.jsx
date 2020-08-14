import React from 'react';

const AboutBanner = () => {
    return (
        <>
            <section className="hero">
                <div className="container">
                    <nav className="breadcrumb">
                        <ul className="breadcrumb">
                            <li className="breadcrumb-item"><a href="index.html">Home</a></li>
                            <li className="breadcrumb-item active">Text Page</li>
                        </ul>
                    </nav>
                    <h1>Text Page</h1>
                    <p className="lead">
                    On this page, you can find examples of the elements that come already prestyled with this template. This
                    is a simple introductory paragraph.
                    </p>
                </div>
            </section>
        </>
    )
}

export default AboutBanner;