<template>
  <tfoot>
    <tr>
      <th colspan="4">
        共
        <em>{{ pages.total }}</em>
        条记录
      </th>
      <th colspan="10">
        <div class="ui right floated pagination menu">
          <a class="icon item" v-show="pages.hasPreviousPage" @click="paging(pages.prePage)">
            <i class="left chevron icon"></i>
          </a>
          <a
            class="item"
            v-for="(number, i) in pages.pageNumberList"
            :key="i"
            :class="number == pages.currentPage ? 'active' : ''"
            @click="paging(number)"
          >
            {{ number }}
          </a>
          <a class="icon item" v-show="pages.hasNextPage" @click="paging(pages.nextPage)">
            <i class="right chevron icon"></i>
          </a>
        </div>
      </th>
    </tr>
  </tfoot>
</template>
<script>
export default {
  name: "DataPaging",
  props: ["pages"],
  data() {
    return {};
  },
  methods:{
    paging(number){
      this.$emit('getPageNum',number);
    }
  }
};
</script>
<style scoped>
tfoot .ui.menu .item.disabled:hover {
  cursor: not-allowed !important;
}

tfoot > tr > th:first-child {
  border-right: 0 !important;
  text-align: left !important;
  letter-spacing: 1px !important;
}

tfoot > tr > th:first-child em {
  padding: 0 0.6rem !important;
  font-size: 1.5rem !important;
  color: #f2711c;
}

tfoot > tr > th:last-child {
  border-left: 0 !important;
}
</style>