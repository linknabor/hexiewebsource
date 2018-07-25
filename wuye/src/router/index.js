import Vue from 'vue'
import Router from 'vue-router'
import Index from '@/pages/index'//首页

import wuye from '@/pages/index/index'//物业
import bill from '@/components/bill'
import suggest from '@/pages/suggest/suggest' //业主意见

//绑定房子
import Myhouse from '@/pages/house/myhouse'
import AddHouse from '@/pages/house/add-house'
import BindHouse from '@/pages/house/bind-house'

//支付
import Pay from '@/pages/pay/pay'
import payStop from '@/pages/pay/pay-stop'

Vue.use(Router)

const router= new Router({
  routes: [
    {
      path: '/',
      name: 'Index',
      component: Index,
  	  children:[
        {path:'',component:wuye},
      	// {path:'', component: Service },
        // {path:'', component: My },//默认暂时设为 我的房子
      	// {path:'service',component: Service},
      	// {path:'market',component:Market},
      	// {path:'community',component:Community},
   	  ]
    },
    {
      path:'',
      name:'wuye',
      component:wuye
    },
    {
      path:'/suggest',
      name:'suggest',
      component:suggest
    },
    {
      path:'/bill',
      name:'bill',
      component:bill
    },
    {
      path:'/Myhouse',
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
      path:'/Pay',
      name:'Pay',
      component:Pay,
      meta:{
        title:'缴费页面'
      }
    },
    {
      path:'/payStop',
      name:'payStop',
      component:payStop,
      meta:{
        title:'停车缴费'
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
    title = title ? title : '合协社区';
    window.document.title = title;
};

export default router
