const CopyWebpackPlugin = require('copy-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const path = require('path');

const mode = process.env.NODE_ENV;
const isDev = process.env.NODE_ENV === 'development';

module.exports = {
  target: isDev ? 'web' : 'electron-renderer',
  mode,
  resolve: {
    extensions: ['.js', '.ts', '.tsx'],
    alias: {
      '@pages': path.resolve(__dirname, 'src', 'renderer', 'pages'),
      '@style': path.resolve(__dirname, 'src', 'renderer', 'style'),
      '@components': path.resolve(__dirname, 'src', 'renderer', 'components'),
      '@constants': path.resolve(__dirname, 'src', 'renderer', 'constants'),
      '@types': path.resolve(__dirname, 'src', 'renderer', 'types'),
      '@ui-kit': path.resolve(__dirname, 'src', 'renderer', 'ui-kit'),
      '@redux': path.resolve(__dirname, 'src', 'renderer', 'redux'),
      '@hooks': path.resolve(__dirname, 'src', 'renderer', 'hooks'),
      '@utils': path.resolve(__dirname, 'src', 'renderer', 'utils'),
      '@connectors': path.resolve(__dirname, 'src', 'renderer', 'connectors'),
      '@common': path.resolve(__dirname, 'src', 'common'),
      '@mui/styled-engine': '@mui/styled-engine-sc'
    }
  },
  entry: path.join(__dirname, 'src', 'renderer', 'index.ts'),
  output: {
    path: path.join(__dirname, 'build', 'renderer'),
    filename: isDev ? 'main.js' : 'main.[contenthash:8].js',
    publicPath: 'auto',
    clean: false
  },
  devServer: {
    compress: true,
    port: process.env.CLIENT_PORT,
    historyApiFallback: true,
    static: {
      directory: path.join(__dirname, 'assets', 'renderer'),
      watch: isDev
    }
  },
  devtool: isDev ? 'source-map' : undefined,
  plugins: [
    new HtmlWebpackPlugin({
      title: 'epam-cdisc-electron',
      template: path.join(__dirname, 'src', 'renderer', 'index.html')
    }),
    new CopyWebpackPlugin({
      patterns: [
        {
          from: path.resolve(__dirname, 'assets', 'renderer'),
          to: path.resolve(__dirname, 'build', 'renderer')
        }
      ]
    })
  ],
  module: {
    rules: [
      {
        test: /\.ts(x)?$/,
        exclude: /node_modules/,
        use: ['babel-loader']
      },
      {
        test: /\.css$/i,
        use: ['style-loader', 'css-loader']
      }
    ]
  }
};
