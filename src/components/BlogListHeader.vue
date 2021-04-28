<template>
  <div class="ui top attached segment">
    <div class="ui middle aligned two column grid">
      <div class="column">
        <h3 class="ui teal header m-header-title">{{ headline.title }}</h3>
      </div>
      <div class="right aligned column">
        共
        <em class="ui orange header m-article-num">{{ headline.count }}</em>
        篇
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "BlogListHeader",
  props: {
    headline: Object,
  },
};
</script>

<style scoped>
.m-header-title {
  font-weight: 400 !important;
  letter-spacing: 1px !important;
}

.m-article-num {
  padding: 0 0.7rem !important;
  font-size: 1.5rem !important;
}
</style>
