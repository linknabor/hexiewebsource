import Vue from 'vue'
import Router from 'vue-router'
// import Index from '@/pages/index'
// import index from '@/pages/index/index'//首页
// import Bindphone from '@/pages/bindphone'//个人信息
// import Register from '@/pages/register'//手机注册页
// import Coupons from '@/pages/coupons'//我的优惠券
// import Myrepair from '@/pages/myRepair/myrepair'//我的维修
// import OrdersDetail from '@/pages/myRepair/ordersDetail'//维修详情
// import cancelOrders from '@/pages/myRepair/cancelOrders'//取消维修
// import OperatorOrders from '@/pages/myRepair/operatorOrders'//我的维修单
// import OperatorOrdersDetail from '@/pages/myRepair/operatorOrdersDetail'//我的维修我要抢单
// import OperatorRepairSuccess from '@/pages/myRepair/operatorRepairSuccess'//我要抢单 公共页面
// import Notices from '@/pages/notices'//我的消息
// import MyPublish from '@/pages/communities/myPublish'//我的发布
// import ThreadDetail from '@/pages/communities/threadDetail'//发布回复
// import Addresses from '@/pages/addresses'//常用地址
// import Abort from '@/pages/abort'//关注我们

Vue.use(Router)

let router= new Router({
  // mode:'history',
  routes: [
    {
      path: '/',
      name: 'index',
      component: resolve=> require(['@/pages/index'],resolve),
      children:[
        {path:'',component:resolve=>require(['@/pages/index/index'],resolve),
        meta: {
          title:'个人中心'
        }}
      ]
    },
    {
      path:'/register',
      name:'register',
      component: resolve=>require(['@/pages/register'],resolve),
      meta: {
        title:'用户注册'
      }
    },
    {
      path:'/bindphone',
      name:'bindphone',
      component:resolve=> require(['@/pages/bindphone'],resolve),
      meta: {
        title:'编辑个人信息'
      }
    },
    {
      path:'/coupons',
      name:'coupons',
      component:resolve=> require(['@/pages/coupons'],resolve),
      meta:{
        title:'我的现金券'
      }
    }, 
    {
      path:'/myrepair',
      name:'myrepair',
      component:resolve=> require(['@/pages/myRepair/myrepair'],resolve),
      meta: {
        title:'我的维修'
      }
    },
    {
      path:'/ordersDetail',
      name:'ordersDetail',
      component:resolve=> require(['@/pages/myRepair/ordersDetail'],resolve),
      meta: {
        title:'维修详情'
      }
    },
    {
      path:'/cancelorders',
      name:'cancelorders',
      component:resolve=> require(['@/pages/myRepair/cancelOrders'],resolve),
      meta: {
        title:'取消维修'
      }
    },
    {
      path:'/notices',
      name:'notices',
      component:resolve=> require(['@/pages/notices'],resolve),
      meta: {
        title:'我的消息'
      }
    },
    {
      path:'/myPublish',
      name:'myPublish',
      component:resolve=> require(['@/pages/communities/myPublish'],resolve),
      meta: {
        title:'我的发布'
      }
    },
    {
      path:'/threadDetail',
      name:'threadDetail',
      component:resolve=> require(['@/pages/communities/threadDetail'],resolve),
     
    },
    {
      path:'/addresses',
      name:'addresses',
      component:resolve=> require(['@/pages/addresses'],resolve),
      meta:{
        title:'地址信息'
      }
    },
    {
      path:'/abort',
      name:'abort',
      component:resolve=> require(['@/pages/abort'],resolve),
      meta:{
        title:'关于我们'
      }
    },
    {
      path:'/operatorOrders',
      name:'operatorOrders',
      component:resolve=> require(['@/pages/myRepair/operatorOrders'],resolve),
      meta: {
        title:'我的维修单'
      }
    },
    {
      path:'/operatorOrdersDetail',
      name:'operatorOrdersDetail',
      component:resolve=> require(['@/pages/myRepair/operatorOrdersDetail'],resolve),
    
    },
    {
      path:'/operatorRepairSuccess',
      name:'operatorRepairSuccess',
      component:resolve=> require(['@/pages/myRepair/operatorRepairSuccess'],resolve),
    },
  ]
})

////路由的钩子函数，
//在每一次路由跳转之前会进入这个方法 to：到哪去  from：从哪来 next() 调用这个方法来完成这个钩子函数

router.beforeEach((to, from, next) => {
  //动态改变title
  var flag;
  if(to.matched[0].name != "index"&& to.matched[0].name!='register') {
     flag=common.checkRegisterStatus()
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
