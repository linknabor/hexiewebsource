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
    },
    {
      path:'/salesdetail',
      name:'salesdetail',
      component:resolve=>require(['@/pages/Cardroll/salesdetail'],resolve),
      meta:{
        title:'招募社区合伙人'
      }
    },
    {
      path:'/salescoupon',
      name:'salescoupon',
      component:resolve=>require(['@/pages/cardroll/salescoupon'],resolve),
      meta:{
        title:''
      }
    },
    {
      path:'/salesnabo',
      name:'salesnabo',
      component:resolve=>require(['@/pages/cardroll/salesnabo'],resolve),
      meta:{
        title:''
      }
    },
    {
      path:'/salegoods',
      name:'salegoods',
      component:resolve=>require(['@/pages/cardroll/salegoods'],resolve),
      meta:{
        title:'合伙人专属福利'
      }
    },
    {
      path:'/newsaledetail',
      name:'newsaledetail',
      component:resolve=>require(['@/pages/cardroll/newsaledetail'],resolve),
      meta:{
        title:'合伙人专属福利'
      }
    },
    {
      path:'/sassuccess',
      name:'sassuccess',
      component:resolve=>require(['@/pages/cardroll/sassuccess'],resolve),
      meta:{
        title:'欢迎加入'
      }
    },
    {
      path:'/salespush',
      name:'salespush',
      component:resolve=>require(['@/pages/cardroll/salespush'],resolve),
      meta:{
        title:'招募社区合伙人'
      }
    },
    {
      path:'/customerservice',
      name:'customerservice',
      component:resolve =>require(['@/pages/cardroll/customerservice'],resolve),
      meta:{
        title:'欢迎加入'
      }
    },
    {
      path:'/salespush',
      name:'salespush',
      component:resolve=>require(['@/pages/cardroll/salespush'],resolve),
      meta:{
        title:'招募社区合伙人'
      }
    },
    { 
      path:'/classification',
      name:'classification',
      component:resolve=>require(['@/pages/purchase/classification'],resolve),
      meta:{
        title:'商城'
      }
    },
    { 
      path:'/commoditydetails',
      name:'commoditydetails',
      component:resolve=>require(['@/pages/purchase/commoditydetails'],resolve),
      meta:{
        title:'详情页'
      }
    },
    { 
      path:'/cart',
      name:'cart',
      component:resolve=>require(['@/pages/purchase/cart'],resolve),
      meta:{
        title:'购物车'
      }
    },
    { 
      path:'/cartsearch',
      name:'cartsearch',
      component:resolve=>require(['@/pages/purchase/cartsearch'],resolve),
      meta:{
        title:'商品'
      }
    },
  ]
})

////路由的钩子函数，
//在每一次路由跳转之前会进入这个方法 to：到哪去  from：从哪来 next() 调用这个方法来完成这个钩子函数
router.beforeEach((to, from, next) => {
  //动态改变title
  var flag;
  if(to.matched[0].name != "index"&& to.matched[0].name!='register'&& to.matched[0].name!='salesdetail'&&to.matched[0].name!='salescoupon'&& to.matched[0].name!='salesnabo'&& to.matched[0].name!='newsaledetail'&& to.matched[0].name!='salegoods'&& to.matched[0].name!='sassuccess'&& to.matched[0].name!='salespush'&& to.matched[0].name!='customerservice') {
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
