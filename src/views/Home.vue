<style lang="scss" scoped>
  @use '@/styles/home';
</style>
<template>
  <div class="home">
    <div class="home__container">
      <div class="card" v-for="n in 6" :key="n">
        <div class="card__img">
          <div class="card__demo"></div>
          <div class="card__wrapper">
            <h3 class="card__title">テストメニュー</h3>
            <span class="card__genre">ごはんもの</span>
            <p class="card__price">600円</p>
            <div class="card__order">
              <span>数量: </span>
              <div class="card__quantity">
                <!-- <span>数量: </span> -->
              <select >
                <option value="1">1</option>
                <option value="2">2</option>
                <option value="3">3</option>
                <option value="4">4</option>
                <option value="5">5</option>
              </select>
            </div>
            <button class="card__cart-add"><font-awesome-icon class="card__icon" icon="fa-solid fa-cart-shopping" />カートに追加</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>

</script>
