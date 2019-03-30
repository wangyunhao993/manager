import Vue from 'vue'
import App from './App.vue'

Vue.config.productionTip = false

//3.导入全局样式
import './assets/base.scss'

// 1.导入路由
import router from './router.js'

//2.复制饿了么组件
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
// import App from './App.vue';

Vue.use(ElementUI);


new Vue({
  render: h => h(App),
  //挂载到Vue实例上
  router
}).$mount('#app')
