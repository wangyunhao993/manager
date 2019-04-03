<template>
  <!-- 整体容器 -->
  <el-container class="index-container">
    <el-header class="my-header">
      <el-row>
        <el-col :span="4">
          <img src="../assets/logo.png" alt>
        </el-col>
        <el-col :span="18">
          <h2>屎上最屌的后台管理系统</h2>
        </el-col>
        <el-col :span="2">
          <el-button @click="logout" type="success">退出</el-button>
        </el-col>
      </el-row>
    </el-header>
    <el-container class="my-container">
      <!-- 左边 -->
      <el-aside class="my-aside" width="200px">
        <el-menu router default-active="2" class="el-menu-vertical-demo">
          <!-- idnex 是什么啊
                打开列表 -->
          <el-submenu :index="item.id+''" v-for="item in menuList">
            <template slot="title">
              <i class="el-icon-location"></i>
              <span>{{item.authName}}</span>
            </template>

            <el-menu-item-group v-for="it in item.children">

              <el-menu-item :index="it.path"><span class="el-icon-loading"></span>{{it.authName}}</el-menu-item>
              
            </el-menu-item-group>
          </el-submenu>
        </el-menu>
      </el-aside>
      <!-- 右边 -->
      <el-main class="my-main">
        <router-view></router-view>
      </el-main>
    </el-container>
  </el-container>
</template>

<script>
export default {
  name: "index",
  data() {
    return {
      //菜单列表
      menuList:[]
    }
  },
  methods: {
    handleOpen(key, keyPath) {
      console.log(key, keyPath);
    },
    handleClose(key, keyPath) {
      console.log(key, keyPath);
    },
    // 1.退出
    logout(){
      // 删除ssessionStorage
      window.sessionStorage.removeItem('token');
      // 跳去登陆页
      this.$router.push('/login');
    }
  },
  beforeCreate() {
    // if(window.sessionStorage.getItem('token')){

    // }else{
    //   this.$message.error('还没登陆,请先登陆');
    //   this.$router.push('/login');
    // }
    
  },
  async created() {
    let res= await this.$axios.get(`menus`);
    // console.log('获取列表数据成功');
      this.menuList=res.data.data;
      // console.log(this.menuList);
      
  },
};
</script>


<style lang="scss">
.index-container {
  height: 100%;
  display: flex;
  flex-direction: column;
  .my-header {
    height: 60px;
    background-color: #b3c0d1;
    line-height: 60px;

    h2 {
      margin: 0;
      padding: 0;
      text-align: center;
      color: #fefefe;
      font-weight: 400;
    }
  }

  .my-container {
    flex: 1;

    .my-aside {
      background: white;
    }

    .my-main {
      background-color: #e9eef3;
      padding-top: 0;
    }
  }
}
</style>
