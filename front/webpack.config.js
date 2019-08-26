const path = require('path');
const webpack = require('webpack');

module.exports = {
    mode: 'development',
    entry: path.resolve(__dirname, './index.js'),
    output: {
        path: path.resolve(__dirname, '../desk/public/js/dist'),
        filename: 'default.js'
    },
    module: {
        rules: [
            {
                test: /\.jsx?/,
                use: ['babel-loader']
            },
            {
                test: /\.css/,
                use: ['style-loader', 'css-loader']
            }
        ]
    },
    plugins: [
        new webpack.DllReferencePlugin({
            context: __dirname,
            manifest: require('../desk/public/js/dist/react-manifest.json')
        }),
        new webpack.DllReferencePlugin({
            context: __dirname,
            manifest: require('../desk/public/js/dist/echarts-manifest.json')
        })
    ]
}