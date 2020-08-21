<template>
  <div>
    <el-container>
      <el-header>Header</el-header>
      <el-container>
        <el-aside>
          <!--左侧菜单 -->
          <el-menu>
            <el-submenu index="1">
              <template slot="title">
                <i class="el-icon-location"></i>
                <span>导航一</span>
              </template>
              <el-menu-item-group>
                <template slot="title">分组一</template>
              </el-menu-item-group>
            </el-submenu>
          </el-menu>
        </el-aside>
        <el-container>
          <el-main>Main</el-main>
          <el-footer>Footer</el-footer>
        </el-container>
      </el-container>
    </el-container>
  </div>
</template>

<script>
export default {
  name: "Home",
  data() {
    return {};
  },
  methods: {},
  created() {
    let _this= this;
    this.$http.get("menus").then(function(response){
      console.log(response);
    });
  }
};
</script>

<style scoped>
.el-container {
  height: 100%;
}
.el-header {
  background-color: #373f41;
  display: flex;
  justify-content: space-between;
  padding-left: 0;
  align-items: center;
  color: #fff;
  font-size: 20px;
}
.el-main {
  background-color: #eaedf1;
}
.el-aside {
  background-color: #333744;
}
</style>
