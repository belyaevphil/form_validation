const path = require('path')
const fs = require('fs')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const CopyWebpackPlugin = require('copy-webpack-plugin')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const { CleanWebpackPlugin } = require('clean-webpack-plugin')

const PATHS = {
  src: path.resolve(__dirname, '../src'),
  dist: path.resolve(__dirname, '../dist'),
  assets: 'assets/'
}

const PAGES_DIR = `${PATHS.src}/pages`
const PAGES = fs.readdirSync(PAGES_DIR).filter(fileName => fileName.endsWith('.hbs'))

const getCopyPluginPatterns = () => {
  const patterns = []

  const imagesSrc = `${PATHS.src}/${PATHS.assets}images`
  const fontsSrc = `${PATHS.src}/${PATHS.assets}fonts`
  const staticSrc = `${PATHS.src}/${PATHS.assets}static`

  const imagesDist = PATHS.dist
  const fontsDist = PATHS.dist
  const staticDist = PATHS.dist

  if (fs.existsSync(imagesSrc)) patterns.push({
    from: imagesSrc,
    to: imagesDist
  })

  if (fs.existsSync(fontsSrc)) patterns.push({
    from: fontsSrc,
    to: fontsDist
  })

  if (fs.existsSync(staticSrc)) patterns.push({
    from: staticSrc,
    to: staticDist
  })

  return patterns
}

module.exports = {
  externals: {
    paths: PATHS
  },
  entry: {
    main: ['@babel/polyfill', `${PATHS.src}/scripts`]
  },
  resolve: {
    extensions: ['.js', '.json', '.css', '.scss', '.ts'],
    alias: {
      '@': PATHS.src
    }
  },
  plugins: [
    ...PAGES.map(page => new HtmlWebpackPlugin({
      template: `${PAGES_DIR}/${page}`,
      filename: `${page.replace(/\.hbs/, '.html')}`
    })),
    new MiniCssExtractPlugin({
      filename: `[name].[contenthash].min.css`
    }),
    new CopyWebpackPlugin({
      patterns: getCopyPluginPatterns()
    }),
    new CleanWebpackPlugin()
  ],
  module: {
    rules: [
      {
        test: /\.hbs$/,
        loader: 'handlebars-loader',
        exclude: /node_modules/
      },
      {
        test: /\.(ts|tsx|js|jsx)$/,
        loader: 'babel-loader',
        exclude: /node_modules/
      },
      {
        test: /\.(woff(2)?|ttf|eot|svg)(\?v=\d+\.\d+\.\d+)?$/,
        loader: 'file-loader',
        options: {
          name: '[name].[ext]'
        }
      },
      {
        test: /\.(png|jpg|gif|svg)$/,
        use: [
          {
            loader: 'file-loader',
            options: {
              name: '[name].[ext]'
            }
          }
        ]
      }
    ]
  }
}
