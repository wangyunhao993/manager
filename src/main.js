import Vue from 'vue'
import App from './App.vue'

Vue.config.productionTip = false

// 1.导入路由
import route from './router.js'


new Vue({
  render: h => h(App),
  //挂载到Vue实例上
  route
}).$mount('#app')
