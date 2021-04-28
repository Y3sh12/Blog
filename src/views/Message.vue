<template>
  <the-header />
  <div class="m-padding-large-responsive">
    <div class="ui container">
      <div class="ui segment">
        <comments-to-leave></comments-to-leave>
        <comments></comments>
      </div>
    </div>
  </div>
  
  <the-footer />
</template>
<script>
import TheHeader from "@/components/common/TheHeader.vue";
import TheFooter from "@/components/common/TheFooter.vue";
import CommentsToLeave from "@/components/CommentsToLeave.vue";
import Comments from "@/components/Comments.vue";
export default {
  name: "Message",
  components: {
    TheHeader,
    TheFooter,
    CommentsToLeave,
    Comments,
  },
};
</script>
<style scoped>
</style>