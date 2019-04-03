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
import goods from "./components/goods.vue"
import reports from "./components/reports.vue"

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
      },
      {
        path:'goods',
        component:goods
      },
      {
        path:'reports',
        component:reports
      }
    ]
    
  }
];


//4.实例化顶级vue对象
let router = new VueRouter({
    routes
})


// 6.注册全局前置首位
router.beforeEach((to,from,next)=>{
  console.log('去的地方');
  console.log(to);
  console.log('来的地方');
  console.log(from);
  
  if(to.path==='/login'){
    next()
  }else{
    if(window.sessionStorage.getItem('token')){
      next();
    }else{
      Vue.prototype.$message.error('你没登陆,给你打回原形')
      next('/login')
    }
  }
})
//5.暴露出去
export default router