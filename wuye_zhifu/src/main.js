import Vue from 'vue'
import App from './App'
import router from './router'

/*自己添加的开始  引入mint-ui 和 axios*/
import MintUI from 'mint-ui'
import 'mint-ui/lib/style.css'
import $ from 'jquery'

import Qs from 'qs';
import axios from 'axios';
//axios.defaults.withCredentials=true; //存储cookie？
import VueAxios from 'vue-axios';
import '../static/css/base.css'

// import '../static/css/normalize.css'
import '../static/js/rem.js'

import cookie from 'js-cookie'
import common from './common.js'
Vue.prototype.common = common;

import receiveData from './receiveData.js'
Vue.prototype.receiveData = receiveData;



let str = 'https://uat.e-shequ.com/weixin/';
Vue.prototype.str = str;

Vue.use(MintUI)
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
    baseURL: 'https://uat.e-shequ.com/wechat/hexie/wechat',
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
