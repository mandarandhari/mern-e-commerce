import React, { useContext, useState } from 'react';
import AuthContext from '../../context/authContext/AuthContext';

const Register = (props) => {
    const { registerCustomer, registerFormErrors } = useContext(AuthContext);

    const [userdata, setUserdata] = useState({
        firstName: '',
        lastName: '',
        email: '',
        phone: '',
        password: '',
        confirmPassword: ''
    });

    const handleChange = e => {
        setUserdata({
            ...userdata,
            [e.target.name]: e.target.value
        });
    }

    const formSubmit = e => {
        e.preventDefault();

        registerCustomer(userdata);
    }

    return (
        <>
            <div id="register-popup" className="cart-popup-overlay">
                <div className="cart-popup">
                    <div className="container">
                        <div className="close-btn"><i className="fa fa-times"></i></div>
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