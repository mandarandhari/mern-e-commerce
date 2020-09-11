import React, { useEffect, useState, useContext } from 'react';
import { Route, Redirect } from 'react-router-dom';
import AuthContext from '../context/auth/AuthContext';

const PrivateRoute = ({ component: Component, ...rest }) => {
    const { isLoggedIn } = useContext(AuthContext);

    const [ authorization, setAuthorization ] = useState(true);

    useEffect(() => {
        if (isLoggedIn) {
            setAuthorization(true);
        } else {
            setAuthorization(false);
        }
    }, [ isLoggedIn ])

    return (
        <Route
            {...rest}
            render={
                props => {
                    return authorization ? (
                        <Component {...props} />
                    ) : (
                        <Redirect to={{ pathname: '/', state: { from: props.location } }} />
                    )
                }
            }
        />
    )
}

export default PrivateRoute;