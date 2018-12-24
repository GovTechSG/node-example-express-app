FROM node:latest

WORKDIR /usr/src/app

COPY package*.json ./

RUN npm install

COPY . ./

EXPOSE 8443
EXPOSE 8080

CMD node bin/www.js

