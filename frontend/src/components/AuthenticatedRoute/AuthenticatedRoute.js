import React from 'react';
import { Navigate, Route } from 'react-router-dom';
import useSession from '../../middleware/session';

function AuthenticatedRoute({ path, element }) {
  console.log('Rendering AuthenticatedRoute');
  const { user, ready } = useSession();

  // If the session data is not ready yet, you can show a loading indicator or any other appropriate behavior
  if (!ready) {
    return <div>Loading...</div>;
  }

  // If user is null, redirect to the login page
  if (!user) {
    return <Navigate to="/login" />;
  }

  // If the user is logged in, render the original element
  return <Route path={path} element={element} />;
}

export default AuthenticatedRoute;
