<template>
  <div>
    <footer class="ui inverted vertical segment m-padding-large-responsive">
      <div class="ui center aligned container">
        <!-- semantic grid是将屏幕划分为16等份 -->
        <div class="ui inverted divided stackable grid">
          <!-- QQ二维码 -->
          <div class="three wide column">
            <div class="ui inverted link list">
              <div class="item">
                <img
                  src="@/assets/upload/QQ.jpg"
                  alt="QQ二维码"
                  title="扫二维码，加QQ好友"
                  class="ui rounded image m-code-img"
                />
              </div>
            </div>
          </div>
          <div class="four wide column">
            <h4 class="ui inverted header m-text">最新博客</h4>
            <div class="ui inverted link list">
              <router-link :to="`/blog/${blog.id}`" class="item" v-for="blog in latest" :key="blog.id" :title="blog.title">{{blog.title}}</router-link>
            </div>
          </div>
          <div class="four wide column">
            <h4 class="ui inverted header m-text">联系我</h4>
            <div class="ui inverted link list">
              <div class="item">Email: 2171243332@qq.com</div>
              <div class="item">QQ：2171243332</div>
            </div>
          </div>
          <div class="five wide column">
            <h4 class="ui inverted header m-text">Sanna</h4>
            <p class="m-text m-blog-text m-text-opacity">
              这是我的个人博客，主要记录关于编程、生活、思考等相关内容，与大家共同分享...
            </p>
          </div>
        </div>
        <!-- 版权信息 -->
        <div class="ui inverted section divider"></div>
        <p class="m-text-opacity">
          CopyRight &copy; 2021 Dengyinshan. All rights reserved.
        </p>
      </div>
    </footer>
  </div>
</template>

<script>
import api from "@/api/blog.js";
export default {
  name: "TheFooter",
  data(){
    return{
      latest:[]
    }
  },
  created(){
    // 初始化
    this.renderLatest();
  },
  mounted(){

  },
  methods:{
    
    async renderLatest(){
      this.latest = await api.font.getLatest();
    },
  }
};
</script>

<style scoped>
img.m-code-img {
  width: 7.857rem;
}
footer .link.list a {
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}

footer .m-blog-text {
  padding-left: 0.6rem;
  text-align: left;
  text-indent: 2em;
  line-height: 1.5 !important;
}

/* ------ 移动端 ------ */

@media screen and (max-width: 768px) {
  .m-padding-large-responsive {
    padding: 2em 0 !important;
  }
}
</style>
