<template>
  <div class="detail" id="notebook-list">
    <header>
      <a href="#" class="btn"><i class="iconfont icon-plus"></i>新建笔记本</a>
    </header>
    <main>
      <div class="layout">
        <h3>笔记本列表(10)</h3>
        <div class="book-list">
          <a href="#" class="notebook">
            <div>
              <span class="iconfont icon-book"></span>笔记本标题1
              <span>3</span> <span class="action">编辑</span>
              <span class="action">删除</span>
              <span class="date">3天前</span>
            </div>
          </a>
          <a href="#" class="notebook">
            <div>
              <span class="iconfont icon-book"></span>笔记本标题2
              <span>1</span> <span class="action">编辑</span>
              <span class="action">删除</span>
              <span class="date">5天前</span>
            </div>
          </a>
        </div>
      </div>
    </main>
  </div>
</template>

<script>
export default {
  data() {
    return {
      msg: "笔记本列表加载成功",
    };
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
  color: #666;
  background-color: #fff;
  border-radius: 4px;
  font-weight: bold;
}
main .book-list span {
  font-size: 12px;
  font-weight: bold;
  color: #b3c0c8;
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
