<template>
  <div class="ui form">
    <div class="field">
      <textarea
        name="content"
        rows="5"
        placeholder="说点什么..."
        v-model="form.content"
        ref="content"
      ></textarea>
    </div>
    <div class="fields m-comments-send">
      <!-- 昵称 -->
      <div class="field">
        <div class="ui left icon input">
          <i class="user small icon"></i>
          <input type="text" name="nickname" placeholder="昵称" v-model="form.nickname" />
        </div>
      </div>
      <!-- 邮箱 -->
      <div class="field">
        <div class="ui left icon input">
          <i class="mail small icon"></i>
          <input type="email" name="email" placeholder="邮箱" v-model="form.email" />
        </div>
      </div>
      <!-- 发布按钮 -->
      <div class="field">
        <button class="ui teal icon button m-mobile-wide" @click="toIssue">
          <i class="edit icon"></i>&nbsp;&nbsp;发布
        </button>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  data(){
    return{
      form:{
        parentId:0,
        content:"",
        nickname:"",
        email:""
      }
    }
  },
  // 接收父组件message页/Blog详情页传来的父级留言ID
  props:["parentId"],

  // 监听parentMessageId，如果有变化将重新赋值
  watch:{
    "parentId":function(val){
      this.form.parentId = val;
    }
  },

  methods:{
    // 点击发布，将表单数据包括父级留言ID传给父组件Message页/Blog详情页
    toIssue(){
      this.$emit("issue-message",this.form);
    },
    toFocus(){
      this.$nextTick(()=>{
        this.$refs.content.focus();
        this.form.content = "";
        this.form.nickname = "";
        this.form.email = "";
      })
    }
  }
};
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