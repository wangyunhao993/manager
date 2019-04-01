//1.先有vue
import Vue from "vue";
import VueRouter from "vue-router";

Vue.use(VueRouter);

//2.导入组件
import login from "./components/login.vue";
import index from "./components/index.vue";
import users from "./components/user.vue";
import roles from "./components/roles.vue"
import rights from "./components/rights.vue"

//3.规则
let routes = [
  {
    path: "/login",
    component: login
  },
  {
    path: "/",
    component: index,
    // 嵌套路由
    children:[
      {
        path:'users',
        component:users
      },
      {
        path:'roles',
        component:roles
      },
      {
        path:'rights',
        component:rights
      }
    ]
    
  }
];


//4.实例化顶级vue对象
let router = new VueRouter({
    routes
})

//5.暴露出去
export default router