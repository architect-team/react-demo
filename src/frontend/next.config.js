module.exports = {
  publicRuntimeConfig: {
    REACT_APP_API_ADDR: process.env.REACT_APP_API_ADDR,
    REACT_APP_WORLD_TEXT: process.env.REACT_APP_WORLD_TEXT,
  },

  webpack(config) {
    config.module.rules.push({
      test: /\.svg$/,
      use: ['@svgr/webpack'],
    });

    return config;
  }
};
