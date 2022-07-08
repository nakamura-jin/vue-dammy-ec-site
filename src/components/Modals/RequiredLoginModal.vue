<style lang="scss" scoped>
  @use './requiredLoginModal';
</style>
<template>
  <div class="login-modal">
    <div class="login-modal__container">
      <p class="login-modal__title">ログインが必要です</p>
      <button class="login-modal__login-button" @click="goToLogin">ログインする</button>
      <p class="login-modal__register">会員登録がお済みでない方はこちら</p>
      <button class="login-modal__register-button">会員登録</button>
    </div>
  </div>
</template>

<script>
export default {
  methods: {
    goToLogin() {
      this.$store.dispatch('modals/modal', false)
      this.$store.dispatch('modals/selectModal', '')
      this.$router.push('/login')
    }
  }
}
</script>