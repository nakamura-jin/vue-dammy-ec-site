import Vue from 'vue'
import Vuex from 'vuex'
import menus from './modules/menus'
import modals from './modules/modals'
import carts from './modules/carts'

Vue.use(Vuex)

export default new Vuex.Store({
  modules: {
    menus,
    modals,
    carts
  },
  state: {
    loggedIn: false
  },
  getters: {
    loggedIn: (state) => state.loggedIn
  },
  mutations: {
    LOGGED_IN(state, bool) {
      state.loggedIn = bool
    }
  },
  actions: {
    loggedIn({ commit }, bool) {
      commit('LOGGED_IN', bool)
    }
  }
});
