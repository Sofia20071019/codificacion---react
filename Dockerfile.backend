# =============================================================================
# Dockerfile - Backend Flask (Kimuka3 API)
# =============================================================================
FROM python:3.11-slim

WORKDIR /app

# Dependencias del sistema necesarias para compilar mysqlclient
RUN apt-get update && apt-get install -y --no-install-recommends \
    build-essential \
    default-libmysqlclient-dev \
    pkg-config \
    && rm -rf /var/lib/apt/lists/*

# Instalar dependencias de Python primero (mejor cache de capas)
COPY requirements.txt .
RUN pip install --no-cache-dir -r requirements.txt

# Copiar el resto del código
COPY . .

EXPOSE 5000

# IMPORTANTE: run.py hace app.run(debug=True), que por defecto solo escucha
# en 127.0.0.1 (dentro del contenedor). Eso lo haría inalcanzable desde fuera.
# Por eso arrancamos con "flask run --host=0.0.0.0", que sí expone el puerto
# a los demás contenedores y a tu navegador, sin tocar tu código fuente.
ENV FLASK_APP=run.py
CMD ["flask", "run", "--host=0.0.0.0", "--port=5000"]
