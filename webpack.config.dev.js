const webpack = require('webpack');
const resolve = require('path').resolve;
const ExtractTextPlugin = require("extract-text-webpack-plugin");
const HtmlWebpackPlugin = require('html-webpack-plugin');
// const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;


module.exports = {
    devServer: {
        publicPath: "/dev/"
    },
    devtool: 'cheap-module-eval-source-map',
    entry: {
        main: './src/app.js',
        jq: ['jquery', 'bootstrap'],
        vendor: ['redux', 'mapbox-gl'],
        util: ['expr-eval']
    },
    output: {
        path: resolve(__dirname, 'dev'),
        filename: 'js/[name].js',
        publicPath: '/dev/'
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
                    name: 'fonts/[name].[ext]',
                },
},
            {
                test: /\.(jpg|gif|png)$/,
                loader: 'file-loader',
                options: {
                    name: 'img/[name].[ext]',
                },
}
    ],
    },
    plugins: [
        new ExtractTextPlugin('css/[name].css'),
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
            filename: 'index.html'
        }),
        // new BundleAnalyzerPlugin({
        //     analyzerMode: 'static'
        // })
]
};
