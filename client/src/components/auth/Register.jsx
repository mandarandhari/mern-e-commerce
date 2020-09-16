import React, { useContext, useState, useEffect } from 'react';
import AuthContext from '../../context/auth/AuthContext';

const Register = () => {
    const { registerCustomer, registerFormErrors, showRegisterPopup, hideRegister, showLogin } = useContext(AuthContext);

    const [userdata, setUserdata] = useState({
        firstName: '',
        lastName: '',
        email: '',
        phone: '',
        password: '',
        confirmPassword: ''
    });

    useEffect(() => {
        if (showRegisterPopup) {
            document.getElementById('register-popup').classList.add('active');
            document.getElementById('register-popup').style.display = 'block';

            setTimeout(() => {
                document.getElementById('register-popup-main').classList.add('active');
                document.getElementById('register-popup-main').classList.add('fade-in-up');
            }, 200)
        } else {
            document.getElementById('register-popup').classList.remove('active');
            document.getElementById('register-popup').style.display = 'none';

            setTimeout(() => {
                document.getElementById('register-popup-main').classList.remove('fade-in-up');
                document.getElementById('register-popup-main').classList.remove('active');
            }, 200)
        }
    }, [showRegisterPopup])

    const handleChange = e => {
        setUserdata({
            ...userdata,
            [e.target.name]: e.target.value
        });
    }

    const formSubmit = async e => {
        e.preventDefault();

        await registerCustomer(userdata);
    }

    const loginLinkClicked = () => {
        hideRegister();

        showLogin();
    }

    return (
        <>
            <div id="register-popup" className='cart-popup-overlay'>
                <div id="register-popup-main" className='cart-popup'>
                    <div className="container">
                        <div className="close-btn" onClick={() => hideRegister()}><i className="fa fa-times"></i></div>
                        <div className="register-main">
                            <h3 className="text-center">Register</h3>
                            <form onSubmit={formSubmit}>
                                <div className="row">
                                    <div className="col-sm-8 m-auto">
                                        <div className="row">
                                            <div className="col-sm-12 mt-4">
                                                <input type="text" name="firstName" placeholder="First Name" required="" className="form-control" value={userdata.firstName} onChange={handleChange} />
                                                {( 
                                                    () => {
                                                        return registerFormErrors && registerFormErrors.firstName.length ? <p className="text-danger mb-0 mt-1">{registerFormErrors.firstName}</p> : null
                                                    } 
                                                )()}
                                            </div>
                                            <div className="col-sm-12 mt-3">
                                                <input type="text" name="lastName" placeholder="Last Name" required="" className="form-control" value={userdata.lastName} onChange={handleChange} />
                                                {(
                                                    () => {
                                                        return registerFormErrors && registerFormErrors.lastName.length ? <p className="text-danger mb-0 mt-1">{registerFormErrors.lastName}</p> : null
                                                    }
                                                )()}
                                            </div>
                                            <div className="col-sm-12 mt-3">
                                                <input type="email" name="email" placeholder="Email Address" required="" className="form-control" value={userdata.email} onChange={handleChange} />
                                                {(
                                                    () => {
                                                        return registerFormErrors && registerFormErrors.email.length ? <p className="text-danger mb-0 mt-1">{registerFormErrors.email}</p> : null
                                                    }
                                                )()}
                                            </div>
                                            <div className="col-sm-12 mt-3">
                                                <input type="text" name="phone" placeholder="Phone Number" required="" className="form-control" value={userdata.phone} onChange={handleChange} />
                                                {(
                                                    () => {
                                                        return registerFormErrors && registerFormErrors.phone.length ? <p className="text-danger mb-0 mt-1">{registerFormErrors.phone}</p> : null
                                                    }
                                                )()}
                                            </div>
                                            <div className="col-sm-12 mt-3">
                                                <input type="password" name="password" placeholder="Password" required="" className="form-control" value={userdata.password} onChange={handleChange} />
                                                {(
                                                    () => {
                                                        return registerFormErrors && registerFormErrors.password.length ? <p className="text-danger mb-0 mt-1">{registerFormErrors.password}</p> : null
                                                    }
                                                )()}
                                            </div>
                                            <div className="col-sm-12 mt-3">
                                                <input type="password" name="confirmPassword" placeholder="Confirm Password" required="" className="form-control" value={userdata.confirmPassword} onChange={handleChange} />
                                                {(
                                                    () => {
                                                        return registerFormErrors && registerFormErrors.confirmPassword.length ? <p className="text-danger mb-0 mt-1">{registerFormErrors.confirmPassword}</p> : null
                                                    }
                                                )()}
                                            </div>
                                            <div className="col-sm-12 mt-3 text-center">
                                                <button id="register-submit" type="submit" className="btn btn-primary btn-template btn-lg">Register</button>
                                            </div>
                                            <div className="col-sm-12 mt-5 text-center">
                                                <p style={{ textDecoration: 'underline', cursor: 'pointer' }} onClick={loginLinkClicked}>Already have an account? Click here to login!</p>
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

export default Register;