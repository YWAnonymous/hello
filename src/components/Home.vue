<template>
  <div>
    <el-container>
      <el-header>Header</el-header>
      <el-container>
        <el-aside>
          <!--左侧菜单 -->
          <el-menu router :default-active="activePath">
            <el-submenu
              v-for="menu in menus"
              :key="menu.id"
              :index="menu.id + ''"
            >
              <template slot="title">
                <span>{{ menu.authName }}</span>
              </template>
              <el-menu-item
                :index="'/' + children.path"
                v-for="children in menu.children"
                :key="children.id"
                @click="saveNavState('/' + children.path)"
              >
                <template slot="title">{{ children.authName }}</template>
              </el-menu-item>
            </el-submenu>
          </el-menu>
        </el-aside>
        <el-container>
          <el-main>
            <router-view></router-view>
          </el-main>
        </el-container>
      </el-container>
    </el-container>
  </div>
</template>

<script>
import { getMenu } from '@/api/login.js';
export default {
  name: "Home",
  data() {
    return {
      menus: "",
      // 被激活导航地址
      activePath: ""
    };
  },
  methods: {
    // 保存连接的激活地址
    saveNavState(activePath) {
      window.sessionStorage.setItem("activePath", activePath);
    }
  },
  created() {
    let _this = this;
    getMenu().then((response)=> {
      console.log(response.data.data);
      _this.menus = response.data.data;
    });
    this.activePath = window.sessionStorage.getItem("activePath");
  }
};
</script>

<style scoped>
.el-container {
  height: 100%;
  background-color: #eaedf1;
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

</style>
