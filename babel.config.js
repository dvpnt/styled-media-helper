module.exports = ({env}) => ({
	presets: [
		[
			'@babel/preset-env',
			{
				...env('esm') ? {modules: false} : {},
				targets: {
					node: 'current',
					browsers: 'last 4 versions'
				}
			}
		]
	],
	plugins: ['babel-plugin-styled-components']
});
