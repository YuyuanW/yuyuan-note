<template>
  <div id="note-detail">
    <div id="showNote">
      <header>
        <button class="btn hidden">添加笔记</button>
        <div>
          <el-dropdown @command="handleCommand">
            <span class="el-dropdown-link">
              {{ curBook.title ? curBook.title : "请新建笔记本"
              }}<i class="el-icon-arrow-down el-icon--right"></i>
            </span>
            <el-dropdown-menu slot="dropdown">
              <el-dropdown-item
                v-for="notebook in notebooks"
                :key="notebook.id"
                :command="notebook"
                >{{ notebook.title }}</el-dropdown-item
              >
            </el-dropdown-menu>
          </el-dropdown>
        </div>
        <button class="btn addNote" @click="addNote">添加笔记</button>
      </header>
      <main>
        <div class="info">
          <span>更新时间</span>
          <span>标题</span>
        </div>
        <div class="list">
          <ul>
            <li v-for="note in notes" :key="note.id">
              <router-link
                :to="`/note?noteId=${note.id}&notebookId=${curBook.id}`"
                @click="dropTo(note)"
              >
                <span>{{ note.updatedAtFriendly }}</span
                ><span @click="dropTo(note)">{{ note.title }}</span>
              </router-link>
            </li>
          </ul>
        </div>
      </main>
    </div>
    <div id="showDetail" v-show="curNote.id">
      <div class="top">
        <span>创建日期:{{ curNote.createdAtFriendly }}</span>
        <span>更新日期:{{ curNote.updatedAtFriendly }}</span>
        <span>{{ status }}</span>
        <i class="iconfont icon-delete" @click="deleteNote"></i>
        <i
          class="iconfont icon-fullscreen"
          v-if="!isFull"
          @click="isFull = !isFull"
        ></i>
        <i
          class="iconfont icon-suoxiao"
          v-if="isFull"
          @click="isFull = !isFull"
        ></i>
      </div>
      <div class="edit">
        <div class="edit-title">
          <input placeholder="请输入标题" v-model="curNote.title" />
        </div>
        <div class="edit-content">
          <textarea
            placeholder="请输入内容，支持markdown语法哦~"
            v-model="curNote.content"
            v-show="!isFull"
          ></textarea>
          <div v-show="isFull">
            <article class="markdown-body" v-html="previewContent"></article>
            <!-- <article class="markdown-body">{{curNote.content}}</article> -->
          </div>
        </div>
      </div>
    </div>
    <div id="tips" v-show="!curNote.id">请先新建笔记或者点击笔记</div>
  </div>
</template>

<script>
import Auth from "@/apis/auth";
import Notebooks from "@/apis/notebooks";
// import Debounce from "@/helpers/debounce";
import MarkdownIt from "markdown-it";
let md = new MarkdownIt();

import Notes from "@/apis/notes";
import { watchEffect } from "vue";
export default {
  name: "NoteDetail",
  computed: {
    previewContent() {
      return md.render(this.curNote.content || "");
    },
  },
  data() {
    return {
      notebooks: [],
      notes: [],
      curBook: {},
      curNote: {},
      status: "未保存",
      content: "请点击左侧笔记",
      isFull: false,
    };
  },
  created() {
    watchEffect(() => {
      // console.log("fuck", this.curNote.title, this.curNote.content);
      if (this.curNote.id) {
        Notes.updateNote(
          { noteId: this.curNote.id },
          { title: this.curNote.title, content: this.curNote.content }
        )
          .then((res) => {
            this.status = res.msg;
          })
          .catch((res) => {
            this.$message({ type: "error", message: res.msg || "修改失败" });
          });
        // console.log("fuck", this.curNote.title, this.curNote.content);
      }
    });

    Auth.getInfo().then((res) => {
      if (!res.isLogin) {
        this.$router.push({ path: "/login" });
      }
    });
    Notebooks.getAll()
      .then((res) => {
        this.notebooks = res.data;
        const bookId = this.$route.query.notebookId;
        if (bookId) {
          this.curBook = this.notebooks.find(
            (notebook) => notebook.id == bookId
          );
        } else {
          if (res.data && res.data.length) {
            this.curBook = res.data[0];
            this.$router.push({ path: `/note?notebookId=${res.data[0].id}` });
          } else {
            return;
          }
        }
        return Notes.getAll({ notebookId: this.curBook.id });
      })
      .then((res) => {
        // console.log("fuck", res.data);
        const noteId = this.$route.query.noteId;
        if (res && res.data && res.data.length) {
          this.notes = res.data;
          if (noteId) {
            this.curNote = this.notes.find((note) => note.id == noteId);
          }
        }
      });
  },
  // beforeRouteUpdate(to,from,next){
  //   const noteId = to.query.noteId
  //   console.log('fuck')
  //   this.curNote = this.notes.find(note=>note.id === noteId)
  //   next()
  // },

  methods: {
    handleCommand(command) {
      this.$router.push({ path: `/note?notebookId=${command.id}` });
      this.curBook = command;
      Notes.getAll({ notebookId: command.id }).then((res) => {
        this.notes = res.data;
        this.curNote = {};
      });
      this.$message(`已经切换到笔记本:《${command.title}》`);
    },
    dropTo(curNote) {
      this.curNote = curNote;
      this.$message(`笔记已切换到 <${curNote.title}>`);
    },
    addNote() {
      Notes.addNote({ notebookId: this.curBook.id })
        .then((res) => {
          this.notes.unshift(res.data);
          this.curNote = res.data;
          this.$router.push({
            path: `/note?noteId=${this.curNote.id}&notebookId=${this.curBook.id}`,
          });
        })
        .catch((res) => {
          this.$message({ type: "error", message: "当前笔记本无效" });
        });
    },
    deleteNote() {
      // console.log(this.curNote);
      Notes.deleteNote({ noteId: this.curNote.id })
        .then((res) => {
          this.notes.splice(this.notes.indexOf(this.curNote), 1);
          this.curNote = {};
          this.$router.push({ path: `/note?notebookId=${this.curBook.id}` });
          this.$message({
            type: "success",
            message: res.msg || `笔记已放入回收站`,
          });
        })
        .catch((res) => {
          this.$message({
            type: "error",
            message: res.msg || `放入回收站失败`,
          });
        });
    },
  },
};
</script>

<style lang="scss" scoped>
.markdown-body {
  box-sizing: border-box;
  min-width: 200px;
  max-width: 980px;
  margin: 0 auto;
  padding: 45px;
}
@media (max-width: 767px) {
  .markdown-body {
    padding: 15px;
  }
}
#note-detail {
  /* border: 1px solid red; */
  width: 100%;
  display: flex;
  flex: 1;
  flex-direction: row;
  overflow: hidden;
}
#showNote {
  /* border: 1px solid blue; */
  width: 400px;
  > header {
    display: flex;
    justify-content: space-between;
    padding: 10px 4px 10px 4px;
    > .hidden {
      visibility: hidden;
    }
    > .btn {
      font-size: 12px;
    }
  }
  > main {
    > .info {
      display: flex;
      background-color: rgb(238, 238, 238);
      > span {
        width: 50%;
        border: 1px solid #ccc;
        padding: 2px 10px;
        font-size: 12px;
        border-right: none;
      }
    }
    > .list {
      > ul {
        list-style: none;
        > li {
          > a {
            width: 100%;
            display: flex;
            > span {
              width: 50%;
              padding: 2px 10px;
              font-size: 12px;
              word-break: break-all;
            }
          }
        }
      }
    }
  }
}
.el-dropdown-link {
  font-size: 18px;
  color: black;
}
.el-dropdown-menu {
  max-width: 140px;
  max-height: 80vh;
  overflow: scroll;
  &::-webkit-scrollbar {
    display: none;
  }
}

#showDetail {
  /* border: 1px solid red; */
  width: 100%;
  background-color: white;

  > .top {
    /* border: 1px solid blue; */
    padding: 6px 20px;
    border-bottom: 1px solid #eee;
    font-size: 12px;
    > span {
      margin-right: 10px;
    }
    > .iconfont {
      float: right;
      margin-left: 10px;
    }
  }
}

.edit {
  > .edit-title {
    > input {
      font-size: 24px;
      padding-top: 4px;
      word-break: break-all;
      margin-left: 20px;
      width: 90%;
      border: none;
      outline: none;
    }
  }
  > .edit-content {
    > textarea {
      outline: none;
      border: none;
      width: 96%;
      height: 90vh;
      font-size: 16px;
      padding-top: 6px;
      margin-left: 16px;
      overflow-x: hidden;
      overflow-y: scroll;
      &::-webkit-scrollbar {
        display: none;
      }
    }
  }
}

#tips {
  /* background-color: white; */
  width: 100%;
  font-size: 36px;
  padding-top: 100px;
  padding-left: 100px;
  color: gray;
  border-left: 1px solid #ddd;
}
.router-link-exact-active {
  border: 1px solid lightblue;
}
</style>
