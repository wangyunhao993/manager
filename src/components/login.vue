<template>
  <div class="login">
    <!-- 居中的盒子 -->
    <div class="box">
      <h2>用户登陆</h2>
      <el-form 
      ref="loginForm"
      label-position="top" :model="loginForm" :rules="rules" label-width="80px">
        <el-form-item label="用户名" prop="username">
          <el-input v-model="loginForm.username"></el-input>
        </el-form-item>
        <el-form-item label="密码" prop="password">
          <el-input v-model="loginForm.password"></el-input>
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
      loginForm: {
        username: "admin",
        password: "123456"
      },
      //2.表单验证 规则
      rules: {
        username: [
          { required: true, message: "请输入活动名称", trigger: "blur" },
          { min: 3, max: 8, message: "长度在 3 到 8 个字符", trigger: "blur" }
        ],
        password: [
          { required: true, message: "请输入活动名称", trigger: "blur" },
          { min: 3, max: 16, message: "长度在 3 到 16 个字符", trigger: "blur" }
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
      // console.log(formName);
      
      this.$refs[formName].validate(async valid => {
        // console.log(valid);
        // console.log(this.loginForm);
        
        if (valid) {
          // alert("submit!");
          //成功提交数据
          
          let res =await this.$axios.post('login',this.loginForm);
          
          console.log(res);
          if(res.data.meta.status===400){
            this.$message.error(res.data.meta.msg)
          }else if(res.data.meta.status ===200) {
            this.$message.success(res.data.meta.msg)
            //缓存数据再 成功要跳转
            console.log(res.data.data.token);
            window.sessionStorage.setItem('token',res.data.data.token);
            this.$router.push('/');

          }else{
            // 失败
            this.$message.error('数据格式错误,请根据提示修改')
            return false;
          }
          
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    },
    //   重置
    resetForm(formName) {
      this.$refs[formName].resetFields();
    },

    // 3.登陆请求
    // submit(formName){
      
    // }
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
