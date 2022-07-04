<style lang="scss" scoped>
  @use '@/styles/header';
</style>
<template>
  <div class="header">
    <div class="header__container">
      <router-link to="/"><h2 class="header__title">Dammy Take Out</h2></router-link>
      <div class="header__menu" @click="menu = !menu" :class="{ 'open' : menu }">
        <div class="top"></div>
        <div class="middle"></div>
        <div class="bottom"></div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      menu: false
    }
  }
}
</script>
