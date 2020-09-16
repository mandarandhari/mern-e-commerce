import React, { useContext, useState, useEffect } from 'react';

import AuthContext from '../../context/auth/AuthContext';

const ResetPassword = () => {
    const { showResetPasswordPopup, hideResetPassword, resetPassword } = useContext(AuthContext);

    const [ passwords, setPasswords ] = useState({
        password: '',
        confirmPassword: '',
        errors: {}
    });

    useEffect(() => {
        if (showResetPasswordPopup) {
            document.getElementById('reset-password-popup').classList.add('active');
            document.getElementById('reset-password-popup').style.display = 'block';

            setTimeout(() => {
                document.getElementById('reset-password-popup-main').classList.add('active');
                document.getElementById('reset-password-popup-main').classList.add('fade-in-up');
            }, 200)
        } else {
            document.getElementById('reset-password-popup').classList.remove('active');
            document.getElementById('reset-password-popup').style.display = 'none';

            setTimeout(() => {
                document.getElementById('reset-password-popup-main').classList.remove('fade-in-up');
                document.getElementById('reset-password-popup-main').classList.remove('active');
            }, 200)
        }
    }, [ showResetPasswordPopup ]);

    const passwordChanged = e => {
        setPasswords({
            ...passwords,
            [e.target.name]: e.target.value
        });
    }

    const formSubmit = e => {
        e.preventDefault();

        let errors = {};

        if (passwords.password.length === 0) {
            errors.password = 'Password should not be empty';
        } else if (passwords.password.length < 6) {
            errors.password = 'Password should be at least 6 characters long';
        }

        if (passwords.confirmPassword.length === 0) {
            errors.confirmPassword = 'Confirm password should not be empty';
        } else if (passwords.confirmPassword.length < 6) {
            errors.confirmPassword = 'Confirm password should be at least 6 characters long';
        } else if (passwords.password !== passwords.confirmPassword) {
            errors.confirmPassword = 'Passwords not matching';
        }

        if (Object.keys(errors).length) {
            setPasswords({
                ...passwords,
                errors: errors
            });
        } else {
            resetPassword({
                password: passwords.password,
                confirmPassword: passwords.confirmPassword
            });
        }
    }

    const closeBtnClicked = e => {
        e.preventDefault();

        hideResetPassword();
    }

    return (
        <>
            <div id="reset-password-popup" className='cart-popup-overlay'>
                <div id="reset-password-popup-main" className='cart-popup'>
                    <div className="container">
                        <div className="close-btn" onClick={closeBtnClicked}><i className="fa fa-times"></i></div>
                        <div className="reset-password-main">
                            <h3 className="text-center">Reset Password</h3>
                            <form onSubmit={formSubmit}>
                                <div className="row">
                                    <div className="col-sm-8 m-auto">
                                        <div className="row">
                                            <div className="col-sm-12 mt-4">
                                                <input type="password" name="password" placeholder="Password" className="form-control" value={passwords.password} onChange={passwordChanged} />
                                                { passwords.errors.password ? <p className="mt-1 mb-0 text-danger">{ passwords.errors.password }</p> : null }
                                            </div>
                                            <div className="col-sm-12 mt-4">
                                                <input type="password" name="confirmPassword" placeholder="Confirm Password" className="form-control" value={passwords.confirmPassword} onChange={passwordChanged} />
                                                { passwords.errors.confirmPassword ? <p className="mt-1 mb-0 text-danger">{ passwords.errors.confirmPassword }</p> : null }
                                            </div>
                                            <div className="col-sm-12 mt-3 text-center">
                                                <button id="forgot-password-submit" type="submit" className="btn btn-primary btn-template btn-lg">Reset Password</button>
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

export default ResetPassword;