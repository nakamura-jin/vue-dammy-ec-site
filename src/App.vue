<style lang="scss">
  @use '@/styles/global';
</style>

<template>
  <div id="app">
    <transition name="fade" mode="out-in">
      <router-view/>
    </transition>
  </div>
</template>

