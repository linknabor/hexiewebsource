// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.

import Vue from 'vue'
import App from './App'
import router from './router'

import 'babel-polyfill'
require('es6-promise').polyfill();
require('es6-promise/auto');
// import Es6Promise from 'es6-promise'
// Es6Promise.polyfill()


/*自己添加的开始  引入mint-ui 和 axios*/
import MintUI from 'mint-ui'
import 'mint-ui/lib/style.css'
Vue.use(MintUI)

import { Popup } from 'vant';
Vue.use(Popup);

import $ from 'jquery'
import axios from 'axios';
import cookie from 'js-cookie'

import VueAxios from 'vue-axios';


import './assets/css/base.css'
import './assets/css/normalize.css'
import './assets/js/rem.js'
import './assets/font-icon/font_a2awfrh3fuq/iconfont.css'
import './assets/font-icon/font_954185_v0okajshs8/iconfont.css'

import receiveData from './assets/js/receiveData'
Vue.prototype.receiveData = receiveData;

//本地用
// import {common,MasterConfig,getUrlParam,dealWithAjaxData} from './assets/js/common';

Vue.prototype.common = common;
Vue.prototype.is_config = MasterConfig;
Vue.prototype.baseUrl = MasterConfig.C('baseUrl');
Vue.prototype.basePageUrl = MasterConfig.C('basePageUrl');
Vue.prototype.basePageUrlpay = MasterConfig.C('basePageUrlpay');
Vue.prototype.basedhzj3Url = MasterConfig.C('basedhzj3Url');
Vue.prototype.getUrlParam = getUrlParam;
Vue.prototype.dealWithAjaxData = dealWithAjaxData;

import Vconsole from 'vconsole';
Vue.prototype.$vConsole = new Vconsole();

//创建axios 实例
Vue.prototype.$axios = axios;

var axiosInstance = axios.create({
    transformRequest: [function (data) {
        //data = Qs.stringify(data);
        data = JSON.stringify(data);
        return data;
    }],
    headers: {
        //'Content-Type': 'application/x-www-form-urlencoded',
        //'Content-Type':'application/json;charset=utf-8',
        'Content-Type':"application/json",

        //'Accept': '*/*',
        'Accept': 'application/json',

    },
    baseURL:Vue.prototype.baseUrl,
    // baseURL:'http://192.168.1.185:86',
   
    withCredentials:true,
    transformResponse: [function (data) {//数据转换
      return data;
    }],
});
//创建axios拦截器 给请求头加cookie

axiosInstance.interceptors.request.use(
    config => {
        if( !cookie.get('session')){//没有seesion 判断  暂时跳过直接在首页就存seesion
          
        }else{//在请求头加 session
            config.headers.Cookie =`${ cookie.get('Cookie') }`
        }
        return config
    },
    err => {
        return Promise.reject(err)
    }
)

Vue.use(VueAxios, axiosInstance);


//生产环境提示
Vue.config.productionTip = false
// 开启debug模式
Vue.config.debug = true;
//忽略标签
Vue.config.ignoredElements = ['wx-open-subscribe']

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  template: '<App/>',
  components: { App }
})
