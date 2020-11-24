import Vue from 'vue'
import Router from 'vue-router'
// import Index from '@/pages/index'
// import index from '@/pages/index/index'//首页
// import Rgroupdetail from '@/pages/index/rgroupdetail'
// import Rgroupinvite from '@/pages/index/rgroupinvite'//规则
// import Sgrouprule from '@/pages/index/sgrouprule'//规则
// import Buy from '@/pages/index/buy'//支付
// import Success from '@/pages/index/success'//支付
// import Coupon from '@/pages/index/coupon'//支付
Vue.use(Router)

let router= new Router({
  // mode:'history',
  routes: [
    {
      path: '/couponadd',
      name: 'couponadd',
      component: resolve=> require(['@/pages/index/coupon'],resolve),
     
    },
    {
      path: '/',
      name: 'indesx',
      component: resolve=> require(['@/pages/index'],resolve),
      children:[
        {path:'',component:resolve=> require(['@/pages/index/index'],resolve),meta:{title:'社区团购'}}
      ]
    },
    {
      path:'/rgroupdetail',
      name:'rgroupdetail',
      component:resolve=> require(['@/pages/index/rgroupdetail'],resolve),
      meta:{
        title:''
      }
    },
    {
      path:'/rgroupinvite',
      name:'rgroupinvite',
      component:resolve=> require(['@/pages/index/rgroupinvite'],resolve),
      meta:{
        title:''
      }
    },
    {
      path:'/sgrouprule',
      name:'sgrouprule',
      component:resolve=> require(['@/pages/index/sgrouprule'],resolve),
      meta:{
        title:'团购规则'
      }
    },
    {
      path:'/buy',
      name:'buy',
      component:resolve=> require(['@/pages/index/buy'],resolve),
      meta:{
        title:''
      }
    },
    {
      path:'/success',
      name:'success',
      component:resolve=> require(['@/pages/index/success'],resolve),
      meta:{
        title:''
      }
    },
    {
      path:'/coupon',
      name:'coupon',
      component:resolve=> require(['@/components/coupon/coupon'],resolve),
      meta:{
        title:'优惠券'
      }
    },
  ]
})

////路由的钩子函数，
//在每一次路由跳转之前会进入这个方法 to：到哪去  from：从哪来 next() 调用这个方法来完成这个钩子函数
router.beforeEach((to, from, next) => {
  //动态改变title
  var flag;
  if(to.matched[0].name != "index"&& to.matched[0].name!='register') {
    // flag= common.checkRegisterStatus()
    //   if(!flag) {
    //     return
    //   }
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
