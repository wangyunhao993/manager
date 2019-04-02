<template>
  <div>
    <!-- 1.面包屑 -->
    <my-mianbao sectitle="用户管理面包" threetitle="用户列表面包"></my-mianbao>
    <!-- 2.输入框 -->
    <el-row>
      <el-col :span="12">
        <el-button @click="dialogFormVisible = true" type="success" plain>添加用户</el-button>
      </el-col>
    </el-row>
    <!-- 3.表格 -->
    <template>
      <el-table border :data="aaa" style="width: 100%">
        <el-table-column type="index" width="50"></el-table-column>
        <el-table-column prop="roleName" label="角色名称" width="180"></el-table-column>
        <el-table-column prop="roleDesc" label="角色描述" width="180"></el-table-column>
        <!-- <el-table-column prop="mobile" label="电话"></el-table-column> -->
        <!-- <el-table-column prop="mg_state" label="用户状态"> -->
        <!-- 用户状态的sw开关 -->
        <!-- <template slot-scope="scope">
            <el-switch
              @change="stateChange(scope.row)"
              v-model="scope.row.mg_state"
              active-color="#13ce66"
              inactive-color="#ff4949"
            ></el-switch>
        </template>-->
        <!-- </el-table-column> -->

        <!-- 用户操作三个按钮 -->
        <el-table-column  label="操作">
          <template slot-scope="scope">
            <!-- 我们可以通过scope.$index 获取索引 scope.row获取这一行的数据 -->
            <el-button
              @click="handleEdit(scope.$index, scope.row)"
              type="primary"
              icon="el-icon-edit"
              plain
              circle
            ></el-button>
            <el-button
              plain
              @click="showRole(scope.row)"
              type="warning"
              icon="el-icon-check"
              circle
            ></el-button>
            <el-button plain type="danger" icon="el-icon-delete" circle></el-button>
          </template>
        </el-table-column>
      </el-table>
    </template>
    <!-- 分页 -->
    <!-- <el-pagination
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
      
      :page-sizes="[5, 10, 15, 18]"
      :page-size="sendData.pagesize"
      layout="total, sizes, prev, pager, next, jumper"
      :total="total"

    ></el-pagination>-->

    <!-- 新增弹框 -->
    <el-dialog title="添加用户" :visible.sync="dialogFormVisible">
      <el-form ref="addForm" :rules="rules" :model="addForm">
        <el-form-item label="用户名" label-width="100px" prop="username">
          <el-input v-model="addForm.username" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="密码" label-width="100px" prop="password">
          <el-input v-model="addForm.password" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="邮箱" label-width="100px">
          <el-input v-model="addForm.email" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="手机" label-width="100px">
          <el-input v-model="addForm.mobile" autocomplete="off"></el-input>
        </el-form-item>
      </el-form>
      <!-- 点击关闭 -->
      <div slot="footer" class="dialog-footer">
        <el-button @click="compile = false">取 消</el-button>
        <el-button @click="submitAdd(addForm)" type="primary">确 定</el-button>
      </div>
    </el-dialog>
    <!-- 编辑 -->
    <el-dialog title="修改用户" :visible.sync="compile">
      <el-form>
        <el-form-item label="用户名">
          <el-input autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="邮箱">
          <el-input autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="电话">
          <el-input autocomplete="off"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="compile = false">取 消</el-button>
        <el-button type="primary">确 定</el-button>
      </div>
    </el-dialog>

    <!-- 级联动 -->
    <!--:visible.sync="tankuang" --是开关 -->
    <el-dialog title="用户角色" :visible.sync="tankuang">
      <!-- <el-form ref="editForm">
        <el-cascader
          :options="options"
          v-model="selectedOptions2"
          @change="handleChange"
        ></el-cascader>
      </el-form> -->
    </el-dialog>
  </div>
</template>

<script>
export default {
  name: "roles",
  data() {
    return {
      // 新增
      
      selectedOptions2: [],
      // 1用户数组
      aaa: [
      ],


      // 3.选择用户角色列表
      //下面是要渲染的数据
      roleList: [],
      tankuang: false,
      editUser: {},
      // 表单
      dialogFormVisible: false,
      //新增表单
      addForm: {
        username: "小小兵",
        password: "123456",
        email: "littleice@qq.com",
        mobile: "88888888888"
      },
      // 规则
      rules: {
        username: [
          { required: true, message: "用户名不能为空", trigger: "blur" }
        ],
        password: [
          { required: true, message: "密码不能为空", trigger: "blur" },
          { min: 6, max: 16, message: "密码长度6-16之间", trigger: "blur" }
        ]
      },
      // 编辑窗口的开关
      compile: false
    };
  },
  methods: {
    // 1.不知道
    handleChange(value){
      console.log(value);
    },



    handleEdit(index, row) {
      console.log(index); // 这个在表格中的索引
      console.log(row); // 整个表格的数据
      this.compile = true;
    },
    // 2.加载表格数据--搜索用户
    async search() {
      let res = await this.$axios.get(`roles`);
    // console.log(res);
    // console.log(this.aaa);
    // this.aaa=res.data.data;
    // console.log(this.aaa);
    
    
    },
    // 3.新增用户请求
    submitAdd(addForm) {
      // console.log(formName);
      // console.log(this);

      // this.$refs.addForm.validate(async valid => {
      //   if (valid) {
      //     // 成功就接口调用
      //     // alert('submit!');
      //     let res = await this.$axios.post("users", this.addForm);
      //     // 新增成功就重新获取列表
      //     if (res.data.meta.status === 201) {
      //       this.search();
      //       this.dialogFormVisible = false;
      //     }
      //   } else {
      //     console.log("哥们，亲正确输入数据");
      //     return false;
      //   }
      // });
    },
    // 4.提交角色用户框
    async showRole(row) {
      // this.tankuang = true;
      // // console.log(row);
      // this.editUser = row;
      // // // 获取所有角色的列表
      // let res = await this.$axios.get(`roles`);
      // // console.log(res);
      // this.roleList = res.data.data;
      // console.log(this.roleList);
    }
    
  },
  // 初始加载
  created() {
    this.search();
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
