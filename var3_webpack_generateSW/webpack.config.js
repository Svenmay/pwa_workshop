const path = require('path'),
  workboxPlugin = require('workbox-webpack-plugin');

module.exports = {
//  mode: 'production',
  mode: 'development',
  entry: {
    main: './src/main.js',
  },
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: '[name].bundle.js',
    sourceMapFilename: '[name].bundle.js.map',
  },
  plugins: [
    new workboxPlugin.GenerateSW({
      swDest: 'sw.js',
      clientsClaim: true,
      skipWaiting: true,
      navigationPreload: true,
      runtimeCaching: [{
        urlPattern: new RegExp('\.(?:html|htm|js|css)$'),
        handler: 'StaleWhileRevalidate'
      }],
      additionalManifestEntries: [
	{url: '/offline.html', revision: null},
        {url: '/images/offline.jpg', revision: null},
      ],
    }),
  ],
  devtool: 'source-map',
};
