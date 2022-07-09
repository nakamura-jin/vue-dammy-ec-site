import $http from '@/services/httpService';

export default {
  data() {
    return {
      id: Number(JSON.parse(sessionStorage.getItem('data')).user),
    };
  },

  /******************************************
   * computed
   ******************************************/

  computed: {
    carts() {
      return this.$store.getters['carts/carts'];
    },
  },

  /******************************************
   * methods
   ******************************************/

  methods: {
    /**
     * カート取得
     */
    async getCart() {
      const response = await $http.get(`/cart/${this.id}`);
      const carts = response.data.cart;

      // メニューにid、数量追加してstoreへ保存
      const menus = [];
      for (let i = 0; i < carts.length; i++) {
        carts[i].menu[0]['quantity'] = carts[i].quantity;
        carts[i].menu[0]['cart_id'] = carts[i].id;
        menus.push(carts[i].menu[0]);
      }
      this.$store.dispatch('carts/carts', menus);
    },

    /**
     * 数量変更
     */
    async changeQuantity(e, cart) {
      this.quantity = Number(e.target.value);

      const query = {};
      query['id'] = cart.cart_id;
      query['user_id'] = this.id;
      query['menu_id'] = cart.id;
      query['quantity'] = this.quantity;

      const response = await $http.put(`/cart/${query['id']}`, query);
      if (response.status === 200)
        this.$store.dispatch('carts/editQuantity', query);
    },

    /**
     * カートから商品削除
     */
    async deleteCart(id) {
      const response = await $http.delete(`/cart/${id}`)

      if (response.status === 200) {
        this.$store.dispatch('carts/deleteCart', id)
      }
    }
  },
};