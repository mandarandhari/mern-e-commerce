import React, { useContext, useState, useEffect } from 'react';
import AuthContext from '../../context/authContext/AuthContext';

const Profile = () => {
    const { customer, showProfilePopup, hideProfile, updateCustomer, profileFormErrors } = useContext(AuthContext);

    const [userdata, setUserdata] = useState({
        firstName: customer.firstName,
        lastName: customer.lastName,
        email: customer.email,
        phone: customer.phone,
        password: '',
        confirmPassword: ''
    });

    useEffect(() => {
        setUserdata({
            ...userdata,
            firstName: customer.firstName,
            lastName: customer.lastName,
            email: customer.email,
            phone: customer.phone,
        });
    }, [customer]);

    const handleChange = e => {
        setUserdata({
            ...userdata,
            [e.target.name]: e.target.value
        });
    }

    const formSubmit = e => {
        e.preventDefault();

        updateCustomer(userdata);
    }

    return (
        <>
            <div id="profile-popup" className={ showProfilePopup ? `cart-popup-overlay active` : `cart-popup-overlay`} style={ showProfilePopup ? {display: 'block'} : {display: 'none'} }>
                <div className={ showProfilePopup ? `cart-popup fade-in-up active` : `cart-popup`}>
                    <div className="container">
                        <div className="close-btn" onClick={() => hideProfile()}><i className="fa fa-times"></i></div>
                        <div className="profile-main">
                            <h3 className="text-center">Profile</h3>
                            <form onSubmit={formSubmit}>
                                <div className="row">
                                    <div className="col-sm-8 m-auto">
                                        <div className="row">
                                            <div className="col-sm-12 mt-4">
                                                <input type="text" name="firstName" placeholder="First Name" required="" className="form-control" value={userdata.firstName} onChange={handleChange} />
                                                {(
                                                    () => {
                                                        return profileFormErrors.firstName && profileFormErrors.firstName.length ? <p className="text-danger">{profileFormErrors.firstName}</p> : null
                                                    }
                                                )()}
                                            </div>
                                            <div className="col-sm-12 mt-3">
                                                <input type="text" name="lastName" placeholder="Last Name" required="" className="form-control" value={userdata.lastName} onChange={handleChange} />
                                                {(
                                                    () => {
                                                        return profileFormErrors.lastName && profileFormErrors.lastName.length ? <p className="text-danger">{profileFormErrors.lastName}</p> : null
                                                    }
                                                )()}
                                            </div>
                                            <div className="col-sm-12 mt-3">
                                                <input type="email" name="email" placeholder="Email Address" required="" className="form-control" value={userdata.email} onChange={handleChange} disabled />
                                                {(
                                                    () => {
                                                        return profileFormErrors.email && profileFormErrors.email.length ? <p className="text-danger">{profileFormErrors.email}</p> : null
                                                    }
                                                )()}
                                            </div>
                                            <div className="col-sm-12 mt-3">
                                                <input type="text" name="phone" placeholder="Phone Number" required="" className="form-control" value={userdata.phone} onChange={handleChange} />
                                                {(
                                                    () => {
                                                        return profileFormErrors.phone && profileFormErrors.phone.length ? <p className="text-danger">{profileFormErrors.phone}</p> : null
                                                    }
                                                )()}
                                            </div>
                                            <div className="col-sm-12 mt-3">
                                                <input type="password" name="password" placeholder="Password" required="" className="form-control" value={userdata.password} onChange={handleChange} />
                                                {(
                                                    () => {
                                                        return profileFormErrors.password && profileFormErrors.password.length ? <p className="text-danger">{profileFormErrors.password}</p> : null
                                                    }
                                                )()}
                                            </div>
                                            <div className="col-sm-12 mt-3">
                                                <input type="password" name="confirmPassword" placeholder="Confirm Password" required="" className="form-control" value={userdata.confirmPassword} onChange={handleChange} />
                                                {(
                                                    () => {
                                                        return profileFormErrors.confirmPassword && profileFormErrors.confirmPassword.length ? <p className="text-danger">{profileFormErrors.confirmPassword}</p> : null
                                                    }
                                                )()}
                                            </div>
                                            <div className="col-sm-12 mt-3 text-center">
                                                <button id="profile-update" type="submit" className="btn btn-primary btn-template btn-lg">Update</button>
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

export default Profile;