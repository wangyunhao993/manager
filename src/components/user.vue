<template>
  <div>
    <!-- 1.面包屑 -->
    <el-breadcrumb class="mainbao" separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>用户管理</el-breadcrumb-item>
      <el-breadcrumb-item>用户列表</el-breadcrumb-item>
    </el-breadcrumb>
    <!-- 2.输入框 -->
    <el-row>
      <el-col :span="6">
        <el-input 
        placeholder="请输入内容" 
        class="input-with-select"
        v-model="sendData.query"
        @keyup.native.enter="search"
        >
          <el-button @click="search" slot="append" icon="el-icon-search"></el-button>
        </el-input>
      </el-col>

      <el-col :span="12">
        <el-button type="success" plain>添加用户</el-button>
      </el-col>
    </el-row>
    <!-- 3.表格 -->
    <template>
      <el-table border :data="userList" style="width: 100%">
        <el-table-column type="index" width="50"></el-table-column>
        <el-table-column prop="username" label="姓名" width="180"></el-table-column>
        <el-table-column prop="email" label="邮箱" width="180"></el-table-column>
        <el-table-column prop="mobile" label="电话"></el-table-column>
        <el-table-column prop="mg_state" label="用户状态">
          <!-- 用户状态的sw开关 -->
          <template slot-scope="scope">
          <el-switch 
          @change="stateChange(scope.row)"
          v-model="scope.row.mg_state"
           active-color="#13ce66" 
           inactive-color="#ff4949"
           ></el-switch>
          </template>
        </el-table-column>

        <!-- 用户操作三个按钮 -->
        <el-table-column property="address" label="操作">
          <template slot-scope="scope">
            <!-- 我们可以通过scope.$index 获取索引 scope.row获取这一行的数据 -->
              <el-button @click="handleEdit(scope.$index, scope.row)" type="primary" icon="el-icon-edit" circle></el-button>
              <el-button type="success" icon="el-icon-check" circle></el-button>
              <el-button type="danger" icon="el-icon-delete" circle></el-button>
           </template>
        </el-table-column>
      </el-table>
    </template>
  </div>
</template>

<script>
export default {
  name: "user",
  data() {
    return {
      //0.总条数
      total:0,
      // 1用户数组
      userList:[],
      //2.接口要发送的数据
      sendData:{
        query:"",
        pagenum:1,
        pagesize:10
        
      }
    };
  },
  methods:{
    // 1.用户状态改变
    stateChange(row){
      console.log(row.mg_state)
      // row 得到的是个数据,得来的数据调用接口发送请求
      this.$axios.put(`users/${row.id}/state/${row.mg_state}`)
    },
    handleEdit(index, row) {
      console.log(index); // 这个在表格中的索引
      console.log(row); // 整个表格的数据
    },
    // 2.加载表格数据--搜索用户
   async search(){
      // 发送请求--渲染到表格页面
     let res = await this.$axios.get("users",{
       params:this.sendData
        // headers: {
        //   Authorization: window.sessionStorage.getItem("token")
        // },
        
      });
      console.log(this.sendData);
      
      this.total = res.data.data.total;
      this.userList = res.data.data.users;
      
      
    }
  },
  // 初始加载
  created() {
    this.search();
  },
};
</script>

<style lang="scss">
.el-breadcrumb {
  height: 40px;
  text-align: center;
  background-color: #d3dce6;

  .el-breadcrumb__item {
    line-height: 40px;
    margin-left: 10px;
  }
}
</style>
