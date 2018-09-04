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

test('Remove es2015 import statements', t => {
    const input = 'import createDebug from "debug";';

    t.assert(isOnlyWhitespace(debugStripper(input)));
    t.end();
});

test('Remove es2015 imported instances', t => {
    const input = `
        import createDebug from "debug";
        const debug = createDebug("blah");
    `;

    t.assert(isOnlyWhitespace(debugStripper(input)));
    t.end();
});

test('Remove calls to es2015 imported instances', t => {
    const input = `
        import createDebug from "debug";
        const debug = createDebug("blah");

        debug("message 1");
        debug("message 2");
        debug("message 3");
    `;
    t.assert(isOnlyWhitespace(debugStripper(input)));
    t.end();
});

test('Remove calls to named debug instances', t => {
    const input = `
        import createDebug from "debug";

        const a = createDebug("a");
        const b = createDebug("b");
        const c = createDebug("c");

        a("message 1");
        b("message 2");
        c("message 3");
    `;
    t.assert(isOnlyWhitespace(debugStripper(input)));
    t.end();
});
