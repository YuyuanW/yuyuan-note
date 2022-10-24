<template>
  <div class="detail" id="notebook-list">
    <header>
      <div class="btn" @click="onCreate">
        <i class="iconfont icon-plus"></i>新建笔记本
      </div>
    </header>
    <main>
      <div class="layout">
        <h3>笔记本列表({{ notebooks.length }})</h3>

        <div class="book-list">
          <router-link
            v-for="notebook in notebooks"
            to="/note/1"
            class="notebook"
            :key="notebook.id"
          >
            <div>
              <span class="iconfont icon-book">{{ notebook.title }}</span>
              <span>{{ notebook.noteCounts }}</span>
              <span class="action" @click.stop.prevent="onEdit(notebook)"
                >编辑</span
              >
              <span class="action" @click.stop.prevent="onDelete(notebook)"
                >删除</span
              >
              <span class="date">{{ notebook.friendlyCreatedAt }}</span>
            </div>
          </router-link>
        </div>
      </div>
    </main>
  </div>
</template>

<script>
import Auth from "@/apis/auth";
import Notebooks from "@/apis/notebooks";
import { friendlyDate } from "@/helpers/util";
window.Notebooks = Notebooks;
export default {
  data() {
    return {
      msg: "笔记本列表加载成功",
      notebooks: [],
    };
  },
  created() {
    Auth.getInfo().then((res) => {
      if (!res.isLogin) {
        this.$router.push({ path: "/login" });
      }
    });
    Notebooks.getAll().then((res) => {
      this.notebooks = res.data;
    });
  },
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
          // res.data.friendlyCreatedAt = friendlyDate(res.data.createdAt);
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
      this.$confirm("删除笔记本以及所以笔记内容", "删除笔记本", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(() => {
          return Notebooks.deleteNotebook(notebook.id);
        })
        .then((res) => {
          this.notebooks.splice(this.notebooks.indexOf(notebook), 1);
          this.$message({
            type: "success",
            message: res.msg || "删除成功",
          });
        })
        .catch((res) => {
          this.$message({
            type: "info",
            message: res.msg || "删除取消",
          });
        });
    },
  },
};
</script>

<style lang="scss" scoped>
#notebook-list {
  flex: 1;
}
header {
  padding: 12px;
  border-bottom: 1px solid #ccc;
  > .btn {
    font-size: 12px;
    color: #666;
    cursor: pointer;
    margin-left: 10px;
  }
  > .btn .iconfont {
    font-size: 12px;
    padding-right: 2px;
  }
}
input {
  width: 300px;
  height: 30px;
  line-height: 30px;
  border: 1px solid #ccc;
  border-radius: 3px;
  padding: 3px 5px;
  outline: none;
}
main {
  padding: 30px 40px;
  height: calc(100vh - 46px);
  overflow: scroll;
}
.book-list {
  margin-top: 10px;
  font-size: 14px;
}
main .book-list span {
  color: #666;
  background-color: #fff;
  border-radius: 4px;
  font-weight: bold;
}
main .book-list span {
  font-size: 12px;
  font-weight: bold;
  color: #b3c0c8;
  /* color: black; */
}
main .book-list .icon-book {
  color: rgb(12, 12, 12);
}
main .date,
main .action {
  float: right;
  margin-left: 10px;
}
main h3 {
  font-size: 12px;
  color: #000;
}
.layout {
  max-width: 966px;
  margin: 0 auto;
}
main .iconfont {
  color: #1687ea;
  margin-right: 4px;
}
.notebook {
  display: block;
  cursor: pointer;
  background: white;
}
main a.notebook:hover {
  background-color: #f7fafd;
}
.notebook > {
  div {
    border-bottom: 1px solid #ebebeb;
    padding: 12px 14px;
  }
}
main .error-msg {
  font-size: 12px;
  color: red;
}
</style>
