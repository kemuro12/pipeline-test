FROM node:16-alpine
WORKDIR /./
COPY package*.json ./
RUN npm install
COPY . .
CMD [ "mv", "/public/*", "/var/www/kemuro/" ]
CMD [ "node", "index.js" ]