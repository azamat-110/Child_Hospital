import { defineStore } from 'pinia';
import { jwtDecode } from "jwt-decode";

export const useAuthStore = defineStore('auth', {
  state: () => ({
    token: null,
    role: null,
    userId: null,
    currentUserData: null,
  }),
  actions: {
    setUserId(userData){
      this.userId = userData;
    },
    setUserData(currentUserData){
      this.currentUserData = currentUserData;
    },
    cleanUser(){
      this.userId = null;
    },
    login(token) {
      this.token = token;
      this.role = jwtDecode(token).roleId;
      localStorage.setItem('token', token);
      this.setUserId(jwtDecode(token));
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
        try {
          const decoded = jwtDecode(storedToken);
          this.token = storedToken;
          this.role = decoded.roleId;
          this.setUserId(decoded);
        } catch (error) {
          console.error('Ошибка при инициализации токена:', error);
          this.logout();
        }
      }
    }
  },
});
