import React from 'react'
import { Route, Redirect } from 'react-router-dom';
import { getToken } from '../GlobalStates.js';

const ProtectedRoute = ({component: Component, ...rest}) => {
    return (  
        <Route {...rest} render = {props => {
            const token = getToken();
            if (token === null || token.length === 0) return <Redirect to={"/"}/>
            else return <Component {...props} />
        }}/>
    );
}

export default ProtectedRoute