# Utiliza una imagen base con Node.js instalado
FROM node:latest

# Instala Bun globalmente
RUN npm install -g bun

# Directorio de trabajo dentro del contenedor
WORKDIR /app

# Copia los archivos de la aplicación al directorio de trabajo del contenedor
COPY . .

COPY --from=ghcr.io/ufoscout/docker-compose-wait:latest /wait /wait

# Instala las dependencias de la aplicación
RUN bun i
RUN bunx prisma generate

CMD /wait && bunx prisma db push && bun run src/app.ts
