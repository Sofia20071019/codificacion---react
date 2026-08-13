# =============================================================================
# Dockerfile - Frontend React + Vite (Kimuka3)
# Modo desarrollo con hot-reload (útil mientras sigues programando la feature)
# =============================================================================
FROM node:20-alpine

WORKDIR /app

COPY package*.json ./
RUN npm install

COPY . .

EXPOSE 5173

# --host 0.0.0.0 es obligatorio: por defecto Vite solo escucha en localhost
# DENTRO del contenedor, lo que lo dejaría inaccesible desde fuera.
CMD ["npm", "run", "dev", "--", "--host", "0.0.0.0", "--port", "5173"]
