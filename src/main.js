// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'

/*自己添加的开始  引入mint-ui 和 axios*/
import MintUI from 'mint-ui'
import 'mint-ui/lib/style.css'

import Qs from 'qs';
import axios from 'axios';
import VueAxios from 'vue-axios';

import css from '../static/normalize.css'



Vue.use(MintUI)
//axios对象配置和申明
var axiosInstance = axios.create({
    transformRequest: [function (data) {
        data = Qs.stringify(data);
        return data;
    }],
    headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
        'Accept': '*/*',
    },
    baseURL: 'http://api.hzbuvi.com/paas',
    //baseURL: 'http://api.yesmywine.com/paas',
    responseType: 'json'
});
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
