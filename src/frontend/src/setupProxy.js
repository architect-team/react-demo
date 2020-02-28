const proxy = require('http-proxy-middleware');

module.exports = function (app) {
  app.use(
    '/api',
    proxy({
      target: `http://${process.env.REACT_APP_API_ADDR}`,
      changeOrigin: true,
      pathRewrite: {
        '^/api': ''
      },
    })
  );
};
