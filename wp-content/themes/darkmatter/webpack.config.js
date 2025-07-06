const defaultConfig = require( '@wordpress/scripts/config/webpack.config' );
const RemoveEmptyScriptsPlugin = require( 'webpack-remove-empty-scripts' );
const path = require( 'path' );
const fs = require( 'fs' );

function generateEntries() {
	const entries = {};

	// Add JS files
	const jsDir = path.resolve( __dirname, 'assets/src/js' );
	if ( fs.existsSync( jsDir ) ) {
		fs.readdirSync( jsDir ).forEach( ( file ) => {
			if ( file.endsWith( '.js' ) ) {
				const name = `js/${ file.replace( /\.js$/, '' ) }`;
				entries[ name ] = path.join( jsDir, file );
			}
		} );
	}

	// Add SCSS files
	const cssDir = path.resolve( __dirname, 'assets/src/css' );
	if ( fs.existsSync( cssDir ) ) {
		fs.readdirSync( cssDir ).forEach( ( file ) => {
			if ( file.endsWith( '.scss' ) ) {
				const name = `css/${ file.replace( /\.scss$/, '' ) }`;
				entries[ name ] = path.join( cssDir, file );
			}
		} );
	}

	return entries;
}

module.exports = {
	...defaultConfig,
	entry: generateEntries(),
	output: {
		path: path.resolve( __dirname, 'assets/build' ),
		filename: '[name].js',
	},
	plugins: [
		...defaultConfig.plugins,
		new RemoveEmptyScriptsPlugin( {
			stage: RemoveEmptyScriptsPlugin.STAGE_AFTER_PROCESS_PLUGINS,
		} ),
	],
};
