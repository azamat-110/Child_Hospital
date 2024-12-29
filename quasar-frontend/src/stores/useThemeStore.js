import { defineStore } from 'pinia';

export const useThemeStore = defineStore('theme', {
  state: () => ({
    darkTheme: false, // По умолчанию тема светлая
  }),
  actions: {
    initializeTheme($q) {
      // Проверяем системную тему
      const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
      this.darkTheme = prefersDark;
      $q.dark.set(this.darkTheme);
    },

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
