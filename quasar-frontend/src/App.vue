<script setup>
import {useDataStore} from "stores/dataStore";
import {useAuthStore} from "stores/authStore";
import {onMounted} from "vue";

defineOptions({
  name: 'App'
});

const dataStore = useDataStore();
// const authStore = useAuthStore();

onMounted(() => {
  // if (authStore.role) {
    dataStore.loadAllData();
  // }
});
</script>

<template>
  <router-view/>
</template>

