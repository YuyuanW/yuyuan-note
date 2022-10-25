<template>
  <div class="note-sidebar">
    <span class="btn add-note">添加笔记</span>
    <el-dropdown @command="handleCommand" class="notebook-title el-dropdown">
      <span class="el-dropdown-link">
        1<i class="el-icon-arrow-down el-icon--right"></i>
      </span>
      <el-dropdown-menu slot="dropdown">
        <el-dropdown-item
          v-for="notebook in notebooks"
          :key="notebook.id"
          :command="notebook.id"
          >{{ notebook.title }}</el-dropdown-item
        >
        <el-dropdown-item command="trash">回收站</el-dropdown-item>
      </el-dropdown-menu>
    </el-dropdown>
    <div class="menu">
      <div class="menu-time">更新时间</div>
      <div>标题</div>
    </div>
    <ul class="notes">
      <li v-for="note in notes" :key="note.id">
        <router-link :to="`/note?noteId=${note.id}`">
          <span class="date">{{ note.updateAtFriendly }}</span>
          <span class="title">{{ note.title }}</span>
        </router-link>
      </li>
    </ul>
  </div>
</template>

<script>
import Notebooks from "@/apis/notebooks";
import Notes from "@/apis/notes";

export default {
  name: "NoteSidebar",
  created() {
    Notebooks.getAll().then((res) => {
      this.notebooks = res.data;
    });
  },
  data() {
    return {
      notebooks: [],
      notes: [],
    };
  },
  methods: {
    handleCommand(notebookId) {
      Notes.getAll({ notebookId }).then((res) => {
        this.notes = res.data;
        this.$message("笔记本切换成功");
      });
      //   this.$message("切换至笔记本： " + command);
    },
  },
};
</script>

<style lang="scss" scoped>
/* @import url("../assets/css/note-sidebar.scss"); */
.note-sidebar {
  position: relative;
  width: 290px;
  border-right: 1px solid #ccc;
  background-color: #eee;
}
.note-sidebar .add-note {
  position: absolute;
  right: 5px;
  top: 12px;
  color: #666;
  font-size: 12px;
  padding: 2px 4px;
  -webkit-box-shadow: 0 0 2px 0 #ccc;
  box-shadow: 0 0 2px 0 #ccc;
  border: none;
  z-index: 1;
}
.btn {
  color: #666;
  font-size: 12px;
  padding: 2px 4px;
  background-color: #fff;
  -webkit-box-shadow: 0 0 2px 0 #ccc;
  box-shadow: 0 0 2px 0 #ccc;
  border: none;
  cursor: pointer;
  display: inline-block;
}
.note-sidebar .notebook-title {
  font-size: 18px;
  font-weight: 400;
  color: #333;
  height: 45px;
  line-height: 45px;
  text-align: center;
  border-bottom: 1px solid #ccc;
  background-color: #f7f7f7;
  display: block;
}
.el-dropdown-link {
  position: relative;
  cursor: pointer;
  color: #424141;
}
.el-icon-arrow-down {
  font-size: 14px;
}
.menu {
  display: flex;

  > div {
    font-size: 12px;
    padding: 2px 10px;
    -webkit-box-flex: 1;
    -ms-flex: 1;
    flex: 1;
    /* border-right: 1px solid #ccc;     */
    border-bottom: 1px solid #ccc;
  }
  > .menu-time {
    border-right: 1px solid #ccc;
  }
}
li,
ul {
  list-style: none;
}
ul {
  display: block;
  list-style-type: disc;
  /* margin-block-start: 1em;
  margin-block-end: 1em;
  margin-inline-start: 0px;
  margin-inline-end: 0px;
  padding-inline-start: 40px; */
}
li a {
  display: flex;
  padding: 3px 0;
  font-size: 12px;
  border: 2px solid transparent;
  color: #444;
  > span {
    flex: 1;
    padding: 0 10px;
  }
}
.router-link-exact-active {
  border: 2px solid lightblue;
}
</style>
