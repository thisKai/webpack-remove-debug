const test = require('tape');
const debugStripper = require('./debug-stripper');

const isOnlyWhitespace = input => /^\s+$/g.test(input);

test('Remove require("debug")(...)', t => {
    {
        const input = 'const debug=require("debug")("namespace");';

        t.assert(isOnlyWhitespace(debugStripper(input)));
    }
    {
        const input = 'const debug = require ( "debug" ) ( "namespace" ) ;';

        t.assert(isOnlyWhitespace(debugStripper(input)));
    }
    {
        const input = "const debug=require('debug')('namespace');";

        t.assert(isOnlyWhitespace(debugStripper(input)));
    }
    t.end();
});

test('Remove calls to a debug instance named "debug"', t => {
    {
        const input = 'debug("message");';

        t.assert(isOnlyWhitespace(debugStripper(input)));
    }
    {
        const input = 'debug ( "message" ) ;';

        t.assert(isOnlyWhitespace(debugStripper(input)));
    }
    {
        const input = "debug('message');";

        t.assert(isOnlyWhitespace(debugStripper(input)));
    }
    t.end();
});
