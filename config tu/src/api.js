const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://127.0.0.1:5000';

export const api = {
  async request(endpoint, options = {}) {
    const response = await fetch(`${API_BASE_URL}${endpoint}`, {
      headers: { 'Content-Type': 'application/json', ...options.headers },
      ...options,
    });
    const data = await response.json();
    if (!response.ok) throw new Error(data.message || `Error ${response.status}`);
    return data;
  },

  auth: {
    login: (correo, password) =>
      api.request('/api/auth/login', {
        method: 'POST',
        body: JSON.stringify({ correo, password }),
      }),
    recuperarContrasena: (correo) =>
      api.request('/api/auth/recuperar-contrasena', {
        method: 'POST',
        body: JSON.stringify({ correo }),
      }),
  },

  usuarios: {
    listar: () => api.request('/api/usuarios'),
    obtener: (id) => api.request(`/api/usuarios/${id}`),
    crear: (data) =>
      api.request('/api/usuarios', {
        method: 'POST',
        body: JSON.stringify(data),
      }),
    actualizar: (id, data) =>
      api.request(`/api/usuarios/${id}`, {
        method: 'PUT',
        body: JSON.stringify(data),
      }),
    eliminar: (id) =>
      api.request(`/api/usuarios/${id}`, { method: 'DELETE' }),
  },

  roles: {
    listar: () => api.request('/api/roles'),
  },

  insumos: {
    listar: () => api.request('/api/insumos'),
    crear: (data) =>
      api.request('/api/insumos', {
        method: 'POST',
        body: JSON.stringify(data),
      }),
    actualizar: (id, data) =>
      api.request(`/api/insumos/${id}`, {
        method: 'PUT',
        body: JSON.stringify(data),
      }),
    eliminar: (id) =>
      api.request(`/api/insumos/${id}`, { method: 'DELETE' }),
  },

  categorias: {
    listar: () => api.request('/api/categorias'),
  },

  unidadesMedida: {
    listar: () => api.request('/api/unidades-medida'),
  },

  ordenes: {
    listar: () => api.request('/api/ordenes'),
    obtener: (id) => api.request(`/api/ordenes/${id}`),
    crear: (data) =>
      api.request('/api/ordenes', {
        method: 'POST',
        body: JSON.stringify(data),
      }),
    actualizar: (id, data) =>
      api.request(`/api/ordenes/${id}`, {
        method: 'PUT',
        body: JSON.stringify(data),
      }),
  },

  jornadas: {
    listar: () => api.request('/api/jornadas'),
    crear: (data) =>
      api.request('/api/jornadas', {
        method: 'POST',
        body: JSON.stringify(data),
      }),
    finalizar: (id, data) =>
      api.request(`/api/jornadas/${id}`, {
        method: 'PUT',
        body: JSON.stringify(data),
      }),
  },

  pagos: {
    listar: () => api.request('/api/pagos'),
    crear: (data) =>
      api.request('/api/pagos', {
        method: 'POST',
        body: JSON.stringify(data),
      }),
    aprobar: (id, data) =>
      api.request(`/api/pagos/${id}`, {
        method: 'PUT',
        body: JSON.stringify(data),
      }),
  },

  metodosPago: {
    listar: () => api.request('/api/metodos-pago'),
  },

  clientes: {
    listar: () => api.request('/api/clientes'),
    crear: (data) =>
      api.request('/api/clientes', {
        method: 'POST',
        body: JSON.stringify(data),
      }),
  },

  productos: {
    listar: () => api.request('/api/productos'),
    crear: (data) =>
      api.request('/api/productos', {
        method: 'POST',
        body: JSON.stringify(data),
      }),
  },
};
