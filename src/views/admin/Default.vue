<template>
  <the-back-header></the-back-header>
  <div id="content" class="ui bottom attached segment pushable">
    <!-- 侧边栏 -->
    <the-side-bar></the-side-bar>
    <!-- 主体内容 -->
    <div class="pusher m-container-small m-padding-tiny">
      <div class="ui container">
        <!-- 移动端提示 -->
        <div class="ui blue info message m-mobile-show">
          <i class="close icon"></i>建议PC端打开，浏览效果更佳！
        </div>
        <!-- 操作提示 -->
        <div class="ui success message" :class="seen?'':'hidden'">
          <i class="close icon"></i>
          <div>{{message}}</div>
        </div>
        <!-- 数据 -->
        <router-view @hint="hint" @show="show"></router-view>
      </div>
    </div>
  </div>
</template>
<script>
import TheBackHeader from "@/components/common/TheBackHeader.vue";
import TheSideBar from "@/components/common/TheSideBar.vue";

import { closeMessage } from "@/assets/js/common.js";
export default {
  name: "Default",
  components: {
    TheBackHeader,
    TheSideBar,
  },
  data(){
    return {
      seen: false,
      message:""
    }
  },

  mounted() {
    // 关闭提示信息
    closeMessage();
  },

  methods:{
    hint(message){
      if(message!==""){
        this.seen = true;
        this.message = message;
      }
    },
    show(val){
      this.seen = val;
    }
  }
};
</script>
<style scoped>
.pushable > .pusher {
  min-height: calc(100vh - 4rem);
}

.m-container-small {
  max-width: calc(100% - 18.571428571rem) !important;
}

.m-padding-tiny {
  padding: 2em !important;
}

.m-mobile-show {
  display: none !important;
}

@media screen and (max-width: 768px) {
  .m-mobile-show {
    display: block !important;
  }
}
</style>