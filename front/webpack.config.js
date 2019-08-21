const path = require('path');

module.exports = {
    mode: 'development',
    entry: path.resolve(__dirname, './index.js'),
    output: {
        path: path.resolve(__dirname, '../desk/public/js'),
        filename: 'default.js'
    },
    module: {
        rules: [
            {
                test: /\.jsx?/,
                use: ['babel-loader']
            }
        ]
    }
}