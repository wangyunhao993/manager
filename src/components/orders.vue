<template>
  <div>
    <!-- 1.面包屑 -->
    <my-mianbao sectitle="订单管理" threetitle="订单列表"></my-mianbao>
    <!-- 3.表格 -->
    <template>
      <el-table border :data="userList" style="width: 100%">
        <el-table-column type="index" width="50"></el-table-column>
        <el-table-column prop="order_number" label="订单编号" width="180"></el-table-column>
        <el-table-column prop="order_price" label="订单价格(元)" width="100"></el-table-column>
        <el-table-column prop="mobile" width="100" label="是否付款">
          <template slot-scope="scope">
            <el-button v-if="scope.row.order_pay==='0'" type="danger" plain size="small">未付款</el-button>
            <el-button v-else type="success" plain size="small">已付款</el-button>
          </template>
        </el-table-column>
        <el-table-column prop="is_send" label="是否发货"></el-table-column>
        <el-table-column prop="create_time" label="下单时间">
          <template slot-scope="scope">{{scope.row.create_time | formatTime('YYYY-MM-DD HH:mm:ss')}}</template>
        </el-table-column>

        <!-- 编辑 -->
        <el-table-column property="address" label="操作">
          <template slot-scope="scope">
            <!-- 我们可以通过scope.$index 获取索引 scope.row获取这一行的数据 -->
            <el-button
              @click="handleEdit(scope.$index, scope.row)"
              type="primary"
              icon="el-icon-edit"
              circle
              plain
            ></el-button>
          </template>
        </el-table-column>
      </el-table>
    </template>
    <!-- 分页 -->
    <el-pagination
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
      :page-sizes="[5, 10, 15, 18]"
      :page-size="sendData.pagesize"
      layout="total, sizes, prev, pager, next, jumper"
      :total="total"
    ></el-pagination>

    <!-- 编辑的弹框--级联动 -->
    <el-dialog title="修改订单地址" :visible.sync="compile">
      <el-form>
        <el-form-item label="省市区" label-width="250">
          <el-cascader :options="options"  v-model="selectedOptions" @change="handleChange"></el-cascader>
        </el-form-item>
        
        <el-form-item label="详细地址" label-width="250">
          <el-input placeholder></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="compile = false">取 消</el-button>
        <el-button type="primary" @click="stateChange = false">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import options from "../assets/city_data2017_element.js";
export default {
  name: "user",
  data() {
    return {
      // 级联的数据
      selectedOptions: [],
      options,
      
      // 1用户数组
      userList: [{}, {}],
      //2.接口要发送的数据
      sendData: {
        query: "",
        pagenum: 1,
        pagesize: 10
      },
      // 3.选择用户角色列表
      //下面是要渲染的数据
      roleList: [],

      editUser: {},

      xiugai: [],

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
      fulesForm: {
        username: "",
        password: ""
      },
      rules: {
        username: [
          { required: true, message: "用户名不能为空", trigger: "blur" }
        ],
        password: [
          { required: true, message: "密码不能为空", trigger: "blur" },
          { min: 6, max: 16, message: "密码长度6-16之间", trigger: "blur" }
        ]
      },
      // 编辑开关
      compile: false,
      // 编辑表单
      editForm: {
        username: "小小冰",
        email: "littleice@qq.com",
        mobile: "18888888888"
      },

      // 分页
      // 总条数
      total: 0
    };
  },
  methods: {
    // 级联动数据
    handleChange(value) {
      console.log(value);
    },
    // 1.用户状态改变
    stateChange(row) {
      console.log(row.mg_state);
      // row 得到的是个数据,得来的数据调用接口发送请求
      this.$axios.put(`users/${row.id}/state/${row.mg_state}`);
    },
    // 编辑的方法
    handleEdit(index, row) {
      console.log(index); // 这个在表格中的索引
      // console.log(row); // 整个表格的数据
      this.compile = true;
      this.editUser = row;
      console.log(this.editUser);
    },
    // 2.加载表格数据--搜索用户
    async getOrdes() {
      let res = await this.$axios.get(`orders`, {
        params: this.sendData
      });
      console.log(res);
      this.userList = res.data.data.goods;
    },

    // this.total = res.data.data.total;
    // this.userList = res.data.data.users;
    // console.log(this.userList);
    submitEdit() {},

    // 页码
    /*query: "",
        pagenum: 1,
        pagesize: 10 */

    handleSizeChange(val) {
      console.log(`每页 ${val} 条`);
      this.sendData.pagesize = val;
      this.search();
    },
    handleCurrentChange(val) {
      console.log(`当前页: ${val}`);
      this.sendData.pagenum = val;
      this.search();
    }
  },
  // 初始加载
  created() {
    this.getOrdes();
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
