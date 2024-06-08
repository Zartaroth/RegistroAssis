# Usa una imagen base de Node.js
FROM node:20

# Establece el directorio de trabajo en el contenedor
WORKDIR /app

# Copia el resto de los archivos del proyecto al contenedor
COPY . .

# # Copia los archivos package.json y package-lock.json al contenedor
# COPY package*.json .

# Instala las dependencias del proyecto
RUN npm install

# Exponer el puerto en el que tu aplicación escuchará
EXPOSE 3000
EXPOSE 4000

# Comando para ejecutar tu aplicación
CMD ["npm", "start"]