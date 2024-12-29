<script setup>
import {useDataStore} from "stores/dataStore";
import {useThemeStore} from "stores/useThemeStore";
import {useQuasar} from "quasar";
import {onMounted,} from "vue";

defineOptions({
  name: 'App',
});

const dataStore = useDataStore();
const themeStore = useThemeStore();
const $q = useQuasar();

onMounted(() => {
  dataStore.loadAllData();

  //Dark system mode config

  // themeStore.initializeTheme($q);
  //
  // const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
  // const onChange = (event) => {
  //   themeStore.setTheme(event.matches, $q);
  // };
  //
  // mediaQuery.addEventListener('change', onChange);
  //
  // onUnmounted(() => {
  //   mediaQuery.removeEventListener('change', onChange);
  // });
});
</script>

<template>
  <router-view/>
</template>
