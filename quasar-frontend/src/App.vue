<script setup>
import {useDataStore} from "stores/dataStore";
import {onMounted} from "vue";

defineOptions({
  name: 'App'
});

const dataStore = useDataStore();

onMounted(() => {
  dataStore.loadAllData();
});
</script>

<template>
  <router-view/>
</template>

