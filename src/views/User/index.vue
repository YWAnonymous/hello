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
      <!-- table区域 -->
      <TableVue :config="configTable">
        <template v-slot:mg_state="slotData">
          <el-switch v-model="slotData.data.status"></el-switch>
        </template>
        <template v-slot:operation="slotData">
          <el-button
            size="small"
            type="danger"
            @click="removeUserById(slotData.data.id)"
            >删除</el-button
          >
          <el-button
            size="small"
            type="success"
            @click="showEditDialog(slotData.data)"
            >编辑</el-button
          >
        </template>
      </TableVue>
    </el-card>

    <!-- 添加用户 -->
    <DialogAdd :flag.sync="addUserDialog"></DialogAdd>
    <!-- 修改用户信息 -->
    <DialogEdit
      :editFlag.sync="editUserDialog"
      :editData="editData"
    ></DialogEdit>
  </div>
</template>

<script>
import { deleteUserById } from "@/api/user.js";
import DialogAdd from "./dialog/add";
import DialogEdit from "./dialog/edit";
import TableVue from "../../components/Table/index";

export default {
  name: "User",
  components: { DialogAdd, DialogEdit, TableVue },
  data() {
    return {
      queryInfo: {
        query: "",
        pagenum: 1,
        pagesize: 5
      },
      // 添加弹框
      addUserDialog: false,
      // 编辑弹框
      editUserDialog: false,
      editData: {},
      userLists: [],
      total: 0,
      configTable: {
        // table组件配置参数
        tHead: [
          {
            label: "邮箱/用户名",
            field: "username",
            width: 200
          },
          {
            label: "手机号",
            field: "mobile"
          },
          {
            label: "角色",
            field: "role_name"
          },
          {
            label: "禁启用状态",
            field: "mg_state",
            columnType: "slot",
            slotName: "mg_state"
          },
          {
            label: "操作",
            columnType: "slot",
            slotName: "operation"
          }
        ],
        // 请求接口URL
        requestData: {
          url: "/users/",
          method: "get",
          data: {
            query: "",
            pagenum: 1,
            pagesize: 5
          }
        }
      }
    };
  },
  created() {},
  methods: {
    handlerAdd() {
      this.addUserDialog = true;
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
         deleteUserById(id).then(resp => {
            if (resp.data.meta.status != 200) {
              return this.$message.error("删除用户失败！");
            }
            this.$message.success("删除用户成功！");
          });
        })
        .catch(err => {
          console.log(err);
        });
    }
  }
};
</script>

<style></style>
