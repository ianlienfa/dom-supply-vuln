// // webpack.config.js
const path = require('path');
const webpack = require('webpack')
const dotenv = require('dotenv')

dotenv.config(); // resolve the .env file

module.exports = {
    entry: './src/index.js', // Entry file
    output: {
        filename: 'main.js', // The name of your bundled file
        path: path.resolve(__dirname, 'dist'), // Output directory
        publicPath: '/' // Necessary for the dev server
    },
    plugins: [
        new webpack.DefinePlugin({
            'process.env.FLAG': JSON.stringify(process.env.FLAG),
        })
    ],
    module: {
        rules: [
            {
                test: /\.(png|jpg)$/,
                type: 'asset/resource',            
            },    
        ]
    }
};