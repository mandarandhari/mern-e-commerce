import React, { useContext, useEffect, useState } from 'react';

import AuthContext from '../../context/auth/AuthContext';

const ForgotPassword = () => {
    const { showForgotPasswordPopup, hideForgotPassword, forgotPassword, forgotPasswordEmailError } = useContext(AuthContext);
    const [ email, setEmail ] = useState('');
    const [ emailError, setEmailError ] = useState('');

    useEffect(() => {
        if (showForgotPasswordPopup) {
            document.getElementById('forgot-password-popup').classList.add('active');
            document.getElementById('forgot-password-popup').style.display = 'block';

            setTimeout(() => {
                document.getElementById('forgot-password-popup-main').classList.add('active');
                document.getElementById('forgot-password-popup-main').classList.add('fade-in-up');
            }, 200)
        } else {
            document.getElementById('forgot-password-popup').classList.remove('active');
            document.getElementById('forgot-password-popup').style.display = 'none';

            setTimeout(() => {
                document.getElementById('forgot-password-popup-main').classList.remove('fade-in-up');
                document.getElementById('forgot-password-popup-main').classList.remove('active');
            }, 200)
        }
    }, [ showForgotPasswordPopup ]);

    useEffect(() => {
        setEmailError(forgotPasswordEmailError);
    }, [forgotPasswordEmailError]);

    const closeBtnClicked = e => {
        e.preventDefault();

        hideForgotPassword();
    }

    const emailFieldChanged = e => {
        setEmail(e.target.value);
    }

    const formSubmit = e => {
        e.preventDefault();

        forgotPassword(email);
    }

    return (
        <>
            <div id="forgot-password-popup" className='cart-popup-overlay'>
                <div id="forgot-password-popup-main" className='cart-popup'>
                    <div className="container">
                        <div className="close-btn" onClick={closeBtnClicked}><i className="fa fa-times"></i></div>
                        <div className="forgot-password-main">
                            <h3 className="text-center">Forgot Password</h3>
                            <form onSubmit={formSubmit}>
                                <div className="row">
                                    <div className="col-sm-8 m-auto">
                                        <div className="row">
                                            <div className="col-sm-12 mt-4">
                                                <input type="text" name="email" placeholder="Email Address" required="" className="form-control" value={email} onChange={emailFieldChanged} />
                                                { emailError.length ? <p className="mt-1 mb-0 text-danger">{ emailError }</p> : null }
                                            </div>
                                            <div className="col-sm-12 mt-3 text-center">
                                                <button id="forgot-password-submit" type="submit" className="btn btn-primary btn-template btn-lg">Send Email</button>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default ForgotPassword;