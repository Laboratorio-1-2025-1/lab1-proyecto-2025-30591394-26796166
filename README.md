# lab1-proyecto-2025-30591394-26796166

Integrantes:

- José Manuel Graterol Rodríguez
  - V-30591394
  - 1001.30591394.ucla@gmail.com
  - Rol: Backend Developer, QA Testing, Debugging
- Pedro Manuel Rivero Colmenarez
- V-26796166
- 1001.26796166.ucla@gmail.com
- Rol: Backend Developer, QA Testing

## Requisitos

- Node.js v18+ (se recomienda la versión LTS)
- npm v9+ o yarn
- motor sql (ej. mysql u otro compatible referido en `prisma/schema.prisma`) o una url de conexión válida

## Instalación

1. Clona el repositorio y entra en la carpeta del proyecto:

```bash
git clone https://github.com/JoseXP7/lab1-proyecto-2025-30591394-26796166.git
cd lab1-proyecto-2025-30591394-26796166
```

2. Instala dependencias:

```bash
npm install
```

3. Variables de entorno

Crear un archivo `.env` en la raíz del proyecto con al menos las siguientes variables (ajusta según tu entorno). Aquí se muestra un ejemplo genérico para una base de datos SQL:

```env
# url de la base de datos (ejemplo mysql)
# usa el esquema 'mysql://' para conexiones mysql
DATABASE_URL="mysql://user:password@host:3306/database"

# puerto donde se ejecutará la api (opcional, por defecto 3000)
PORT=3000
```

4. Generar cliente de Prisma

```bash
npm run predev
# o
npm run postinstall
```

5. Ejecutar migraciones (aplicar esquema a la BD)

> Asegúrate de que `DATABASE_URL` apunte a una base de datos de desarrollo. No ejecutes migraciones automáticas en producción sin revisar.

```bash
npx prisma migrate deploy
# o para entornos de desarrollo interactivo:
npx prisma migrate dev --name init
```

6. (Opcional) semillas

si el proyecto incluye scripts de seed, ejecútalos para poblar datos de ejemplo. revisa la carpeta `prisma/` para ver si existe un `seed` configurado.

ejecución de la semilla (ejemplo):

```bash
# ejecutar la semilla con prisma
npx prisma db seed
```

verificación rápida:

- abre prisma studio para inspeccionar tablas y datos:

```bash
npx prisma studio
```

## Ejecutar la API

- Modo desarrollo (auto-reload con `nodemon`):

```bash
npm run dev
```

- Modo producción:

```bash
npm start
```

La API por defecto escucha en `http://localhost:3000/` (o el puerto definido en `PORT`).

## Documentación OpenAPI / Swagger

Si el proyecto monta `swagger-ui-express`, podrás ver la documentación en:

```
http://localhost:3000/api-docs
```

## Prisma (comandos útiles)

- Generar cliente: `npx prisma generate` (ya configurado en `predev` / `postinstall`).
- Ver el estado de migraciones: `npx prisma migrate status`.
- Abrir Prisma Studio: `npx prisma studio`.

## Tests

Ejecuta las pruebas con:

```bash
npm test
```
