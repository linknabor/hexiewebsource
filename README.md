# hexiewebsource

#每个模块如果需要使用vant-ui和最新的微信开放标签，需要各自安装以下插件，目前只有person和wuye已经装过。vconsole是线上调试用的,babel-plugin-import是自动引包用的
npm install weixin-js-sdk -S
npm i vant -S
npm i babel-plugin-import -D
npm install --save vconsole

#在main.js 微信开放标签使用，不然本地调试会报错
Vue.config.ignoredElements = ['wx-open-subscribe'];


#打包后日志
#/模块/build/webpack.prod.conf.js文件,搜索drop_debugger和drop_console，true表示不打印日志