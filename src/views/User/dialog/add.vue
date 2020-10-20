<template>
  <div>
    <el-dialog
      title="添加用户"
      :visible.sync="dialog_info_flag"
      @close="close"
      width="50%"
    >
      <el-form :model="addUserForm" :rules="addUserFormRules" ref="addUserFormRef" label-width="100px">
        <el-form-item label="用户名" prop="username">
          <el-input v-model="addUserForm.username"></el-input>
        </el-form-item>
        <el-form-item label="密码" prop="password">
          <el-input v-model="addUserForm.password"></el-input>
        </el-form-item>
        <el-form-item label="邮箱" prop="email">
          <el-input v-model="addUserForm.email"></el-input>
        </el-form-item>
        <el-form-item label="手机" prop="mobile">
          <el-input v-model="addUserForm.mobile"></el-input>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="close">取 消</el-button>
        <el-button type="primary" @click="addUser">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
export default {
  name: "AddVue",
  props: {
    flag: {
      type: Boolean,
      default: false
    }
  },
  data() {
    // 自定义邮箱规则
    var checkEmail = (rule, value, callback) => {
      const regEmail = /^\w+@\w+(\.\w+)+$/;
      if (regEmail.test(value)) {
        // 合法邮箱
        return callback();
      }
      callback(new Error("请输入合法邮箱"));
    };
    // 自定义手机号规则
    var checkMobile = (rule, value, callback) => {
      const regMobile = /^1[34578]\d{9}$/;
      if (regMobile.test(value)) {
        return callback();
      }
      // 返回一个错误提示
      callback(new Error("请输入合法的手机号码"));
    };
    return {
      // 弹出框标识
      dialog_info_flag: false,
      // 用户添加表单
      addUserForm: {
        username: "",
        password: "",
        email: "",
        mobile: ""
      },
      // 表单里规则
      addUserFormRules: {
        username: [
          { required: true, message: "请输入用户名", trigger: "blur" },
          {
            min: 2,
            max: 10,
            message: "用户名的长度在2～10个字",
            trigger: "blur"
          }
        ],
        password: [
          { required: true, message: "请输入密码", trigger: "blur" },
          {
            min: 6,
            max: 18,
            message: "用户密码的长度在6～18个字",
            trigger: "blur"
          }
        ],
        email: [
          { required: "true", message: "请输入邮箱", trigger: "blur" },
          { validator: checkEmail, trigger: "blur" }
        ],
        mobile: [
          { required: "true", message: "请输入手机号码", trigger: "blur" },
          { validator: checkMobile, trigger: "blur" }
        ]
      },
    };
  },
  methods: {
   // 添加用户
    addUser() {
      this.$refs.addUserFormRef.validate(valid => {
        if (!valid) {
          return;
        }
        this.$http.post("users", this.addUserForm).then(response => {
          console.log(response.data);
          if (response.data.meta.status != 201) {
            return this.$message.error("添加用户失败！");
          }
          this.close();
          this.$emit("refreshTabelData");
        });
      });
    },
    close() {
      this.$refs.addUserFormRef.resetFields();
      this.$emit("update:flag",false);
    }
  },
  // 监听组件
  watch: {
    flag: {
      handler: function(newVal, oldVal) {
        this.dialog_info_flag = newVal;
      },
      deep: true //深度监听
    }
  }
};
</script>

<style></style>
