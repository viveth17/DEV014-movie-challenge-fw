# MovieNext 🎬

¡Bienvenid@s a MovieNext! Este proyecto fue creado con dedicación para ofrecerte una experiencia única al explorar y descubrir películas. 🎥

## Definición del Producto
MovieNext es una plataforma donde podrás visualizar, filtrar y ordenar películas utilizando los datos proporcionados por The Movie Database API V3. 🌟

## Funcionalidades Principales
- **Explora Películas**: Navega por un extenso catálogo de películas con información detallada sobre cada una. 📚
- **Filtra Películas**: Encuentra películas según su género 🔍
- **Ordena Películas**: Ordena las películas por popularidad, calificación, ingresos, películas recientes y otros criterios en forma ascendente o descendente. 🗂️
- **Paginación**: En la parte inferior de la página, encontrarás una paginación para renderizar películas según el número de página. 📄
- **Información Detallada**: Al hacer clic en una película, se te redirigirá a una URL distinta con información relevante sobre la película (título, año de estreno, calificación, géneros y sinopsis). ℹ️
- **Regresar al Listado**: Cuenta con un botón de "Regresar al listado" para que el usuario pueda volver a la lista de películas fácilmente. ↩️

## Características Técnicas
- **SPA con Múltiples Vistas**: Arquitectura de una sola página (SPA) que ofrece una experiencia de usuario dinámica y fluida. 🖥️
- **Sistema de Enrutamiento**: Navegación intuitiva dentro de la aplicación gracias a un sistema de enrutamiento integrado utilizando `react-router-dom`. 🛣️
- **Actualización de Parámetros con `useParams`**: Los parámetros de las rutas se actualizan utilizando el hook `useParams`, permitiendo una gestión eficiente de la información dinámica. 🔄
- **Navegación con `useNavigate`**: La navegación entre las diferentes rutas se gestiona con el hook `useNavigate`, proporcionando una transición fluida entre las vistas. 🚀
- **Carga Dinámica**: Las vistas de la aplicación se cargan dinámicamente mediante React, asegurando una experiencia rápida y eficiente. 🚀
- **Actualización de URL y Título**: La URL y el título del documento se actualizan automáticamente según la vista cargada, proporcionando una navegación coherente. 🔄
- **Carga Inicial de Vista**: La aplicación carga automáticamente la vista correspondiente a la URL actual al iniciar, para una exploración sin problemas. 🎉
- **Interfaz Intuitiva**: La interfaz de usuario es fácil de usar gracias a su diseño intuitivo. 🖌️
- **Spinner de Carga**: Se muestra un spinner mientras se cargan los datos de las películas, proporcionando feedback visual al usuario. ⏳
- **Notificaciones de Error**: En caso de que ocurra algún fallo, se arrojan notificaciones de error para informar al usuario. ⚠️

## Tecnologías Utilizadas
- **React**: Para construir una interfaz de usuario interactiva y dinámica.
- **TypeScript**: Para mejorar la calidad del código con tipado estático y herramientas avanzadas de desarrollo.
- **react-router-dom**: Para gestionar las rutas de la aplicación y permitir una navegación fluida entre las vistas, utilizando los hooks `useParams` y `useNavigate`.
- **@mui/material**: Para implementar la paginación en la parte inferior de la página, permitiendo renderizar películas según el número de página.

## Botones Adicionales
- **Limpiar Filtros**: Cuenta con 2 botones para limpiar los filtros aplicados, permitiendo una búsqueda más eficiente. 🧹

## Enlace a prototipo de alta fidelidad 
https://www.figma.com/proto/tJyyMDsmgi0fWkGg8WWiV2/Prototipo-MOVIE-CHALLANGE-FINAL?node-id=1-2&t=sym70CoGVdCO011a-0&scaling=scale-down&content-scaling=fixed&page-id=0%3A1&starting-point-node-id=1%3A2

## ¡Comienza a Explorar!
Descubre películas increíbles y disfruta de una experiencia de usuario excepcional con MovieNext. 🌠

---


**Nota:** Este proyecto utiliza datos proporcionados por The Movie Database API V3.

