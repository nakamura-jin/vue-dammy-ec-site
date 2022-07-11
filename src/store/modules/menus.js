export default {
  namespaced: true,

  /******************************************
   * state
   ******************************************/
  state: {
    menus: [],
    details: {},
    genre: 0
  },

  /******************************************
   * getters
   ******************************************/
  getters: {
    menus: (state) => state.menus,
    details: (state) => state.details,
    genre: (state) => state.genre,
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
    },

    GENRE(state, id) {
      state.genre = id
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
    },

    genre({ commit }, id) {
      commit('GENRE', id)
    }
  },
};