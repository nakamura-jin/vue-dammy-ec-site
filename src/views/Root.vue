<template>
  <div class="root">
    <the-header />
    <router-view></router-view>
  </div>
</template>

<script>
import TheHeader from '@/components/Header/TheHeader.vue'
export default {
  components: {
    TheHeader
  }
}
</script>