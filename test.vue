<script>
export default {
  methods: {
    onCreate() {
      this.$prompt("请输入新建笔记本名字：", "创建笔记本", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        inputPattern: /^.{1,30}$/,
        inputErrorMessage: "标题不能为空，且不能超过30个字符",
      })
        .then(({ value }) => {
          return Notebooks.addNotebook({ title: value });
        })
        .then((res) => {
          res.data.friendlyCreatedAt = friendlyDate(res.data.createdAt);
          this.notebooks.unshift(res.data);
          this.$message({
            type: "success",
            message: res.msg,
          });
        })
        .catch((res) => {
          this.$message({
            type: "error",
            message: res.msg || "创建失败",
          });
        });
    },
    onEdit(notebook) {
      let title = "";
      this.$prompt("重命名笔记本：", "编辑笔记本", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        inputPattern: /^.{1,30}$/,
        inputErrorMessage: "标题不能为空，且不能超过30个字符",
      })
        .then(({ value }) => {
          title = value;
          return Notebooks.updateNotebook(notebook.id, { title });
        })
        .then((res) => {
          res.data.friendlyCreatedAt = friendlyDate(res.data.createdAt);
          notebook.title = title;
          this.$message({
            type: "success",
            message: res.msg,
          });
        })
        .catch((res) => {
          this.$message({
            type: "error",
            message: res.msg || "重命名失败",
          });
        });
    },
    onDelete(notebook) {
      let isConfirm = window.confirm(`确定删除${notebook.title}吗？`);
      if (isConfirm) {
        Notebooks.deleteNotebook(notebook.id).then((res) => {
          this.notebooks.splice(this.notebooks.indexOf(notebook), 1);
          window.alert(res.msg);
        });
      }
    },
  },
};
</script>
