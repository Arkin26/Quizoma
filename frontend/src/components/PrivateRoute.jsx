import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';

export default function PrivateRoute({ children }) {
  const token = localStorage.getItem('token');
  const location = useLocation();

  if (!token) {
    // ⛳️ Send user to login *with* the redirect param
    return <Navigate to={`/login?redirect=${location.pathname}`} replace />;
  }

  return children;
}
