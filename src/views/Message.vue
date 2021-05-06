<template>
  <the-header />
  <div class="m-padding-large-responsive">
    <div class="ui container">
      <div class="ui segment">
        <!-- 发布留言 -->
        <comment @issue-message="issueMessage" :parent-id="parentId" ref="comment"></comment>
        <!-- 留言内容 -->
        <message :message="list" @reply-message="replyMessage" @remove-message="removeMessage" />
      </div>
    </div>
  </div>
  
  <the-footer />
</template>
<script>
import TheHeader from "@/components/common/TheHeader.vue";
import TheFooter from "@/components/common/TheFooter.vue";
import Comment from "@/components/Comment.vue";
import Message from "@/components/Message.vue";

import api from "@/api/message.js";
export default {
  components: {
    TheHeader,
    TheFooter,
    Comment,
    Message,
  },
  data(){
    return{
      list:[],
      parentId:0,
    }
  },
  mounted(){
    this.renderMessage();
  },
  methods:{
    // 渲染留言列表
    async renderMessage(){
      let rs = await api.getMessage();
      if(rs.length>0){
        this.list = rs;
      }
    },

    // 发布留言
    async issueMessage(data){
      await api.insertMessage(data);
      this.renderMessage();
      // 重置parentId，默认是一级留言/评论
      this.parentId = 0;
    },

    // 接收message组件传来的父级留言ID
    replyMessage(id){
      this.parentId = id;
      // 获取子组件，调用子组件的方法，使得textarea获取焦点
      this.$refs.comment.toFocus();
    },
    // 根据ID删除留言
    async removeMessage(id){
      await api.removeMessage(id);
      this.renderMessage();
    }
  }
};
</script>
<style scoped>
</style>