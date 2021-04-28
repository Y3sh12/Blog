const webpack = require("webpack");

module.exports = {
    chainWebpack: (config) => {
        config.plugin("provide").use(webpack.ProvidePlugin, [{
            $: "jquery",
            jquery: "jquery",
            jQuery: "jquery",
            "window.jQuery": "jquery",
        }, ]);
    },
    devServer: {
        port: 8848, // 默认端口号
        proxy: {
            '/api': {
                target: 'http://127.0.0.1:8080', // 接口域名
                changeOrigin: true, // 是否支持跨域
                ws: true, // 是否要开通链接websoket请求
                pathRewrite: {
                    '^/api': '', // 重写以"/api"开始的接口路径
                }
            }
        }
    }
};