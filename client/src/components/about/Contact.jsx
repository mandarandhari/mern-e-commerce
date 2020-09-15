import React, { useState } from 'react';
import axios from 'axios';
import Swal from 'sweetalert2';

const Contact = () => {
    const [ contact, setContact ] = useState({
        name: '',
        email: '',
        message: '',
        errors: {}
    });

    const contactFieldChanges = e => {
        setContact({
            ...contact,
            [e.target.name]: e.target.value
        });
    }

    const contactFormSubmitted = async e => {
        e.preventDefault();

        let errors = {};

        if (contact.name.length === 0) {
            errors.name = 'Name should not be empty';
        }

        if (contact.email.length === 0) {
            errors.email = 'Email should not be empty';
        } else if (!contact.email.match(/^([a-zA-Z0-9_\-\.+]+)@([a-zA-Z0-9_\-\.]+)\.([a-zA-Z]{2,5})$/)) {
            errors.email = 'Please provide valid email';
        }

        if (contact.message.length === 0) {
            errors.message = 'Message should not be empty';
        }

        if (Object.keys(errors).length) {
            setContact({
                ...contact,
                errors: errors
            });
        } else {
            const response = await axios.post('/contact/add', contact, {
                headers: {
                    'Content-Type': 'application/json'
                }
            });

            if (response.data.success) {
                Swal.fire({
                    success: 'SUCCESS!',
                    icon: 'success',
                    text: 'Your message has been sent',
                    showConfirmButton: false,
                    timer: 1500
                });

                setContact({
                    name: '',
                    email: '',
                    message: '',
                    errors: {}
                });
            }
        }
    }

    return (
        <>
            <section className="contact">
                <div className="container text-center">
                    <h2 className="heading-center">Contact Us</h2>
                    <p className="lead">Do you have any queries, suggestions or feedback? Tell us.</p>
                    <div className="row">
                        <div className="form-holder col-md-10 mx-auto">
                            <form id="contact-form" action="#" method="post" onSubmit={contactFormSubmitted}>
                                <div className="row">
                                    <div className="col-md-6">
                                        <input id="username" type="text" className={ contact.errors.name !== undefined ? 'mb-0' : '' } name="name" placeholder="Your Name" style={{ fontWeight: '300', fontStyle: 'italic', fontSize: '20px' }} value={contact.name} onChange={contactFieldChanges} />
                                        { contact.errors.name && <p className="text-danger text-left">{ contact.errors.name }</p> }
                                    </div>
                                    <div className="col-md-6">
                                        <input id="email" type="email" className={ contact.errors.email !== undefined ? "mb-0" : '' } name="email" placeholder="Your Email" style={{ fontWeight: '300', fontStyle: 'italic', fontSize: '20px' }} value={contact.email} onChange={contactFieldChanges} />
                                        { contact.errors.email && <p className="text-danger text-left">{ contact.errors.email }</p> }
                                    </div>
                                    <div className="col-md-12">
                                        <textarea id="message" name="message" className="mb-0" placeholder="How can we help you?" style={{ fontWeight: '300', fontStyle: 'italic', fontSize: '20px' }} value={ contact.message } onChange={contactFieldChanges}></textarea>
                                        { contact.errors.message && <p className="text-danger text-left">{ contact.errors.message }</p> }
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