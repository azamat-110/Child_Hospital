<script setup>
import { useQuasar } from "quasar";
import { useAuthStore } from "stores/authStore";
import CustomHeader from "components/Dashboard/CustomHeader.vue";
import {computed, ref} from "vue";
import DrawerComponent from "components/Dashboard/DrawerComponent.vue";

const $q = useQuasar();
const isDarkMode = computed(() => $q.dark.isActive);
const authStore = useAuthStore();
const leftDrawer = ref(true);

const toggleLeftDrawer = (val) => {
  leftDrawer.value = val;
};
</script>

<template>
  <q-layout view="hhh lpR fFf">
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
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.2s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>
