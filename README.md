# 📝 Task Manager App

Proyecto **Full Stack**. Backend construido con **NestJS** y **MongoDB**, frontend con **Next.js** y **TailwindCSS**.

## ✨ Características

### 🔐 Autenticación
- Sistema JWT completo (login, registro)
- Revocación segura de tokens
- Encriptación de contraseñas con bcrypt

### 📋 Gestión de Tareas
- Crear, editar y eliminar tareas
- Estados de tareas: **To Do**, **In Progress**, **Completed**, **Won't Do**
- Interfaz intuitiva y responsiva

### 🎨 Interfaz Moderna
- Diseño responsivo con TailwindCSS
- Componentes reutilizables con Radix UI + shadcn/ui
- Experiencia de usuario optimizada

## 🛠️ Tech Stack

### Backend
- **NestJS** - Framework Node.js escalable
- **MongoDB** - Base de datos NoSQL
- **Mongoose** - ODM para MongoDB
- **JWT** - Autenticación segura
- **bcrypt** - Encriptación de contraseñas

### Frontend
- **Next.js 13+** - Framework React con App Router
- **React** - Biblioteca de UI
- **TailwindCSS** - Framework CSS utilitario
- **Radix UI + shadcn/ui** - Componentes accesibles

## 📁 Estructura del Proyecto

```
task-manager/
├── 📂 api/                    # Backend (NestJS)
│   ├── 📂 src/
│   │   ├── 📂 auth/          # Módulo de autenticación
│   │   ├── 📂 task/          # Módulo de tareas
│   │   ├── 📂 user/          # Módulo de usuarios
│   │   └── 📂 config/        # Configuración global
│   ├── 📄 package.json
│   └── 📄 .env.example
├── 📂 client/                 # Frontend (Next.js)
│   ├── 📂 app/               # App Router de Next.js
│   ├── 📂 components/        # Componentes reutilizables
│   ├── 📂 hooks/             # Custom hooks
│   ├── 📄 package.json
│   └── 📄 tailwind.config.js
│   └── 📄 .env.example
├── 📄 docker-compose.yml      # Orquestación Docker
└── 📄 .env.example           # Variables de entorno
```

## 🚀 Instalación

### Prerrequisitos
- Node.js 18+
- MongoDB (local o remoto)
- Yarn o npm

### 1. Clonar el repositorio
```bash
git clone https://github.com/Beraxes/vyrtiumPrueba.git
cd vyrtiumPrueba
```

### 2. Configurar variables de entorno
```bash
cp .env.example .env
```
### 3. Con Docker (Este es demorado)
```bash
docker compose build && docker compose up -d
```

Edita el archivo `.env`:
```env
# API Configuration
API_PORT=3001
JWT_SECRET="your-super-secret-jwt-key"
JWT_EXPIRATION="1d"

# Frontend Configuration
API_URL="http://localhost:3001"

# MongoDB Configuration
MONGO_ROOT_USERNAME="rootuser"
MONGO_ROOT_PASSWORD="rootpassword"

MONGO_URI="mongodb://rootuser:rootpassword@mongo:27017/mydatabase?authSource=admin"
```

### 4. Instalar dependencias (Sin docker)

**Backend:**
```bash
cd api
yarn install
```

**Frontend:**
```bash
cd client
yarn install
```

## 🏃‍♂️ Ejecutar la aplicación

### Desarrollo
**Terminal 1 - Backend:**
```bash
cd api
yarn start:dev
```

**Terminal 2 - Frontend:**
```bash
cd client
yarn dev
```

La aplicación estará disponible en:
- **Frontend:** http://localhost:3000
- **Backend API:** http://localhost:3001

## 📚 API Endpoints

### Autenticación
```
POST /register    # Registro de usuario
POST /login       # Iniciar sesión
```

### Tareas
```
GET    /tasks          # Obtener todas las tareas
POST   /tasks          # Crear nueva tarea
PATCH  /tasks/:id      # Actualizar tarea
DELETE /tasks/:id      # Eliminar tarea
```
---
