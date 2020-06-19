import Vue from 'vue'
import Router from 'vue-router'
// import Orders from '@/pages/orders'
// import Orderdetail from '@/pages/orderdetail'
// import Onsaleorders from '@/pages/onsaleorders'
// import Logistice from '@/pages/logistice'
// import Comment from '@/pages/comment'
// import Grouporders from '@/pages/grouporders'
// import RepairPay from '@/pages/repairPay'
// import Commentxiu from '@/pages/commentxiu'
// import Homeorders from '@/pages/homeorders'
// import Homeorderdetail from '@/pages/homeorderdetail'

Vue.use(Router)

let router= new Router({
  // mode:'history',
  routes: [
    {
      path: '/orders',
      name: 'orders',
      component: resolve=>require(['@/pages/orders'],resolve),
      meta: {
        title:'商品订单'
      }
    },
    {
      path: '/orderdetail',
      name: 'orderdetail',
      component: resolve=>require(['@/pages/orderdetail'],resolve),
      meta: {
        title:'订单详情'
      }
    },
    {
      path: '/logistice',
      name: 'logistice',
      component: resolve=>require(['@/pages/logistice'],resolve),
      meta: {
        title:'物流信息'
      }
    },
    {
      path: '/onsaleorders',
      name: 'onsaleorders',
      component: resolve=>require(['@/pages/onsaleorders'],resolve),
      meta: {
        title:'商品订单'
      }
    },
    {
      path: '/comment',
      name: 'comment',
      component: resolve=>require(['@/pages/comment'],resolve),
      meta: {
        title:'评论'
      }
    },
    {
      path: '/grouporders',
      name: 'grouporders',
      component: resolve=>require(['@/pages/grouporders'],resolve),
      meta: {
        title:'团购订单'
      }
    },
    {
      path: '/repairPay',
      name: 'repairPay',
      component: resolve=>require(['@/pages/repairPay'],resolve),
    },
    {
      path: '/commentxiu',
      name: 'commentxiu',
      component:resolve=>require(['@/pages/commentxiu'],resolve),
    },
    {
      path: '/homeorders',
      name: 'homeorders',
      component:resolve=>require(['@/pages/homeorders'],resolve),
      meta: {
        title:'服务订单'
      }
    },
    {
      path: '/homeorderdetail',
      name: 'homeorderdetail',
      component:resolve=>require(['@/pages/homeorderdetail'],resolve),
      meta: {
        title:'预约成功'
      }
    },
    {
      path: '/kaitong',
      name: 'kaitong',
      component:resolve=>require(['@/pages/kaitong'],resolve),
      meta: {
        title:'会员中心'
      }

    },
    {
      path: '/detailspage',
      name: 'detailspage',
      component: resolve=>require(['@/pages/service/detailspage'],resolve),
      meta:{
        title:'服务'
      }
    },
    {
      path: '/singlepage',
      name: 'singlepage',
      component: resolve=>require(['@/pages/service/singlepage'],resolve),
      meta:{
        title:'服务'
      }
    },
    {
      path: '/payment',
      name: 'payment',
      component:resolve=>require(['@/pages/service/payment'],resolve),
      meta:{
        title:'社区'
      }
    },
    {
      path: '/appraise',
      name: 'appraise',
      component:resolve=>require(['@/pages/service/appraise'],resolve),
      meta:{
        title:''
      }
    },
    {
      path: '/checkoutsuccess',
      name: 'checkoutsuccess',
      component:resolve=>require(['@/pages/service/checkoutsuccess'],resolve) ,
      meta:{
        title:''
      }
    },
    

  ]
})

////路由的钩子函数，
//在每一次路由跳转之前会进入这个方法 to：到哪去  from：从哪来 next() 调用这个方法来完成这个钩子函数
router.beforeEach((to,from, next) => {
  var flag;
  if(to.matched[0].name != "index"&& to.matched[0].name!='register') {
     flag=common.checkRegisterStatus()
     if(!flag) {
       return
     }
  }
  //动态改变title
  changeTitle(to.meta.title);
  next();
});

//动态改变title
function changeTitle(title) {
  title = title ? title : Vue.prototype.common.newname;
  window.document.title = title;
};


export default router