export default {
  namespaced: true,

  /******************************************
   * state
   ******************************************/
  state: {
    menus: []
  },

  /******************************************
   * getters
   ******************************************/
  getters: {
    menus:(state) => state.menus
  },

  /******************************************
   * mutations
   ******************************************/
  mutations: {
    MENUS(state, menus) {
      state.menus = menus
    }
  },

  /******************************************
   * actions
   ******************************************/
  actions: {
    menus({ commit }, menus) {
      commit('MENUS', menus)
    }
  },
};