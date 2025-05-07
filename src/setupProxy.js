var { createProxyMiddleware } = require('http-proxy-middleware');
module.exports = function (app) {
  app.use(
    [
      '/cdfi',
      '/lib',
      '/resources',
      '/styles',
      '/formulas',
      '/value_fact',
      '/investor',
      '/graphs',
      '/api',
      '/images',
      '/reportcategorys',
      '/export',
      '/mapper',
      '/metricmaps',
      '/metric',
      '/adjustment',
      '/peergroups',
      '/anonymous',
      '/tag',
      '/peergroupselector',
      '/webform',
      '/documenttypes',
      '/formulas',
      '/tax-jurisdictions',
      '/library',
      '/library_folder',
      '/fonts',
      '/footnotes',
      '/period'
    ],
    createProxyMiddleware({
      target: 'http://localhost:8080',
      changeOrigin: true,
    }),
  );
};
