
# Fleet of Cars API

## Descripción

Este proyecto es una API para la gestión de vehículos y flotas, desarrollado en **Node.js**, **Express.js** y **MongoDB** utilizando **Mongoose** como ODM. También incluye autenticación de usuarios mediante **JWT**. La API permite registrar, listar y gestionar vehículos y flotas, así como registrar y autenticar usuarios.

## Tecnologías usadas

- **Node.js v20.17.0**
- **Express.js**
- **MongoDB**
- **Mongoose**

## Requisitos previos

Antes de comenzar, asegúrate de tener lo siguiente instalado en tu máquina:

- **Node.js v20.17.0** o superior
- **MongoDB**
- **npm** (se incluye con Node.js)

## Pasos para instalar y configurar el proyecto

### 1. Clonar el repositorio

```bash
git clone https://github.com/tu-usuario/fleet-of-cars.git
cd fleet-of-cars
```

### 2. Instalar las dependencias

Instala las dependencias del proyecto ejecutando:

```bash
npm install
```

### 3. Configuración del archivo `.env`

Crea un archivo `.env` en la raíz del proyecto con las siguientes variables de entorno:

```
DB_HOST=localhost
DB_PORT=27017
DB_NAME=fleet-cars
JWT_SECRET=defaultSecret
```

### 4. Correr el seed de usuarios y flotas

El proyecto incluye dos seeds para pre-cargar la base de datos con usuarios y flotas:

1. **Seed de flotas**: Inserta registros predefinidos de flotas.
2. **Seed de usuarios**: Inserta dos usuarios predefinidos.

Para correr los seeds, utiliza los siguientes comandos:

#### Seed de flotas

```bash
npm run seed:fleet
```

#### Seed de usuarios

```bash
npm run seed:users
```

### 5. Iniciar el servidor

Para iniciar el servidor de desarrollo, puedes ejecutar:

```bash
npm run start
```

Este comando levantará el servidor en `http://localhost:3000`.

### 6. Pruebas Unitarias

Para correr las pruebas unitarias puedes correr el siguiente comando

```bash
npm run test
```

---

## Rutas de la API

A continuación, algunos ejemplos de cómo usar las rutas de la API con **cURL**.

### 1. Registro de usuarios

```bash
curl --location 'http://localhost:3000/api/users/register' \
--header 'Content-Type: application/json' \
--data-raw '{
    "nombre": "user",
    "email": "user@example.com",
    "password": "user123"
}'
```

### 2. Login de usuarios

```bash
curl --location 'http://localhost:3000/api/users/login' \
--header 'Content-Type: application/json' \
--data-raw '{
  "email": "user@example.com",
  "password": "user123"
}'
```

### 3. Crear un vehículo (Protegido con JWT)

```bash
curl --location 'http://localhost:3000/api/vehicles' \
--header 'Authorization: Bearer <tu_token_jwt>' \
--header 'Content-Type: application/json' \
--data '{
  "brand": "Chevrolet",
  "carModel": "Optra",
  "year": 2018
}'
```

### 4. Listar todos los vehículos (Protegido con JWT)

```bash
curl --location 'http://localhost:3000/api/vehicles' \
--header 'Authorization: Bearer <tu_token_jwt>'
```

### 5. Listar vehículos por flota (Protegido con JWT)

```bash
curl --location 'http://localhost:3000/api/vehicles/6703fd39894812381f089511' \
--header 'Authorization: Bearer <tu_token_jwt>'
```

### 6. Crear una flota

```bash
curl --location 'http://localhost:3000/api/fleets' \
--header 'Content-Type: application/json' \
--data '{
    "nombre": "Pickup / Camioneta"
}'
```

### 7. Listar todas las flotas

```bash
curl --location 'http://localhost:3000/api/fleets'
```

---

## Comandos disponibles

- **`npm run start`**: Inicia el servidor.
- **`npm run build`**: Compila el proyecto.
- **`npm run seed:users`**: Ejecuta el seed para cargar usuarios predefinidos en la base de datos.
- **`npm run seed:fleet`**: Ejecuta el seed para cargar las flotas predefinidas en la base de datos.
- **`npm run test`**: Corre las pruebas unitarias.

---

## Autor

- **Nombre**: Jholbert
- **Email**: jholbert.c@gmail.com

---

## Notas adicionales

1. Asegúrate de que MongoDB está corriendo localmente o en una instancia a la que tengas acceso antes de levantar el servidor.
2. Recuerda reemplazar `<tu_token_jwt>` en las solicitudes con el token real que recibas al hacer login.
