FROM node:13

WORKDIR /usr/src/app

COPY package*.json ./

RUN npm install

COPY . .

ENV PORT=3000

EXPOSE 7000:3000

CMD ["node", "server.js"]