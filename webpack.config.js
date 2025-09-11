const path = require('path');
const webpack = require('webpack');
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;

module.exports = {
    entry: [
        'core-js/stable', // Добавляем полифиллы в начало
        './index.js'
    ],
    output: {
        filename: 'clgb.js',
        path: path.resolve(__dirname, 'dist'),
        library: 'crossword_layout_generator_browserified',
        libraryTarget: 'var',
        globalObject: 'this'
    },
    mode: 'development',
    resolve: {
        fallback: {
            assert: false,
            process: require.resolve('process/browser')
        }
    },
    plugins: [
        new webpack.ProvidePlugin({
            process: 'process/browser',
        }),
        new BundleAnalyzerPlugin({
            analyzerMode: 'disabled',
            generateStatsFile: true,
            statsFilename: 'stats.json'
        }),
    ],
    module: {
        rules: [
            {
                test: /\.m?js$/,
                exclude: /node_modules/,
                use: {
                    loader: 'babel-loader',
                    options: {
                        presets: [
                            ['@babel/preset-env', {
                                targets: {
                                    browsers: ['last 2 versions', 'ie >= 11']
                                },
                                useBuiltIns: 'entry', // Используем entry вместо usage для надежности
                                corejs: 3,
                                modules: false // Важно: отключаем преобразование модулей для Webpack
                            }]
                        ],
                        plugins: [
                            ['@babel/plugin-transform-modules-commonjs'] // Явно преобразуем в CommonJS
                        ]
                    }
                }
            }
        ]
    },
};