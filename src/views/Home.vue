<style lang="scss" scoped>
  @use '@/styles/home';
</style>
<template>
  <div class="home">
    <div class="home__container">
      <swiper />
    </div>
  </div>
</template>

<script>
import $http from '@/services/httpService'
import Swiper from '@/components/Swiper/Swiper.vue'

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
