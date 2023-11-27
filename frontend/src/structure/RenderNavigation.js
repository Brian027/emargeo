import React from 'react'
import { Route, Routes, Navigate } from 'react-router-dom';
import { nav } from './Navigation';

export const RenderRoutes = () => {

  return (
    <Routes>
      {nav.map((r, i) => {
        if (r.isAuth) {
          if (sessionStorage.getItem('token')) {
            return <Route key={i} path={r.path} element={r.element} />;
          } else {
            return (
              <Route key={i} path={r.path} element={<Navigate to='/signIn' />} />
            );
          }
        } else if (!r.isAuth) {
          return <Route key={i} path={r.path} element={r.element} />;
        } else {
          return false;
        }
      })}
    </Routes>
  );
}