import Vue from 'vue'
import Router from 'vue-router'
import Index from '@/views/index'//首页

import My from '@/components/my' //我的 
import Service from '@/components/service' //服务
import Market from '@/components/market' //集市
import Community from '@/components/community' //社区

import Myhouse from '@/views/my/myhouse'
import AddHouse from '@/views/my/addHouse'
import BindHouse from '@/views/my/bindHouse'

Vue.use(Router)

export default new Router({
  routes: [
    // {
    //   path: '/',
    //   name: 'Index',
    //   component: Index,
  	 //  children:[
    //   	//{path:'', component: Service },
    //     {path:'', component: Myhouse },//默认暂时设为 我的房子
    //   	{path:'service',component: Service},
    //   	{path:'market',component:Market},
    //   	{path:'community',component:Community},
    //   	{path:'my',component:My}
   	//   ]
    // },
    {
      path:'/',
      name:'Myhouse',
      component:Myhouse
    },
    {
    	path :'/my',
    	name : 'My',
    	component :My
    },
    {
      path:'/myhouse',
      name:'Myhouse',
      component: Myhouse
    },
    {
      path:'/addHouse',
      name:'AddHouse',
      component:AddHouse
    },
    {
      path:'/bindHouse/:number',
      name:'BindHouse',
      component:BindHouse
    }
  ]
})
