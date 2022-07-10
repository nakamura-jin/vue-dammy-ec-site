<style lang="scss" scoped>
  @use './menu.scss';
</style>

<template>
  <div class="menu">
    <div class="menu__container">
      <div class="search">
        <div class="search__container">
          <div class="search__genre">
            <span>ジャンルで絞り込む</span>
            <select class="search__genre-select" v-model="genre">
              <option value="0">全てのジャンル</option>
              <option value="1">肉料理</option>
              <option value="2">揚げ物</option>
              <option value="3">野菜料理</option>
              <option value="4">定番おつまみ</option>
              <option value="5">ごはんもの</option>
            </select>
          </div>
          <div class="search__text">
            <input class="search__input" v-model="keyword" type="text" placeholder="メニュー名で検索">
          </div>
        </div>
      </div>
      <div class="menu__card-wrapper">
        <div class="menu__card" v-for="(menu, index) in searchMenus" :key="index" @click="menuDetails(menu)" @mouseover="open(index)" @mouseleave="close()">
          <div class="menu__img">
            <img :src="menu.image" alt="">
          </div>

          <div class="menu__content" :class="{ 'up' : index === hover_index }">
            <div class="menu__inner" v-if="index === hover_index">
              <p class="menu__title">{{ menu.name }}</p>
              <p class="menu__price">{{ menu.price }} 円</p>
              <p>{{ menu.genre }}</p>
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
  data() {
    return {
      hover_index: null,
      keyword: '',
      genre: 0
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
    },

    searchMenus() {
      const menus = this.$store.getters['menus/menus']
      let filterdMenus = []
      for(let i in menus) {
        let menu = menus[i]
        if(menu.name.indexOf(this.keyword) !== -1 && menu.genre_id === Number(this.genre) || menu.name.indexOf(this.keyword) !== -1 && Number(this.genre) === 0) {
          filterdMenus.push(menu)
        }
      }
      return filterdMenus;
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