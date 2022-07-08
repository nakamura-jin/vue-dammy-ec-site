import axios from 'axios'

axios.defaults.baseURL = 'http://localhost:8000/api';

class httpService {
  constructor() {
    this.$http = axios.create();
  }

  get(uri, params) {
    return this.$http.get(`${uri}`, params)
  }
  post(uri, params) {
    return this.$http.post(`${uri}`, params)
  }
  put(uri, params) {
    return this.$http.put(`${uri}`, params)
  }
  delete(uri, params) {
    return this.$http.delete(`${uri}`, params)
  }
}

export default new httpService();