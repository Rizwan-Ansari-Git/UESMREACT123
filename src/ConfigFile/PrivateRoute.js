import React from 'react';
import { Navigate } from 'react-router-dom';
import {jwtDecode} from 'jwt-decode';

const PrivateRoute = ({ children }) => {
  const token = localStorage.getItem('jwtToken');

  const isTokenValid = () => {
    if (!token) return false;

    try {
      const { exp } = jwtDecode(token);
      return Date.now() < exp * 1000;
    } catch (e) {
      return false;
    }
  };

  return isTokenValid() ? children : <Navigate to="/" />;
};

export default PrivateRoute;
