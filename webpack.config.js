var webpack = require('webpack');
var path  =require('path');

module.exports = {
    entry: [
      "./app.js"
    ],
    output: {
        path: __dirname + '/build',
        filename: "bundle.js"
    },
    module: {
        loaders: [
	    { test: /\.js$/, exclude: /node_modules/, loader: 'babel-loader'},
	    { test: /\.less$/, loader: "style-loader!css-loader!less-loader"},
	    {test: /\.png$/,
	    loader: "url-loader",
	     query: { mimetype: "image/png" }}
        ]
    },
    plugins: [
      new webpack.NoErrorsPlugin()
    ]

};
