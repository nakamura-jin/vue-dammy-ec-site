<style lang="scss" scoped>
  @use './header';
</style>
<template>
  <div class="header">
    <div class="header__container">
      <router-link to="/"><h2 class="header__title">Dammy Take Out</h2></router-link>
      <div class="header__nav">
        <button class="header__list" @click="$router.push('/menu')"><font-awesome-icon class="header__icon" icon="fa-solid fa-utensils" /><span>メニュー</span></button>
        <button class="header__list" v-if="!loggedIn" @click="$router.push('/login')"><font-awesome-icon class="header__icon" icon="fa-solid fa-right-to-bracket" /><span>ログイン</span></button>
        <button class="header__list"><font-awesome-icon class="header__icon" icon="fa-solid fa-mobile-screen-button" /><span>注文する</span></button>
        <button class="header__list" v-if="!loggedIn"><font-awesome-icon class="header__icon" icon="fa-solid fa-id-card" /><span>会員登録</span></button>
        <button class="header__list" v-if="loggedIn" @click="goToCart"><font-awesome-icon class="header__icon" icon="fa-solid fa-cart-shopping" /><span>カート一覧</span></button>
        <button class="header__list" v-if="loggedIn" @click="logout"><font-awesome-icon class="header__icon" icon="fa-solid fa-right-from-bracket" /><span>ログアウト</span></button>
      </div>
    </div>
  </div>
</template>

<script>
import $auth from '@/services/authService'

export default {
  created() {
    this.checkLoggedIn()
  },
  computed: {
    loggedIn() {
      return this.$store.getters['loggedIn']
    }
  },

  methods: {
    async logout() {
      await $auth.logout()
      this.$router.push('/')
    },
    checkLoggedIn() {
      const data = JSON.parse(sessionStorage.getItem('data'))
      if(data && this.loggedIn === false) this.$store.dispatch('loggedIn', true)
    },
    goToCart() {
      const id = JSON.parse(sessionStorage.getItem('data')).user
      this.$router.push(`/cart/${id}`)
    }
  }
}
</script>