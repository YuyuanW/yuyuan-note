<template>
  <div id="app">
    <sidebar></sidebar>
    <router-view></router-view>
  </div>
</template>

<script>
import sidebar from "@/components/Sidebar.vue";

import Auth from "./apis/auth";
export default {
  name: "app",
  components: {
    sidebar,
  },
  created() {
    Auth.getInfo().then((res) => {
      if (!res.isLogin) {
        this.$message({ type: "error", message: "请先登录" });
      }
    });
  },
};
</script>

<style>
@import "//at.alicdn.com/t/c/font_3687062_aw8pta586ir.css";

* {
  box-sizing: border-box;
  margin: 0;
  padding: 0;
}

body {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  font-size: 14px;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  background-color: #eee;
  overflow: hidden;
}

a {
  text-decoration: none;
  color: #444;
}

ul,
li {
  list-style: none;
}

.btn {
  color: #666;
  font-size: 12px;
  padding: 2px 4px;
  background-color: #fff;
  box-shadow: 0px 0px 2px 0px #ccc;
  border: none;
  cursor: pointer;
  display: inline-block;
}
html,
body,
#app {
  height: 100%;
}
#app {
  /* border: 1px solid red; */
  display: flex;
  align-items: stretch;
}
</style>
