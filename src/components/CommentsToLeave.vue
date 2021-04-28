<template>
  <div class="ui form">
    <div class="field">
      <textarea
        name="content"
        id=""
        rows="5"
        placeholder="说点什么..."
      ></textarea>
    </div>
    <div class="fields m-comments-send">
      <!-- 昵称 -->
      <div class="field">
        <div class="ui left icon input">
          <i class="user small icon"></i>
          <input type="text" name="nickname" id="" placeholder="昵称" />
        </div>
      </div>
      <!-- 邮箱 -->
      <div class="field">
        <div class="ui left icon input">
          <i class="mail small icon"></i>
          <input type="email" name="email" id="" placeholder="邮箱" />
        </div>
      </div>
      <!-- 发布按钮 -->
      <div class="field">
        <button class="ui teal icon button m-mobile-wide">
          <i class="edit icon"></i>&nbsp;&nbsp;发布
        </button>
      </div>
    </div>
  </div>
</template>
<script>
export default {};
</script>
<style scoped>
/* 留言 */

.m-comments-send > div.field {
  margin-bottom: 0.5em !important;
}

@media screen and (max-width: 768px) {
  /* 留言信息input占一行 */
  .m-comments-send > div.field,
  .m-comments-send > div.field button {
    width: 100%;
  }
}
</style>