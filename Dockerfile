FROM node:16-alpine
WORKDIR /./
COPY package*.json ./
RUN npm install
RUN npm build
COPY ./build ./ 
CMD [ "mv", "./build/*", "/var/www/kemuro/" ]