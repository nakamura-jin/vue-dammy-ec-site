<style lang="scss" scoped>
  @use './Order';
</style>
<template>
  <div class="order">
    <div class="order__container">
      <div class="order__info">
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
            <div class="order__quantity">
              <select :value="cart.quantity">
                <option value="1">1</option>
                <option value="2">2</option>
                <option value="3">3</option>
                <option value="4">4</option>
                <option value="5">5</option>
              </select>
            </div>
            <div class="order__delete">
              <button><font-awesome-icon icon="fa-solid fa-xmark" /></button>
            </div>
          </div>
        </div>
        <div class="order__payment">
          <div class="order__total">
            <p>合計 :</p>
            <p>{{ total | numberFormat(total) }} 円</p>
          </div>
          <button class="order__decision">確定する</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import $http from '@/services/httpService'

export default {
  data() {
    return {
      id: Number(JSON.parse(sessionStorage.getItem('data')).user),
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
    carts() {
      return this.$store.getters['carts/carts']
    },

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
      const response = await $http.get(`user/${this.id}`)
      this.user = response.data.user
      this.getCart()
    },
    /**
     * カートの商品有無確認 無ければDBから取得
     */
    async getCart() {
      if(this.carts.length > 0) return

      const response = await $http.get(`/cart/${this.id}`)
      const cart = response.data.cart

      // メニューに数量追加してstoreへ保存
      const menus = [];
      for(let i = 0; i < cart.length; i++) {
        cart[i].menu[0]['quantity'] = cart[i].quantity
        menus.push(cart[i].menu[0])
      }
      this.$store.dispatch('carts/carts', menus)
    }
  }
}
</script>