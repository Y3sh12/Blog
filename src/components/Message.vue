<template>
  <div class="ui teal segment">
    <div class="ui comments">
      <h4 class="ui dividing header">Comments</h4>
      <div class="comment"  v-for="(item,i) in list" :key="i">
        <a class="avatar">
          <img src="@/static/image/avatar.jpg" />
        </a>
        <div class="content">
          <a class="author">{{item.nickname}}</a>
          <div class="metadata">
            <span class="date">{{replyDate(item.createTime)}}</span>
          </div>
          <div class="text">
            <p>{{item.content}}</p>
          </div>
          <div class="actions">
            <a class="reply" @click="toReply(item.id)">回复</a>
            <a class="reply" @click="toRemove(item.id)">删除</a>
          </div>
        </div>
        <div class="comments" v-if="item.reply.length>0">
          <div class="comment" v-for="(childReply,index) in item.reply" :key="index">
            <a class="avatar">
              <img src="@/static/image/avatar.jpg" />
            </a>
            <div class="content">
              <a class="author">{{childReply.nickname}} <em v-if="childReply.parentNickname">@ {{childReply.parentNickname}}</em></a>
              <div class="metadata">
                <span class="date">{{replyDate(childReply.createTime)}}</span>
              </div>
              <div class="text">{{childReply.content}}</div>
              <div class="actions">
                <a class="reply" @click="toReply(childReply.id)">回复</a>
                <a class="reply" @click="toRemove(childReply.id)">删除</a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>

import { formatUpdateTime } from "@/utils/format-date.js";
export default {
  data(){
    return{
      list:[], // 留言列表
    }
  },
  // 将查询到的留言内容传给Message子组件，渲染留言列表
  props:["message"],
  // 监听：当留言列表数据更新时，重新赋值
  watch:{
    "message":function(val){
      this.list = val;
    }
  },
  // 格式化留言发布时间
  computed:{
    replyDate(){
      return function(date){
        return formatUpdateTime(date);
      }
    }
  },

  methods:{
    // 点击回复，将父级留言ID传给父组件Message页
    toReply(id){
      this.$emit("reply-message",id);
    },
    // 点击删除
    toRemove(id){
      this.$emit("remove-message",id);
    }
  }
};
</script>
<style scoped>
.ui.comments {
  max-width: 100%;
}
.author em {
  padding: 0 0.25rem;
  color: #00B5AD;
}
.author em:hover {
  color: #00B5AD;
}
</style>