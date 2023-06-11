FROM node:17.8.0-alpine

WORKDIR /usr/src/app

COPY package*.json ./

RUN npm install

COPY . .

EXPOSE 4000

RUN npm run build

RUN npm run seed:users

RUN npm run seed:parkingSpot

CMD [ "node", "dist/src/index.js" ]
