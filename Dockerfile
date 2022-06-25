FROM node:16-alpine

WORKDIR /home/felipe/Público/desenvolvimento/nodeJs/docker

COPY package*.json ./

RUN npm install

COPY . .

EXPOSE 3000

CMD ["npm", "run", "dev"]