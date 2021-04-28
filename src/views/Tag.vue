<template>
  <div>
    <the-header />
    <!-- 主体内容 START -->
    <div class="m-container-small m-padding-large-responsive">
      <div class="ui container">
        <!-- header START -->
        <blog-list-header :headline="headline"></blog-list-header>
        <!-- header END -->

        <!-- 标签云 START -->
        <div class="ui attached segment m-cloud">
          <div class="ui tag labels">
            <router-link :to="`/tag/${tag.id}`" class="ui label" v-for="tag in tags" :key="tag.id" :class="tag.id==param?'red':''">{{tag.name}}</router-link>
          </div>
        </div>
        <!-- 标签云 END -->

        <!-- content START -->

        <blog-list class="ui top attached teal segment" :list="list"></blog-list>
        <!-- content END -->

        <!-- 分页 -->
        <blog-list-footer :pages="page" @getPageNum="toPage($event)" />
      </div>
    </div>
    <!-- 主体内容 END -->
    <the-footer />
  </div>
</template>

<script>
import TheHeader from "@/components/common/TheHeader.vue";
import TheFooter from "@/components/common/TheFooter.vue";
import BlogListHeader from "@/components/BlogListHeader.vue";
import BlogListFooter from "@/components/BlogListFooter.vue";
import BlogList from "@/components/BlogList.vue";

import api from "@/api/tag.js";
import paging from "@/data/pages.js";
export default {
  name: "Tags",
  components: {
    TheHeader,
    TheFooter,
    BlogListHeader,
    BlogListFooter,
    BlogList,
  },
  data() {
    return {
      headline: {
        title: "标签",
        count: 7,
      },
      param:this.$route.params.tagId,
      tags:[],
      list:[],
      page:{},
      // 记录要跳转的页码
      pageNum: 1,
    };
  },
  mounted(){
    this.renderTagCloud();
    this.renderBlogList();
  },
  watch:{
    $route(){
      this.param = this.$route.params.tagId;
      this.renderBlogList(this.pageNum);
    }
  },
  methods:{
    async renderTagCloud(){
      this.tags = await api.font.getTagCloud();
    },

    async renderBlogList(pageNum){
      let rs = await api.font.getBlogListByTagId({"tagId":this.param,"pageNum":pageNum});
      if(rs != null){
        this.list = rs.list;
        this.headline.count = rs.total;
        this.page = paging(rs);
      }else{
        this.headline.count = 0;
      }
    },

    toPage(pageNum){
      this.pageNum = pageNum;
      this.renderBlogList(pageNum);
    },

  }
};
</script>

<style scoped>
.m-container-small {
  max-width: 66em !important;
  margin: auto !important;
}

/* 分类云 标签云 */

.m-cloud {
  padding: 2em 1.5em !important;
}

/* ------ 移动端 ------ */

@media screen and (max-width: 768px) {
  /* container footer */
  .m-padding-large-responsive {
    padding: 2em 0 !important;
  }
}
</style>
