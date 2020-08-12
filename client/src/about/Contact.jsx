import React from 'react';

const Contact = () => {
    return (
        <>
            <section className="contact">
                <div className="container text-center">
                    <h2 className="heading-center">Contact Us</h2>
                    <p className="lead">Lorem Ipsum is simply dummy text of the printing and typesetting industry.</p>
                    <div className="row">
                        <div className="form-holder col-md-10 mx-auto">
                            <form id="contact-form" action="#" method="post">
                                <div className="row">
                                    <div className="col-md-6">
                                        <label for="username">Your Name</label>
                                        <input id="username" type="text" name="username" required="" />
                                    </div>
                                    <div className="col-md-6">
                                        <label for="email">Your Email</label>
                                        <input id="email" type="email" name="email" required="" />
                                    </div>
                                    <div className="col-md-12">
                                        <label for="message">How can we help you?</label>
                                        <textarea id="message" name="message" required=""></textarea>
                                    </div>
                                    <div className="col-md-12 text-right submit-holder">
                                        <button type="submit">Send <i className="fa fa-circle"></i></button>
                                    </div>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </section>
        </>
    )
}

export default Contact;