//1.先导入axios
import axios from "axios";
// import router from "../../../老师代码当天下载/3/src/router";
import router from './router'
//2.暴露出去 实现一个install方法

export default {
  install(Vue) {
    // 4.1设置基地址
    axios.defaults.baseURL = "http://localhost:8888/api/private/v1/";
    Vue.prototype.$axios = axios;
    //5.设置axios 拦截器
    axios.interceptors.request.use(
      function(config) {
        // Do something before request is sent
        config.headers.Authorization = window.sessionStorage.getItem("token");
        return config;
      },
      function(error) {
        // Do something with request error
        return Promise.reject(error);
      }
    );

    // 5.1拦截器 统一处理响应
    axios.interceptors.response.use(
      function(response) {
        // Do something with response data
        // console.log('响应拦截')
        //得到是个响应体
        
        // console.log(response)
        // 判断非法token
        if(response.data.meta.msg==='无效token'&&response.data.meta.status===400){
            Vue.prototype.$message.warning('老哥你伪造token,牛逼,打回原形')
            window.sessionStorage.removeItem('token');
            router.push('/login')
        }
        Vue.prototype.$message.success(response.data.meta.msg);
        return response;
      },
      function(error) {
        // Do something with response error
        return Promise.reject(error);
      }
    );
    // 3.设置到原形上
    Vue.prototype.$axios = axios
  }
};
