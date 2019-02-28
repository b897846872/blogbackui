import Category from '@/components/blogbackui/contentManage/category.vue';
import AlbumAdd from '@/components/blogbackui/contentManage/content/albumAdd.vue';
import Albumlist from '@/components/blogbackui/contentManage/content/albumlist.vue';
import ArticleAdd from '@/components/blogbackui/contentManage/content/articleAdd.vue';
import Articlelist from '@/components/blogbackui/contentManage/content/articlelist.vue';
import Comment from '@/components/blogbackui/contentManage/content/comment.vue';
import EssayAdd from '@/components/blogbackui/contentManage/content/essayAdd.vue';
import Essaylist from '@/components/blogbackui/contentManage/content/essaylist.vue';
import ResourceAdd from '@/components/blogbackui/contentManage/content/resourceAdd.vue';
import Resourcelist from '@/components/blogbackui/contentManage/content/resourcelist.vue';
import ViewPage from '@/components/blogbackui/contentManage/content/viewPage.vue';
import Layout from '@/components/blogbackui/layout.vue';
import Login from '@/components/blogbackui/login.vue';
import Config from '@/components/blogbackui/sysManage/sysConfig.vue';
import Dic from '@/components/blogbackui/sysManage/sysDic.vue';
import DicType from '@/components/blogbackui/sysManage/sysDicType.vue';
import Log from '@/components/blogbackui/sysManage/sysLog.vue';
import SysMenu from '@/components/blogbackui/sysManage/sysMenu.vue';
import Role from '@/components/blogbackui/sysManage/sysRole.vue';
import User from '@/components/blogbackui/sysManage/sysUser.vue';
import UserInfo from '@/components/blogbackui/sysManage/userInfo.vue';
import Welcome from '@/components/blogbackui/welcome.vue';
import LayoutFront from '@/components/blogfrontui/layout.vue';
import ViewPageFront from '@/components/blogfrontui/viewPage.vue';
import WelcomeFront from '@/components/blogfrontui/welcome.vue';
import ResultPage from '@/components/blogfrontui/resultPage.vue';
import Vue from 'vue';
import Router from 'vue-router';


Vue.use(Router)
var childrenRouter = [
  {
    path: '/',
    redirect: '/Welcome',
  },
  {
    path: '/Welcome',
    name: 'Welcome',
    component: Welcome
  },
  {
    path: '/Log',
    name: 'Log',
    component: Log
  },
  {
    path: '/Dic',
    name: 'Dic',
    component: Dic
  },
  {
    path: '/DicType',
    name: 'DicType',
    component: DicType
  },
  {
    path: '/Config',
    name: 'Config',
    component: Config
  },
  {
    path: '/UserInfo',
    name: 'UserInfo',
    component: UserInfo
  },
  {
    path: '/User',
    name: 'User',
    component: User
  },
  {
    path: '/Articlelist',
    name: 'Articlelist',
    component: Articlelist
  },
  {
    path: '/ArticleAdd',
    name: 'ArticleAdd',
    component: ArticleAdd
  },
  {
    path: '/Category',
    name: 'Category',
    component: Category
  },
  {
    path: '/Essaylist',
    name: 'Essaylist',
    component: Essaylist
  },
  {
    path: '/EssayAdd',
    name: 'EssayAdd',
    component: EssayAdd
  },
  {
    path: '/Albumlist',
    name: 'Albumlist',
    component: Albumlist
  },
  {
    path: '/AlbumAdd',
    name: 'AlbumAdd',
    component: AlbumAdd
  },
  {
    path: '/Resourcelist',
    name: 'Resourcelist',
    component: Resourcelist
  },
  {
    path: '/ResourceAdd',
    name: 'ResourceAdd',
    component: ResourceAdd
  },
  {
    path: '/Comment',
    name: 'Comment',
    component: Comment
  },
  {
    path: '/ViewPage',
    name: 'ViewPage',
    component: ViewPage
  },
  {
    path: '/SysMenu',
    name: 'SysMenu',
    component: SysMenu
  },
  {
    path: '/Role',
    name: 'Role',
    component: Role
  }
];
var childrenRouterFront = [
  {
    path: '/',
    redirect: '/WelcomeFront',
  },
  {
    path: '/WelcomeFront',
    name: 'WelcomeFront',
    component: WelcomeFront
  },
  {
    path: '/ViewPageFront',
    name: 'ViewPageFront',
    component: ViewPageFront
  },
  {
    path: '/ResultPage',
    name: 'ResultPage',
    component: ResultPage
  }
];
export default new Router({
  routes: [
    { 
      path: '/',
      component: LayoutFront,
      children: childrenRouterFront
    },
    { 
      path: '/admin',
      name: 'Login',
      component: Login,
    },
    {
      path: '/layout',
      component: Layout,
      children: childrenRouter
    },
    
  ]
})