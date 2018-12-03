import Vue from 'vue'
import Router from 'vue-router'
import Diclist from '@/components/sysDic/sysDiclist.vue'
import Loglist from '@/components/sysLog/sysLoglist.vue'
import Layout from '@/components/layout.vue'

Vue.use(Router)

var childrenRouter = [
  {
    path: '/',
    name: 'Diclist',
    component: Diclist
  },
  {
    path: 'Loglist',
    name: 'Loglist',
    component: Loglist
  },
  {
    path: 'Diclist',
    name: 'Diclist',
    component: Diclist
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
