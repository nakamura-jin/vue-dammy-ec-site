// import RequiredLoginModal from '@/components/Modals/RequiredLoginModal.vue';
import AddCart from '@/components/Modals/AddCart.vue';

export default {
  namespaced: true,

  /******************************************
   * state
   ******************************************/
  state: {
    modal: true,
    // selectModal: '',
    selectModal: AddCart,
  },

  /******************************************
   * getters
   ******************************************/
  getters: {
    modal: (state) => state.modal,
    selectModal: (state) => state.selectModal,
  },

  /******************************************
   * mutations
   ******************************************/
  mutations: {
    MODAL(state, bool) {
      state.modal = bool;
    },
    SELECT_MODAL(state, modal) {
      state.selectModal = modal;
    },
  },

  /******************************************
   * actions
   ******************************************/
  actions: {
    modal({ commit }, bool) {
      commit('MODAL', bool);
    },
    selectModal({ commit }, modal) {
      commit('SELECT_MODAL', modal);
    },
  },
};
