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
import error from "./components/erorr.vue"
import orders from "./components/orders.vue"

//3.规则
let routes = [
  {
    path: "/login",
    component: login,
    // 路由元信息
    meta:{
      // 设置字段
      nodenglu:true
    }
  },
  {
    path: "/",
    component: index,
    // 嵌套路由
    children:[
      {
        path:'',
        redirect:'users'
      },
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
      },
      {
        path:'orders',
        component:orders
      }
      
    ]
    
  },
  {
    path:'/error',
    component:error
  }
];


//4.实例化顶级vue对象
let router = new VueRouter({
    routes
})


// 6.注册全局前置首位
router.beforeEach((to,from,next)=>{
  
    // console.log(to)
    if(to.matched.length===0){
      Vue.prototype.$message.error('输入的地址不对,检查一下')
      next('/error')
  }
  // if(to.path==='/login'){
  if(to.meta.nodenglu===true){
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