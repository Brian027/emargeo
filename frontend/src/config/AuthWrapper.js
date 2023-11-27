import React, { createContext, useContext } from 'react'
import api from '../api/api';
import { RenderRoutes } from '../structure/RenderNavigation';
import { useNavigate } from 'react-router-dom';

const AuthContext = createContext();
export const AuthData = () => useContext(AuthContext);

export const AuthWrapper = () => {

  const navigate = useNavigate();

  // Connexion
  const login = async (credentials) => {

    try {
      
      // Connexion
      const url = api.signIn(credentials);
      const response = await url 
      const data = await response.data;

      // Stockage du token et des données de l'utilisateur
      sessionStorage.setItem('token', data.token);
      sessionStorage.setItem('user', JSON.stringify(data.user));

      // Redirection
      navigate('/account');
      
    } catch (error) {
      console.log(error);
    }
  };

  // Déconnexion
  const logout = async (token) => {

    try {

      const url = api.logOut(token);
      const response = await url;
      const data = await response.data;

      // Suppression du token et des données de l'utilisateur
      sessionStorage.removeItem('token');
      sessionStorage.removeItem('user');

      // Redirection
      navigate('/signIn');
      
    } catch (error) {
      
    }
  };
  
  return (
    <AuthContext.Provider value={{ login, logout }}>
      <>
        <RenderRoutes />
      </>
    </AuthContext.Provider>
  );
};