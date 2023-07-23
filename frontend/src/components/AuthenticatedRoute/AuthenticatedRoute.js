// PrivateRoute.js
import React from 'react';
import { Navigate, Route } from 'react-router-dom';
import useSession from '../../middleware/session';

function AuthenticatedRoute({ path, element }) {
  const { user } = useSession();

  if (!user) {
    // If the user is not logged in, redirect to the login page
    return <Navigate to="/login" />;
  }

  // If the user is logged in, render the original element
  return <Route path={path} element={element} />;
}

export default AuthenticatedRoute;
