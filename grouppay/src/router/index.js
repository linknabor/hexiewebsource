import Vue from 'vue'
import Router from 'vue-router'
// import Mulybuy from '@/page/mulybuy'
// import Sgrouprule from '@/page/sgrouprule'
// import Buy from '@/page/buy'
// import Success from '@/page/success'
Vue.use(Router)

var router= new Router({
  routes: [
    {
      path: '/buy',
      name: 'buy',
      component: resolve=>require(['@/page/buy'],resolve),
      meta: {
        title:''
      }
    },
    {
      path: '/',
      name: 'mulybuy',
      component: resolve=>require(['@/page/mulybuy'],resolve),
      meta: {
        title:''
      }
    },
    {
      path: '/sgrouprule',
      name: 'sgrouprule',
      component: resolve=>require(['@/page/sgrouprule'],resolve),
      meta: {
        title:'团购规则'
      }
    },
    {
      path: '/success',
      name: 'success',
      component: resolve=>require(['@/page/success'],resolve),
      meta: {
        title:''
      }
    },
    {
      path:'/cardrollbuy',
      name:'cardrollbuy',
      component:resolve=>require(['@/page/cardroll/cardrollbuy'],resolve),
      meta:{
        title:'优惠'
      }
    },
    {
      path:'/cardrollsuccess',
      name:'cardrollsuccess',
      component:resolve=> require(['@/page/cardroll/cardrollsuccess'],resolve),
      meta:{
        title:'优惠'
      }
    },
    {
      path:'/salespage',
      name:'salespage',
      component:resolve=>require(['@/page/cardroll/salespage'],resolve),
      meta:{
        title:'招募社区合伙人'
      }
    },
    {
      path:'/salessuccess',
      name:'salessuccess',
      component:resolve=>require(['@/page/cardroll/salessuccess'],resolve),
      meta:{
        title:'欢迎加入'
      }
    },
    // {
    //   path:'/conventions',
    //   name:'conventions',
    //   component:resolve=>require(['@/page/cardroll/conventions'],resolve),
    //   meta:{
    //     title:''
    //   }
    // },
    { 
      path:'/confirmation',
      name:'confirmation',
      component:resolve=>require(['@/page/purchase/confirmation'],resolve),
      meta:{
        title:'确定订单'
      }
    },
  ]
})

////路由的钩子函数，
//在每一次路由跳转之前会进入这个方法 to：到哪去  from：从哪来 next() 调用这个方法来完成这个钩子函数
router.beforeEach((to, from, next) => {
  //动态改变title
  var flag;
  if(to.matched[0].name != "index"&& to.matched[0].name!='register'&& to.matched[0].name!='salespage'&& to.matched[0].name!='salessuccess'&& to.matched[0].name!='conventions') {
     flag= common.checkRegisterStatus()
      if(!flag) {
          return
      }
    }
  changeTitle(to.meta.title);
  next();
});

//动态改变title
function changeTitle(title) {
  title = title ? title : Vue.prototype.common.newname;
  window.document.title = title;
};


export default router