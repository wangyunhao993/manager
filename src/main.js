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
// import axios from 'axios'

//4.引进我自己的axios插件
import myaxios from './mysxios.js'
Vue.use(myaxios)

//5.设置统一时间格式--1.引进moen--2.filters过滤器






// 1.导入路由
import router from './router.js'


new Vue({
  render: h => h(App),
  //挂载到Vue实例上
  router
}).$mount('#app')
