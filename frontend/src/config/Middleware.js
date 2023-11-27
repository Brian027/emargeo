// Middleware.js
import React from 'react';
import { Navigate } from 'react-router-dom';

export const AuthMiddleware = ({ element, isAuth, requiredRole }) => {
  const token = sessionStorage.getItem('token');
  const user = sessionStorage.getItem('user') ? JSON.parse(sessionStorage.getItem('user')) : null;

  if (isAuth) {
    // Vérifier l'authentification
    if (!token || token === 'undefined') {
      return <Navigate to="/signIn" />;
    }

    // Vérifier les autorisations si un rôle est requis
    if (requiredRole && user.role !== requiredRole) {
      return <Navigate to="/" />; // Rediriger si le rôle n'est pas correct
    }
  }

  return element;
};