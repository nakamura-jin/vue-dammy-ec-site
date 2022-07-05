<style lang="scss" scoped>
  @use '@/styles/menuDetails.scss';
</style>
<template>
  <div class="details">
    <div class="details__container">
      <div class="details__img">
        <img :src="menu.image" alt="">
      </div>
      <div class="details__wrapper">
        <h3 class="details__title">{{ menu.name }}</h3>
        <p class="details__description">{{ menu.description }}</p>
        <p class="details__price">{{ menu.price }} 円</p>
        <div class="details__order">
          <span class="details__quantity">数量:</span>
          <select class="details__select">
            <option value="1">1</option>
            <option value="2">2</option>
            <option value="3">3</option>
            <option value="4">4</option>
            <option value="5">5</option>
          </select>
          <button class="details__cart-add"><font-awesome-icon class="details__icon" icon="fa-solid fa-cart-shopping" />カートに追加</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import $http from '@/services/httpService'

export default {
  created() {
    this.getMenuDetails();
  },
  computed: {
    menu() {
      return this.$store.getters['menus/details']
    }
  },
  methods: {
    async getMenuDetails() {
      const id = this.$route.params.id
      const response = await $http.get(`menu/${id}`)
      this.$store.dispatch('menus/details', response.data.menu)
    }
  }
}
</script>