// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'


import axios from 'axios';
import VueAxios from 'vue-axios';


//引入一些初始化css 
import './assets/css/base.css'
import './assets/css/normalize.css'
import './assets/js/rem';

import Mint from 'mint-ui';
import 'mint-ui/lib/style.css';
Vue.use(Mint);

import cookie from 'js-cookie'

//本地使用
// import {common,MasterConfig,getUrlParam} from './assets/js/common';
Vue.prototype.common=common;
Vue.prototype.getUrlParam = getUrlParam;
Vue.prototype.baseUrl=MasterConfig.C('baseUrl');
Vue.prototype.basePageUrl=MasterConfig.C('basePageUrl');
Vue.prototype.basePageUrlpay=MasterConfig.C('basePageUrlpay');

import receiveData from './assets/js/receiveData'
Vue.prototype.receiveData=receiveData

//创建axios
var axiosInstance = axios.create({
  transformRequest: [function (data) {
      //data = Qs.stringify(data);
      data = JSON.stringify(data);
      return data;
  }],
  headers: {
      'Content-Type': 'application/x-www-form-urlencoded;charset=utf-8',
      // 'Content-Type':'application/json;charset=utf-8',
      'Content-Type':"application/json",

      // 'Accept': '*/*',
      'Accept': 'application/json',

  },
  // baseURL: "/api",
  baseURL: Vue.prototype.baseUrl,
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

      // config.headers.Authorization = // token
      //     `${ Cookies.get('yesmywine_mall$token_type') } ${ Cookies.get('yesmywine_mall$token') }`
       // 不添加 return config 不会执行http请求
       return config
  },
  err => {
      return Promise.reject(err)
  }
)

Vue.use(VueAxios, axiosInstance);

Vue.config.productionTip = false
Vue.config.debug=true;
/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
})
