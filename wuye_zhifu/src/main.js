import Vue from 'vue'
import App from './App'
import router from './router'

/*自己添加的axios*/

import $$ from 'jquery'

import axios from 'axios';
//axios.defaults.withCredentials=true; //存储cookie？
import VueAxios from 'vue-axios';

import './assets/css/normalize.css'
import './assets/css/base.css'
import './assets/js/rem.js'
import cookie from 'js-cookie'

//本地用
// import {common,MasterConfig,getUrlParam,dealWithAjaxData} from './assets/js/common';

Vue.prototype.common = common;
Vue.prototype.getUrlParam = getUrlParam;
Vue.prototype.masterConfig = MasterConfig;
Vue.prototype.baseUrl = MasterConfig.C('baseUrl');
Vue.prototype.basePageUrl = MasterConfig.C('basePageUrl');
Vue.prototype.basePageUrlpay = MasterConfig.C('basePageUrlpay');
Vue.prototype.dealWithAjaxData = dealWithAjaxData;

import receiveData from './assets/js/receiveData'
Vue.prototype.receiveData = receiveData;

//创建axios 实例

var axiosInstance = axios.create({
    transformRequest: [function (data) {
        data = JSON.stringify(data);
        return data;
    }],
    headers: {
        'Content-Type':"application/json",
        'Accept': 'application/json',
    },
    baseURL:Vue.prototype.baseUrl,
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

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  template: '<App/>',
  components: { App }
})
