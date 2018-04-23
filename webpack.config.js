const path = require('path');

module.exports = {
    devtool: 'source-map',
    entry: "./front/src/scripts/main.js",
    output: {
        filename: 'bundle.js',
        path: path.resolve(__dirname, './src/main/resources/static/js')
    }
};
