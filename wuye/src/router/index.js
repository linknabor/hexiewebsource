import Vue from 'vue'
import Router from 'vue-router'
import Index from '@/pages/index'//入口

// 公共组件
import bill from '@/components/bill'
import footer from '@/components/footer'

import wuye from '@/pages/main/index'                       //物业首页
import suggest from '@/pages/suggest/suggest'                 //业主意见
import Paymentquery from '@/pages/paymentquery/paymentquery'  //已缴费查询

//绑定房子
import Myhouse from '@/pages/house/myhouse'
import AddHouse from '@/pages/house/add-house'
import BindHouse from '@/pages/house/bind-house'
import IdentHouse from '@/pages/house/identify-house'

//支付
import Pay from '@/pages/pay/pay'
import payStop from '@/pages/pay/pay-stop'
import checkPay from '@/pages/pay/check-pay'


Vue.use(Router)

const router= new Router({
    routes: [
        {
            path: '/',
            name: 'Index',
            component: Index,
            // children:[
            //   {path:'',component:footer},
            // ]
        },
          // {
          //   path:'',
          //   name:'wuye',
          //   component:wuye
          // },
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
            path:'/identHouse',
            name:'IdentHouse',
            component:IdentHouse,
            meta:{
              title:'绑定房子'
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
        },
        {
            path:'/paymentquery',
            name:'paymentquery',
            component:Paymentquery,
            meta: {
              title:'缴费查询'
            }
        },
        {
            path:'/checkPay',
            name:'checkPay',
            component:checkPay,
            meta:{
            title:'绑定房子'
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
