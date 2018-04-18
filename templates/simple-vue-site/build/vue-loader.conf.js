'use strict'

const utils = require('./utils')
// const config = require('../config')

const isProduction = process.env.NODE_ENV === 'production'

module.exports = {
	loaders: utils.cssLoaders({
		sourceMap: false,
		extract: false
	}),
	postcss: [
		require('autoprefixer')({
			browsers: ['last 3 versions']
		})
	],
	cssSourceMap: false,
	cacheBusting: false,
	transformToRequire: {
		video: ['src', 'poster'],
		source: 'src',
		img: 'src',
		image: 'xlink:href'
	}
}