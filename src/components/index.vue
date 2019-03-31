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
          <el-submenu index="1">
            <template slot="title">
              <i class="el-icon-location"></i>
              <span>导航一</span>
            </template>
            <el-menu-item-group>
              <el-menu-item index="users"><span class="el-icon-loading"></span>选项1</el-menu-item>
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
    if(window.sessionStorage.getItem('token')){

    }else{
      this.$message.error('还没登陆,请先登陆');
      this.$router.push('/login');
    }
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
