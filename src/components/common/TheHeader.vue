<template>
  <div>
    <!-- 导航栏 -->
    <nav class="ui inverted attached segment m-nav">
      <div class="ui container">
        <div class="ui inverted secondary stackable menu">
          <h2 class="ui teal header item">Sanna</h2>
          <router-link
            to="/"
            class="item"
            active-class="active"
            exact
            :class="{ 'm-mobile-hide': seen }"
          >
            <i class="home icon"></i>主页
          </router-link>
          <router-link
            :to="`/type/${defaultTypeId}`"
            class="item"
            active-class="active"
            exact
            :class="{ 'm-mobile-hide': seen,'active':$route.meta.active==='/type' }"
          >
            <i class="th icon"></i>分类
          </router-link>
          <router-link
            :to="`/tag/${defaultTagId}`"
            class="item"
            active-class="active"
            exact
            :class="{ 'm-mobile-hide': seen,'active':$route.meta.active==='/tag' }"
          >
            <i class="tags icon"></i>标签
          </router-link>
          <router-link
            to="/archives"
            class="item"
            active-class="active"
            exact
            :class="{ 'm-mobile-hide': seen }"
          >
            <i class="clone icon"></i>归档
          </router-link>
          <router-link
            to="/message"
            class="item"
            active-class="active"
            exact
            :class="{ 'm-mobile-hide': seen }"
          >
            <i class="envelope icon"></i>留言板
          </router-link>
          <router-link
            to="/about"
            class="item"
            active-class="active"
            exact
            :class="{ 'm-mobile-hide': seen }"
          >
            <i class="user icon"></i>关于
          </router-link>
          <!-- 右侧搜索框 -->
          <div class="right item" :class="{ 'm-mobile-hide': seen }" title="全局搜索">
            <div class="ui icon inverted transparent input m-search">
              <input type="text" name="" id="" placeholder="Search..." v-model="keywords" @keyup.enter="toSearch" />
              <i class="search link icon m-search-icon"></i>
            </div>
          </div>
        </div>
      </div>
      <!-- 移动端bar -->
      <a
        href="javascript:;"
        class="ui menu black icon button m-bar-position m-mobile-show"
        @click="showBarMenu"
      >
        <i class="sidebar icon"></i>
      </a>
    </nav>
  </div>
</template>

<script>
import api from "@/api/blog.js";
export default {
  name: "TheHeader",
  data() {
    return {
      seen: true,
      keywords:'',
      defaultTypeId:undefined,
      defaultTagId:undefined
    };
  },

  // 定义抛出事件
  emits:["pass-data"],

  mounted(){
    this.getType();
    this.getTag();
  },

  methods: {
    showBarMenu() {
      this.seen = !this.seen;
      console.log(this.seen);
    },

    async getType(){
      let rs = await api.font.getType();
      if(rs){
        this.defaultTypeId = rs[0].id;
      }
    },

    async getTag(){
      let rs = await api.font.getTag();
      if(rs){
        this.defaultTagId = rs[0].id;
      }
    },

    async toSearch(){
      let rs = await api.font.queryBlogList(this.keywords);
      // 将查询结果传给父组件
      this.$emit("pass-data",rs);
      this.keywords = "";
    },
  },
};
</script>

<style scoped>
.m-nav {
  padding-top: 0.2em !important;
  padding-bottom: 0.2em !important;
  -webkit-box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2) !important;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2) !important;
}

.m-nav .right .m-search {
  padding: 0.357rem 0.714rem;
  border: 1px solid rgba(171, 171, 172, 0.4);
}

.m-nav .m-search-icon {
  right: 0.5rem !important;
}

.m-nav .m-bar-position {
  position: absolute;
  top: 0;
  right: 0;
}

/* PC端 bar隐藏 */
.m-mobile-show {
  display: none !important;
}

/* ------ 移动端 ------ */

@media screen and (max-width: 768px) {
  /* 导航菜单隐藏 */
  .m-mobile-hide {
    display: none !important;
  }
  /* bar显示 */
  .m-mobile-show {
    display: block !important;
  }
}
</style>
