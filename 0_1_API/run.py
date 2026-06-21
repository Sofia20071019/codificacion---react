import uvicorn

if __name__ == "__main__":
    # Arranca el servidor buscando la instancia de "app" dentro de la carpeta app.main
    uvicorn.run("app.main:app", host="0.0.0.0", port=8000, reload=True)