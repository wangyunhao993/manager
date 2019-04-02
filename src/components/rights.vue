<template>
  <div>
    <!-- 1.面包屑 -->
    <my-mianbao sectitle="权限管理" threetitle="权限列表"></my-mianbao>
    <!-- 2.输入框 -->
    <!-- 3.表格 -->
    <template>
      <el-table border :data="userList" style="width: 100%">
        <el-table-column type="index" width="50"></el-table-column>
        <el-table-column prop="username" label="权限名称" width="180"></el-table-column>
        <el-table-column prop="email" label="路径" width="180"></el-table-column>
        <!-- <el-table-column prop="mobile" label="电话"></el-table-column> -->
        <!-- <el-table-column prop="mg_state" label="用户状态"> -->
        <el-table-column property="address" label="层级">
         
        </el-table-column>
      </el-table>
    </template>
  </div>
</template>

<script>
export default {
  name: "rights",
  data() {
    return {
      // 1用户数组
      userList: [
        {},
        {}
      ],
    };
  },
  methods: {
  },
  created() {
    // this.search();
  }
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
