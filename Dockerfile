FROM node:16-alpine
WORKDIR /./
COPY package*.json yarn.lock ./
RUN npm install
COPY . ./
CMD [ "node", "index.js" ]