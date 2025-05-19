FROM node:23.11.0

LABEL org.opencontainers.image.authors="Oscar I Hernandez V"
LABEL org.opencontainers.image.source="https://github.com/maleficarum/eversports"

WORKDIR /etc/eversports

COPY ./dist .

COPY package.json .

RUN npm install

EXPOSE 80

CMD [ "index.js" ]