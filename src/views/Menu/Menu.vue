<style lang="scss" scoped>
  @use './menu.scss';
</style>

<template>
  <div class="menu">
    <div class="menu__container">
      <div class="menu__card" v-for="(menu, index) in menus" :key="index" @click="menuDetails(menu)" @mouseover="open(index)" @mouseleave="close()">
        <div class="menu__img">
          <img :src="menu.image" alt="">
        </div>

        <div class="menu__content" :class="{ 'up' : index === hover_index }">
          <div class="menu__inner" v-if="index === hover_index">
            <p class="menu__title">{{ menu.name }}</p>
            <p class="menu__price">{{ menu.price }} 円</p>
          </div>
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
      hover_index: null
    }
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

    open(index) {
      this.hover_index = index
    },

    close() {
      this.hover_index = null
    }
  }
}
</script>