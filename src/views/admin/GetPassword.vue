<template>
  <div class="get-pwd">
    <div class="page-container">
      <password-form></password-form>
    </div>
  </div>
</template>
<script>
import PasswordForm from "@/components/PasswordForm.vue";
export default {
  name: "GetPassword",
  components: {
    PasswordForm,
  },
};
</script>
<style scoped>
.get-pwd {
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
}

.page-container {
  overflow: hidden;
  position: relative;
  max-width: 379px;
  width: 100%;
  height: 420px;
  background-color: #e9e9e9;
  border-radius: 0.7rem;
  box-shadow: 0 0.9rem 1.7rem rgba(0, 0, 0, 0.25);
}

.user-find {
  width: 100%;
}
</style>