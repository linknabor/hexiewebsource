import Vue from 'vue'
import Router from 'vue-router'
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
    {
      path:'/welfare',
      name:'welfare',
      component:resolve=> require(['@/pages/welfare'],resolve),
      meta: {
        title:''
      }
    },
    {
      path:'/service',
      name:'service',
      component:resolve=> require(['@/pages/service/service'],resolve),
      meta: {
        title:'服务'
      }
    },
    {
      path:'/codeimg',
      name:'codeimg',
      component:resolve=> require(['@/pages/service/codeimg'],resolve),
      meta: {
        title:''
      }
    },
    {
      path:'/ordermation',
      name:'ordermation',
      component:resolve=> require(['@/pages/service/ordermation'],resolve),
      meta: {
        title:'订单信息'
      }
    },
    {
      path:'/canReceiveorders',
      name:'canReceiveorders',
      component:resolve=>require(['@/pages/service/CanReceiveOrders'],resolve),
      meta:{
        title:''
      }
    },
    {
      path:'/openServiceDetail',
      name:'openServiceDetail',
      component:resolve=>require(['@/pages/service/openServiceDetail'],resolve),
      meta:{
        title:''
      }
    },
    {
      path:'/openServicesuccess',
      name:'openServicesuccess',
      component:resolve=>require(['@/pages/service/openServicesuccess'],resolve),
      meta:{
        title:''
      }
    },
    {
      path:'/myservice',
      name:'myservice',
      component:resolve=>require(['@/pages/service/myservice'],resolve),
      meta:{
        title:'我的服务单'
      }
    },
    {
      path:'/myserviceDetail',
      name:'myserviceDetail',
      component:resolve=>require(['@/pages/service/myserviceDetail'],resolve),
      meta:{
        title:'订单详情'
      }
    },
    {
      path:'/cancelservice',
      name:'cancelservice',
      component:resolve=>require(['@/pages/service/cancelservice'],resolve),
      meta:{
        title:'取消订单'
      }
    },
    {
      path:'/cardrolldetail',
      name:'cardrolldetail',
      component:resolve => require(['@/pages/Cardroll/cardrollDetail'],resolve),
      meta:{
        title:'商品订单'
      }
    },
    {
      path:'/cardrollgoods',
      name:'cardrollgoods',
      component:resolve =>require(['@/pages/Cardroll/cardrollgoods'],resolve),
      meta:{
        title:'商品核销'
      }
    },
    {
      path:'/cardrollrecords',
      name:'cardrollrecords',
      component:resolve =>require(['@/pages/Cardroll/cardrollrecords'],resolve),
      meta:{
        title:'核销记录'
      }
    },
    {
      path:'/keyboard',
      name:'keyboard',
      component:resolve =>require(['@/pages/Cardroll/keyboard'],resolve),
      meta:{
        title:''
      }
    },
    {
      path:'/reset',
      name:'reset',
      component:resolve =>require(['@/pages/index/reset'],resolve),
      meta:{
        title:'重置密码'
      }
    },
  ]
})

////路由的钩子函数，
//在每一次路由跳转之前会进入这个方法 to：到哪去  from：从哪来 next() 调用这个方法来完成这个钩子函数

router.beforeEach((to, from, next) => {
  //动态改变title
  var flag;
  if(to.matched[0].name != "index"&& to.matched[0].name!='register'&&to.matched[0].name!='welfare'&&to.matched[0].name!='ageess'&&to.matched[0].name!='reset') {
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
