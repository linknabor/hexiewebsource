import Vue from 'vue'
import Router from 'vue-router'
import Index from '@/views/index'//首页

import My from '@/components/my' //我的 
import Service from '@/components/service' //服务
import Market from '@/components/market' //集市
import Community from '@/components/community' //社区
//绑定房子
import Myhouse from '@/views/my/myhouse'
import AddHouse from '@/views/my/add-house'
import BindHouse from '@/views/my/bind-house'

//支付
import Pay from '@/views/pay/pay'
import PayDetail from '@/views/pay/pay-detail'
import UptonList from '@/views/pay/upton-list'
Vue.use(Router)

const router= new Router({
  routes: [
    // {
    //   path: '/',
    //   name: 'Index',
    //   component: Index,
  	 //  children:[
    //   	//{path:'', component: Service },
    //     {path:'', component: My },//默认暂时设为 我的房子
    //   	{path:'service',component: Service},
    //   	{path:'market',component:Market},
    //   	{path:'community',component:Community},
   	//   ]
    // },

    // {
    //   path:'/',
    //   name:'Myhouse',
    //   component:Myhouse
    // },

    {
      path:'',
      name:'Pay',
      component:Pay
    },
    {
    	path :'/my',
    	name : 'My',
    	component :My,
      meta:{
        title:'我的房子'
      }
    },
    {
      path:'/myhouse',
      name:'Myhouse',
      component: Myhouse,
      meta:{
        title:'我的房子'
      }
    },
    {
      path:'/addHouse',
      name:'AddHouse',
      component:AddHouse,
      meta:{
        title:'添加房子'
      }
    },
    {
      path:'/bindHouse/:number',
      name:'BindHouse',
      component:BindHouse,
      meta:{
        title:'绑定房子'
      }
    },
    {
      path:'/pay',
      name:'Pay',
      component:Pay,
      meta:{
        title:'缴费页面'
      }
    },
    {
      path:'/payDetail/:bills/:stmtId/:totalPrice/:reduceMode',
      name:'payDetail',
      component:PayDetail,
      meta:{
        title:'缴费详情'
      },

    },
    {
      path:'/uptonList',
      name:'uptonList',
      component: UptonList,
      meta:{
        title :'优惠券'
      }
    }
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
    title = title ? title : '和协社区';
    window.document.title = title;
};

export default router
