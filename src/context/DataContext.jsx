// src/context/AuthContext.jsx
import { useContext } from 'react';
import { createContext, useState } from 'react';
import apiClient from '../services/apiClient';
import { useEffect } from 'react';
import { UserAuth } from './AuthContext';

// eslint-disable-next-line react-refresh/only-export-components
export const DataContext = createContext();

export const DataProvider = ({ children }) => {
  const { user, logout} = UserAuth();
  const [loading, setLoading] = useState(false);
  const [equipos, setEquipos] = useState([]);
  const [partidos, setPartidos] = useState([]);
  const [apuestas, setApuestas] = useState([]);
  const [parametricas, setParametricas] = useState([]);
  const [usuarios, setUsuarios] = useState([]);

  useEffect(() => {
    if(user) consumirAPI('/listarClasificador', { opcion: 'T' });
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const consumirAPI = async( ruta,parametros) =>{
    setLoading(true);
    parametros.cache = new Date().getTime();
    try {
      const resp = await apiClient.get(ruta, { params: { ...parametros }});
      if(ruta === '/listarEquipos') setEquipos(resp);
      if(ruta === '/listarPartidos') setPartidos(resp);
      if(ruta === '/listarApuestas') setApuestas(resp);
      if(ruta === '/listarClasificador') setParametricas(resp);
      if(ruta === '/listarUsuarios') setUsuarios(resp);
      console.log('API Response:', ruta, resp);
      
      if(ruta.startsWith('/crud') && resp[0]?.message) {
        // toast(`Control ${ruta.replace('/crud','')}`, resp[0].message, 'success');
        console.log(resp);
      }
      if([401,402,403].includes(resp.status)) logout();
      return resp;
    } catch (error) {
      console.error('Error al consumir data:', error);
      // toast('Error API:',error.message || error,'error')
    }finally {
      setLoading(false);
    }
  }

  return (
    <DataContext.Provider value={{ loading,equipos, partidos, apuestas, consumirAPI,parametricas,usuarios}}>
      {children}
    </DataContext.Provider>
  );
};

export const DataApp = () => {
  return useContext(DataContext);
};