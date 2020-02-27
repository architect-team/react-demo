const express = require('express');
const consola = require('consola');
const { Nuxt, Builder } = require('nuxt');
const app = express();
const proxy = require('express-http-proxy');

// Import and Set Nuxt.js options
const config = require('../../nuxt.config.js');
config.dev = process.env.NODE_ENV !== 'production';

async function start() {
  // Init Nuxt.js
  const nuxt = new Nuxt(config);

  const { host, port } = nuxt.options.server;

  // Build only in dev mode
  if (config.dev) {
    const builder = new Builder(nuxt);
    await builder.build();
  } else {
    await nuxt.ready();
  }

  // Add a healthcheck for the app
  app.use('/health', require('express-healthcheck')());

  // proxy api requests to bouncer backend
  app.use('/api', proxy(`${process.env.API_HOST}:${process.env.API_PORT}`));

  // Give nuxt middleware to express
  app.use(nuxt.render);

  // Listen the server
  app.listen(port, host);

  consola.ready({
    message: `Server listening on http://${host}:${port}`,
    badge: true
  })
}
start();
