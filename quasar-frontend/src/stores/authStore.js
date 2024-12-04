import { defineStore } from 'pinia';
import { jwtDecode } from "jwt-decode";

export const useAuthStore = defineStore('auth', {
  state: () => ({
    token: null,
    role: null,
  }),
  actions: {
    login(token) {
      console.log(jwtDecode(token));
      this.token = token;
      this.role = jwtDecode(token).roleId;
      localStorage.setItem('token', token);
    },
    logout() {
      this.token = null;
      this.role = null;
      localStorage.removeItem('token');
    },
    initialize() {
      const storedToken = localStorage.getItem('token');
      if (storedToken) {
        this.login(storedToken);
      }
    },
  },
});
