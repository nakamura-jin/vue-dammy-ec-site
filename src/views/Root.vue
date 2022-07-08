<template>
  <div class="root">
    <the-header />
    <router-view></router-view>
    <modal />
  </div>
</template>

<script>
import TheHeader from '@/components/Header/TheHeader.vue'
import Modal from '@/components/Modals/Modal.vue'
export default {
  components: {
    TheHeader,
    Modal
  }
}
</script>