import React from 'react';
import { Navigate } from 'react-router-dom';
import { isAuthenticated } from '../utils/JWTAuth';

//import jwt from 'jwt-decode';

// const tokenJwt = sessionStorage.getItem('access_token');
// const user = tokenJwt && jwt(tokenJwt).data;
// const userLevel = user?.nivel;

const PrivateRoute = ({ element }) => {
  return isAuthenticated() ? element : <Navigate to={{ pathname: '/login' }} />;
};

export default PrivateRoute;
