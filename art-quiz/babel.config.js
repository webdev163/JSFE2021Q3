module.exports = (api) => {
  api.cache.using(() => process.env.NODE_ENV);

  const presets = [
    ['@babel/preset-env', {}],
    ['@babel/preset-typescript']
  ];

  const plugins = [
    ['@babel/transform-runtime'],
  ];

  return { presets, plugins };
};
