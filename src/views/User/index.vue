<template>
  <div>
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>活动管理</el-breadcrumb-item>
      <el-breadcrumb-item>活动列表</el-breadcrumb-item>
      <el-breadcrumb-item>活动详情</el-breadcrumb-item>
    </el-breadcrumb>
    <el-card>
      <el-row :gutter="20">
        <el-col :span="8">
          <el-input
            placeholder="请输入内容"
            v-model="queryInfo.query"
            clearable
            class="input-with-select"
          >
            <el-button slot="append" icon="el-icon-search"></el-button>
          </el-input>
        </el-col>
        <el-col :span="4">
          <el-button type="primary" @click="handlerAdd">添加用户</el-button>
        </el-col>
      </el-row>
      <el-table :data="userLists" border stripe ref="userTable">
        <el-table-column type="index" label="#"></el-table-column>
        <el-table-column prop="username" label="姓名"></el-table-column>
        <el-table-column prop="email" label="邮箱"></el-table-column>
        <el-table-column prop="mobile" label="电话"></el-table-column>
        <el-table-column prop="role_name" label="角色"></el-table-column>
        <el-table-column label="状态">
          <template slot-scope="scope">
            <el-switch v-model="scope.row.mg_state"> </el-switch>
          </template>
        </el-table-column>
        <el-table-column label="操作">
          <template slot-scope="scope">
            <el-button
              size="mini"
              icon="el-icon-edit"
              circle
              type="primary"
              @click="showEditDialog(scope.row)"
            ></el-button>
            <el-button
              size="mini"
              type="danger"
              circle
              icon="el-icon-delete"
              @click="removeUserById(scope.row.id)"
            ></el-button>
            <el-tooltip
              class="item"
              effect="dark"
              content="角色分配"
              :enterable="false"
              placement="top"
              ><el-button
                size="mini"
                type="warning"
                circle
                icon="el-icon-setting"
                @click="showSetRole(scope.row)"
              ></el-button>
            </el-tooltip>
          </template>
        </el-table-column>
      </el-table>
      <!-- 分页区域 -->
      <el-pagination
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page="queryInfo.pagenum"
        :page-sizes="[2, 5, 10, 15]"
        :page-size="queryInfo.pagesize"
        layout="total, sizes, prev, pager, next, jumper"
        :total="total"
      ></el-pagination>
    </el-card>

    <!-- 添加用户 -->
    <DialogAdd
      :flag.sync="addUserDialog"
      @refreshTabelData="refreshData"
    ></DialogAdd>
    <!-- 修改用户信息 -->
    <DialogEdit :editFlag.sync="editUserDialog" @refreshTabelData="refreshData" :editData="editData"></DialogEdit>
    <!-- 分配角色 -->
    <el-dialog
      title="分配角色"
      :visible.sync="setRoleDialogVisible"
      width="50%"
      @close="setRoleDialogClosed"
    >
      <P>当前用户：{{ userInfo.username }}</P>
      <P>当前角色：{{ userInfo.role_name }}</P>
      <p>
        分配角色：
        <el-select v-model="selectRoleId" placeholder="请选择">
          <el-option
            v-for="item in rolesLsit"
            :key="item.id"
            :label="item.roleName"
            :value="item.id"
          >
          </el-option>
        </el-select>
      </p>
      <span slot="footer" class="dialog-footer">
        <el-button @click="setRoleDialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="saveRoleInfo">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import DialogAdd from "./dialog/add";
import DialogEdit from "./dialog/edit";

export default {
  name: "User",
  components: { DialogAdd, DialogEdit },
  data() {
    return {
      queryInfo: {
        query: "",
        pagenum: 1,
        pagesize: 5
      },
      // 添加弹框
      addUserDialog:false,
      // 编辑弹框
      editUserDialog:false,
      editData:{},
      userLists: [],
      total: 0,
      // 分配角色弹出框
      setRoleDialogVisible: false,
      // 当前需要被分配角色的用户
      userInfo: {},
      rolesLsit: [],
      // 分配角色的角色id
      selectRoleId: ""
    };
  },
  created() {
    this.getUserList();
  },
  methods: {
    refreshData() {
      this.getUserList();
    },
    handlerAdd() {
      this.addUserDialog = true;
    },
    getUserList() {
      //获取账户列表
      this.$http.get("users", { params: this.queryInfo }).then(response => {
        console.log(response.data);
        this.userLists = response.data.data.users;
        this.total = response.data.data.total;
      });
    },
    // 监听 pagesize改变的事件
    handleSizeChange(newSize) {
      console.log(newSize);
      this.queryInfo.pagesize = newSize;
      this.getUserList();
    },
    // 监听 页码值 改变事件
    handleCurrentChange(newSize) {
      console.log(newSize);
      this.queryInfo.pagenum = newSize;
      this.getUserList();
    },
    // 修改用户信息
    showEditDialog(params) {
      this.editUserDialog = true;
      this.editData = Object.assign({}, params);
      console.log(`editData`);
      console.log(this.editData);
    },
    removeUserById(id) {
      this.$confirm("确认删除？", "系统提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        cancelButtonClass: "btn-custom-cancel",
        type: "warning"
      })
        .then(response => {
          console.log(response);
          if (response !== "confirm") {
            return this.$message.info("已取消删除");
          }
          this.$http.delete("users/" + id).then(resp => {
            if (resp.data.meta.status != 200) {
              return this.$message.error("删除用户失败！");
            }
            this.$message.success("删除用户成功！");
            this.getUserList();
          });
        })
        .catch(err => {
          console.log(err);
        });
    },
    //分配角色
    showSetRole(role) {
      console.log(role);
      this.userInfo = role;
      this.$http.get("roles").then(response => {
        console.log(response.data);
        this.rolesLsit = response.data.data;
      });
      this.setRoleDialogVisible = true;
    },
    saveRoleInfo() {
      this.$http
        .put(`users/${this.userInfo.id}/role`, {
          rid: this.selectRoleId
        })
        .then(response => {
          console.log(response);
          if (response.data.meta.status != 200) {
            return this.$message.error("更新用户角色失败!");
          }
          this.getUserList();
          this.setRoleDialogVisible = false;
        });
    },
    setRoleDialogClosed() {
      this.selectRoleId = "";
      this.userInfo = {};
    }
  }
};
</script>

<style></style>
