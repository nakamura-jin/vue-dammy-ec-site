import axios from 'axios';
import Store from '@/store'

axios.defaults.baseURL = 'http://localhost:8000/api';

class authService {
  constructor() {
    this.$auth = axios.create();
    this.STORAGE = sessionStorage;
  }

  get value() {
    return JSON.parse(this.STORAGE.getItem('data'));
  }

  login(request) {
    const interceptor = this.$auth.interceptors.response.use(
      async (response) => {
        if (response.data.result) {
          await this.success(response.data);
        }
        return response;
      },
      (error) => error.response
    );

    const url = `/login`;

    return this.$auth.post(url, request).finally(() => {
      Store.dispatch('loggedIn', true)
      this.$auth.interceptors.response.eject(interceptor);
    });
  }

  logout() {
    this.STORAGE.removeItem('data');
    Store.dispatch('loggedIn', false);
  }

  async success(authData) {
    this.STORAGE.setItem('data', JSON.stringify(authData));
  }
}

export default new authService();