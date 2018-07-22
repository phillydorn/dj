const path = require('path');


module.exports = {
  mode: "development",
  entry: "./src/client/app.js", 
  output: {
    path: path.resolve(__dirname, "public"), 
    filename: "bundle.js", 
    publicPath: "/public/", 
  },
  module: {
    rules: [
    // {
    //         test: /\.svg$/,
    //         exclude: /node_modules/,
    //         loader: 'svg-react-loader',
    //         query: {
    //             classIdPrefix: '[name]-[hash:8]__',
    
    //             propsMap: {
    //                 fillRule: 'fill-rule',
    //                 foo: 'bar'
    //             },
    //             xmlnsTest: /^xmlns.*$/
    //         }
    //     },
      {
        test: /\.js?$/,
        include: [
          path.resolve(__dirname, "src", "client")
        ],
        // exclude: [
        //   path.resolve(__dirname, "app/demo-files")
        // ],

        loader: "babel-loader",

        options: {
          presets: ["es2015", "react"]
        },
      },
      {
          test: /\.scss$/,
          use: [{
              loader: "style-loader"
          }, {
              loader: "css-loader"
          }, {
              loader: "sass-loader",
              options: {
                  includePaths: [path.resolve(__dirname, "src", "client", "styles")]
              }
          }]
        }


    ],

    /* Advanced module configuration (click to show) */
  },

  // resolve: {
  //   // options for resolving module requests
  //   // (does not apply to resolving to loaders)

  //   modules: [
  //     "node_modules",
  //     path.resolve(__dirname)
  //   ],

  //   extensions: [".js", ".json", ".jsx", ".css"],
  //   // extensions that are used

 
  // },

  watch: true,
  devtool: "source-map",

  context: __dirname, 
  // devServer: {
  //   proxy: { // proxy URLs to backend development server
  //     '/api': 'http://localhost:3001'
  //   },
  //   contentBase: path.join(__dirname, 'public'), // boolean | string | array, static file location
  //   compress: true, // enable gzip compression
  //   historyApiFallback: true, // true for index.html upon 404, object for multiple paths
  //   hot: true, // hot module replacement. Depends on HotModuleReplacementPlugin
  //   https: false, // true for self-signed, object for cert authority
  //   noInfo: true, // only errors & warns on hot reload
  //   // ...
  // },

  plugins: [
    // ...
  ],
  // list of additional plugins


  /* Advanced configuration (click to show) */
}