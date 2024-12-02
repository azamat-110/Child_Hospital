<script setup>
import {ref} from 'vue';

const drawerOpen = ref(false);
const screenWidth = ref(window.innerWidth);

function toggleDrawer() {
  drawerOpen.value = !drawerOpen.value;
}
</script>

<template>
  <q-layout view="hHh lpR fFf">
    <q-header elevated class="q-py-md q-px-xl">
      <q-toolbar>
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
          <q-btn fab-mini to="/login">
            <img src="../assets/images/loginLogo.svg" alt="login">
          </q-btn>
        </div>
      </q-toolbar>
    </q-header>
    <q-page-container>
      <router-view/>
    </q-page-container>
  </q-layout>
</template>

<style scoped>
.toolbar__title {
  display: flex;
  align-items: center;
  gap: 1rem;
}



</style>
