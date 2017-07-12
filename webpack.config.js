const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');

const config = {
	entry: [
		'webpack-dev-server/client?http://localhost:6969',
		'./app/config/routes.js'
	],
	output: {
		path: path.resolve(__dirname,"dist"),
		filename: "index_bundle.js",
		publicPath: "/"
	},
	module: {
		rules: [
			{test: /\.jsx?$/, use: {loader:'babel-loader', options:{presets: ["react","es2015"], plugins: ["transform-es2015-arrow-functions"]}}, exclude: [/node_modules/,/dist/,/test/]},
			{test: /\.css$/, use:['style-loader','css-loader']},
			{test: /\.(scss|sass)$/, use: ['style-loader', 'css-loader','sass-loader']},
		]
	},
	plugins: [
		new HtmlWebpackPlugin({
			template: './app/index.html',
			filename: 'index.html',
			inject: 'body'
		})
	],
	devServer: {
		port: 6969,
		historyApiFallback: true
	}
};

module.exports = config;
