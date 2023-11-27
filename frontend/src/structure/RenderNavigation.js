// RenderNavigation.js
import React from 'react';
import { Route, Routes } from 'react-router-dom';
import { nav } from './Navigation';
import { AuthMiddleware } from '../config/Middleware';

export const RenderRoutes = () => {
  return (
    <Routes>
      {nav.map((route, index) => (
        <Route
          key={index}
          path={route.path}
          element={
            <AuthMiddleware
              element={route.element}
              isAuth={route.isAuth}
              requiredRole={route.requiredRole}
            />
          }
        />
      ))}
    </Routes>
  );
};