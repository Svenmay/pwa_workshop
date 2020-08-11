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
    new workboxPlugin.InjectManifest({
      swSrc: './src/sw.js',
      additionalManifestEntries: [
	{url: './src/offline.html', revision: null},
        {url: './src/offline.jpg', revision: null},
      ],
    })
  ],
  devtool: 'source-map',
};
