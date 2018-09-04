const debugStripper = require('./debug-stripper');

function webpackRemoveDebug( source ) {
    this.callback( null, debugStripper( source ) );
}

module.exports = webpackRemoveDebug;
