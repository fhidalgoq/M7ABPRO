# Evaluación Final Módulo 7

Aplicación web desarrollada como entrega final del módulo 7 para la gestión y visualización de cursos en línea. El proyecto está construido con Vue 3, Vite, Vuetify y Firebase, integrando autenticación y persistencia en Firestore.

- **Deploy:** https://evafinalm7.web.app
- **Autores:** Javiera Ampuero, Constanza Gomez, Francisco Hidalgo, Fabian Jeldes

## Características principales

- Landing page con estadísticas, filtros, ordenamiento y buscador de cursos.
- Panel de administración para crear, editar, activar/inactivar y eliminar cursos.
- Autenticación con Firebase Auth (registro, login y protección de rutas).
- Sincronización en tiempo real con Firestore y carga de cursos de ejemplo.
- Interfaz moderna responsiva basada en Vuetify 3.

## Stack técnico

- Vue 3 + Vite
- Pinia para el manejo de estado
- Vue Router 4
- Vuetify 3
- Firebase (Auth + Firestore)

## Requisitos previos

- Node.js 16 o superior
- npm
- Proyecto de Firebase configurado

## Configuración del entorno

1. Clonar el repositorio:
   ```bash
   git clone <url-del-repo>
   cd M7ABPRO
   ```

2. Instalar dependencias:
   ```bash
   npm install
   ```

3. Definir variables de entorno en `.env`:
   ```env
   VITE_FIREBASE_API_KEY=tu_api_key
   VITE_FIREBASE_AUTH_DOMAIN=tu_auth_domain
   VITE_FIREBASE_PROJECT_ID=tu_project_id
   VITE_FIREBASE_STORAGE_BUCKET=tu_storage_bucket
   VITE_FIREBASE_MESSAGING_SENDER_ID=tu_sender_id
   VITE_FIREBASE_APP_ID=tu_app_id
   ```

4. Ejecutar entorno de desarrollo:
   ```bash
   npm run dev
   ```

## Scripts npm

- `npm run dev` – servidor de desarrollo con Vite.
- `npm run build` – compilación para producción.
- `npm run preview` – vista previa de la build.

## Estructura del proyecto

```
src/
├── assets/              # Recursos estáticos
├── components/          # Componentes reutilizables (CourseCard, etc.)
├── plugins/             # Configuración de Vuetify
├── router/              # Definición de rutas
├── stores/              # Pinia stores (auth, courses)
├── views/               # Vistas (Home, Admin, Login, Register, EditCourse)
├── firebase.js          # Inicialización de Firebase
└── main.js              # Punto de entrada de la app
```

## Flujo de trabajo sugerido

1. Registrar o iniciar sesión para acceder al panel administrativo.
2. Utilizar el botón "Cargar Datos de Ejemplo" en Home para poblar Firestore si está vacío.
3. Administrar cursos desde la vista de administración.

## Autores

- Javiera Ampuero
- Constanza Gomez
- Francisco Hidalgo
- Fabian Jeldes

