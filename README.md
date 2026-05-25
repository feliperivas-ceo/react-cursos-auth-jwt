# React Cursos Auth JWT

Aplicación web desarrollada en **React** que consume un backend en **Spring Boot** con autenticación mediante **JWT**.  
El proyecto permite iniciar sesión, almacenar el token en `localStorage`, proteger rutas y gestionar cursos desde una interfaz sencilla usando **Material UI**.

---

## Participantes

- Fabio Felipe Murillo - A00401131
- Juan Esteban Cuéllar - A00402548
- Luis Cadena Cortes - A00395967

---

## Objetivo de la tarea

Construir una SPA sencilla en React que consuma una API REST para:

- Iniciar sesión con usuario y contraseña.
- Guardar el token JWT en `localStorage`.
- Proteger rutas usando `useContext`.
- Listar cursos desde el backend.
- Crear cursos mediante un formulario con Material UI.

---

## Tecnologías utilizadas

### Backend

- Java
- Spring Boot
- Spring Security
- JWT
- Gradle

### Frontend

- React
- Vite
- React Router DOM
- Material UI
- JavaScript
- localStorage

---

## Estructura del proyecto

```txt
react-cursos-auth-jwt/
├── backend/
│   └── auth/
│       ├── src/
│       ├── build.gradle
│       ├── gradlew.bat
│       └── request.http
│
└── frontend/
    └── cursos-app/
        ├── src/
        │   ├── api/
        │   │   └── client.js
        │   ├── auth/
        │   │   ├── AuthContext.jsx
        │   │   ├── ProtectedRoute.jsx
        │   │   └── useAuth.js
        │   ├── pages/
        │   │   ├── LoginPage.jsx
        │   │   └── CoursesPage.jsx
        │   ├── App.jsx
        │   └── main.jsx
        ├── package.json
        └── vite.config.js
```

---

## Funcionalidades implementadas

### Autenticación

La aplicación permite iniciar sesión usando las credenciales de prueba.  
Cuando el login es exitoso, el backend retorna un token JWT, el cual se guarda en `localStorage`.

### Rutas protegidas

La ruta de cursos está protegida.  
Si un usuario intenta entrar a `/courses` sin haber iniciado sesión, la aplicación lo redirige automáticamente a `/login`.

### Gestión de cursos

La aplicación permite:

- Listar los cursos registrados en el backend.
- Crear nuevos cursos desde un formulario.
- Visualizar información básica del curso, como nombre, código, créditos, descripción, profesor y cantidad de estudiantes.

### Cierre de sesión

El usuario puede cerrar sesión.  
Al hacerlo, el token se elimina de `localStorage` y se redirige nuevamente al login.

---

## Usuario de prueba

Para ingresar a la aplicación se puede usar el siguiente usuario:

```txt
Usuario: admin
Contraseña: admin123
```

---

## Endpoints utilizados

### Login

```http
POST http://localhost:8080/auth/api/auth/login
Content-Type: application/json

{
  "username": "admin",
  "password": "admin123"
}
```

### Listar cursos

```http
GET http://localhost:8080/auth/api/courses
Authorization: Bearer TOKEN
```

### Crear curso

```http
POST http://localhost:8080/auth/api/courses
Content-Type: application/json
Authorization: Bearer TOKEN

{
  "name": "Sistemas Operativos",
  "description": "Conceptos de procesos, memoria y E/S",
  "code": "SO101",
  "credits": 4,
  "teacherId": 2
}
```

---

## Ejecución del backend

Primero se debe ingresar a la carpeta del backend:

```bash
cd backend/auth
```

Luego se ejecuta el proyecto con Gradle:

```bash
gradlew.bat bootRun
```

El backend queda disponible en:

```txt
http://localhost:8080/auth
```

---

## Ejecución del frontend

Primero se debe ingresar a la carpeta del frontend:

```bash
cd frontend/cursos-app
```

Instalar las dependencias:

```bash
npm install
```

Ejecutar la aplicación:

```bash
npm run dev
```

El frontend queda disponible normalmente en:

```txt
http://localhost:5173
```

---

## Flujo de uso de la aplicación

1. Ejecutar el backend.
2. Ejecutar el frontend.
3. Abrir la aplicación en el navegador.
4. Ingresar al login.
5. Usar el usuario `admin` y la contraseña `admin123`.
6. Después del login, la aplicación redirige a la página de cursos.
7. En la página de cursos se pueden visualizar los cursos existentes.
8. También se puede crear un nuevo curso usando el formulario.
9. Al cerrar sesión, el token se elimina y el usuario vuelve al login.

---

## Manejo del token JWT

Después de iniciar sesión, el token se guarda en `localStorage` con la clave:

```txt
token
```

Luego, cada petición protegida al backend agrega automáticamente el encabezado:

```http
Authorization: Bearer TOKEN
```

Esto se maneja desde el archivo:

```txt
src/api/client.js
```

---

## Archivos principales del frontend

### `src/api/client.js`

Contiene la función reutilizable `request`, encargada de realizar peticiones al backend y agregar el token JWT cuando existe.

### `src/auth/AuthContext.jsx`

Contiene el contexto de autenticación de la aplicación.  
Maneja el estado del token y las funciones principales de login y logout.

### `src/auth/ProtectedRoute.jsx`

Protege las rutas privadas.  
Si no hay token, redirige al usuario hacia `/login`.

### `src/auth/useAuth.js`

Permite acceder fácilmente al contexto de autenticación desde otros componentes.

### `src/pages/LoginPage.jsx`

Contiene el formulario de inicio de sesión.

### `src/pages/CoursesPage.jsx`

Contiene la página de gestión de cursos, donde se listan y crean cursos.

---

## Comandos principales

### Crear proyecto React con Vite

```bash
npm create vite@latest cursos-app -- --template react
```

### Instalar dependencias

```bash
npm install
```

### Instalar Material UI y React Router

```bash
npm install @mui/material @emotion/react @emotion/styled @mui/icons-material react-router-dom
```

### Ejecutar frontend

```bash
npm run dev
```

### Ejecutar backend

```bash
gradlew.bat bootRun
```

---

## Notas importantes

- El backend debe estar encendido antes de usar el frontend.
- El frontend consume el backend desde `http://localhost:8080/auth`.
- El token JWT se guarda en `localStorage`.
- Las rutas de cursos requieren autenticación.
- El usuario de prueba es `admin` con contraseña `admin123`.
- El formulario de creación de cursos usa por defecto el `teacherId` igual a `2`.

---

## Estado de la tarea

La tarea cumple con el alcance solicitado:

- Login funcional.
- Token JWT guardado en `localStorage`.
- Rutas protegidas con contexto.
- Listado de cursos desde el backend.
- Creación de cursos usando formulario con Material UI.
