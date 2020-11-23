import Vue from 'vue'
import Router from 'vue-router'
// import Baojie from '@/pages/baojie/baojie'//保洁 导航
// import Rchang from '@/pages/baojie/rchang'// 日常保洁
// import Border from '@/pages/baojie/border' //订单列表
// import Borderdetail from '@/pages/baojie/border-detail'//订单详情
// import Baojiepay from '@/pages/baojie/baojiepay'//保洁日常支付
// import Success from '@/pages/baojie/success'//预约成功

Vue.use(Router)

const router= new Router({
  routes: [
    {
      path:'/',
      name:'baojie',
      component:resolve=> require(['@/pages/baojie/baojie'],resolve),
      meta:{
        title:'保洁'
      }
    },
    {
      path:'/rchang',
      name:'rchang',
      component:resolve=> require(['@/pages/baojie/rchang'],resolve),
      meta:{
        title:'日常保洁'
      }
    },
    {
      path:'/Border',
      name:'border',
      component:resolve=> require(['@/pages/baojie/border'],resolve),
      meta:{
        title:'订单列表'
      }
    },
    {
      path:'/borderdetail',
      name:'borderdetail',
      component:resolve=> require(['@/pages/baojie/border-detail'],resolve),
      meta:{
        title:'订单详情'
      }
    },
    {
      path:'/baojiepay',
      name:'baojiepay',
      component:resolve=>require(['@/pages/baojie/baojiepay'],resolve),
      meta:{
        title:'保洁日常支付'
      }
    },
    {
      path:'/success',
      name:'success',
      component:resolve=> require(['@/pages/baojie/success'],resolve),
      meta:{
        title:'预约成功'
      }
    },

  ]
})

router.beforeEach((to, from, next) => {
  //动态改变title
  var flag;
  if(to.name != "index"&& to.name!='register') {
    //  flag=common.checkRegisterStatus()
    //  if(!flag) {
    //    return
    //  }
  }
  changeTitle(to.meta.title)
  next();
});
//动态改变title
function changeTitle(title) {
  title = title ? title :Vue.prototype.common.newname;
  window.document.title = title;
}
export default router