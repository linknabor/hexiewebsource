// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
/*自己添加的开始  引入mint-ui 和 axios*/
import Mint from 'mint-ui';
import 'mint-ui/lib/style.css';
Vue.use(Mint);

import { Popup as vPopup, Button as vButton} from 'vant';
Vue.use(vPopup);
Vue.use(vButton);

import axios from 'axios';
import VueAxios from 'vue-axios';
//引入一些初始化css 
import './assets/css/base.css';
import './assets/css/normalize.css'
import './assets/js/rem';
import cookie from 'js-cookie';
import './assets/download/font_954185_gwiryn5z3ch/iconfont.css';


// import {common,MasterConfig,getUrlParam,dealWithAjaxData} from './api/common';

Vue.prototype.common=common;
Vue.prototype.masterConfig = MasterConfig;
Vue.prototype.getUrlParam=getUrlParam;
Vue.prototype.baseUrl=MasterConfig.C('baseUrl');
Vue.prototype.basePageUrl=MasterConfig.C('basePageUrl');
Vue.prototype.basePageUrlpay=MasterConfig.C('basePageUrlpay');
Vue.prototype.dealWithAjaxData=dealWithAjaxData;

Vue.prototype.testMode = false
//import Vconsole from 'vconsole';
//Vue.prototype.$vConsole = new Vconsole();


import receiveData from './api/receiveData'
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

      //  "Content-Type": "multipart/form-data",
      'Accept': 'application/json;text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3',

  },
  baseURL: Vue.prototype.baseUrl,
  // baseURL:'/api',
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


Vue.config.productionTip = false;
Vue.config.debug = true;
Vue.config.ignoredElements = ['wx-open-subscribe'];

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
})

