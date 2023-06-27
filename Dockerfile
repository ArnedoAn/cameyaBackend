# Utiliza una imagen base con Node.js instalado
FROM node:alpine

# Establece el directorio de trabajo dentro del contenedor
WORKDIR /app

# Copia los archivos del proyecto al contenedor
COPY package.json .
COPY tsconfig.json .
COPY .env .
COPY credentials.json .
COPY keys.json .

# Instala las dependencias del proyecto
RUN npm install

# Instala TypeScript como una dependencia de desarrollo
RUN npm install typescript -g

# Copia el resto de los archivos del proyecto al contenedor
COPY . .

# Actualiza el ORM

#RUN npm run database

# Compila el proyecto TypeScript
RUN tsc

# Expone el puerto que utiliza tu aplicación (asegúrate de que coincida con la configuración de tu aplicación)
EXPOSE 3003

# Comando para ejecutar la aplicación
CMD [ "node", "dist/src/app.js" ]
