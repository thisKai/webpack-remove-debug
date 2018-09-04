const stripDebugRequire = source => source.replace( /.*?require\(\s*[\'"]debug[\'"]\s*\).*/g, '\n' );
const stripDebugCall = source => source.replace( /.*debug\(.*?\).*/g, '\n' );

module.exports = source => stripDebugRequire( stripDebugCall( source ) );
