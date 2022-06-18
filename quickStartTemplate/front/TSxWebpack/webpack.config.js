const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');


module.exports = {

    entry: "./src/index.ts",
    output: {
        path: path.resolve(__dirname, "dist"),
        filename: "bundle.js",

        //箭头函数
        // environment: {
        //     arrowFunction: false,
        // }
    },

    module: {
        rules: [{
            test: /\.ts$/,
            use: [{
                loader: 'babel-loader',
                options: {
                    presets: [
                        ["@babel/preset-env", {
                            targets: {
                                // 兼容目标浏览器
                                "chrome": "58",
                                "ie": "11"
                            },
                            "corejs": "3",
                            "useBuiltIns": "usage"
                        }]
                    ]
                }
            }, 'ts-loader'],
            exclude: /node-modules/,
        }]
    }, // mode: "development",
    mode: "production",
    plugins: [ // =liveServer
        // new HtmlWebpackPlugin({ title: "嗨害嗨" }),
        new CleanWebpackPlugin(), new HtmlWebpackPlugin({
            template: "./src/index.html",
        }),

    ],
    resolve: {
        extensions: ['.ts', '.js']
    },
}