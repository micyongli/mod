const webpack = require('webpack')
const library = '[name]_lib'
const path = require('path')

module.exports = {
    mode: 'production',
    entry: {
        react: [
            'react',
            'react-dom',
            'react-router'
        ]
    },

    output: {
        filename: '[name].vendor.js',
        path: path.resolve(__dirname, '../desk/public/js/dist'),
        library
    },

    plugins: [
        new webpack.DllPlugin({
            path: path.resolve(__dirname, '../desk/public/js/dist/[name]-manifest.json'),
            name: library
        }) 
    ]

}