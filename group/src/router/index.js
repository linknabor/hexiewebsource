import Vue from 'vue'
import Router from 'vue-router'
// import Index from '@/pages/index'
// import index from '@/pages/index/index'//首页
// import Onsaledetail from '@/pages/index/onsaledetail'
// import Collocation from '@/pages/index/collocation'

Vue.use(Router)

let router= new Router({
  // mode:'history',
  routes: [
    { 
      path:'/',
      name:'index',
      component:resolve=>require(['@/pages/index/onsalesindex'],resolve),
      meta:{
        title:'社区集市'
      }
    },
    {
      path:'/onsales',
      name:'onsales',
      component:resolve=>require(['@/pages/index/onsales'],resolve),
      meta:{
          title:'社区集市'
          }
    },
    {
      path:'/onsalesitem',
      name:'onsalesitem',
      component:resolve=>require(['@/pages/index/onsalesitem'],resolve),
      meta:{
          title:'社区集市'
          }
      },
    {
      path: '/onsaledetail',
      name: 'onsaledetail',
      component: resolve=>require(['@/pages/index/onsaledetail'],resolve),
      meta:{
          title:''
      }
    },
    {
      path: '/collocation',
      name: 'collocation',
      component: resolve=>require(['@/pages/index/collocation'],resolve),
      meta:{
          title:''
      }  
    },
    {
      path:'/cardrollindex',
      name:'cardrollindex',
      component:resolve=>require(['@/pages/Cardroll/cardrollindex'],resolve),
      meta:{
        title:'优惠'
      }
    },
    {
      path:'/cardrolldetail',
      name:'cardrolldetail',
      component:resolve=>require(['@/pages/Cardroll/cardrolldetail'],resolve),
      meta:{
        title:'优惠'
      }
    }
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
