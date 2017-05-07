const path = require('path');
const webpack = require('webpack');
const resolve = require('path').resolve;
const ExtractTextPlugin = require("extract-text-webpack-plugin");
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
    devServer: {
        historyApiFallback: true,
        contentBase: './',
        host: process.env.IP,
        //https: true,
        port: process.env.PORT,
        public: "html-static-royhobbstn.c9users.io"
    },
    devtool: "cheap-eval-source-map",
    entry: {
        main: './src/app.js',
        jq: ['jquery', 'bootstrap'],
        vendor: ['redux', 'mapbox-gl'],
        util: ['simple-statistics', 'expr-eval']
    },
    output: {
        path: resolve(__dirname, 'dist'),
        filename: 'js/[name].js'
    },
    module: {
        rules: [
            {
                test: /\.css$/,
                use: ExtractTextPlugin.extract({
                    fallback: "style-loader",
                    use: "css-loader"
                })
      },
            {
                test: /\.js$/,
                exclude: [/node_modules/],
                use: [{
                    loader: 'babel-loader',
                    options: {
                        presets: ['es2015']
                    },
        }],
      },
            {
                test: /\.(ttf|eot|woff|woff2|svg)$/,
                loader: 'file-loader',
                options: {
                    name: 'fonts/[name].[ext]',
                },
}
    ],
    },
    plugins: [
        new ExtractTextPlugin("styles.css"),
        new webpack.ProvidePlugin({
            $: 'jquery',
            jQuery: 'jquery',
            mapboxgl: 'mapbox-gl',
            Redux: 'redux'
        }),
        new webpack.optimize.CommonsChunkPlugin({
            name: ['main', 'jq', 'vendor', 'util', 'manifest']
        }),
        new HtmlWebpackPlugin({
            template: './src/index.ejs',
            filename: '../index.html'
        })
]
};
