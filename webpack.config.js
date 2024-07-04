const path = require("path");
const TerserPlugin = require('terser-webpack-plugin');
const CssMinimizerPlugin = require('css-minimizer-webpack-plugin');
const WebpackObfuscator = require('webpack-obfuscator');


module.exports = {
    devtool: "nosources-source-map",
	mode: "production",
	entry: "./static/js/index.js",
	performance : {
		hints : false
	},
	output: {
		filename: "sandbox.js",
		path: path.resolve(__dirname, "static"),
	},
	watch: true,
	module: {
		rules: [
			{
				test: /\.m?js$/,
				exclude: /(node_modules|bower_components)/,
				use: {
					loader: "babel-loader",
					options: {
						presets: ["@babel/preset-env"],
					},
				},
			},

		],
	},
	optimization: {
		minimize: true,
		minimizer: [
		  new TerserPlugin({
			terserOptions: {
			  format: {
				comments: false,
			  },
			},
			extractComments: false,
		  }),
		  new CssMinimizerPlugin(),
		],
	  },

	plugins: [
		new WebpackObfuscator({
			rotateStringArray: true,
			stringArray: true,
		}),
	],
};
