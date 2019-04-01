<template>
    <el-breadcrumb class="mainbao" separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>{{sectitle}}</el-breadcrumb-item>
      <el-breadcrumb-item>{{threetitle}}</el-breadcrumb-item>
    </el-breadcrumb>
</template>

<script>
export default {
    props:['sectitle','threetitle']
}
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
