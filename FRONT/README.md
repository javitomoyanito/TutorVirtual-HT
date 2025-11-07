# Millapeluche v3 — Admin Dashboard (React + Vite + Tailwind + json-server)

## Cómo iniciar
```bash
npm install
npm install axios #CRUD productos, usuarios
npm install zustand
npm run api   # inicia json-server en http://localhost:5000
npm run dev   # inicia Vite
```
Login: **usuario**: `admin` — **contraseña**: `admin`

## Endpoints API (json-server)
- http://localhost:5000/productos
- http://localhost:5000/usuarios

## Rutas
- Público: `/` (InicioMain), `/productos`, `/nosotros`, `/blogs`, `/contacto`, `/login`, `/registro`, `/carrito`
- Admin (protegidas): `/admin` (Dashboard), `/admin/productos`, `/admin/usuarios`, `/admin/informes`

## Notas
- El panel sólo es accesible si has iniciado sesión (localStorage `auth=true`).
- El estilo del panel está integrado con la paleta cálida rojiza/naranja.
- CRUD de Productos y Usuarios conectado a json-server mediante Axios.
