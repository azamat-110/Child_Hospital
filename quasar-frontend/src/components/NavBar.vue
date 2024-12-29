<script setup>
"use strict";
import { computed, ref } from "vue";
import { useAuthStore } from "stores/authStore";
import { useRouter } from "vue-router";
import { useQuasar } from "quasar";
import LogInBtn from "components/LogInBtn.vue";
import LogOutBtn from "components/LogOutBtn.vue";

const router = useRouter();
const $q = useQuasar();
const isDarkMode = computed(() => $q.dark.isActive);

const goToDoctors = () => {
  router.push("/doctors");
};
const screenWidth = ref(window.innerWidth);
const authStore = useAuthStore();
</script>

<template>
  <div class="navbar">
    <q-toolbar
      class="q-px-xl q-py-md navbar__section"
      :class="{ dark__secondary: isDarkMode }"
    >
      <div v-if="screenWidth > 450">
        <q-btn flat rounded to="/" :label="$t('navBar.home')" />
        <q-btn
          v-if="authStore.role === 1"
          flat
          to="/patients"
          :label="$t('navBar.patients')"
          rounded
        />
        <q-btn
          flat
          rounded
          to="/doctors"
          :label="$t('navBar.doctors')"
          @click.prevent="goToDoctors"
        />
        <q-btn
          v-if="authStore.role"
          flat
          to="/appointments"
          :label="$t('navBar.appointments')"
          rounded
        />
        <q-btn
          v-if="authStore.role === 1"
          flat
          to="/prescriptions"
          :label="$t('navBar.prescriptions')"
          rounded
        />
        <q-btn
          v-if="authStore.role === 1"
          flat
          to="/medications"
          :label="$t('navBar.medications')"
          rounded
        />
        <q-btn
          v-if="authStore.role !== 1"
          flat
          rounded
          to="/about"
          :label="$t('navBar.about')"
        />
      </div>
      <LogInBtn v-if="!authStore.role" class="q-ml-sm" />
      <LogOutBtn v-else class="q-ml-sm" />
    </q-toolbar>
  </div>
</template>

<style scoped lang="scss">
.navbar {
  position: sticky;
  top: 0;
  left: 0;
  width: 100%;
  z-index: 100;
  color: #ffffff;
  transition: 0.3s;

  &__section {
    display: flex;
    align-items: center;
    justify-content: space-between;
    background: rgba(1, 148, 230, 1);
    box-shadow: 0 2px 5px rgba(0, 0, 0, 0.7);
    transition: 0.3s;
  }
}
</style>
