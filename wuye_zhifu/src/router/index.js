import Vue from 'vue'
import Router from 'vue-router'

import bill from '@/components/bill'


//支付
import PayDetail from '@/views/pay/pay-detail'
Vue.use(Router)

const router= new Router({
  routes: [
    {
      path:'/',
      name:'payDetail',
      component:PayDetail,
      meta:{
        title:'缴费详情'
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
    title = title ? title : '合协社区';
    window.document.title = title;
};

export default router
