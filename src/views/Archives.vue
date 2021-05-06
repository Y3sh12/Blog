<template>
  <div>
    <the-header />

    <div class="m-container-small m-padding-large-responsive">
      <div class="ui container">
        <!-- header START -->
        <blog-list-header :headline="headline"></blog-list-header>
        <!-- header END -->

        <!-- content START -->
        <div v-for="(block,i) in list" :key="i">
          <h3 class="ui center aligned header">{{block.year}}</h3>
          <div class="ui fluid vertical menu m-title-menu">
            <router-link :to="`/blog/${item.id}`" class="item" v-for="item in block.blogList" :key="item.id">
              <span>
                <i class="mini teal caret right icon"></i>
                <em>{{item.title}}</em>
                <div
                  class="ui teal basic left pointing label m-padding-tiny m-text-thin"
                >
                  {{formatDate(item.updateTime)}}
                </div>
              </span>
              <div class="ui orange basic label m-text-thin">{{item.mark}}</div>
            </router-link>
        </div>
        </div>
        <!-- content END -->
      </div>
    </div>

    <the-footer />
  </div>
</template>

<script>
import BlogListHeader from "@/components/BlogListHeader.vue";
import TheHeader from "@/components/common/TheHeader.vue";
import TheFooter from "@/components/common/TheFooter.vue";

import api from "@/api/blog.js";
// 分页对象封装
import paging from "@/data/pages.js";

import {formatArchiveDate} from "@/utils/format-date.js";
export default {
  name: "Archives",
  components: {
    BlogListHeader,
    TheHeader,
    TheFooter,
  },
  data() {
    return {
      headline: {
        title: "我的博客",
        count: 0,
      },
      list:[],
    };
  },
  computed:{
    formatDate(){
      return function(date){
        return formatArchiveDate(date);
      }
    }
  },
  created(){
    // 初始化
    this.renderBlogList();
  },
  methods:{
    async renderBlogList() {
      this.list = await api.font.archive();
      let count = await api.font.getCount();
      this.headline.count = count.blogTotal;
      console.log(this.headline.count)
    },
  }
};
</script>

<style scoped>
.m-container-small {
  max-width: 66em !important;
  margin: auto !important;
}

/* ‘原创’标识 */

.m-title-menu > .item > div.label {
  margin-top: 0 !important;
}

.m-title-menu em {
  padding: 0 0.2em 0 0.3em;
}

.ui.header:first-child {
  margin: calc(2rem - .14285714em) 0 1rem;
}
/* ------ 移动端 ------ */

@media screen and (max-width: 768px) {
  /* container footer */
  .m-padding-large-responsive {
    padding: 2em 0 !important;
  }
}
</style>
