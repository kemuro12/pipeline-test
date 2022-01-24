FROM node:16-alpine
WORKDIR /./
COPY package*.json yarn.lock ./
RUN npm install
RUN npm run build
COPY . ./
CMD [ "node", "index.js" ]