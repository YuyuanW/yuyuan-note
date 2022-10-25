<template>
  <div id="note" class="detail">
    <NoteSidebar></NoteSidebar>
    <div id="note-detail">
      <!-- <h1>notebookId : {{ $route.query.notebookId }}</h1> -->
      <h1>noteId : {{ this.$route.query.noteId }}</h1>
      <h1>halo</h1>
    </div>
  </div>
</template>

<script>
import Auth from "@/apis/auth";
import NoteSidebar from "./NoteSidebar.vue";
import Notes from "@/apis/notes";
export default {
  name: "NoteDetail",
  components: { NoteSidebar },
  data() {
    return {
      msg: "笔记详情列表",
    };
  },
  methods: {},
  created() {
    Auth.getInfo().then((res) => {
      if (!res.isLogin) {
        this.$router.push({ path: "/login" });
      }
    });
    // Notes.getAll();
  },
};
</script>

<style lang="scss" scoped>
#note {
  display: flex;
  align-items: stretch;
  background-color: #fff;
  flex: 1;
}
</style>
