"use strict";
module.exports = {
    //页面入口文件配置
    entry: './src/index.js',
    //入口文件输出配置
    output: {
        path: 'build',
        filename: 'crud.js'
    },
    stats: {
        colors: true,
        modules: true,
        reasons: true
    },
    module: {
        //加载器配置
        loaders: []
    }
};