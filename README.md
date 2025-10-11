# Mantenimiento Urbano - Frontend

Guía rápida para clonar, ejecutar y desplegar este proyecto (React + TypeScript + Vi## 8) Archivos importantes
- `package.json` - scripts útiles: `dev`, `build`, `preview`.
- `docker/Dockerfile` - multi-stage build (build con Node, servir con Nginx).
- `docker/docker-compose.yml` - definición del servicio `web` y mapeo del puerto 3000.
- `config/nginx.conf` - configuración personalizada de Nginx con soporte para React Router, gzip y caché.


## Tecnologías principales
- Node.js + npm
- Vite (dev server y build)
- React 19 + TypeScript
- Tailwind CSS
- Nginx (en la imagen de producción con Docker)

## Requisitos previos
- Git
- Node.js 18+ y npm (recomendado Node 20)
- Docker y docker-compose (si vas a usar la opción con Docker)

## 1) Clonar el repositorio

Abre una terminal y ejecuta:

```powershell
git clone <URL_DEL_REPOSITORIO>
cd Front-Mantenimiento-Urbano
```

Reemplaza `<URL_DEL_REPOSITORIO>` por la URL de tu repo (HTTPS o SSH).

## 2) Instalar dependencias

En la carpeta del proyecto ejecuta:

```powershell
npm ci
```

Si usas npm > 9 y no tienes `package-lock.json` en el repo, puedes usar `npm install`.

## 3) Ejecutar en modo desarrollo (local)

Esto lanza el servidor de desarrollo de Vite con Hot Module Replacement (HMR).

```powershell
npm run dev
```

Por defecto Vite suele usar el puerto `5173` (la terminal mostrará el puerto exacto). Abre la URL que muestra Vite en tu navegador.

## 4) Build de producción y previsualizar localmente

Genera los archivos optimizados en `dist`:

```powershell
npm run build
```

Para previsualizar el build con Vite (útil para pruebas locales):

```powershell
npm run preview
```

## 5) Ejecutar con Docker (producción)

El proyecto incluye un `Dockerfile` multi-stage que compila la app y la sirve con Nginx. También hay un `docker-compose.yml` para facilitar el despliegue.

**Nota:** Los archivos Docker están organizados en la carpeta `docker/`.

Construir la imagen y ejecutar con docker-compose:

```powershell
# Construir y levantar el servicio (mapea el puerto 3000 del host al 80 del container)
docker-compose -f docker/docker-compose.yml up --build -d
```

Después de levantar los contenedores, abre http://localhost:3000 en tu navegador.

### Comandos Docker útiles
- Ver logs: `docker-compose -f docker/docker-compose.yml logs -f`
- Detener y borrar contenedores: `docker-compose -f docker/docker-compose.yml down`
- Ver imágenes: `docker images`

### Notas sobre la configuración Docker
- El `Dockerfile` usa Node 20 para compilar y Nginx para servir los archivos estáticos.
- `docker-compose.yml` expone el puerto `80` del contenedor en el puerto `3000` del host (puedes cambiarlo si es necesario).

## 6) Sugerencias para despliegue en remoto

- Plataforma VPS: puedes construir la imagen en el servidor o subir la imagen a un registry (Docker Hub, GitHub Container Registry) y usar `docker-compose pull` + `docker-compose up -d`.
- Plataformas PaaS (por ejemplo DigitalOcean App Platform, Railway): la mayoría permiten desplegar directamente desde el repositorio o desde una imagen Docker.
- Si usas CI/CD (GitHub Actions), añade un workflow que construya y publique la imagen a un registry y despliegue en tu servidor.

## 7) Estructura del proyecto

```
Front-Mantenimiento-Urbano/
├── docker/                    # Archivos Docker (deployment)
│   ├── Dockerfile             # Multi-stage build (Node + Nginx)
│   ├── .dockerignore          # Archivos ignorados en build Docker
│   ├── docker-compose.yml     # Orquestación de contenedores
│   └── nginx.conf             # Configuración de Nginx para producción
│
├── public/                    # Archivos estáticos públicos
│   └── vite.svg
│
├── src/                       # Código fuente de la aplicación
│   ├── assets/                # Imágenes, fuentes, etc.
│   ├── App.tsx                # Componente principal
│   ├── App.css
│   ├── main.tsx               # Punto de entrada
│   └── index.css
│
├── eslint.config.js           # Configuración de ESLint
├── tailwind.config.cjs        # Configuración de Tailwind CSS
├── postcss.config.cjs         # Configuración de PostCSS
├── vite.config.ts             # Configuración de Vite
├── tsconfig.json              # Configuración TypeScript (raíz)
├── tsconfig.app.json          # Configuración TypeScript (app)
├── tsconfig.node.json         # Configuración TypeScript (node)
├── package.json               # Dependencias y scripts npm
├── package-lock.json          # Lock de versiones (versionado)
├── .gitignore                 # Archivos ignorados por Git
└── README.md                  # Este archivo
```

## 8) Archivos importantes
- `package.json` - scripts útiles: `dev`, `build`, `preview`.
- `docker/Dockerfile` - multi-stage build (build con Node, servir con Nginx).
- `docker/docker-compose.yml` - definición del servicio `web` y mapeo del puerto 3000.
- `docker/nginx.conf` - configuración personalizada de Nginx con soporte para React Router, gzip y caché.
- `eslint.config.js` - configuración de linting.
- `tailwind.config.cjs` - configuración de Tailwind CSS.
- `vite.config.ts` - configuración del bundler Vite.

## 9) Problemas comunes y soluciones
- ERROR: puerto ocupado: cambia el puerto en `docker/docker-compose.yml` o cierra la app que lo usa.
- Dependencias faltantes: ejecuta `npm ci` o `npm install`.
- Problemas con permisos en Windows + Docker: asegúrate que Docker Desktop tiene acceso a las carpetas si usas volúmenes.

## 10) Próximos pasos recomendados (opcional)
- Añadir un `.env.example` con variables de entorno.
- Crear un workflow de GitHub Actions para build y push de imagen.
- Configurar HTTPS (letsEncrypt + Nginx) en producción.

