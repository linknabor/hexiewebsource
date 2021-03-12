module.exports = {

    publicPath: './',
    outputDir: 'dist',
    assetsDir: 'static',

    devServer: {
        disableHostCheck: false,
        host: '127.0.0.1',
        port: 80,
        https: false,
        hotOnly: true
    }
}