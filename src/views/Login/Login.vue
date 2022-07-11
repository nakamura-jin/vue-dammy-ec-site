<style lang="scss" scoped>
  @use './login';
</style>
<template>
  <div class="login">
    <div class="login__container">
      <h3 class="login__title">ログイン</h3>
      <span v-if="error" class="login__error">{{ error }}</span>
      <div class="login__card">
        <form @submit.prevent="login">
          <label class="label">メールアドレス</label>
          <input type="text" class="login__email" v-model="form.email">
          <label class="label">パスワード</label>
          <input :type="display ? 'text' : 'password'" class="login__password" v-model="form.password">
          <div class="login__switch-password">
            <input type="checkbox" id="check1" v-model="display">
            <label for="check1" class="login__show">パスワードを表示する</label>
          </div>
          <button class="login__button">ログイン</button>
        </form>
      </div>
    </div>
  </div>
</template>

<script>
import $auth from '@/services/authService'
import get from 'lodash/get'

export default {
  beforeRouteEnter(to, from, next) {
    sessionStorage.setItem('path', from.path)
    next()
  },
  data() {
    return {
      form: {
        email: '',
        password: ''
      },
      display: false,
      error: '',
    }
  },
  methods: {
    async login() {
      const auth = await $auth.login(this.form)
      const result = get(auth, 'data.result', false)
      const error = auth.data.error === "Unauthorized"

      const path = sessionStorage.getItem('path')
      if(result && path) this.$router.push(`${path}`)
      else if (result) this.$router.push('/')
      else if (error) this.error = 'メールアドレスまたはパスワードに誤りがあります'
    }
  }
}
</script>