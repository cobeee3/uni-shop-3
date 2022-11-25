
// #ifndef VUE3
import Vue from 'vue'
import App from './App'
import store from './store/store.js'
import { $http } from '@escook/request-miniprogram'

uni.$http = $http;
// $http.baseUrl = 'https://api-hmugo-web.itheima.net/api/public/v1/home/swiperdata'
$http.baseUrl = 'https://www.uinav.com'
uni.$showMsg = function(title="获取资源失败",duration=1500){
  uni.showToast({
    title,
    duration,
    icon:'none'
  })
}

$http.beforeRequest = function(options){
  console.log(options);
  console.log('options');
  uni.showLoading({
    title:'数据加载中...'
 });
 if(options.url.indexOf('/my') !==-1){
   options.header = {
     Authorization: store.state.m_user.token,
   }
 }
}
$http.afterRequest = function(){
 uni.hideLoading()
}
Vue.config.productionTip = false
App.mpType = 'app'

const app = new Vue({
    ...App,
    store
})
app.$mount()
// #endif

// #ifdef VUE3
import { createSSRApp } from 'vue'
import App from './App.vue'
export function createApp() {
  const app = createSSRApp(App)
  return {
    app
  }
}
// #endif