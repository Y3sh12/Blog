<template>
  <div class="">
    <!-- 文章列表 -->
    <div class="ui vertical segment m-summary-responsive" v-for="blog in list" :key="blog.id">
      <div class="ui mobile reversed stackable grid">
        <!-- 文章概要 START -->
        <div class="eleven wide column">
          <h3 class="ui header m-blog-title">
            <router-link
              :to="`/type/${blog.typeId}`"
              class="ui orange label m-padding-tiny m-text-thin"
            >
              {{blog.typeName}}
            </router-link>

            <router-link :to="`/blog/${blog.id}`" class="m-black">
              {{blog.title}}
            </router-link>
          </h3>
          <p class="m-text">
            {{blog.description}}
          </p>
          <!-- 博文信息 -->
          <div class="ui stackable grid">
            <div class="eleven wide column">
              <div class="ui mini horizontal link list m-blog-info">
                <div class="item">
                  <i class="calendar icon"></i><em>{{issueDate(blog.updateTime)}}</em>
                </div>
                <div class="item">
                  <i class="eye icon"></i>&nbsp;<em>{{blog.views}}</em>
                </div>
                <div class="item">
                  <i class="comment icon"></i>&nbsp;<em>{{blog.comments}}</em>
                </div>
              </div>
            </div>
            <!-- 博文标签 -->
            <div class="right aligned five wide column">
              <router-link
                :to="`/tag/${tags(blog.tagId)[i]}`"
                class="ui teal basic label m-padding-mini m-text-thin"
                v-for="(tag,i) in tags(blog.tagName)" :key="i"
              >
                {{tag}}
              </router-link>
            </div>
          </div>
        </div>
        <!-- 文章概要 END -->
        <!-- 展示图 START -->
        <div class="five wide column">
          <router-link to="/blog" target="_blank">
            <img
              :src="blog.image"
              alt="图片占位符"
              class="ui rounded fluid image"
            />
          </router-link>
        </div>
        <!-- 展示图 END -->
      </div>
    </div>
  </div>
</template>

<script>
// 时间格式化
import { formatIssueDate } from "@/utils/format-date.js";
import {splitStr} from "@/utils/common.js";
export default {
  name: "BlogList",
  props:["list"],

  components: {},
  data(){
    return{
      
    }
  },
  computed: {
    // 时间格式化
    issueDate() {
      return function (date) {
        return formatIssueDate(date);
      };
    },
    // 字符串转为数组
    tags(){
      return function(str){
        return splitStr(str);
      }
    }
  },
};
</script>

<style scoped>
.m-summary-responsive {
  padding: 3em 1em !important;
}

.m-summary-responsive p.m-text {
  line-height: 1.5;
}

/* 分类标识 */

.m-blog-title > a {
  margin-left: 0 !important;
}

.m-blog-title > a:nth-last-child(2) {
  margin-right: 0.5rem !important;
}

/* 图标 */

.m-blog-info .item > .icon {
  vertical-align: baseline !important;
}

/* ------ 移动端 ------ */

@media screen and (max-width: 768px) {
  .m-summary-responsive {
    padding: 1em 0 !important;
  }
}
</style>
