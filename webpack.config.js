"use strict";
var webpack = require('webpack');
var path = require('path');
var loaderRules = require('./webpack.loaders');
var HtmlWebpackPlugin = require('html-webpack-plugin');

const HOST = process.env.HOST || "127.0.0.1";
const PORT = process.env.PORT || "8888";

module.exports = {
	entry: {
		'app': [
			'react-hot-loader/patch',
			`webpack-dev-server/client?http://${HOST}:${PORT}`,
			`webpack/hot/only-dev-server`,
			`./src/index.jsx` // Your appʼs entry point
		]
	},
	devtool: process.env.WEBPACK_DEVTOOL || 'cheap-module-source-map',
	output: {
		path: path.join(__dirname, 'public'),
		filename: 'bundle.js'
	},
	resolve: {
		extensions: ['.js', '.jsx'],
		modules: [
			path.join(__dirname, "src"),
			"node_modules"
		]
	},
	module: {
		rules: loaderRules
	},
	devServer: {
		contentBase: "./public",
		// do not print bundle build stats
		noInfo: true,
		// embed the webpack-dev-server runtime into the bundle
		inline: true,
		// serve index.html in place of 404 responses to allow HTML5 history
		historyApiFallback: true,
		port: PORT,
		host: HOST
	},
	plugins: [
		new webpack.NoEmitOnErrorsPlugin(),
		new HtmlWebpackPlugin({
			template: './src/index.html'
		}),
	],
};
