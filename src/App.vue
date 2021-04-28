<template>
  <div id="app">
    <router-view />
  </div>
</template>

<script>
export default {};
</script>

<style>
body {
  background: url(assets/images/bg.png) !important;
}

/* ------ text ------ */

em {
  font-style: normal;
}

.m-black {
  color: #333 !important;
}

.m-text {
  font-weight: 300 !important;
  letter-spacing: 1px !important;
}

.m-text-opacity {
  opacity: 0.6;
}

.m-text-thin {
  font-weight: 300 !important;
}

textarea {
  resize: none !important;
}

/* ------ margin ------ */

/* 首页信息统计数、标签子项 分类云子项 */

.m-margin-tiny {
  margin: 0.3em 0.4em !important;
}

/* ------ padding ------ */

/* 标签标识 （留言板标签？？？？？） */

.m-padding-mini {
  padding: 0.2em 0.3em !important;
}

/* 分类标识 归档日期标识 */

.m-padding-tiny {
  padding: 0.3em 0.5em !important;
}

/* 详情页 博文内容 标签 介绍 响应式 */

.m-padding-medium-responsive {
  padding: 1.5em 3.2em !important;
}

/* container footer 响应式 */

.m-padding-large-responsive {
  padding: 4em 0 !important;
}
</style>
