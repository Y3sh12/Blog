<template>
  <div>
    <the-header />
    <!-- 主体内容 START -->
    <div class="m-container-small m-padding-large-responsive">
      <div class="ui container">
        <!-- header START -->
        <blog-list-header :headline="headline"></blog-list-header>
        <!-- header END -->

        <!-- 分类云 START -->
        <div class="ui attached segment m-cloud">
          <div class="ui labeled button m-margin-tiny" v-for="type in types" :key="type.id">
            <router-link :to="`/type/${type.id}`" class="ui basic button" :class="type.id==param?'teal':''" @click="renderBlogList">{{type.name}}</router-link>
            <div class="ui basic left pointing label"  :class="type.id==param?'teal':''">{{type.total}}</div>
          </div>
        </div>
        <!-- 分类云 END -->

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
import BlogList from "@/components/BlogList.vue";
import BlogListFooter from "@/components/BlogListFooter.vue";
import BlogListHeader from "@/components/BlogListHeader.vue";

import api from "@/api/type.js";
import paging from "@/data/pages.js";
export default {
  name: "Types",
  components: {
    TheHeader,
    TheFooter,
    BlogList,
    BlogListFooter,
    BlogListHeader,
  },
  data() {
    return {
      headline: {
        title: "分类",
        count: 0,
      },
      param:this.$route.params.typeId,
      types:[],
      list:[],
      page:{},
      // 记录要跳转的页码
      pageNum: 1,
    };
  },
  mounted(){
    this.renderTypeCloud();
    this.renderBlogList();
  },
  watch:{
    $route(){
      this.param = this.$route.params.typeId;
      this.renderBlogList(this.pageNum);
    }
  },
  methods:{
    async renderTypeCloud(){
      this.types = await api.font.getTypeCloud();
    },
    
    async renderBlogList(pageNum){
      let rs = await api.font.getBlogListByTypeId({"typeId":this.param,"pageNum":pageNum});
      if(rs){
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
    }
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
