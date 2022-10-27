<template>
  <div id="trash-detail">
    <div class="trash-side">
      <header>回收站</header>
      <main>
        <div>
          <span>更新时间</span>
          <span>标题</span>
        </div>
        <div class="trash-note">
          <ul>
            <li v-for="note in notes" :key="note.id">
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
      <header>
        <span>回收数量：{{ this.notes.length }}</span>
        <span>创建日期:{{ this.curNote.createdAtFriendly }}</span>
        <span>更新日期:{{ this.curNote.updatedAtFriendly }}</span>
        <span>所属笔记本:{{ this.curNote.notebookId }}</span>
        <button>彻底删除</button>
        <button>恢复</button>
      </header>
      <main>
        <div class="trash-noteDetail">
          <div class="trash-title">{{ this.curNote.title }}</div>
          <div class="trash-content">{{ this.curNote.content }}</div>
        </div>
        <div class="trash-tips">当前回收站为空</div>
      </main>
    </div>
  </div>
</template>

<script>
import Auth from "@/apis/auth";
import Trash from "@/apis/trash";
export default {
  data() {
    return {
      notes: [],
      curNote: {},
    };
  },
  created() {
    Auth.getInfo().then((res) => {
      if (!res.isLogin) {
        this.$router.push({ path: "/login" });
      }
    });
    Trash.getAll().then((res) => {
      this.notes = res.data;
      this.curNote = this.notes[0];
      if (this.curNote.id) {
        this.$router.push({ path: `/trash?noteId=${this.curNote.id}` });
      }
    });
  },
};
</script>

<style scoped></style>
