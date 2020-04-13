/* eslint-disable @typescript-eslint/no-var-requires */

const path = require('path');
const webpack = require('webpack');
const ForkTsCheckerWebpackPlugin = require('fork-ts-checker-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');

/**
 * This extracts texts from bundle(s) to seperate file.
 * Will be used for css(s) not to be included in bundle, rather resides in seperate css files.
 * https://github.com/webpack-contrib/extract-text-webpack-plugin
 */
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const merge = require('webpack-merge');

module.exports = (env) => {
    const isDevBuild = !(env && env.prod);

    // Configuration in common to both client-side and server-side bundles
    const sharedConfig = () => ({
        // stats: {
        //     modules: false  // This excludes information about built modules. https://webpack.js.org/configuration/stats/
        // },
        resolve: {
            extensions: ['.js', '.jsx', '.ts', '.tsx'], // File extensions to resolve. https://webpack.js.org/configuration/resolve/#resolve-extensions
            modules: ["./", "node_modules"],
        },
        output: { // Output settings for bundles.
            filename: '[name]_[chunkhash].js', // Name of the output file. https://webpack.js.org/configuration/output/#output-filename
            publicPath: "/" // Webpack dev middleware, if enabled, handles requests for this URL. Must be relative to WebApp's URL.
            // And this should be the root directory where webpack output resides.
            // Appropriate setting of this value might be solution to following issues.
            //     - https://github.com/aspnet/JavaScriptServices/issues/1204
            // This option specifies the public URL of the output directory when serving resources like images, files and others needed.
            // https://webpack.js.org/configuration/output/#output-publicpath
            // Absolute to WebApp's URL is used since base path has been removed for enabling id-related anchor tag link.
        },
        module: {
            rules: [
                // These rules specify how modules should be made. https://webpack.js.org/configuration/module/#rule
                {
                    test: /\.tsx?$/, // This test indicates given regex should be matched to use this rule. https://webpack.js.org/configuration/module/#condition
                    use: 'ts-loader' // What loader should be used for matched files. https://webpack.js.org/configuration/module/#rule-use
                },
                // {
                //     include: path.join(__dirname, "./boot-client.tsx"), // This indicates files that should be included. IF directory is given, sub files, directories are selected. https://webpack.js.org/configuration/module/#condition
                //     use: 'awesome-typescript-loader?silent=true' // What loader should be used for matched files. https://webpack.js.org/configuration/module/#rule-use
                // },
                {
                    test: /\.(png|jpg|jpeg|gif|svg)$/,
                    use: 'url-loader?limit=25000'
                },
                {
                    test: /\.css$/,
                    use: [
                        {
                            loader: MiniCssExtractPlugin.loader,
                            // options: {
                            //     publicPath: path.join(__dirname, "..", "dist") // This defaults to webpackOptions.output.publicPath
                            // },
                        },
                        isDevBuild ? "css-loader" : "css-lodaer?minimize",
                    ],
                },
            ]
        },
        plugins: [ // Plugins that webpack should use when building modules. https://webpack.js.org/configuration/plugins/
            // new CheckerPlugin() / This plugin is for asynchronous error report. https://github.com/s-panferov/awesome-typescript-loader#configuration
            new ForkTsCheckerWebpackPlugin(), // This is for alternative to CheckPlugin via awesome-typescript-loader.
            new HtmlWebpackPlugin({
                filename: 'index.html',
                template: 'index.html',
            }), // This is for loading index.html file.
        ]
    });

    // -------------------------------------------------------------------------

    // Configuration for client-side bundle suitable for running in browsers
    const clientBundleOutputDir = '/';

    // Client bundle configuration is made by merging shared configuration and client specific configurations.
    const clientBundleConfig = merge(sharedConfig(), {
        mode: isDevBuild ? "development" : "production", // Needs to be set, unless you want to see webpack complaining fallback to "production".
        context: path.resolve(__dirname, "./src"),
        entry: { // The entry point for each module. https://webpack.js.org/concepts/entry-points/
            'main': './index.tsx' // The entry point for 'main-client' module.
        },
        module: {
            rules: [
                // Additional rules for this specific client.
                {
                    test: /\.js$/,
                    use: 'source-map-loader', // This source map loader is used to load prebuilt source maps from external codes.
                    include: /node_modules/ // So, this loader can load prebuilt source maps of libraries from node_modules by specifying this include.
                }
            ]
        },
        output: { // Output settings for bundles.
            // path: path.join(__dirname, "..", clientBundleOutputDir) // Path that bundles should be in.
            // publicPath: "/",
            // filename: "[name]_[chunkhash].js",
        },
        plugins: [ // Plugins that webpack should use when building modules. https://webpack.js.org/configuration/plugins/
            new MiniCssExtractPlugin({
                filename: "site.css"
            }), // CSS extraction plugin. Result goes to 'site.css' file. https://github.com/webpack-contrib/mini-css-extract-plugin
        ].concat(isDevBuild ? [
            // Plugins that apply in development builds only
            new webpack.SourceMapDevToolPlugin({ // Provides source map. https://webpack.js.org/plugins/source-map-dev-tool-plugin/

                filename: '[file].map', // Remove this line if you prefer inline source maps
                moduleFilenameTemplate: path.relative(path.join("..", clientBundleOutputDir), '[resourcePath]') // Point sourcemap entries to the original file locations on disk

            }),
        ] : [
                // Plugins that apply in production builds only
                // new webpack.optimize.UglifyJsPlugin() // Uglifies javascript files.
            ])
    });

    // ------------------------------------------------------------------------

    return clientBundleConfig;
};
