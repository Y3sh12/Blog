<template>
  <div class="ui bottom attached segment">
    <div class="ui center aligned grid">
      <div class="four wide column">
        <a href="#" class="ui mini teal basic button" v-show="pages.hasPreviousPage" @click="paging(pages.prePage)">上一页</a>
      </div>
      <div class="eight wide column">
        <div class="ui circular labels m-pages m-mobile-hide">
          <a href="#" class="ui mini teal label"
            v-for="(number, i) in pages.pageNumberList"
            :key="i"
            :class="number == pages.currentPage ? 'active' : 'basic'"
            @click="paging(number)">
            {{ number }}
            </a>
        </div>
      </div>
      <div class="four wide column">
        <a href="#" class="ui mini teal basic button" v-show="pages.hasNextPage" @click="paging(pages.nextPage)">下一页</a>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "BlogListFooter",
  props:["pages"],
  methods:{
    paging(number){
      this.$emit('getPageNum',number);
    }
  }
};
</script>

<style scoped>
/* 分页数字按钮 */

.m-pages > a.label {
  margin-bottom: 0 !important;
}

/* ------ 移动端 ------ */

@media screen and (max-width: 768px) {
  /* 导航菜单隐藏 */
  .m-mobile-hide {
    display: none !important;
  }
}
</style>
