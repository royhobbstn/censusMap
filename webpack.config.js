const path = require('path');
const webpack = require('webpack');
const resolve = require('path').resolve;
const ExtractTextPlugin = require("extract-text-webpack-plugin");
const HtmlWebpackPlugin = require('html-webpack-plugin');
// const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;


module.exports = {
    devServer: {
        historyApiFallback: true,
        contentBase: './',
        host: process.env.IP,
        port: process.env.PORT,
        public: "html-static-royhobbstn.c9users.io"
    },
    devtool: 'source-map',
    entry: {
        main: './src/app.js',
        jq: ['jquery', 'bootstrap'],
        vendor: ['redux', 'mapbox-gl'],
        util: ['simple-statistics', 'expr-eval']
    },
    output: {
        path: resolve(__dirname, 'dist'),
        filename: 'js/[name]-[hash].js'
    },
    module: {
        noParse: /(mapbox-gl)\.js$/,
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
                    name: 'fonts/[name]-[hash].[ext]',
                },
},
            {
                test: /\.(jpg|gif|png)$/,
                loader: 'file-loader',
                options: {
                    name: 'img/[name]-[hash].[ext]',
                },
}
    ],
    },
    plugins: [
        new ExtractTextPlugin('css/[name]-[contenthash].css'),
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
        }),
        new webpack.DefinePlugin({
            'process.env': {
                'NODE_ENV': JSON.stringify('production'),
            }
        }),
        new webpack.optimize.UglifyJsPlugin({
            sourceMap: true
        }),
        // new BundleAnalyzerPlugin({
        //     analyzerMode: 'static'
        // })
]
};
