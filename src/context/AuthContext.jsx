// src/context/AuthContext.jsx
import { useContext } from 'react';
import { createContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import apiClient from '../services/apiClient';
import {jwtDecode} from "jwt-decode";
import { useEffect } from 'react';
// eslint-disable-next-line react-refresh/only-export-components
export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);

  useEffect(() => {
  //  console.log('en el efect authcontet',user);
   if(!user){
    const storedUser = localStorage.getItem('token');
    if (storedUser) {
      try {
        const decoded = jwtDecode(storedUser);
        console.log('revisando en auth',decoded.exp * 1000 < Date.now(),decoded,user);
      
        decoded.exp * 1000 > Date.now() ? setUser(decoded) : logout(); // Verifica si el token no ha expirado
      } catch (error) {
        console.error('Error al verificar el token:', error);
        logout(); // Token inválido
      }
    }
   }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])
  

  const login = async (userData) => {
    console.log({userData});
    const { user, pass,account ,operacion='V'} = userData;
    try {
      console.log({baseURL: import.meta.env.VITE_API_URL});
      console.log({apiClient});
      const resp = await apiClient.get('/login',{params:{operacion, user, pass, account }});
      console.log('la resp',resp);
      
      const deco = jwtDecode(resp.newToken);
      setUser(deco);
      localStorage.setItem('token', resp.newToken);
      localStorage.setItem('ip', resp.ip);
      console.log('el deco',deco);
      
      if([1,5].includes(deco.id_rol)) navigate('/');
      if([2].includes(deco.id_rol)) navigate('/pedido');
      if([3].includes(deco.id_rol)) navigate('/caja');
      if([4].includes(deco.id_rol)) navigate('/inventario');
    } catch (error) {
      console.error('Error al iniciar sesión:', error);
      throw new Error(error.error || 'Error al iniciar sesión'); // Lanza un error para que pueda ser row
    }
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('token');
    localStorage.removeItem('ip');
    console.log('saliendo');
    navigate('/login'); // Redirige a la página de login después del logout
  };

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const UserAuth = () => {
  return useContext(AuthContext);
};