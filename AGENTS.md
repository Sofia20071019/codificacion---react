# AGENTS.md — Kimuka ERP (codificacion---react)

Monorepo con 1 frontend React y 3 APIs. El directorio raíz no tiene configs compartidos.

## Estructura

- `config tu/` — Frontend React 19 + Vite 8. Entry `src/main.jsx` → `App.jsx`.
  Bootstrap CDN, Chart.js, React Router v7. ESLint flat config.
- `3_0_API/` — **API activa**. Flask + bcrypt + MySQL (PyMySQL). Factory `create_app()`.
  Endpoints bajo `/api/*`. Seed con `sead.py`. Puerto 5000.
- `02_API/`, `0_1_API/` — APIs legacy, ignorar.

## BD: Kimuka3_db (MySQL)

Schema en `3_0_API/schema_kimuka3.sql`. IDs son VARCHAR(10) tipo `USR-001`, `ORD-002`.
Seed crea admin por defecto: `admin@titan.com` / `admin123`.

```bash
python sead.py    # Crea tablas + datos iniciales (roles, estados, admin, catálogos)
python run.py     # Arranca Flask en :5000
```

## Frontend → Backend

- `src/api.js` — Servicio unificado, usa `import.meta.env.VITE_API_URL` (default `:5000`).
- Auth: `POST /api/auth/login` devuelve `{idUsuario, nombre, correo, idRol}`.
  Sesión en localStorage (`kimuka_sesion_activa`, `usuarioLogueado`).
- `RutaProtegida` en `App.jsx` redirige a `/login` si no hay sesión.

## Endpoints por módulo

| Recurso | Endpoints |
|---|---|
Auth | POST `/api/auth/login`, POST `/api/auth/recuperar-contrasena`
Usuarios | GET/POST `/api/usuarios`, GET/PUT/DELETE `/api/usuarios/<id>`
Roles | GET/POST `/api/roles`
Insumos | GET/POST `/api/insumos`, PUT/DELETE `/api/insumos/<id>`
Categorías | GET `/api/categorias`
Unidades Medida | GET `/api/unidades-medida`
Órdenes | GET/POST `/api/ordenes`, GET/PUT `/api/ordenes/<id>`
Clientes | GET/POST `/api/clientes`
Productos | GET/POST `/api/productos`
Jornadas | GET/POST `/api/jornadas`, PUT `/api/jornadas/<id>`
Pagos | GET/POST `/api/pagos`, PUT `/api/pagos/<id>`
Métodos Pago | GET `/api/metodos-pago`

## Convenciones

- Código en español (nombres, variables, comentarios).
- Sin tests, sin CI, sin pre-commit.
- `npm run dev` para frontend, `python run.py` para backend.
- Para probar endpoints usar Postman contra `http://127.0.0.1:5000`.
