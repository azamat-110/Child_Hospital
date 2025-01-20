import { defineStore } from 'pinia';
import { jwtDecode } from "jwt-decode";

export const useAuthStore = defineStore('auth', {
  state: () => ({
    token: null,
    role: null,
    user: null,
  }),
  actions: {
    setUser(userData){
      this.user = userData;
    },
    cleanUser(){
      this.user = null;
    },
    login(token) {
      this.token = token;
      this.role = jwtDecode(token).roleId;
      localStorage.setItem('token', token);
      this.setUser(jwtDecode(token));
    },
    logout() {
      this.token = null;
      this.role = null;
      localStorage.removeItem('token');
      this.cleanUser();
    },
    initialize() {
      const storedToken = localStorage.getItem('token');
      if (storedToken) {
        this.login(storedToken);
      }
    }
  },
});
