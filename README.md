# EduPlatform 🎓

Una plataforma web moderna para la gestión de cursos online desarrollada con Vue 3, Vuetify y Firebase.

## 🚀 Características

- **Gestión de Cursos**: Crear, editar, eliminar y visualizar cursos
- **Autenticación**: Sistema de registro e inicio de sesión con Firebase Auth
- **Panel de Administración**: Interfaz completa para administrar todos los cursos
- **Búsqueda y Filtros**: Buscar cursos por nombre, código o descripción
- **Estados de Cursos**: Gestionar cursos activos e inactivos
- **Diseño Responsivo**: Interfaz adaptativa para dispositivos móviles y escritorio
- **Tiempo Real**: Sincronización en tiempo real con Firebase Firestore

## 🛠️ Tecnologías Utilizadas

- **Frontend**: Vue 3 (Composition API)
- **UI Framework**: Vuetify 3
- **Estado**: Vuex 4
- **Enrutamiento**: Vue Router 4
- **Backend**: Firebase (Firestore + Authentication)
- **Build Tool**: Vite
- **Iconos**: Material Design Icons

## 📋 Prerrequisitos

- Node.js (versión 16 o superior)
- npm o yarn
- Cuenta de Firebase

## 🔧 Instalación

1. **Clonar el repositorio**

   ```bash
   git clone <url-del-repositorio>
   cd abpro2
   ```

2. **Instalar dependencias**

   ```bash
   npm install
   ```

3. **Configurar Firebase**

   - Crear un proyecto en [Firebase Console](https://console.firebase.google.com/)
   - Habilitar Authentication (Email/Password)
   - Crear una base de datos Firestore
   - Copiar la configuración de Firebase

4. **Configurar variables de entorno**
   Crear un archivo `.env` en la raíz del proyecto:

   ```env
   VITE_FIREBASE_API_KEY=tu_api_key
   VITE_FIREBASE_AUTH_DOMAIN=tu_auth_domain
   VITE_FIREBASE_PROJECT_ID=tu_project_id
   VITE_FIREBASE_STORAGE_BUCKET=tu_storage_bucket
   VITE_FIREBASE_MESSAGING_SENDER_ID=tu_messaging_sender_id
   VITE_FIREBASE_APP_ID=tu_app_id
   ```

5. **Ejecutar el proyecto**
   ```bash
   npm run dev
   ```

## 🏗️ Estructura del Proyecto

```
src/
├── components/          # Componentes reutilizables
│   ├── CourseCard.vue   # Tarjeta de curso
│   ├── CourseForm.vue   # Formulario de curso
│   └── NavBar.vue       # Barra de navegación
├── views/               # Páginas principales
│   ├── Home.vue         # Página principal
│   ├── Admin.vue        # Panel de administración
│   ├── Login.vue        # Página de inicio de sesión
│   ├── Register.vue     # Página de registro
│   └── EditCourse.vue   # Edición de cursos
├── store/               # Gestión de estado (Vuex)
│   ├── modules/
│   │   ├── auth.js      # Módulo de autenticación
│   │   └── courses.js   # Módulo de cursos
│   └── index.js         # Store principal
├── router/              # Configuración de rutas
├── firebase.js          # Configuración de Firebase
└── plugins/             # Configuración de Vuetify
```

## 🎯 Funcionalidades

### Para Usuarios Autenticados

- **Página Principal**: Visualizar todos los cursos disponibles
- **Búsqueda**: Filtrar cursos por nombre, código o descripción
- **Ordenamiento**: Ordenar por nombre, precio o número de inscritos
- **Estados**: Ver cursos activos e inactivos

### Para Administradores

- **Panel de Administración**: Gestión completa de cursos
- **Crear Cursos**: Agregar nuevos cursos con toda la información
- **Editar Cursos**: Modificar información de cursos existentes
- **Eliminar Cursos**: Remover cursos del sistema
- **Estadísticas**: Ver métricas de cursos y inscripciones

## 📊 Modelo de Datos

### Curso

```javascript
{
  id: "string",           // ID único generado por Firestore
  codigo: "string",       // Código del curso (ej: "0001")
  nombre: "string",       // Nombre del curso
  descripcion: "string",  // Descripción detallada
  precio: "string",       // Precio en pesos
  duracion: "string",     // Duración (ej: "1 mes")
  cupos: number,          // Número total de cupos
  inscritos: number,      // Número de estudiantes inscritos
  estado: boolean,        // true = activo, false = inactivo
  img: "string",          // URL de la imagen del curso
  createdAt: timestamp    // Fecha de creación
}
```

## 🚀 Scripts Disponibles

- `npm run dev` - Ejecutar en modo desarrollo
- `npm run build` - Construir para producción
- `npm run preview` - Vista previa de la construcción

## 🔐 Autenticación

El sistema utiliza Firebase Authentication con los siguientes métodos:

- Registro con email y contraseña
- Inicio de sesión con email y contraseña
- Protección de rutas basada en autenticación
- Persistencia de sesión

## 📱 Responsive Design

La aplicación está optimizada para:

- **Desktop**: Experiencia completa con todas las funcionalidades
- **Tablet**: Adaptación de la interfaz para pantallas medianas
- **Mobile**: Diseño móvil-first con navegación táctil

## 🎨 Tema y Personalización

- **Material Design**: Siguiendo las pautas de Material Design 3
- **Tema Personalizado**: Colores y estilos personalizados con Vuetify
- **Animaciones**: Transiciones suaves y efectos hover
- **Iconografía**: Material Design Icons

## 🔧 Configuración de Desarrollo

### Estructura de Firebase

```
Firestore Collections:
├── courses/             # Colección de cursos
│   └── {courseId}/      # Documento individual del curso
```

### Reglas de Seguridad (Firestore)

```javascript
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    match /courses/{document} {
      allow read, write: if request.auth != null;
    }
  }
}
```

## 🤝 Contribución

1. Fork el proyecto
2. Crear una rama para tu feature (`git checkout -b feature/AmazingFeature`)
3. Commit tus cambios (`git commit -m 'Add some AmazingFeature'`)
4. Push a la rama (`git push origin feature/AmazingFeature`)
5. Abrir un Pull Request

## 📄 Licencia

Este proyecto está bajo la Licencia MIT. Ver el archivo `LICENSE` para más detalles.

## 👨‍💻 Autor

Desarrollado como parte del proyecto ABPRO2 - Plataforma de Gestión Educativa

## 📞 Soporte

Si tienes preguntas o necesitas ayuda, por favor abre un issue en el repositorio.

---

**¡Gracias por usar EduPlatform!** 🎉
