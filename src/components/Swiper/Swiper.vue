<style lang="scss" scoped>
  @use './swiper.scss';
</style>
<template>
  <div class="slide">
    <hooper
      :autoPlay="true"
      :playSpeed="3000"
      :infiniteScroll="true"
      :wheelControl="false"
      :centerMode="true"
    >
    <slide v-for="menu in menus" :key="menu.id">
      <img class="slide__img" :src="menu.image" alt="">
    </slide>

    <hooper-pagination class="slide__pagination" slot="hooper-addons"></hooper-pagination>
  </hooper>
  </div>
</template>

<script>
import { Hooper, Slide, Pagination as HooperPagination } from 'hooper';
import 'hooper/dist/hooper.css';

export default {
  components: {
    Hooper,
    Slide,
    HooperPagination
  },
  computed: {
    menus() {
      return this.$store.getters['menus/menus']
    }
  }
}
</script>
