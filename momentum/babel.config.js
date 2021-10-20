module.exports = (api) => {
  api.cache.using(() => process.env.NODE_ENV);

  const presets = [
    ['@babel/preset-env', {}],
  ];

  const plugins = [
    ["@babel/transform-runtime"]
  ];

  if (!api.env('development')) {
    plugins.push(['@babel/plugin-proposal-class-properties']);
  }

  return { presets, plugins };
};
