FROM node:12-alpine

ARG REACT_APP_API_ADDR
ARG REACT_APP_WORLD_TEXT

WORKDIR /usr/src/app

RUN npm install -g serve

COPY . .
RUN npm run build

CMD [ "serve", "-s", "build", "-l", "8080" ]
