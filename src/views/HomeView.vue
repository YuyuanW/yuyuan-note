<template>
  <div class="home">
    <el-button type="text" @click="open">确认删除信息？</el-button>
  </div>
</template>

<script>
// @ is an alias to /src

export default {
  name: "HomeView",
  data() {
    return {
      name: "yuyuan",
    };
  },
  methods: {
    open() {
      this.$alert("fuck", this.name, {
        confirmButtonText: "确定",
        callback: (action) => {
          this.$message({
            type: "info",
            // message: `action: ${action}`,
            message: `action: ${action}`,
          });
        },
      });
    },
  },
};
</script>

<style lang="scss" scoped>
.el-button.el-button--text {
  color: red;
}
</style>
