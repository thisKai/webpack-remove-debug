exports.getAllMatches = (regex, input) => {
    let matches;
    const output = [];

    while(matches = regex.exec(input)) {
        delete matches.input;
        output.push(matches);
    }
    return output;
};
