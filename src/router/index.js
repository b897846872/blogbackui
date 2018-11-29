import Vue from 'vue'
import Router from 'vue-router'
import HelloWorld from '@/components/HelloWorld'
import Diclist from '@/components/blogback/sysDic/sysDiclist.vue'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Diclist',
      component: Diclist
    },
  ]
})
