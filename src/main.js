import Vue from 'vue'
import App from './App.vue'

Vue.config.productionTip = false

//3.导入全局样式
import './assets/base.scss'
//2.复制饿了么组件
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
// import App from './App.vue';
Vue.use(ElementUI);


// 1.1引进自己的组件
import myBraad from './components/my-Bread.vue'
Vue.component('my-mianbao',myBraad)
//4.导入axios
import axios from 'axios'
// 4.1设置基地址
axios.defaults.baseURL = 'http://localhost:8888/api/private/v1/'
Vue.prototype.$axios = axios;


//5.设置axios 拦截器
axios.interceptors.request.use(function (config) {
  // Do something before request is sent
  config.headers.Authorization=window.sessionStorage.getItem('token')
  return config
}, function (error) {
  // Do something with request error
  return Promise.reject(error);
});






// 1.导入路由
import router from './router.js'




// 5.1拦截器 统一处理响应
axios.interceptors.response.use(function (response) {
  // Do something with response data
  // console.log('响应拦截')
  //得到是个响应体
  // console.log(response)
  Vue.prototype.$message.success(response.data.meta.msg)
  return response;
}, function (error) {
  // Do something with response error
  return Promise.reject(error);
});


new Vue({
  render: h => h(App),
  //挂载到Vue实例上
  router
}).$mount('#app')
