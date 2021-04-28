<template>
  <div>
    <div id="toolbar" class="m-toolbar" style="display: none">
      <div class="ui vertical icon buttons">
        <a href="#blog" class="ui teal button">Blog</a>
        <button id="listBtn" type="button" class="ui teal button">目录</button>
        <a href="#comments" class="ui teal button">评论</a>
        <button id="readBtn" class="ui teal button">
          <i class="mobile alternate large icon"></i>
        </button>
        <button class="ui button" @click="toTop">
          <i class="chevron up icon"></i>
        </button>
      </div>
    </div>
    <!-- 文章目录 -->
    <div id="list" class="ui flowing popup transition hidden">
      <div id="js-toc" class="toc"></div>
    </div>
    <!-- 手机阅读码 -->
    <div id="readCode" class="ui flowing popup transition hidden"></div>
  </div>
</template>
<script>
// 工具栏
import Tocbot from "tocbot";
// 弹窗
import { list, read } from "@/assets/js/popups.js";
// 滚动
import { listener, scrollToTop } from "@/assets/js/scroll.js";
export default {
  name: "ToolBar",
  mounted() {
    this.toc();
    list();
    read();
    listener();
  },
  methods: {
    // 文章索引生成
    toc() {
      Tocbot.init({
        tocSelector: "#js-toc",
        contentSelector: "#article",
        headingSelector: "h1,h2,h3",
        hasInnerContainers: true,
      });
    },
    // 回到顶部
    toTop() {
      scrollToTop();
    },
  },
};
</script>
<style scoped>

/* 重写tocbot部分样式 */
@import url("../assets/css/tocbot.css");
/* 二维码 */
img.m-code-img {
  width: 7.857rem;
}

/* 工具菜单 */

.m-toolbar {
  position: fixed;
  bottom: 3em;
  right: 0;
  padding: 2em 1em;
  z-index: 9999;
}
</style>
