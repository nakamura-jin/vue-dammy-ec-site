<style lang="scss" scoped>
  @use './modal';
</style>
<template>
  <div class="modal" v-if="modal" @click="close">
    <div class="modal__container">
      <div class="modal__card" @click.stop>
        <span @click="close"><font-awesome-icon class="modal__icon" icon="fa-solid fa-xmark" /></span>
        <component :is="selectModal"></component>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  computed: {
    modal() {
      return this.$store.getters['modals/modal']
    },
    selectModal() {
      return this.$store.getters['modals/selectModal']
    }
  },
  methods: {
    close() {
      this.$store.dispatch('modals/modal', false)
    }
  }
}
</script>