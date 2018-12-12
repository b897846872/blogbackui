// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import VueResource from 'vue-resource'
import iView from 'iview';
import 'iview/dist/styles/iview.css'
import tinymce from 'tinymce/tinymce'
import 'tinymce/themes/modern/theme'
import Editor from '@tinymce/tinymce-vue'
import global_ from './components/global.vue'//引用文件
import './assets/css/global.css'

//全局变量
Vue.prototype.GLOBAL = global_//挂载到Vue实例上面
Vue.use(iView);
Vue.config.productionTip = false
// ajax
Vue.use(VueResource)
// 注册组件tinymce 富文本编辑器
Vue.component('Editor', Editor)
/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
})

// 加载组件。。。
router.beforeEach((to, from, next) => {
  iView.LoadingBar.start();
  next();
});

router.afterEach(route => {
  iView.LoadingBar.finish();
});

/**
 * 日期格式化
 */
Date.prototype.toLocaleString = function () {
  return `${this.getFullYear()}-${this.getMonth() + 1 >= 10 ? (this.getMonth() + 1) : '0' + (this.getMonth() + 1)}-
          ${this.getDate() >= 10 ? this.getDate() : '0' + this.getDate()}
          ${this.getHours() >= 10 ? this.getHours() : '0' + this.getHours()} : 
          ${this.getMinutes()>=10?this.getMinutes():'0'+this.getMinutes()} : 
          ${this.getSeconds() >= 10 ? this.getSeconds() : '0' + this.getSeconds()}`;
};
Vue.prototype.getNowFormatDate = function() {
  var date = new Date();
  var seperator1 = "-";
  var year = date.getFullYear();
  var month = date.getMonth() + 1;
  var strDate = date.getDate();
  if (month >= 1 && month <= 9) {
    month = "0" + month;
  }
  if (strDate >= 0 && strDate <= 9) {
    strDate = "0" + strDate;
  }
  var currentdate = year + seperator1 + month + seperator1 + strDate;
  return currentdate;
};