import Vue from 'vue'
import VueRouter from 'vue-router'

// import Index from '@/pages/index'//入口

// 公共组件
// import bill from '@/components/bill'
// import suggest from '@/pages/suggest/suggest'                 //业主意见
// import Paymentquery from '@/pages/paymentquery/paymentquery'  //已缴费查询
// import Message from '@/pages/main/message'
//绑定房子
// import Myhouse from '@/pages/house/myhouse'
// import AddHouse from '@/pages/house/add-house'
// import BindHouse from '@/pages/house/bind-house'
// import IdentHouse from '@/pages/house/identify-house'
//支付
// import Pay from '@/pages/pay/pay'
// import payStop from '@/pages/pay/pay-stop'
// import checkPay from '@/pages/pay/check-pay'



const router= new VueRouter({
    routes: [
        {
            path: '/',
            name: 'index',
            component: resolve=>require(['@/pages/index'],resolve)
        },
        {
            path:'/message',
            name:'message',
            component:resolve=> require(['@/pages/main/message'],resolve)
        },
        {
            path:'/suggest',
            name:'suggest',
            component:resolve=> require(['@/pages/suggest/suggest'],resolve)
        },
        {
            path:'/Myhouse',
            name:'Myhouse',
            component: resolve=> require(['@/pages/house/myhouse'],resolve),
            meta:{
              title:'我的房子'
            }
        },
        {
            path:'/identHouse',
            name:'IdentHouse',
            component:resolve=> require(['@/pages/house/identify-house'],resolve),
            meta:{
              title:'绑定房子'
            }
        },
        {
            path:'/addHouse',
            name:'AddHouse',
            component:resolve=> require(['@/pages/house/add-house'],resolve),
            meta:{
              title:'添加房子'
            }
        },
        {
            path:'/bindHouse/:number',
            name:'BindHouse',
            component:resolve=> require(['@/pages/house/bind-house'],resolve),
            meta:{
              title:'绑定房子'
            }
        },
        {
            path:'/Pay',
            name:'Pay',
            component:resolve=> require(['@/pages/pay/pay'],resolve),
            meta:{
              title:'缴费页面'
            }
        },
        {
            path:'/payStop',
            name:'payStop',
            component:resolve=>require(['@/pages/pay/pay-stop'],resolve),
            meta:{
              title:'停车缴费'
            }
        },
        //查找
        {
          path:'/fontUnit',
          name:'fontUnit',
          component:resolve=>require(['@/pages/pay/font-unit'],resolve),
          meta:{
            title:'查询缴费'
          }
      },
      {
        path:'/location',
        name:'location',
        component:resolve=>require(['@/pages/pay/location'],resolve),
        meta:{
          title:'查询缴费'
        }
    },
        {
            path:'/paymentquery',
            name:'paymentquery',
            component:resolve=> require(['@/pages/paymentquery/paymentquery'],resolve),
            meta: {
              title:'缴费查询'
            }
        },
        {
            path:'/checkPay',
            name:'checkPay',
            component:resolve=> require(['@/pages/pay/check-pay'],resolve),
            meta:{
            title:'绑定房子'
            }
       },
       {
        path:'/repair',
        name:'repair',
        component:resolve=> require(['@/pages/repair/repair'],resolve),
        meta:{
        title:''
        }
      }, 
      {
        path:'/submitSuccess',
        name:'submitSuccess',
        component:resolve=> require(['@/pages/repair/submitSuccess'],resolve),
        meta:{
        title:''
        }
      },
      {
        path:'/mysteward',
        name:'mysteward',
        component:resolve=> require(['@/pages/suggest/mysteward'],resolve),
        meta:{
        title:''
        }
      },
      {
        path:'/threadDetail',
        name:'threadDetail',
        component:resolve=> require(['@/pages/suggest/threadDetail'],resolve),
        meta:{
        title:''
        }
      },
      {
        path:'/maintain',
        name:'maintain',
        component:resolve=> require(['@/pages/suggest/maintain'],resolve),
        meta:{
        title:''
        }
      },
  
    ]
});
//路由的钩子函数，
//在每一次路由跳转之前会进入这个方法 to：到哪去  from：从哪来 next() 调用这个方法来完成这个钩子函数
router.beforeEach((to, from, next) => {
    var flag;
    if(to.matched[0].name != "index"&& to.matched[0].name!='register') {
      //  flag= common.checkRegisterStatus()
      //   if(!flag) {
      //       return
      //   }
      }
    //动态改变title
    changeTitle(to.meta.title)
    next();
});
Vue.use(VueRouter)


//动态改变title
function changeTitle(title) {
    title = title ? title : '合协社区';
    window.document.title = title;
};

export default router
