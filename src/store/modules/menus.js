export default {
  namespaced: true,

  /******************************************
   * state
   ******************************************/
  state: {
    menus: [],
    details: {}
  },

  /******************************************
   * getters
   ******************************************/
  getters: {
    menus: (state) => state.menus,
    details: (state) => state.details
  },

  /******************************************
   * mutations
   ******************************************/
  mutations: {
    MENUS(state, menus) {
      state.menus = menus
    },

    DETAILS(state, menu) {
      state.details = menu
    }
  },

  /******************************************
   * actions
   ******************************************/
  actions: {
    menus({ commit }, menus) {
      commit('MENUS', menus)
    },

    details({ commit }, menu) {
      commit('DETAILS', menu)
    }
  },
};