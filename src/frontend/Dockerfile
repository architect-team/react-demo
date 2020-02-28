FROM node:12-alpine

WORKDIR /usr/src/app

RUN npm install -g serve

COPY . .
RUN npm run build

CMD [ "serve", "-s", "build", "-l", "8080" ]
