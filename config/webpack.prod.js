var webpack = require('webpack'),
    ExtractTextPlugin = require("extract-text-webpack-plugin"),
    merge = require('webpack-merge'),
    path = require('path'),
    common = require('./webpack.config'),
    CopyWebpackPlugin = require('copy-webpack-plugin'),
    BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;

var sass = new ExtractTextPlugin({
    filename: "app.css",
    allChunks: true
});

var specific = {
    module: {
        loaders: [{
            test: /\.scss$/,
            loaders: sass.extract(['css-loader', 'sass-loader'])
        }, {
            test: /\.css$/,
            loaders: sass.extract(['css-loader'])
        }]
    },

    plugins: [
        //new webpack.optimize.UglifyJsPlugin(),
        //new BundleAnalyzerPlugin(),
        new webpack.DefinePlugin({
            'process.env.NODE_ENV': JSON.stringify('production'),
            'process.env.HS_ID': JSON.stringify(process.env.HS_ID || false),
        }),
        sass,
        new CopyWebpackPlugin([{
          from: path.join(__dirname, '../assets'),
            to: path.join(__dirname, '../dist/assets'),
        }])
    ],

    output: {
        publicPath: '/'
    }
};

module.exports = merge(common, specific);
