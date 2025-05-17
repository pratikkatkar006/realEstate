// ProtectedRoute.js
import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { useAuth } from './AuthContext';

const ProtectedRoute = () => {
  const { user, loading } = useAuth();
  
  // If loading, you might want to return a loading spinner or null
  if (loading) {
    return <div>Loading...</div>; // or a spinner component
  }

  // If user is not authenticated, redirect to login page
  if (!user) {
    return <Navigate to="/login" replace />;
  }
  
  // If user is authenticated, render the child routes
  return <Outlet />;
};

export default ProtectedRoute;
