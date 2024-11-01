#Usar la última versión de node
FROM node
#Indicar el directorio de trabajo
WORKDIR /usr/src/app
#Copiar el package json
COPY package*.json ./
#Instalar las dependencias
RUN npm install
#Copiar el resto de la aplicación
COPY . .
#Usar el puerto 5000
EXPOSE 5000
#Iniciar la aplicación
CMD [ "npm", "start" ]