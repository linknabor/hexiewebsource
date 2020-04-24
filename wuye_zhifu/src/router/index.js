import Vue from 'vue'
import Router from 'vue-router'

//支付
// import PayDetail from '@/views/pay/pay-detail'
// import { resolve } from 'path';
Vue.use(Router)

const router= new Router({
  routes: [
    {
      path:'/',
      name:'payDetail',
      component:resolve=> require(['@/views/pay/pay-detail'],resolve),
      meta:{
        title:'缴费详情'
      },
    },  
    {
      path:'/payzhifu',
      name:'payzhifu',
      component:resolve=> require(['@/views/pay/pay-zhifu'],resolve),
      meta:{
        title:''
      },
    },
    {
      path:'/blank',
      name:'blank',
      component:resolve=> require(['@/views/pay/blank'],resolve),
      meta:{
        title:''
      },
    },
  ]
});
//路由的钩子函数，
//在每一次路由跳转之前会进入这个方法 to：到哪去  from：从哪来 next() 调用这个方法来完成这个钩子函数
router.beforeEach((to, from, next) => {
    //动态改变title
    changeTitle(to.meta.title)
    next();
});



//动态改变title
function changeTitle(title) {
    title = title ? title : Vue.prototype.common.newname;
    window.document.title = title;
};

export default router
