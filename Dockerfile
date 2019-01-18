FROM node:latest

WORKDIR /usr/src/app

COPY package*.json ./

RUN npm install

COPY . ./

RUN chmod -R a+rwXs /usr/src/app
RUN useradd node_user
USER node_user

EXPOSE 8443
EXPOSE 8080

CMD node bin/www.js

