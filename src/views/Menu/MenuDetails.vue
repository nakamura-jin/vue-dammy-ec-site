<style lang="scss" scoped>
  @use './menuDetails.scss';
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
        <div class="details__order" v-if="!inCart">
          <span class="details__quantity">数量:</span>
          <select class="details__select" v-model="quantity">
            <option value="1">1</option>
            <option value="2">2</option>
            <option value="3">3</option>
            <option value="4">4</option>
            <option value="5">5</option>
          </select>
          <button class="details__cart" @click="add(menu.id)"><font-awesome-icon class="details__icon" icon="fa-solid fa-cart-shopping" />カートに追加</button>
        </div>
        <button class="details__cart-remove" v-if="inCart" @click="remove(menu.id)"><font-awesome-icon class="details__icon" icon="fa-solid fa-cart-shopping" />カートから削除</button>
      </div>
    </div>
  </div>
</template>

<script>
import $http from '@/services/httpService'
import AddCart from '@/components/Modals/AddCart.vue'

export default {
  data() {
    return {
      quantity: 1,
      user_id: Number(JSON.parse(sessionStorage.getItem('data')).user)
    }
  },

  /******************************************
   * created
   ******************************************/

  created() {
    this.getMenuDetails();
  },

  /******************************************
   * computed
   ******************************************/

  computed: {
    menu() {
      return this.$store.getters['menus/details']
    },

    inCart() {
      const cart = this.$store.getters['carts/carts']
      for(let i = 0; i < cart.length; i++) {
        if(cart[i].id === this.menu.id) return true
      }
      return false
    }
  },

  /******************************************
   * methods
   ******************************************/
  methods: {
    async getMenuDetails() {
      const id = this.$route.params.id
      const response = await $http.get(`menu/${id}`)
      this.$store.dispatch('menus/details', response.data.menu)

      const cart = this.$store.getters['carts/carts']
      if(cart.length > 0) return

      const cartResponse = await $http.get(`/cart/${this.user_id}`)
      const carts = cartResponse.data.cart
      for(let i = 0; i < carts.length; i++) {
        this.$store.dispatch('carts/carts', carts[i].menu[0])
      }
    },

    async add(id) {
      const query = {};
      query['user_id'] = this.user_id;
      query['quantity'] = Number(this.quantity);
      query['menu_id'] = id

      await $http.post('/cart', query)
      this.$store.dispatch('modals/modal', true)
      this.$store.dispatch('modals/selectModal', AddCart)
    },

    remove(id) {
      console.log(id)
    }
  }
}
</script>