<script setup>
import {ref} from 'vue';
import {useAuthStore} from "stores/authStore";
import LogInBtn from "components/LogInBtn.vue";
import LogOutBtn from "components/LogOutBtn.vue";


const drawerOpen = ref(false);
const screenWidth = ref(window.innerWidth);
const authStore = useAuthStore();
authStore.initialize()

function toggleDrawer() {
  drawerOpen.value = !drawerOpen.value;
}
</script>

<template>
  <div class="nav">
    <q-toolbar class="navbar q-px-xl q-py-md">
      <q-toolbar-title class="text-h4">
        <div class="toolbar__title">
          Children's Hospital
          <img src="../assets/images/clinicLogo.svg" alt="clinic">
        </div>
      </q-toolbar-title>

      <div v-if="screenWidth > 450">
        <q-btn flat to="/" label="Home"/>
        <q-btn flat to="/patients" label="Patients"/>
        <q-btn flat to="/appointments" label="Appointments"/>
        <q-btn flat to="/doctors" label="Doctors"/>
        <q-btn flat to="/prescriptions" label="Prescriptions"/>
        <q-btn flat to="/medications" label="Medications"/>
        <LogInBtn v-if="!authStore.role"/>
        <LogOutBtn v-else/>
      </div>
    </q-toolbar>
  </div>
</template>

<style scoped>
.toolbar__title {
  display: flex;
  align-items: center;
  gap: 1rem;
  font-weight: bold;
}

.navbar {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  z-index: 1000;
  background: linear-gradient(to bottom, #1F2B6C, #3A4A9D); /* Градиент сверху вниз */
  color: #ffffff;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.9); /* Добавим небольшой теневой эффект */
}



</style>
