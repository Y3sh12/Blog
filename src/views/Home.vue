<template>
  <div class="home">
    <the-header @pass-data="submit" />
    <div id="blogs" class="m-container m-padding-large-responsive">
      <div class="ui container">
        <div class="ui stackable grid">
          <!-- 左边博客列表 START -->
          <div class="eleven wide column">
            <!-- header -->
            <blog-list-header :headline="headline"></blog-list-header>
            <!-- content 列表 -->
            <blog-list class="ui attached segment" :list="list" v-if="headline.count > 0"></blog-list>
            <div class="ui blue info message" v-else>请稍候，博主正在编辑中....</div>
            <!-- footer 分页 -->
            <blog-list-footer :pages="page" @getPageNum="toPage($event)" v-show="headline.count>0" />
          </div>
          <!-- 左边博客列表 END -->

          <!-- 右边栏 START -->
          <div class="five wide column m-aside">
            <!-- 作者 START -->
            <div class="ui center aligned segment">
              <a href="#">
                <img
                  src="https://picsum.photos/id/20/100/100"
                  alt="用户头像"
                  class="ui circular centered image"
                />
              </a>
              <div class="m-name">Sanna</div>
              <div class="m-introduction">博主是个懒人，什么也没留下...</div>
              <div class="ui divider"></div>
              <div class="ui three column grid">
                <div class="column">
                  文章
                  <p class="m-margin-tiny">{{count.blogTotal}}</p>
                </div>
                <div class="column">
                  访问
                  <p class="m-margin-tiny">{{count.blogViewTotal}}</p>
                </div>
                <div class="column">
                  评论
                  <p class="m-margin-tiny">{{count.commentTotal}}</p>
                </div>
              </div>
            </div>
            <!-- 作者 END -->

            <!-- 分类 START -->
            <div class="ui segments">
              <!-- 标题 -->
              <div class="ui secondary segment">
                <div class="ui two column grid">
                  <div class="column"><i class="th icon"></i>分类</div>
                  <div class="right aligned column">
                    <router-link to="/type/1">
                      more <i class="angle double right icon m-icon-align"></i>
                    </router-link>
                  </div>
                </div>
              </div>
              <!-- 子项 -->
              <div class="ui teal segment">
                <div class="ui fluid vertical menu m-types-items">
                  <router-link :to="`/type/${type.id}`" class="item" v-for="type in types" :key="type.id">
                    {{type.name}}
                    <div class="ui teal circular label">{{type.total}}</div>
                  </router-link>
                </div>
              </div>
            </div>
            <!-- 分类 END -->

            <!-- 标签 START -->
            <div class="ui segments">
              <!-- 标题 -->
              <div class="ui secondary segment">
                <div class="ui two column grid">
                  <div class="column"><i class="tags icon"></i>标签</div>
                  <div class="right aligned column">
                    <router-link to="/tag/1">
                      more <i class="angle double right icon m-icon-align"></i>
                    </router-link>
                  </div>
                </div>
              </div>
              <!-- 子项 -->
              <div class="ui teal segment">
                <router-link :to="`/tag/${tag.id}`"
                  class="ui teal basic left pointing label m-margin-tiny"
                  v-for="tag in tags" :key="tag.id"
                >
                  {{tag.name}}
                  <div class="detail">{{tag.total}}</div>
                </router-link>
              </div>
            </div>
            <!-- 标签 END -->

            <!-- 最新推荐 START -->
            <div class="ui segments">
              <!-- 标题 -->
              <div class="ui secondary segment m-recomm-hd">
                <div class="column"><i class="bookmark icon"></i>最新推荐</div>
              </div>
              <!-- 子项 -->
              <div class="ui segment" v-for="blog in recommendation" :key="blog.id">
                <router-link :to="`/blog/${blog.id}`" class="m-black m-text-thin">
                  {{blog.title}}
                </router-link>
              </div>
            </div>
            <!-- 最新推荐 END -->

            <!-- 站点信息 START -->
            <div class="ui segments">
              <!-- 标题 -->
              <div class="ui secondary segment">
                <div class="column"><i class="info icon"></i>站点信息</div>
              </div>
              <!-- 子项 -->
              <div class="ui teal segment">
                <div class="ui list m-text">
                  <div class="item">文章总数：<span>{{count.blogTotal}}</span></div>
                  <div class="item">分类总数：<span>{{count.typeTotal}}</span></div>
                  <div class="item">标签总数：<span>{{count.tagTotal}}</span></div>
                  <div class="item">网站访问量：<span>{{count.blogViewTotal}}</span></div>
                  <div class="item">评论数量：<span>{{count.commentTotal}}</span></div>
                  <div class="item">留言数量：<span>{{count.messageTotal}}</span></div>
                  <div class="item">运行天数：<span>3</span></div>
                  <div class="item">
                    最后更新：<span>{{latest(count.lastUpdateTime)}}</span>
                  </div>
                  <div class="item">建站时间：<span>2021年12月15日</span></div>
                </div>
              </div>
            </div>
            <!-- 站点信息 END -->
          </div>
          <!-- 右边栏 END -->
        </div>
      </div>
    </div>
    <the-footer />
  </div>
</template>

<script>
// @ is an alias to /src
import TheHeader from "@/components/common/TheHeader.vue";
import TheFooter from "@/components/common/TheFooter.vue";
import BlogList from "@/components/BlogList.vue";
import BlogListHeader from "@/components/BlogListHeader.vue";
import BlogListFooter from "@/components/BlogListFooter.vue";

import api from "@/api/blog.js";
// 分页对象封装
import paging from "@/data/pages.js";

import {formatLastUpdateTime} from "@/utils/format-date.js";

export default {
  name: "Home",
  components: {
    TheHeader,
    TheFooter,
    BlogList,
    BlogListHeader,
    BlogListFooter,
  },
  data() {
    return {
      headline: {
        title: "我的博客",
        count: 0,
      },
      list:[],
      page:{},
      recommendation:[],
      types:[],
      tags:[],
      count:{},
    };
  },
  computed:{
    latest(){
      return function (date){
        return formatLastUpdateTime(date);
      }
    }
  },
  created(){
    // 初始化
    this.renderBlogList();
    this.renderCard();
  },
  mounted(){},
  methods:{
    async renderBlogList(data) {
      let rs = await api.font.getBlogList(data);
      this.list = rs.list;
      this.page = paging(rs);
      this.headline.count = this.page.total;
    },
    async renderCard(){
      this.recommendation = await api.font.getRecommendation();
      this.types = await api.font.getType();
      this.tags = await api.font.getTag();
      this.count = await api.font.getCount();
    },
    toPage(number){
      this.renderBlogList(number);
    },
    submit(data){
      if(data.list.length > 0){
        this.list = data.list;
        this.page = paging(data);
        this.headline.count = this.page.total;
      }else {
        this.headline.count = 0;
      }
    }
  }
};
</script>

<style scoped>
/* 版心 */
.m-container {
  max-width: 78em !important;
  margin: auto !important;
}

/* 侧边栏卡片区 */
/* 卡片 */

.m-aside > div:nth-child(n + 2) {
  margin-top: 2em;
}

/* 博主名字 */

.m-name {
  padding: 0.5em 0;
  font-weight: 700;
  font-size: 1.142857rem;
}

/* 博主简介 */

.m-introduction {
  font-size: 0.857rem;
  font-weight: 300;
}

/* ‘更多’图标 */

.icon.m-icon-align {
  vertical-align: text-top;
}

/* 分类子项数字 */

.m-types-items .label {
  margin-top: -0.36em !important;
}

/* 最新推荐 */

.m-recomm-hd {
  border-bottom: 2px solid #00b5ad !important;
}

/* ------ 移动端 ------ */

@media screen and (max-width: 768px) {
  /* container footer */
  .m-padding-large-responsive {
    padding: 2em 0 !important;
  }
}
</style>
