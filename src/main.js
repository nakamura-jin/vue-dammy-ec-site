import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'

// font awesome
import { library } from '@fortawesome/fontawesome-svg-core';
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';
import {
  faCartShopping,
  faUtensils,
  faRightToBracket,
  faIdCard,
  faMobileScreenButton
} from '@fortawesome/free-solid-svg-icons';

library.add(
  faCartShopping,
  faUtensils,
  faRightToBracket,
  faIdCard,
  faMobileScreenButton
);

Vue.component('font-awesome-icon', FontAwesomeIcon);

Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
