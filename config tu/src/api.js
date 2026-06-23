// src/api.js
const API_BASE_URL = 'http://127.0.0.1:5000'; //  Ajustado al puerto 5000 de tu Flask

export const fetchData = async (endpoint, options = {}) => {
  try {
    const response = await fetch(`${API_BASE_URL}${endpoint}`, {
      headers: {
        'Content-Type': 'application/json',
        ...options.headers,
      },
      ...options,
    });

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      throw new Error(errorData.error || `Error en la petición: ${response.status}`);
    }

    return await response.json();
  } catch (error) {
    console.error("Error conectando con la API:", error);
    throw error;
  }
};