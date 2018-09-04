const test = require('tape');
const debugStripper = require('./debug-stripper');

test('Remove require("debug")(...)', t => {
    {
        const input = 'const debug=require("debug")("namespace");';
        const expected = '\n';

        t.equal(debugStripper(input), expected);
    }
    {
        const input = 'const debug = require ( "debug" ) ( "namespace" ) ;';
        const expected = '\n';

        t.equal(debugStripper(input), expected);
    }
    {
        const input = "const debug=require('debug')('namespace');";
        const expected = '\n';

        t.equal(debugStripper(input), expected);
    }
    t.end();
});

test('Remove calls to a debug instance named "debug"', t => {
    {
        const input = 'debug("message");';
        const expected = '\n';

        t.equal(debugStripper(input), expected);
    }
    {
        const input = 'debug ( "message" ) ;';
        const expected = '\n';

        t.equal(debugStripper(input), expected);
    }
    {
        const input = "debug('message');";
        const expected = '\n';

        t.equal(debugStripper(input), expected);
    }
    t.end();
});
