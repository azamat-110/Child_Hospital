<script setup>
import { useQuasar } from "quasar";
import { useAuthStore } from "stores/authStore";
import CustomHeader from "components/DashboardLayout/CustomHeader.vue";
import {computed, ref} from "vue";
import DrawerComponent from "components/DashboardLayout/DrawerComponent.vue";

const $q = useQuasar();
const isDarkMode = computed(() => $q.dark.isActive);
const authStore = useAuthStore();
const leftDrawer = ref(true);

const toggleLeftDrawer = (val) => {
  leftDrawer.value = val;
};
</script>

<template>
  <q-layout view="lhh lpR fFf">
    <CustomHeader @leftDrawerOpen="toggleLeftDrawer" />
    <DrawerComponent v-model:leftDrawer="leftDrawer" />
    <q-page-container class="container">
      <router-view v-slot="{ Component }">
        <transition name="fade" mode="out-in">
          <component :is="Component" />
        </transition>
      </router-view>
    </q-page-container>
  </q-layout>
</template>

<style scoped lang="scss">

.container {
  min-height: 90vh;
  position: relative;
  background: rgba(249,251,252,255);
  min-height: 100vh;
}
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.2s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>
