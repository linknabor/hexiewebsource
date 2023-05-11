import Vue from 'vue'
import VueRouter from 'vue-router'

const router= new VueRouter({
    //路由
    routes: [
        {
            path: '/',
            name: 'index',
            component: resolve=>require(['@/pages/index'],resolve)
        },
        {
            path: '/version2',
            name: 'version2',
            component: resolve=>require(['@/pages/main/Version2'],resolve)
        },
        {
          path: '/version3',
          name: 'version3',
          component: resolve=>require(['@/pages/main/Version3'],resolve)
        },
        {
          path: '/huihong',
          name: 'huihong',
          component: resolve=>require(['@/pages/main/HuiHongIndex'],resolve)
        },
        {
          path: '/wangdu',
          name: 'wangdu',
          component: resolve=>require(['@/pages/main/WangDuIndex'],resolve)
        },
        {
            path:'/message',
            name:'message',
            component:resolve=> require(['@/pages/main/message'],resolve)
        },
        {
          path:'/section',
          name:'section',
          component:resolve=> require(['@/pages/main/section'],resolve)
        },
        {
            path:'/Myhouse',
            name:'Myhouse',
            component: resolve=> require(['@/pages/house/myhouse'],resolve),
            meta:{
              title:'我的房屋'
            }
        },
        //绑定房屋首页
        {
            path:'/identHouse',
            name:'IdentHouse',
            component:resolve=> require(['@/pages/house/identify-house'],resolve),
            meta:{
              title:'绑定房屋'
            }
        },
        //对账单绑定房屋
        {
            path:'/addHouse',
            name:'AddHouse',
            component:resolve=> require(['@/pages/house/add-house'],resolve),
            meta:{
              title:'添加房屋'
            }
        },
        {
            path:'/bindHouse/:number',
            name:'BindHouse',
            component:resolve=> require(['@/pages/house/bind-house'],resolve),
            meta:{
              title:'绑定房屋'
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
              title:'绑定房屋'
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
      //新的业主意见 start
      {
        path:'/opinionList',
        name:'opinionList',
        component:resolve=> require(['@/pages/opinion/opinionList'], resolve),
        meta:{
          title:'我的意见'
        }
      },

      {
        path:'/addOpinion',
        name:'addOpinion',
        component:resolve=> require(['@/pages/opinion/addOpinion'], resolve),
        meta:{
          title:'我的意见'
        }
      },

      {
        path:'/opinionDetail',
        name:'opinionDetail',
        component:resolve=> require(['@/pages/opinion/opinionDetail'], resolve),
        meta:{
          title:'我的意见'
        }
      },
      //新的业主意见 end
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
      {
            path:'/catalog',
            name:'catalogs',
            component:resolve=> require(['@/pages/epidemic/catalog'],resolve),
            meta:{
              title:''
            }
      },
      {
            path:'/registration',
            name:'registrations',
            component:resolve=> require(['@/pages/epidemic/registration'],resolve),
            meta:{
              title:''
            }
      },
      {
            path:'/mask',
            name:'masks',
            component:resolve=> require(['@/pages/epidemic/mask'],resolve),
            meta:{
              title:'口罩登记预约'
            },
      },
      {
            path:'/delivery',
            name:'deliverys',
            component:resolve=> require(['@/pages/epidemic/delivery'],resolve),
            meta:{
              title:'到货通知'
            }
      },
      //通知
      {
            path:'/notification',
            name:'notificatios',
            component:resolve=> require(['@/pages/epidemic/notification'],resolve),
            meta:{
              title:''
            }
      },
      //工单
      {
        path:'/workOrder',
        name:'workOrder',
        component:resolve=> require(['@/pages/workorder/WorkOrder'],resolve),
        meta:{
          title:'物业报修'
        }
      },
      {
        path:'/workOrderList',
        name:'workOrderList',
        component:resolve=> require(['@/pages/workorder/OrderList'],resolve),
        meta:{
          title:'维修订单'
        }
      },
      {
        path:'/workOrderDetail',
        name:'workOrderDetail',
        component:resolve=> require(['@/pages/workorder/OrderDetail'],resolve),
        meta:{
          title:'维修订单明细'
        }
      },
      {
        path:'/invoice',
        name:'invoice',
        component:resolve=> require(['@/pages/invoice/InvoiceList'],resolve),
        meta:{
          title:'我的发票'
        }
      },
      {
        path:'/receipt',
        name:'receipt',
        component:resolve=> require(['@/pages/receipt/Receipt'],resolve),
        meta:{
          title:'电子收据'
        }
      },
      {
        path:'/myReceipt',
        name:'myReceipt',
        component:resolve=> require(['@/pages/receipt/receiptList'],resolve),
        meta:{
          title:'我的收据'
        }
      },
    ]
});

const viewArray = ['index', 'register', 'sms_notification', 'version2', 'version3','huihong', 'receipt', 'wangdu']
//路由的钩子函数，
//在每一次路由跳转之前会进入这个方法 to：到哪去  from：从哪来 next() 调用这个方法来完成这个钩子函数
router.beforeEach((to, from, next) => {
  let pageName = to.matched[0].name
  if(viewArray.indexOf(pageName)===-1){
    if(!common.checkRegisterStatus()){
      return
  	}
  }
  let version = ''
  if('index'===pageName){
    let config = Vue.prototype.is_config
    let getUrlParam = Vue.prototype.getUrlParam
    let appid = getUrlParam('oriApp')
    let kyappid = config.C('kyappid')   //昆亿乐居
    let dcappid = config.C('dcappid')   //东辰物业
    let nbappid = config.C('nbappid')   //测试用
    let ccappid = config.C('ccappid')   //春川
    let hhappid = config.C('hhappid')   //汇宏
    let wdappid = config.C('wdappids')   //旺度

    console.log('router, oriApp : ' + appid)
    if(appid!==kyappid && appid!==dcappid && appid!==nbappid){
      version = 'version2'
    }
    if(appid===ccappid) {
      version = 'version3'
    }
    if(appid===hhappid) {
      version = 'huihong'
    }
    if(wdappid && wdappid.length > 0) {
      if(wdappid.includes(appid)) {
        version = 'wangdu'
      }
    }
  }
  //动态改变title
  changeTitle(to.meta.title)
  if(version){
    next({
      path: '/'+version //不是以上3个公众号的，劫持后跳到新首页
    })
  } else {
    next()
  }


})
Vue.use(VueRouter)


//动态改变title
function changeTitle(title) {
    title = title ? title : Vue.prototype.common.newname;
    window.document.title = title;
}

export default router
