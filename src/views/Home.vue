<style lang="scss" scoped>
  @use '@/styles/home';
</style>
<template>
  <div class="home">
    <div class="home__container">
      <swiper />
      <div class="home__category">
        <h3 class="home__category-title">カテゴリー</h3>
        <!-- <div class="home__category-list">
          <button class="home__category-button" :value="1" :class="{'active' : hover_index && index_value === 1}" @mouseover="onAction($event)" @mouseleave="leaveAction">肉料理</button>
          <button class="home__category-button" :value="2" :class="{'active' : hover_index && index_value === 2}" @mouseover="onAction($event)" @mouseleave="leaveAction">揚げ物</button>
          <button class="home__category-button" :value="3" :class="{'active' : hover_index && index_value === 3}" @mouseover="onAction($event)" @mouseleave="leaveAction">野菜料理</button>
          <button class="home__category-button" :value="4" :class="{'active' : hover_index && index_value === 4}" @mouseover="onAction($event)" @mouseleave="leaveAction">定番おつまみ</button>
          <button class="home__category-button" :value="5" :class="{'active' : hover_index && index_value === 5}" @mouseover="onAction($event)" @mouseleave="leaveAction">ごはんもの</button>
        </div> -->
        <div class="home__category-list">
          <button
            v-for="category in categories" :key="category.id"
            class="home__category-button"
            :value="category.id"
            :class="{'active' : hover_index && index_value === category.id}"
            @mouseover="onAction($event)"
            @mouseleave="leaveAction"
            @click="goToMenu(category.id)"
          >{{ category.name }}</button>
        </div>
      </div>
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

  data() {
    return {
      hover_index: false,
      index_value: null,
      categories: [
        { id: 1, name: '肉料理' },
        { id: 2, name: '揚げ物' },
        { id: 3, name: '野菜料理' },
        { id: 4, name: '定番おつまみ' },
        { id: 5, name: 'ごはんもの' },
      ]
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

    onAction(e) {
      this.hover_index = true
      this.index_value = Number(e.target.value)
    },

    leaveAction() {
      this.hover_index = false
      this.index_value = null
    },

    goToMenu(id) {
      this.$store.dispatch('menus/genre', id)
      this.$router.push('/menu')
    }

  }
}
</script>
