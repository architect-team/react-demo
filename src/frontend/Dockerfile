FROM node:12-alpine

WORKDIR /usr/src/app

COPY . .
RUN npm run build

CMD [ "npm", "run", "start" ]
