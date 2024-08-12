# API RESTful para Sistema de Evaluación 360 Grados

Este proyecto es una API RESTful desarrollada para un sistema de evaluación 360 grados para empleados remotos en una empresa de desarrollo de aplicaciones. Está construida utilizando Node.js, Express.js, y MongoDB.

## Objetivo

El objetivo principal de este proyecto es proporcionar un backend robusto para gestionar evaluaciones de desempeño de empleados, permitiendo una evaluación integral que incluye feedback de supervisores, compañeros y otros.

## Características Principales

- Autenticación y autorización de usuarios con roles de administrador, gerente y empleado.
- Gestión de empleados y departamentos.
- Creación, actualización y seguimiento de evaluaciones.
- Sistema de preguntas y respuestas para evaluaciones.
- Generación de reportes detallados por empleado y departamento.
- Protección contra inyecciones NoSQL y otras amenazas de seguridad.
- Pruebas unitarias e integraciones utilizando Jest.

## Tecnologías Utilizadas

- **Node.js**: Entorno de ejecución para JavaScript.
- **Express.js**: Framework web para Node.js.
- **MongoDB**: Base de datos NoSQL.
- **Mongoose**: ODM para MongoDB.
- **Jest**: Framework de pruebas para JavaScript.

## Instalación

Sigue estos pasos para instalar y configurar el proyecto en tu máquina local:

1. Clona este repositorio:

   ```bash
   git clone <URL_DEL_REPOSITORIO>
   cd <NOMBRE_DEL_REPOSITORIO>

   ```

2. Instala las dependencias del proyecto:

   ```bash
   npm install
   ```

3. Crea un archivo `.env` en la raíz del proyecto y añade las siguientes variables de entorno:

   ```env
    PORT=3000
    MONGODB_URI=mongodb://localhost:27017/eval360
    JWT_SECRET=your_secret_key
   ```

4. Inicia el servidor de desarrollo:

   ```bash
   npm run dev
   ```

5. Abre tu navegador y navega a `http://localhost:3000`.

## Para ver la documentación de la API

1. Abre tu navegador y navega a `http://localhost:3000/api-docs`.

## Collection de Postman

Puedes importar la colección de Postman para probar las rutas de la API. Puedes encontrar el archivo JSON en la carpeta `postman`.

## Soporte

Si tienes alguna pregunta o problema, por favor crea un nuevo issue en este repositorio o contacta conmigo via email.

## test

antes de ejecutar los test crear un archivo .env.test con las siguientes variables de entorno:

```env
PORT=3000
MONGODB_URI=mongodb://localhost:27017/eval360-test
JWT_SECRET=your_secret_key
```

Para ejecutar los test:

```bash
npm run test
```

## Demo Temporal

Puedes probar la API en el siguiente enlace: [https://nolatech-backend-production.up.railway.app/api-docs](https://nolatech-backend-production.up.railway.app/api-docs)
