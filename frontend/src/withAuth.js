// withAuth.js
import React from 'react';
import { Navigate } from 'react-router-dom';
import useSession from './middleware/session';
import Cookies from 'js-cookie'; // Import js-cookie library

function withAuth(WrappedComponent) {
  return function(props) {
    const { user } = useSession();

    // Check if the session cookie exists
    const sessionCookie = Cookies.get('session');

    if (!sessionCookie) {
      // If the user is not logged in or the session cookie is missing, redirect to the login page
      return <Navigate to="/login" />;
    }

    // If the user is logged in and the session cookie exists, render the original component
    return <WrappedComponent {...props} />;
  };
}

export default withAuth;