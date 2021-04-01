import Vue from 'vue'
import App from './App.vue'
import router from './router'

// import Vconsole from 'vconsole';
// Vue.prototype.$vConsole = new Vconsole();

Vue.prototype.testMode = false

Vue.config.productionTip = false
Vue.config.ignoredElements = ['wx-open-subscribe'];

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
