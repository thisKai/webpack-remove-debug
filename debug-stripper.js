const stripDebugRequire = source => source.replace( /.*require\s*\(\s*['"]debug['"]\s*\).*/g, '\n' );
const stripDebugCall = source => source.replace( /.*debug\s*\(.*?\).*/g, '\n' );

module.exports = source => stripDebugRequire( stripDebugCall( source ) );
