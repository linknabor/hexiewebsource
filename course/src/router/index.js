import Vue from 'vue'
import Router from 'vue-router'
Vue.use(Router)

let router= new Router({
  // mode:'history',
  routes: [
    {
      path:'/course',
      name:'course',
      component:resolve=>require(['@/pages/cardroll/course'],resolve),
      meta:{
        title:''
      }
    },
    {
      path:'/process',
      name:'process',
      component:resolve=>require(['@/pages/cardroll/process'],resolve),
      meta:{
        title:''
      }
    },
    {
      path:'/videos',
      name:'videos',
      component:resolve=>require(['@/pages/cardroll/videos'],resolve),
      meta:{
        title:''
      }
    },
  ]
})

////路由的钩子函数，
//在每一次路由跳转之前会进入这个方法 to：到哪去  from：从哪来 next() 调用这个方法来完成这个钩子函数
router.beforeEach((to, from, next) => {
  //动态改变title
  var flag;
  // if(to.matched[0].name != "course"&& to.matched[0].name!='process'&& to.matched[0].name!='videos') {
      // flag=common.checkRegisterStatus()
      // if(!flag) {
      //   return
      // }
  // }
  changeTitle(to.meta.title);
  next();
});

//动态改变title
function changeTitle(title) {
  title = title ? title : Vue.prototype.common.newname;
  window.document.title = title;
};


export default router
