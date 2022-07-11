<style lang="scss" scoped>
  @use './Order';
</style>
<template>
  <div class="order">
    <div class="order__container">
      <div class="order__info" v-if="carts.length > 0">
        <h3 class="order__user-title">お客様情報</h3>
        <div class="order__user-text">
          <div class="order__user-name">
            <span>氏名: </span>
            <span>{{ user.name }}</span>
          </div>
          <div class="order__user-phone">
            <span>連絡先番号: </span>
            <span>{{ user.phone }}</span>
          </div>
        </div>
        <h3>注文商品</h3>
        <div class="order__menu" v-for="cart in carts" :key="cart.id">
          <div class="order__image">
            <img :src="cart.image" alt="">
          </div>
          <div class="order__content">
            <div class="order__menu-text">
              <p class="order__menu-name">{{ cart.name }}</p>
              <p class="order__menu-price">{{ cart.price }} 円</p>
            </div>
            <div class="order__quantity" :value="cart.quantity" @change="changeQuantity($event, cart)">
              <select :value="cart.quantity">
                <option value="1">1</option>
                <option value="2">2</option>
                <option value="3">3</option>
                <option value="4">4</option>
                <option value="5">5</option>
              </select>
            </div>
            <div class="order__delete">
              <button @click="deleteCart(cart.cart_id)"><font-awesome-icon icon="fa-solid fa-xmark" /></button>
            </div>
          </div>
        </div>
        <div class="order__payment">
          <div class="order__total">
            <p>合計 :</p>
            <p>{{ total | numberFormat(total) }} 円</p>
          </div>
          <button class="order__decision" @click="order">確定する</button>
        </div>
      </div>
      <template v-else>
        <div class="order__no-cart">
          <p>カートに保存されていません</p>
        </div>
      </template>
    </div>
  </div>
</template>

<script>
import $http from '@/services/httpService'
import cartMixin from '@/mixins/cartMixin'
import RequiredLoginModal from '@/components/Modals/RequiredLoginModal.vue'

export default {
  mixins: [ cartMixin ],
  data() {
    return {
      // id: Number(JSON.parse(sessionStorage.getItem('data')).user),
      id: null,
      user: []
    }
  },
  /******************************************
   * created
   ******************************************/

  created() {
    this.getData()
  },

  /******************************************
   * computed
   ******************************************/

  computed: {
    total() {
      let totalPrice = 0
      const cart = this.carts
      for(let i = 0; i < cart.length; i++) {
        totalPrice = (cart[i].price * cart[i].quantity) + totalPrice
      }
      return totalPrice
    }
  },

  filters: {
    numberFormat(total) {
      return total.toLocaleString()
    }
  },

  /******************************************
   * methods
   ******************************************/
  methods: {
    async getData() {
      const user = sessionStorage.getItem('data')
      if(user === null) {
        this.$store.dispatch('modals/modal', true)
        this.$store.dispatch('modals/selectModal', RequiredLoginModal)
        return
      }

      this.id = Number(JSON.parse(user).user)
      const response = await $http.get(`user/${this.id}`)
      this.user = response.data.user

      if(this.carts.length === 0) this.getCart()
    },

    async order() {
      const carts = this.carts
      // menu_id, quantity, cart_idを配列にしてPOSTする
      const menu_id = [];
      const quantity = [];
      const cart_id = [];
      for(let i in carts) {
        menu_id.push(carts[i].id)
        quantity.push(carts[i].quantity)
        cart_id.push(carts[i].cart_id)
      }

      const query = {}
      query['user_id'] = this.user.id
      query['menu_id'] = menu_id
      query['quantity'] = quantity
      query['cart_id'] = cart_id
      query['payment_flag'] = 1

      await $http.post('order', query)
      this.$store.dispatch('carts/allDelete')
    }
  }
}
</script>