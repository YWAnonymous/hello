<template>
  <div>
    <el-form :model="loginForm">
      <el-form-item label="姓名">
        <el-input
          type="text"
          v-model="loginForm.username"
          autocomplete="off"
        ></el-input>
      </el-form-item>
      <el-form-item label="密码">
        <el-input
          type="password"
          v-model="loginForm.password"
          autocomplete="off"
        ></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="submitForm()">提交</el-button>
        <el-button @click="resetForm()">重置</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import { Login } from '@/api/login.js'
export default {
  name: "HelloWorld",
  data() {
    return {
      loginForm: {
        username: "admin",
        password: "123456"
      }
    };
  },
  methods: {
    submitForm() {
      let _this = this;
      Login( this.loginForm).then(function(response) {
        console.log(response);
        if (response.data.meta.status == "200") {
          console.log(response.data.data.token);
          sessionStorage.setItem("token", response.data.data.token);
          _this.$router.push("/home");
        }
      });
    }
  }
};
</script>
<style scoped></style>
