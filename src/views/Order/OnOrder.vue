<style lang="scss" scoped>
  @use './OnOrder';
</style>
<template>
  <div class="on-order">
    <div class="on-order__container">
      <p class="on-order__title">注文履歴</p>
      <div class="on-order__card" @click="switchToggle(index)" v-for="(order, index) in orders" :key="`order-${index}`">
        <div class="on-order__text">
          <span>{{ order.created_at | date_time(order.created_at) }}</span>
          <span :class="{ 'open' : toggle && index === toggle_index }"><font-awesome-icon :icon="['fas', 'angle-down']" /></span>
        </div>
        <div class="order-list" v-if="toggle && index === toggle_index" @click.stop>
          <table>
            <tr>
              <th class="order-list__name">商品名</th>
              <th class="order-list__quantity">数量</th>
              <th class="order-list__price">金額</th>
            </tr>
            <tr v-for="(menu, index) in order.menu" :key="`menu-${index}`">
              <td>{{ menu.name }}</td>
              <td>{{ menu.quantity }}</td>
              <td>{{ menu.price }}</td>
            </tr>
          </table>
          <div class="order-list__total-price">
            <p >合計: {{ total | numberFormat(total) }} 円</p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import $http from '@/services/httpService'
import dayjs from 'dayjs'

export default {
  data() {
    return {
      id: Number(JSON.parse(sessionStorage.getItem('data')).user),
      orders: [],
      toggle: false,
      toggle_index: null
    }
  },

  /******************************************
   * created
   ******************************************/

  created() {
    this.getOrder()
  },

  /******************************************
   * computed
   ******************************************/

  computed: {
    total() {
      let price = 0
      const orders = this.orders
      for(let i in orders) {
        const menu = orders[i].menu
        for(let j in menu) {
          price = price + (menu[j].price * menu[j].quantity)
        }
      }
      return price
    },
  },

  /******************************************
   * filters
   ******************************************/

  filters: {
    date_time(date) {
      return dayjs(date).format('YYYY-MM-DD HH:mm')
    },
    numberFormat(total) {
      return total.toLocaleString()
    }
  },

  /******************************************
   * methods
   ******************************************/

  methods: {
    async getOrder() {
      const response = await $http.get(`order/${this.id}`)
      this.orders = response.data.orders

      for(let i in this.orders) {
        const menus = this.orders[i].menu
        const quantity = this.orders[i].quantity
        for(let j in menus) {
          for(let q in quantity) {
            menus[j].quantity = quantity[q]
          }
        }
      }
    },
    switchToggle(index) {
      if(index === this.toggle_index) {
        this.toggle = false
        this.toggle_index = null
        return
      }
      this.toggle = true
      this.toggle_index = index
    }
  }
}
</script>