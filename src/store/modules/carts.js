export default {
  namespaced: true,

  /******************************************
   * state
   ******************************************/
  state: {
    carts: []
  },

  /******************************************
   * getters
   ******************************************/
  getters: {
    carts: (state) => state.carts,
  },

  /******************************************
   * mutations
   ******************************************/
  mutations: {
    CARTS(state, menu) {
      state.carts = menu
    },
    EDIT_QUANTITY(state, data) {
      state.carts.forEach(cart => {
        if (cart.cart_id === data.id) {
          cart.quantity = data.quantity
        }
      })
    },
    DELETE_CART(state, id) {
      const newCart = [];
      state.carts.forEach(cart => {
        if (cart.cart_id !== id) {
          newCart.push(cart)
        }
      })
      state.carts = newCart;
    },

    ALL_DELETE(state) {
      state.carts = []
    }
  },

  /******************************************
   * actions
   ******************************************/
  actions: {
    carts({ commit }, menu) {
      commit('CARTS', menu);
    },
    editQuantity({ commit }, data) {
      commit('EDIT_QUANTITY', data)
    },
    deleteCart({ commit }, id) {
      commit('DELETE_CART', id)
    },
    allDelete({ commit }) {
      commit('ALL_DELETE')
    }
  },
};
