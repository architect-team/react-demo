# Build the app in a different pipeline step
# ---------------------------------------------------------
FROM node:12-alpine as root
RUN apk add python make g++

# Build the app in a different pipeline step
# ---------------------------------------------------------

FROM root as build
ARG ARCHITECT_DEBUG

WORKDIR /tmp
ENV RUNTIME_ENV=1
COPY package*.json ./
RUN npm install
COPY . .
RUN npm run build

# Build the final artifact using production NPM modules
# ---------------------------------------------------------

FROM root
ARG ARCHITECT_DEBUG

WORKDIR /usr/src/app
# if --build-arg ARCHITECT_DEBUG=1, set NODE_ENV to 'dev' or set to null otherwise.
ENV NODE_ENV=${ARCHITECT_DEBUG:+dev}
# if NODE_ENV is null, set it to 'production' (or leave as is otherwise).
ENV NODE_ENV=${NODE_ENV:-production}

COPY --from=build /tmp/.nuxt .nuxt/
COPY package*.json ./
RUN npm install
COPY . .

ENV HOST 0.0.0.0
ENV PORT 80
EXPOSE ${PORT}

COPY docker-entrypoint.sh /usr/local/bin/
RUN chmod +x /usr/local/bin/docker-entrypoint.sh
RUN ln -s /usr/local/bin/docker-entrypoint.sh /
ENTRYPOINT ["docker-entrypoint.sh"]

CMD npm run start
