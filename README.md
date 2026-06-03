# 🌟 BLOG AMRYLUXE - Plataforma Full-Stack (MERN) de Moda & Belleza

<p align="center">
  <img src="https://img.shields.io/badge/MERN-Stack-vibrantgreen?style=for-the-badge" alt="MERN Stack" />
  <img src="https://img.shields.io/badge/React-Vite-blue?style=for-the-badge&logo=react" alt="React" />
  <img src="https://img.shields.io/badge/Node.js-Express-green?style=for-the-badge&logo=node.js" alt="Node" />
  <img src="https://img.shields.io/badge/MongoDB-Atlas-green?style=for-the-badge&logo=mongodb" alt="MongoDB" />
  <img src="https://img.shields.io/badge/Vercel-Deployed-black?style=for-the-badge&logo=vercel" alt="Vercel" />
</p>

---

## 📝 Descripción del Proyecto

**AMRY LUXE** es una aplicación web full-stack (MERN) diseñada bajo un enfoque de alta costura, elegancia y sofisticación visual. Es una plataforma autogestionable que permite la administración integral de contenidos en tiempo real mediante un panel administrativo privado conectado a una base de datos distribuida en la nube.

*   **🌐 Sitio Web en Producción:** [amryluxe.vercel.app](https://amryluxe.vercel.app)
*   **⚙️ Servidor API (Backend):** [api.amryluxe-blog.vercel.app](https://api.amryluxe-blog.vercel.app)

---

## 🚀 Características Principales

*   **Panel Administrativo Avanzado:** Control total para crear, editar y eliminar publicaciones o categorías dinámicamente.
*   **Editor Enriquecido (WYSIWYG):** Soporte para inserción y renderizado directo de código HTML personalizado para los artículos.
*   **Gestión Inteligente de Slugs:** Generación automática de URLs amigables optimizadas para motores de búsqueda (SEO).
*   **Arquitectura Desacoplada:** API REST robusta con control de acceso seguro y políticas CORS optimizadas para entornos multi-dominio.
*   **Diseño Fluido y Responsive:** Interfaz adaptada minuciosamente para ofrecer una navegación impecable en dispositivos móviles, tablets y ordenadores.

---

## 📷 Capturas de Pantalla (Showcase)

### Vista de Usuario (Frontend)
<p align="center">
  <img src="https://raw.githubusercontent.com/karlosystem/AMRYLUXE-BLOG/main/client/public/screenshot-home.png" alt="Home AMRY LUXE" width="90%" />
</p>

### Panel de Gestión de Contenidos (CMS)
<p align="center">
  <img src="https://raw.githubusercontent.com/karlosystem/AMRYLUXE-BLOG/main/client/public/screenshot-admin.png" alt="Admin Panel" width="45%" />
  <img src="https://raw.githubusercontent.com/karlosystem/AMRYLUXE-BLOG/main/client/public/screenshot-editor.png" alt="HTML Editor" width="45%" />
</p>

---

## 🛠️ Stack Tecnológico Utilizado

### Frontend (Cliente)
*   **React.js (Vite):** Entorno de desarrollo ultra rápido para una interfaz reactiva.
*   **React Router Dom:** Manejo eficiente de enrutamiento del lado del cliente.
*   **Tailwind CSS / CSS Modules:** Estilizado modular enfocado en la fidelidad del diseño de lujo.

### Backend (Servidor & Base de Datos)
*   **Node.js & Express:** Servidor HTTP escalable y estructurado para endpoints de API REST.
*   **MongoDB Atlas:** Base de datos NoSQL basada en la nube para almacenamiento de documentos complejos (Artículos y Categorías).
*   **Mongoose:** Modelado de objetos para validación estricta de esquemas de datos.

---

## 🔧 Configuración del Entorno Local

El repositorio está estructurado de forma limpia dividiendo las responsabilidades en dos directorios principales: `/api` y `/client`.

### Variables de Entorno Necesarias

Crea un archivo `.env` en la raíz de cada carpeta según corresponda:

#### En la carpeta `/api` (Backend):
```env
MONGODB_URI=tu_cadena_de_conexion_mongodb_atlas
FRONTEND_URL=http://localhost:5173
PORT=5000
