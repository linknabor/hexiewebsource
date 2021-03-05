import Vue from 'vue'
import VueRouter from 'vue-router'
import index from '@/views/index.vue'
import SubscribeSetting from '@/views/SubscribeSetting.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'index',
    component: index,
    meta: {
      title: '个人中心'
    }
  },
  {
    path: '/subscribeSetting',
    name: 'subscribeSetting',
    component: SubscribeSetting,
    meta: {
      title: '订阅设置'
    }
  }

  // {
  //   path: '/about',
  //   name: 'About',
  //   // route level code-splitting
  //   // this generates a separate chunk (about.[hash].js) for this route
  //   // which is lazy-loaded when the route is visited.
  //   component: () => import(/* webpackChunkName: "about" */ '../views/About.vue')
  // }
]

const router = new VueRouter({
  routes
})

//主要代码
router.beforeEach((to, from, next) => {
  /* 路由发生变化修改页面title */
  if (to.meta.title) {
    document.title = to.meta.title;
  }
  next();
})

export default router
