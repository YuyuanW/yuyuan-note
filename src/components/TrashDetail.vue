<template>
  <div id="trash-detail">
    <div class="trash-side">
      <header>回收站</header>
      <main>
        <div class="trash-menu">
          <span>更新时间</span>
          <span>标题</span>
        </div>
        <div class="trash-note">
          <ul>
            <li v-for="note in notes" :key="note.id" @click="dropTo(note)">
              <router-link :to="`/trash?noteId=${note.id}`">
                <span>{{ note.updatedAtFriendly }}</span>
                <span>{{ note.title }}</span>
              </router-link>
            </li>
          </ul>
        </div>
      </main>
    </div>
    <div class="trash-show">
      <header v-show="curNote.id">
        <span>回收数量:{{ notes.length }}</span>
        <span>|</span>
        <span>创建日期:{{ curNote.createdAtFriendly }}</span>
        <span>|</span>
        <span>所属笔记本:{{ curNote.notebookId }}</span>
        <button @click="deleteDeep(curNote)">彻底删除</button>
        <button @click="restore(curNote)">恢复</button>
      </header>
      <main>
        <div class="trash-noteDetail" v-show="!isEmpty">
          <div class="trash-title">{{ this.curNote.title }}</div>
          <div
            class="trash-content markdown-body"
            v-html="previewContent"
          ></div>
        </div>
        <div class="trash-tips" v-show="isEmpty">当前回收站为空</div>
      </main>
    </div>
  </div>
</template>

<script>
import Auth from "@/apis/auth";
import Trash from "@/apis/trash";
import MarkdownIt from "markdown-it";
let md = new MarkdownIt();
export default {
  data() {
    return {
      notes: [],
      curNote: {},
      isEmpty: true,
    };
  },
  computed: {
    previewContent() {
      return md.render(this.curNote.content || "");
    },
  },
  created() {
    Auth.getInfo().then((res) => {
      if (!res.isLogin) {
        this.$router.push({ path: "/login" });
      }
    });
    Trash.getAll().then((res) => {
      this.notes = res.data;
      if (!this.notes || !this.notes.length) {
        this.isEmpty = true;
        return;
      }
      this.curNote = this.notes[0];
      if (this.curNote.id) {
        this.$router.push({ path: `/trash?noteId=${this.curNote.id}` });
        this.isEmpty = false;
      }
    });
  },
  methods: {
    dropTo(note) {
      this.curNote = note;
    },
    restore(note) {
      Trash.revertNote({ noteId: note.id })
        .then((res) => {
          this.notes.splice(this.notes.indexOf(note), 1);
          if (!this.notes || !this.notes.length) {
            this.isEmpty = true;
            this.$router.push({ path: `/trash` });
            return;
          } else {
            this.curNote = this.notes[0];
            this.$router.push({ path: `/trash?noteId=${this.notes[0].id}` });
            this.$message({ type: "success", message: res.msg || "恢复成功" });
          }
        })
        .catch((res) => {
          this.$message({ type: "error", message: res.msg || "恢复失败" });
        });
    },
    deleteDeep(note) {
      Trash.deleteNote({ noteId: note.id })
        .then((res) => {
          this.notes.splice(this.notes.indexOf(note), 1);
          if (!this.note || !this.notes.length) {
            this.isEmpty = true;
            this.$router.push({ path: `/trash` });
            return;
          } else {
            this.curNote = this.notes[0];
            this.$router.push({ path: `/trash?noteId=${this.notes[0].id}` });
            this.$message({ type: "success", message: res.msg || "清除成功" });
          }
        })
        .catch((res) => {
          console.log("fuck delete", res);
          this.$message({ type: "error", message: res.message || "删除失败" });
        });
    },
  },
};
</script>

<style lang="scss" scoped>
#trash-detail {
  /* border: 1px solid red; */
  width: 100%;
  height: 100vh;
  display: flex;
  overflow: hidden;
}
.trash-side {
  /* border: 1px solid blue; */
  background-color: #eee;
  width: 280px;
  border-right: 1px solid #ccc;

  > header {
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
}
.trash-menu {
  display: flex;
  > span {
    flex: 1;
    width: 50%;
    font-size: 12px;
    padding: 2px 10px;
    -webkit-box-flex: 1;
    -ms-flex: 1;
    border: 1px solid #ccc;
    border-right: none;
  }
}
.trash-note {
  max-height: 1000px;
  overflow-x: hidden;
  overflow-y: scroll;
  &::-webkit-scrollbar {
    width: 4px;
    /*height: 4px;*/
  }
  &::-webkit-scrollbar-thumb {
    border-radius: 10px;
    -webkit-box-shadow: inset 0 0 5px rgba(0, 0, 0, 0.1);
    background: rgba(0, 0, 0, 0.2);
  }
  &::-webkit-scrollbar-track {
    -webkit-box-shadow: inset 0 0 5px rgba(0, 0, 0, 0.1);
    border-radius: 0;
    background: rgba(0, 0, 0, 0.05);
  }
}
.router-link-active {
  display: flex;
  padding: 2px 0;
  font-size: 12px;
  > span {
    padding: 2px 10px;
    -webkit-box-flex: 1;
    -ms-flex: 1;
    flex: 1;
  }
}
a {
  text-decoration: none;
  color: #444;
}
.router-link-exact-active {
  border: 2px solid rgb(129, 192, 243);
}
.trash-show {
  /* border: 1px solid green; */
  flex: 1;
  background-color: white;
  > header {
    /* border: 1px solid red; */
    padding: 4px 20px;
    border-bottom: 1px solid #eee;
    > span {
      font-size: 12px;
      color: #999;
      margin-right: 4px;
    }
    > button {
      float: right;
      margin-left: 10px;
      padding: 2px 4px;
      font-size: 12px;
      color: #666;
      background-color: #fff;
      -webkit-box-shadow: 0 0 2px 0 #ccc;
      box-shadow: 0 0 2px 0 #ccc;
      border: none;
      cursor: pointer;
      transform: translateY(-2px);
      /* display: inline-block; */
    }
  }
}

.trash-tips {
  padding: 80px 50px;
  font-size: 48px;
  color: #666;
}
.trash-noteDetail {
  > .trash-title {
    display: inline-block;
    width: 100%;
    border: none;
    outline: none;
    font-size: 18px;
    padding: 10px 20px;
  }
  > .trash-content {
    padding: 20px;
    overflow-x: hidden;
    max-height: 1000px;
    overflow-y: scroll;
    &::-webkit-scrollbar {
      width: 4px;
      /*height: 4px;*/
    }
    &::-webkit-scrollbar-thumb {
      border-radius: 10px;
      -webkit-box-shadow: inset 0 0 5px rgba(0, 0, 0, 0.1);
      background: rgba(0, 0, 0, 0.2);
    }
    &::-webkit-scrollbar-track {
      -webkit-box-shadow: inset 0 0 5px rgba(0, 0, 0, 0.1);
      border-radius: 0;
      background: rgba(0, 0, 0, 0.05);
    }
  }
}
</style>
