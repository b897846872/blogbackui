import Vue from 'vue'
import Router from 'vue-router'
import Dic from '@/components/sysDic.vue'
import Log from '@/components/sysLog.vue'
import Config from '@/components/sysConfig.vue'
import User from '@/components/sysUser.vue'
import Layout from '@/components/layout.vue'

Vue.use(Router)

var childrenRouter = [
  {
    path: '/',
    name: 'Dic',
    component: Dic
  },
  {
    path: 'Log',
    name: 'Log',
    component: Log
  },
  {
    path: 'Dic',
    name: 'Dic',
    component: Dic
  },
  {
    path: 'Config',
    name: 'Config',
    component: Config
  },
  {
    path: 'User',
    name: 'User',
    component: User
  },
];
export default new Router({
  routes: [
    {
      path: '/',
      name: 'Layout',
      component: Layout,
      children: childrenRouter
    }
  ]
})
