FROM node:16-alpine
WORKDIR /./
COPY package*.json ./
RUN npm install
RUN npm run build
ADD public ./ 
CMD [ "mv", "./public/*", "/var/www/kemuro/" ]