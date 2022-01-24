FROM node:16-alpine
WORKDIR /./
COPY package*.json ./
RUN npm install
RUN npm run build
ADD public ./ 
CMD [ "mv", "./build/*", "/var/www/kemuro/" ]