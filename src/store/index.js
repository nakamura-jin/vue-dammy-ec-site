import Vue from 'vue'
import Vuex from 'vuex'
import menus from './modules/menus'

Vue.use(Vuex)

export default new Vuex.Store({
  modules: {
    menus,
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
