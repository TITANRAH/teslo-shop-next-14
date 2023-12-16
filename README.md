# Descripción

## Correr en dev


1. Clonar el repositorio
2. Crear una copia de archivo .env.template y renombrarlo a .env y cambiar las variables de entorno
3. obtener auth secret key en el equipo a traves de git bash```# openssl rand -base64 32``` 
4. Instalar dependencias ```npm install```
5. Levantar base de datos ```docker compose up -d```
6. Correr las migraciones de prisma```npx prisma migrate dev --name <name>```
7. Ejecutar el seed ```npm run seed```
8. Limpiar local storage del navegador
9. Correr el proyecto ```npm run dev```

## al ejecutar las migraciones debe ser por las tres tablas o esquemas por ejem: npx prisma migrate dev --name Product
## si no se creara el cliente de prisma aunque el comando de migraciones deberia hacerlo ejecutar npx prisma generate y copiar el código que esta en las buenas practicas en esta url https://www.prisma.io/docs/guides/other/troubleshooting-orm/help-articles/nextjs-prisma-client-dev-practices y si lo crea aun asi copiar este codigo que esta en el apartado de Solution en el sitio indicado
## importante tener docker desktop abierto
## recordar levantar la bd en un cliente como por ejem TablePlus y tomar las credenciales escritas en el archivo .env

## si por alguna razón se realiza un cambio destructivo en la bd  simplemente correr el seed nuevamente y la volverá a generar

## si se quiere usar un gestor de bd como tableplus se puede abrir prisma studio: npx prisma studio

## Correr en prod
