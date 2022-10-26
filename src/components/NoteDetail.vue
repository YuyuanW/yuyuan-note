<template>
  <div id="note-detail">
    <div id="showNote">
      <header>
        <button class="btn hidden">添加笔记</button>
        <div>
          <el-dropdown @command="handleCommand">
            <span class="el-dropdown-link">
              {{ curBook.title ? curBook.title : "下拉"
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
        <button class="btn addNote">添加笔记</button>
      </header>
      <main>
        <div class="info">
          <span>更新时间</span>
          <span>标题</span>
        </div>
        <div class="list">
          <ul>
            <li v-for="note in notes" :key="note.id">
              <span>{{ note.updatedAtFriendly }}</span
              ><span>{{ note.title }}</span>
            </li>
          </ul>
        </div>
      </main>
    </div>
    <div id="showDetail" v-show="curNote.id">
      <div class="top">
        <span>创建日期:1天前</span>
        <span>更新日期:5分钟前</span>
        <span>{{ status }}</span>
        <i class="iconfont icon-delete"></i>
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
        <div class="edit-title">标题</div>
        <div class="edit-content">内容{{ content }}</div>
      </div>
    </div>
    <div id="tips" v-show="!curNote.id">点击左侧笔记进行编辑</div>
  </div>
</template>

<script>
import Auth from "@/apis/auth";
import Notebooks from "@/apis/notebooks";
// import Notes from "@/apis/notes";
export default {
  name: "NoteDetail",
  data() {
    return {
      notebooks: [],
      notes: [
        {
          id: 1,
          updatedAtFriendly: "刚刚",
          title: "a",
        },
        { id: 2, updatedAtFriendly: "七分钟前", title: "b" },
      ],
      curBook: {},
      curNote: {},
      status: "未保存",
      content: "请点击左侧笔记",
      isFull: false,
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
    handleCommand(command) {
      this.$message("click on item " + command);
    },
  },
};
</script>

<style lang="scss" scoped>
#note-detail {
  /* border: 1px solid red; */
  width: 100%;
  display: flex;
  flex: 1;
  flex-direction: row;
}
#showNote {
  /* border: 1px solid blue; */
  width: 380px;
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
.el-dropdown-link {
  font-size: 18px;
  color: black;
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
    font-size: 24px;
    padding-top: 4px;
    word-break: break-all;
    margin-left: 20px;
  }
  > .edit-content {
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

#tips {
  /* background-color: white; */
  width: 100%;
  font-size: 36px;
  padding-top: 100px;
  padding-left: 100px;
  color: gray;
  border-left: 1px solid #ddd;
}
</style>
