<style lang="scss" scoped>
  @use './AddCart';
</style>
<template>
  <div class="add-cart">
    <div class="add-cart__container">
      <h3 class="add-cart__title">カートに追加いたしました</h3>
      <button class="add-cart__btn">注文画面へすすむ</button>
      <button class="add-cart__btn" @click="goToMenu">メニュー画面へ</button>
      <button class="add-cart__btn" @click="goToCart">カート画面へ</button>
    </div>
  </div>
</template>

<script>
export default {
  /******************************************
   * methods
   ******************************************/

  methods: {
    goToMenu() {
      this.$router.push('/menu')
      this.$store.dispatch('modals/modal', false)
      this.$store.dispatch('modals/selectModal', '')
    },

    goToCart() {
      const id = Number(JSON.parse(sessionStorage.getItem('data')).user)
      this.$router.push(`/cart/${id}`)
      this.$store.dispatch('modals/modal', false)
      this.$store.dispatch('modals/selectModal', '')
    }
  }
}
</script>