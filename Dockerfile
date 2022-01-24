FROM node:16-alpine
WORKDIR /./
COPY package*.json ./
RUN npm install
COPY . .
CMD [ "touch", "/public/hello", ]
CMD [ "node", "index.js" ]