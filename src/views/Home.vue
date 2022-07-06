<style lang="scss" scoped>
  @use '@/styles/home';
</style>
<template>
  <div class="home">
    <div class="home__container">
      <swiper />
      <!-- <div class="home__menu-list">
        <div class="card" v-for="menu in menus" :key="menu.id" @click="menuDetails(menu)">
          <div class="card__img">
            <img :src="menu.image" alt="">
          </div>
          <div class="card__wrapper">
            <h3 class="card__title">{{ menu.name }}</h3>
            <span class="card__genre">{{ menu.genre }}</span>
            <p class="card__price">{{ menu.price }}円</p>
            <div class="card__order">
              <button class="card__cart-add" @click="add(menu.id)" @click.stop><font-awesome-icon class="card__icon" icon="fa-solid fa-cart-shopping" />カートに追加</button>
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
      </div> -->
    </div>
  </div>
</template>

<script>
import $http from '@/services/httpService'
import Swiper from '@/components/Swiper.vue'

export default {
  components: {
    Swiper
  },
  /******************************************
   * created
   ******************************************/

  created() {
    this.getMenus()
  },

  /******************************************
   * computed
   ******************************************/

  computed: {
    menus() {
      return this.$store.getters['menus/menus']
    }
  },

  /******************************************
   * methods
   ******************************************/
  methods: {
    async getMenus() {
      const response = await $http.get('menus')
      this.$store.dispatch('menus/menus', response.data.menus)
    },

    menuDetails(menu) {
      this.$store.dispatch('menus/details', menu)
      this.$router.push(`/menu/${menu.id}`)
    },

    add(id) {
      console.log(id)
    }
  }
}
</script>
