module.exports = [
	{
		test: /\.jsx?$/,
		exclude: /(node_modules|bower_components|public)/,
		loader: "babel-loader", // Do not use "use" here
		query: {
			presets: ['es2015', 'react']
		}
	},
	// global css
	{
		test: /[\/\\](node_modules|global)[\/\\].*\.css$/,
		use: [
			'style-loader',
			'css-loader'
		]
	},
	// local scss modules
	{
		test: /[\/\\]src[\/\\].*\.scss/,
		exclude: /(node_modules|bower_components|public)/,
		use: [
			'style-loader',
			'css-loader',
			'sass-loader'
		]
	},
	// local css modules
	{
		test: /[\/\\]src[\/\\].*\.css/,
		exclude: /(node_modules|bower_components|public)/,
		use: [
			'style-loader',
			'css-loader'
		]
	},
	{
		test: /\.eot(\?v=\d+\.\d+\.\d+)?$/,
		exclude: /(node_modules|bower_components)/,
		loader: "file-loader"
	},
	{
		test: /\.(woff|woff2)$/,
		exclude: /(node_modules|bower_components)/,
		loader: "url-loader?prefix=font/&limit=5000"
	},
	{
		test: /\.ttf(\?v=\d+\.\d+\.\d+)?$/,
		exclude: /(node_modules|bower_components)/,
		loader: "url-loader?limit=10000&mimetype=application/octet-stream"
	},
	{
		test: /\.svg(\?v=\d+\.\d+\.\d+)?$/,
		exclude: /(node_modules|bower_components)/,
		loader: "url-loader?limit=10000&mimetype=image/svg+xml"
	},
	{
		test: /\.gif/,
		exclude: /(node_modules|bower_components)/,
		loader: "url-loader?limit=10000&mimetype=image/gif"
	},
	{
		test: /\.jpg/,
		exclude: /(node_modules|bower_components)/,
		loader: "url-loader?limit=10000&mimetype=image/jpg"
	},
	{
		test: /\.png/,
		exclude: /(node_modules|bower_components)/,
		loader: "url-loader?limit=10000&mimetype=image/png"
	}
];
