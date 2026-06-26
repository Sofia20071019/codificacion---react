// src/services/api.js
const BASE_URL = import.meta.env.VITE_API_URL || 'http://127.0.0.1:8000';

export const conexionAPI = {
  // Petición GET para traer los datos
  obtenerPruebas: async () => {
    const respuesta = await fetch(`${BASE_URL}/api/v1/prueba-conexion`);
    if (!respuesta.ok) throw new Error('Error al traer datos');
    return await respuesta.json();
  },

  // Ejemplo de lo que usarías para los suministros
  obtenerSuministros: async () => {
    const respuesta = await fetch(`${BASE_URL}/api/v1/suministros`);
    return await respuesta.json();
  }
};