<style lang="scss" scoped>
  @use './cart';
</style>
<template>
  <div class="cart">
    <div class="cart__container">
      <h3 class="cart__title">カート一覧</h3>
      <div class="card" v-for="cart in carts" :key="cart.id" @click="menuDetails(cart)">
        <div class="card__img">
          <img :src="cart.image" alt="">
        </div>
        <div class="card__wrapper">
          <h3 class="card__title">{{ cart.name }}</h3>
          <span class="card__genre">{{ cart.genre }}</span>
          <p class="card__price">{{ cart.price }}円</p>
          <div class="card__order">
            <button class="card__cart-add" @click="add(cart.id)" @click.stop><font-awesome-icon class="card__icon" icon="fa-solid fa-cart-shopping" />カートから削除</button>
            <div class="card__quantity">
            <span>数量: </span>
              <select @click.stop>
                <option value="1">1</option>
                <option value="2">2</option>
                <option value="3">3</option>
                <option value="4">4</option>
                <option value="5">5</option>
              </select>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import $http from '@/services/httpService'

export default {
  /******************************************
   * created
   ******************************************/
  created() {
    this.getCart()
  },
  /******************************************
   * computed
   ******************************************/
  computed: {
    carts() {
      console.log(this.$store.getters['carts/carts'])
      return this.$store.getters['carts/carts']
    }
  },
  /******************************************
   * methods
   ******************************************/
  methods: {
    async getCart() {
      const id = Number(this.$route.params.id)
      const response = await $http.get(`/cart/${id}`)
      const carts = response.data.cart
      for(let i = 0; i < carts.length; i++) {
        this.$store.dispatch('carts/carts', carts[i].menus)
      }
    }
  }
}
</script>