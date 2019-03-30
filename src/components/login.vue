<template>
  <div class="login">
    <!-- 居中的盒子 -->
    <div class="box">
      <h2>用户登陆</h2>
      <el-form 
      ref="loginForm"
      label-position="top" :model="formLabelAlign" :rules="rules" label-width="80px">
        <el-form-item label="用户名" prop="username">
          <el-input v-model="formLabelAlign.username"></el-input>
        </el-form-item>
        <el-form-item label="密码" prop="password">
          <el-input v-model="formLabelAlign.password"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button @click="submitForm('loginForm')" type="primary">登陆</el-button>
          <el-button @click="resetForm('loginForm')" type="success">重置</el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<script>
export default {
  name: "login",
  data() {
    return {
      formLabelAlign: {
        username: "",
        password: ""
      },
      //2.表单验证 规则
      rules: {
        username: [
          { required: true, message: "请输入活动名称", trigger: "blur" },
          { min: 3, max: 5, message: "长度在 3 到 5 个字符", trigger: "blur" }
        ],
        password: [
          { required: true, message: "请输入活动名称", trigger: "blur" },
          { min: 3, max: 5, message: "长度在 3 到 5 个字符", trigger: "blur" }
        ]
      },
      // 3.重置
      ruleForm: {
        name: "",
        region: "",
        date1: "",
        date2: "",
        delivery: false,
        type: [],
        resource: "",
        desc: ""
      }
    };
  },
  methods: {
    submitForm(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          alert("submit!");
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    },
    //   重置
    resetForm(formName) {
      this.$refs[formName].resetFields();
    }
  }
};
</script>

<style lang="scss">
.login {
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: #324152;

  .box {
    width: 550px;
    padding: 35px;
    border-radius: 10px;
    height: 420px;
    background: white;

    .my-btn {
      width: 100%;
    }
  }
}
</style>
