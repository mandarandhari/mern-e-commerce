import React from 'react';

const Login = () => {
    return (
        <>
            <div id="login-popup" className="cart-popup-overlay">
                <div className="cart-popup">
                    <div className="container">
                        <div className="close-btn"><i className="fa fa-times"></i></div>
                        <div className="login-main">
                            <h3 className="text-center">Login</h3>
                            <form>
                                <div className="row">
                                    <div className="col-sm-8 m-auto">
                                        <div className="row">
                                            <div className="col-sm-12 mt-4">
                                                <input type="email" name="useremail" placeholder="Email Address" required="" className="form-control" />
                                            </div>
                                            <div className="col-sm-12 mt-3">
                                                <input type="password" name="password" placeholder="Password" required="" className="form-control" />
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