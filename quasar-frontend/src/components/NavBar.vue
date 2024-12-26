<script setup>
import { computed, ref } from "vue";
import { useAuthStore } from "stores/authStore";
import LogInBtn from "components/LogInBtn.vue";
import LogOutBtn from "components/LogOutBtn.vue";
import { useRouter } from "vue-router";
import { useQuasar } from "quasar";
const router = useRouter();
const $q = useQuasar();

const isDarkMode = computed(() => $q.dark.isActive);

const goToDoctors = () => {
  router.push("/doctors"); // Переключение маршрута
};
const screenWidth = ref(window.innerWidth);
const authStore = useAuthStore();
</script>

<template>
  <div class="navbar">
    <q-toolbar
      class="q-px-xl q-py-md navbar__section"
      :class="{ darkSecondary: isDarkMode }"
    >
      <div v-if="screenWidth > 450">
        <q-btn flat rounded to="/" label="Home" />
        <q-btn
          v-if="authStore.role === 1"
          flat
          to="/patients"
          label="Patients"
          rounded
        />
        <q-btn
          v-if="authStore.role"
          flat
          to="/appointments"
          label="Appointments"
          rounded
        />
        <q-btn
          flat
          rounded
          to="/doctors"
          label="Doctors"
          @click.prevent="goToDoctors"
        />
        <q-btn
          v-if="authStore.role === 1"
          flat
          to="/prescriptions"
          label="Prescriptions"
          rounded
        />
        <q-btn
          v-if="authStore.role === 1"
          flat
          to="/medications"
          label="Medications"
          rounded
        />
        <q-btn
          v-if="authStore.role !== 1"
          flat
          rounded
          to="/about"
          label="About us"
        />
      </div>
      <LogInBtn v-if="!authStore.role" class="q-ml-sm" />
      <LogOutBtn v-else class="q-ml-sm" />
    </q-toolbar>
  </div>
</template>

<style scoped lang="scss">
.admin-title {
  margin-left: 10px;
  font-size: 16px;
  font-weight: bold;
  color: #000;
  text-transform: uppercase;
}

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
