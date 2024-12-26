import { defineStore } from 'pinia';

export const useThemeStore = defineStore('theme', {
  state: () => ({
    darkTheme: false,
  }),
  actions: {
    toggleTheme($q) {
      this.darkTheme = !this.darkTheme;
      $q.dark.set(this.darkTheme);
    },

    setTheme(value, $q) {
      this.darkTheme = value;
      $q.dark.set(this.darkTheme);
    },
  },
});
