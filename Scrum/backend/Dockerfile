#Usar la versión 20 de node
FROM node:20
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