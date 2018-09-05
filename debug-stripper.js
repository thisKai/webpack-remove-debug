const { getAllMatches } = require('./regex');

const stripDebugRequire = source => source.replace( /.*require\s*\(\s*['"]debug['"]\s*\).*/g, '\n' );
const stripDebugCall = source => source.replace( /.*debug\s*\(.*?\).*/g, '\n' );

const debugImportPattern = /\s*import\s+([a-zA-Z_\$][a-zA-Z_\$0-9]*)\s+from\s+[\'"]debug[\'"]\s*;?/g;

const getImportedDebugFactoryNames = source =>
    getAllMatches(debugImportPattern, source)
        .map(matches => matches[1]);

const stripDebugImport = source => {
    const importNames = getImportedDebugFactoryNames(source);

    const importsRemoved = source.replace(debugImportPattern, '');
    const instancePattern = new RegExp(
        `\\s*(?:var|let|const)\\s+([a-zA-Z_\\$][a-zA-Z_\\$0-9]*)\\s*=\\s*(?:${importNames.join('|')})\\s*\\(.*\\)\\s*;?`,
        'g',
    );
    const instancesRemoved = importsRemoved.replace(instancePattern, '');
    const instanceNames = getAllMatches(instancePattern, importsRemoved)
        .map(matches => matches[1]);

    const callsPattern = new RegExp(
        `\\s*(${instanceNames.join('|')})\\s*\\(.*\\)\\s*;?`,
        'g',
    );
    const callsRemoved = instancesRemoved.replace(callsPattern, '');

    const enabledChecksPattern = new RegExp(
        `(${instanceNames.join('|')}).enabled`,
        'g',
    );

    const enabledChecksRemoved = callsRemoved.replace(enabledChecksPattern, 'false');

    return enabledChecksRemoved;
};

module.exports = source => (
    stripDebugImport(
        stripDebugRequire(
            stripDebugCall( source )
        )
    )
);
