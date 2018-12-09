// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import VueResource from 'vue-resource'
import iView from 'iview';
import 'iview/dist/styles/iview.css'
import mavonEditor from 'mavon-editor'
import 'mavon-editor/dist/css/index.css'

Vue.use(iView);
Vue.use(mavonEditor)
Vue.config.productionTip = false
// ajax
Vue.use(VueResource)
/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
})

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