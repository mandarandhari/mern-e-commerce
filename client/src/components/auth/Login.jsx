import React, { useState, useContext, useEffect } from 'react';
import AuthContext from '../../context/authContext/AuthContext';

const Login = () => {
    const { loginCustomer, loginFormErrors, showLoginPopup, hideLogin } = useContext(AuthContext);

    const [userdata, setUserdata] = useState({
        useremail: '',
        password: ''
    });

    useEffect(() => {
        if (showLoginPopup) {
            document.getElementById('login-popup').classList.add('active');
            document.getElementById('login-popup').style.display = 'block';

            setTimeout(() => {
                document.getElementById('login-popup-main').classList.add('active');
                document.getElementById('login-popup-main').classList.add('fade-in-up');
            }, 200)
        } else {
            document.getElementById('login-popup').classList.remove('active');
            document.getElementById('login-popup').style.display = 'none';

            setTimeout(() => {
                document.getElementById('login-popup-main').classList.remove('fade-in-up');
                document.getElementById('login-popup-main').classList.remove('active');
            }, 200)
        }
    }, [showLoginPopup]);

    const handleChange = e => {
        setUserdata({
            ...userdata,
            [e.target.name]: e.target.value
        });
    }

    const formSubmit = async e => {
        e.preventDefault();

        await loginCustomer(userdata);
    }

    const closeBtnClicked = e => {
        e.preventDefault();

        hideLogin();
    }

    return (
        <>
            <div id="login-popup" className='cart-popup-overlay'>
                <div id="login-popup-main" className='cart-popup'>
                    <div className="container">
                        <div className="close-btn" onClick={closeBtnClicked}><i className="fa fa-times"></i></div>
                        <div className="login-main">
                            <h3 className="text-center">Login</h3>
                            <form onSubmit={formSubmit}>
                                <div className="row">
                                    <div className="col-sm-8 m-auto">
                                        <div className="row">
                                            {(
                                                () => {
                                                    return loginFormErrors.invalid && loginFormErrors.invalid.length ?
                                                    <div className="col-sm-12">
                                                        <div className="alert alert-danger mb-0">
                                                            <p className="text-danger mb-0">{loginFormErrors.invalid}</p>
                                                        </div>
                                                    </div>
                                                    :
                                                    null
                                                }
                                            )()}
                                            <div className="col-sm-12 mt-4">
                                                <input type="email" name="useremail" placeholder="Email Address" required="" className="form-control" value={userdata.email} onChange={handleChange} />
                                                {(
                                                    () => {
                                                        return loginFormErrors.email && loginFormErrors.email.length ? <p className="text-danger mt-1 mb-0">{loginFormErrors.email}</p> : null
                                                    }
                                                )()}
                                            </div>
                                            <div className="col-sm-12 mt-3">
                                                <input type="password" name="password" placeholder="Password" required="" className="form-control" value={userdata.password} onChange={handleChange} />
                                                {(
                                                    () => {
                                                        return loginFormErrors.password && loginFormErrors.password.length ? <p className="text-danger mb-0 mt-1">{loginFormErrors.password}</p> : null
                                                    }
                                                )
                                                ()}
                                            </div>
                                            <div className="col-sm-12 mt-3 text-center">
                                                <button id="login-submit" type="submit" className="btn btn-primary btn-template btn-lg">Login</button>
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

export default Login;