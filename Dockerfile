FROM node:18-alpine

WORKDIR /website

COPY package*.json ./

RUN npm install --legacy-peer-deps

COPY . .

CMD [ "npm", "start" ]
