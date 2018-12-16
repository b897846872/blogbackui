import Vue from 'vue'
import Router from 'vue-router'
import Layout from '@/components/layout.vue'
import Login from '@/components/login.vue'
import Dic from '@/components/sysManage/sysDic.vue'
import Log from '@/components/sysManage/sysLog.vue'
import Config from '@/components/sysManage/sysConfig.vue'
import User from '@/components/sysManage/sysUser.vue'
import UserInfo from '@/components/sysManage/userInfo.vue'
import SysMenu from '@/components/sysManage/sysMenu.vue'
import Role from '@/components/sysManage/sysRole.vue'
import Articlelist from '@/components/contentManage/content/articlelist.vue'
import ArticleAdd from '@/components/contentManage/content/articleAdd.vue'
import Essaylist from '@/components/contentManage/content/essaylist.vue'
import EssayAdd from '@/components/contentManage/content/essayAdd.vue'
import Albumlist from '@/components/contentManage/content/albumlist.vue'
import AlbumAdd from '@/components/contentManage/content/albumAdd.vue'
import Resourcelist from '@/components/contentManage/content/resourcelist.vue'
import ResourceAdd from '@/components/contentManage/content/resourceAdd.vue'
import Comment from '@/components/contentManage/content/comment.vue'
import Category from '@/components/contentManage/category.vue'
import ViewPage from '@/components/contentManage/content/viewPage.vue'


Vue.use(Router)

var childrenRouter = [
  {
    path: '/',
    name: 'Articlelist',
    component: Articlelist
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
    path: 'UserInfo',
    name: 'UserInfo',
    component: UserInfo
  },
  {
    path: 'User',
    name: 'User',
    component: User
  },
  {
    path: 'Articlelist',
    name: 'Articlelist',
    component: Articlelist
  },
  {
    path: 'ArticleAdd',
    name: 'ArticleAdd',
    component: ArticleAdd
  },
  {
    path: 'Category',
    name: 'Category',
    component: Category
  },
  {
    path: 'Essaylist',
    name: 'Essaylist',
    component: Essaylist
  },
  {
    path: 'EssayAdd',
    name: 'EssayAdd',
    component: EssayAdd
  },
  {
    path: 'Albumlist',
    name: 'Albumlist',
    component: Albumlist
  },
  {
    path: 'AlbumAdd',
    name: 'AlbumAdd',
    component: AlbumAdd
  },
  {
    path: 'Resourcelist',
    name: 'Resourcelist',
    component: Resourcelist
  },
  {
    path: 'ResourceAdd',
    name: 'ResourceAdd',
    component: ResourceAdd
  },
  {
    path: 'Comment',
    name: 'Comment',
    component: Comment
  },
  {
    path: 'ViewPage',
    name: 'ViewPage',
    component: ViewPage
  },
  {
    path: 'SysMenu',
    name: 'SysMenu',
    component: SysMenu
  },
  {
    path: 'Role',
    name: 'Role',
    component: Role
  }
];
export default new Router({
  routes: [
    {
      path: '/',
      name: 'Login',
      component: Login
    },
    {
      path: '/layout',
      name: 'Layout',
      component: Layout,
      children: childrenRouter
    },
    
  ]
})
