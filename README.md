# My Music Journal - FrontEnd

## 🎯 Objetivos

MyMusicJournal es una aplicación web para registrar conciertos y eventos musicales. Los usuarios pueden crear, editar y eliminar entradas con información del artista, fecha, lugar, ciudad, calificación y notas. Desarrollada con React, Spring Boot y PostgreSQL, sigue una arquitectura MVC y utiliza una API RESTful.

## ⚙️ Tecnologías y Herramientas

| Categoría | Tecnologías |
|------------|-------------|
| **Framework** | React 19 + Vite 7 |
| **Estilos** | Tailwind CSS 4 + PostCSS + Autoprefixer |
| **Routing** | React Router DOM 7 |
| **Gestión de Estado / Data Fetching** | TanStack React Query 5 |
| **Formularios y Validación** | React Hook Form + Zod |
| **Comunicación API** | Axios + JWT Auth |
| **Componentes e Iconos** | Lucide React + React Icons |
| **Notificaciones** | React Hot Toast |
| **Testing** | Vitest + Testing Library (React / Jest-DOM / jsdom) |
| **Linting y Formato** | ESLint + Prettier |
| **Diseño / Prototipado** | Figma |
| **Control de Versiones** | Git + GitHub |
| **Gestión del Proyecto** | Trello + Jira |

### 🧩 Desglose técnico

**Frontend Core:** React 19 y Vite 7 como base para una SPA rápida y modular.  
**Estilos:** Tailwind CSS 4 con PostCSS y Autoprefixer para un diseño responsive y limpio.  
**Routing:** React Router DOM 7 para la navegación entre páginas (Home, Events, Profile…).  
**Data y Formularios:** TanStack React Query + React Hook Form + Zod para validaciones y gestión eficiente del estado.  
**Comunicación API:** Axios centralizado en `src/services/`, autenticado con JWT.  
**UI y UX:** Lucide React / React Icons / React Hot Toast.  
**Testing:** Vitest + Testing Library.  
**Diseño y Gestión:** Prototipado en Figma y planificación de tareas en Jira bajo metodología ágil.

---

## ✨ Funcionalidades

### 🔓 Público
- Página de inicio con presentación de la plataforma.  
-   


### 🔐 Autenticación y cuentas
- Registro e inicio de sesión con validaciones.  
- Persistencia del token JWT en localStorage.  
- Cierre de sesión seguro.  


### 👤 Perfil de usuario
  


### 🗓️ Gestión de Conciertos
- 


### 📱 Responsive Design
- Diseño adaptativo para móvil, tablet y escritorio.  


---

## 🧭 Arquitectura del Proyecto


El frontend se comunica con el backend a través de servicios API (`ApiUser.jsx`, `ApiConcert.jsx`, `ApiJournal.jsx`) usando JWT para autenticar las peticiones.


## 🧩 Estructura del Proyecto

```bash
MYMUSICJOURNAL-FRONTEND




---

## 🚀 Ejecución del Proyecto

### 🧱 Requisitos previos
- Node.js ≥ 18  
- npm instalado  
- Backend Code Crafters corriendo en `http://localhost:8080`

### ▶️ Pasos para iniciar el frontend
```bash
# 1. Clonar el repositorio
git clone https://github.com/DaniPacheco8/MyMusicJournal-FrontEnd

# 2. Entrar en el directorio
cd MYMUSICJOURNAL-FRONTEND

# 3. Instalar dependencias
npm install

# 4. Iniciar el servidor de desarrollo
npm run dev

```

## 👩‍💻 Contactos

¿Tienes dudas o quieres saber más sobre el proyecto?  
Puedes contactarme a través de mis perfiles profesionales:

| Nombre | Rol | LinkedIn | GitHub |
|--------|------|-----------|--------|
| **Daniella Pacheco** | Developer | [LinkedIn](https://www.linkedin.com/in/daniellapacheco/) | [GitHub](https://github.com/DaniPacheco8) |

