# Descripción

## Correr en dev


1. Clonar el repositorio
2. Crear una copia de archivo .env.template y renombrarlo a .env y cambiar las variables de entorno
3. Instalar dependencias ```npm install```
4. Levantar base de datos ```docker compose up -d```
5. Correr las migraciones de prisma```npx prismaigrate dev```
6. Ejecutar el seed ```npm run seed```
7. Correr el proyecto ```npm run dev```

## recordar levantar la bd en un cliente como por ejem TablePlus
## Correr en prod
