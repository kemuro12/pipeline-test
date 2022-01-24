FROM node:16-alpine
WORKDIR /./
COPY package*.json ./
RUN npm install
RUN npm run build
CMD [ "mkdir", "build" ]
COPY ./build ./build 
CMD [ "mv", "./build/*", "/var/www/kemuro/" ]