<template>
  <div>
    <el-dialog
      title="修改客户信息"
      :visible.sync="editDialogVisible"
      @opened="showEditDialog"
      @close="close"
    >
      <el-form
        :model="editUserForm"
        :rules="editUserFormRule"
        ref="editUserFormRef"
        label-width="100px"
      >
        <el-form-item label="用户名">
          <el-input v-model="editUserForm.username" disabled></el-input>
        </el-form-item>
        <el-form-item label="邮箱" prop="email">
          <el-input v-model="editUserForm.email"></el-input>
        </el-form-item>
        <el-form-item label="手机" prop="mobile">
          <el-input v-model="editUserForm.mobile"></el-input>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="editDialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="editUser">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
export default {
  name: "EditVue",
  props: {
    editFlag: {
      type: Boolean,
      default: false
    },
    editData: {
      type: Object,
      default: () => {}
    }
  },
  data() {
    return {
      // 弹出框标识
      editDialogVisible: false,
      // 修改客户信息表单
      editUserForm: {
        id: "",
        username: "",
        email: "",
        mobile: ""
      },
      editUserFormRule: {}
    };
  },
  methods: {
    // 修改用户信息
    showEditDialog() {
      this.$http.get("users/" + this.$props.editData.id).then(response => {
        if (response.data.meta.status != 200) {
          return this.$message.error("查询用户信息失败！");
        }
        this.editUserForm = response.data.data;
        this.editDialogVisible = true;
      });
    },
    close() {
      this.$emit("update:editFlag", false);
    },
    editUser() {
      this.$refs.editUserFormRef.validate(valid => {
        if (!valid) {
          return;
        }
        this.$http
          .put("users/" + this.editUserForm.id, {
            email: this.editUserForm.email,
            mobile: this.editUserForm.mobile
          })
          .then(response => {
            if (response.data.meta.status != 200) {
              return this.$message.error("更新用户信息失败！");
            }
            this.close();
            this.$emit("refreshTabelData");
          });
      });
    }
  },
  watch: {
    editFlag: {
      handler: function(newVal, oldVal) {
        this.editDialogVisible = newVal;
      },
      deep: true //深度监听
    }
  }
};
</script>

<style></style>
