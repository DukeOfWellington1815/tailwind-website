// AuthenticatedRoute.js
import React from 'react';
import { Navigate, Route } from 'react-router-dom';
import useSession from '../../middleware/session';
import Cookies from 'js-cookie'; // Import js-cookie library

function AuthenticatedRoute({ path, element }) {
  console.log('Rendering AuthenticatedRoute'); // Add a console log here
  const { user } = useSession();

  // Check if the session cookie exists
  const sessionCookie = Cookies.get('session');
  console.log('sessionCookie:', sessionCookie); // Add a console log here

  if (!sessionCookie) {
    // If the user is not logged in or the session cookie is missing, redirect to the login page
    return <Navigate to="/login" />;
  }

  // If the user is logged in and the session cookie exists, render the original element
  return <Route path={path} element={element} />;
}

export default AuthenticatedRoute;