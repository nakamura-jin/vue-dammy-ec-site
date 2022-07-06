<style lang="scss" scoped>
  @use '@/styles/header';
</style>
<template>
  <div class="header">
    <div class="header__container">
      <router-link to="/"><h2 class="header__title">Dammy Take Out</h2></router-link>
      <div class="header__nav">
        <button class="header__list" @click="$router.push('/menu')"><font-awesome-icon class="header__icon" icon="fa-solid fa-utensils" /><span>メニュー</span></button>
        <button class="header__list"><font-awesome-icon class="header__icon" icon="fa-solid fa-right-to-bracket" /><span>ログイン</span></button>
        <button class="header__list"><font-awesome-icon class="header__icon" icon="fa-solid fa-mobile-screen-button" /><span>注文する</span></button>
        <button class="header__list"><font-awesome-icon class="header__icon" icon="fa-solid fa-id-card" /><span>会員登録</span></button>
      </div>
    </div>
  </div>
</template>

