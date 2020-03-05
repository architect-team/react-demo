const express = require('express');
const next = require('next');

const dev = process.env.NODE_ENV !== 'production';
const app = next({ dev });
const handle = app.getRequestHandler();

const { createProxyMiddleware } = require('http-proxy-middleware');

app.prepare()
  .then(() => {
    const server = express();

    server.use('/api',
      createProxyMiddleware({
        target: `http://${process.env.API_ADDR}`,
        pathRewrite: { '^/api': '' },
        changeOrigin: true
      })
    );

    server.all('*', (req, res) => {
      return handle(req, res);
    });

    const port = process.env.PORT || 8080;
    server.listen(port, (err) => {
      if (err) throw err;
      console.log(`> Ready on http://localhost:${port}`);
    })
  })
  .catch((ex) => {
    console.error(ex.stack);
    process.exit(1);
  });
