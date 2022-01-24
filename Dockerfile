FROM node:16-alpine
WORKDIR /./
COPY package*.json ./
RUN npm install
COPY . .
EXPOSE 3001
CMD [ "node", "src/index.js" ]