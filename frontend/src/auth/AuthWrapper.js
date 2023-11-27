import React, { createContext, useContext } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { RenderRoutes } from '../structure/RenderNavigation';

const AuthContext = createContext();
export const AuthData = () => useContext(AuthContext);

export const AuthWrapper = () => {

  const navigate = useNavigate();

  const login = async (email, password) => {
    const response = await axios.post('http://localhost:5000/signIn', { email, password });
    
    try {

      if(response.status === 200) {
        const data = await response.data;
        sessionStorage.setItem('token', data.token);
        navigate('/account');
      } else {
        return response.data.message;
      }
      
    } catch (error) {
      
      return error;

    }
  };

  const signUp = async (firstName, lastName, email, password) => {

    const response = await axios.post('http://localhost:5000/signUp', { firstName, lastName, email, password });
    const data = await response.data;

    if (data.message === 'Inscription réussie') {
      return data.message;
    } else {
      return data.message;
    }
  };

  return (
    <AuthContext.Provider value={{ login, signUp }}>
      <>
        <RenderRoutes />
      </>
    </AuthContext.Provider>
  );
};
