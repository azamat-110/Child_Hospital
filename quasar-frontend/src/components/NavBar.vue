<script setup>
import {ref} from 'vue';

const drawerOpen = ref(false);
const screenWidth = ref(window.innerWidth);

function toggleDrawer() {
  drawerOpen.value = !drawerOpen.value;
}
</script>

<template>
  <q-layout view="hHh lpR fFf" >
    <q-header elevated class="q-py-sm q-px-xl" >
      <q-toolbar>
<!--        <q-btn-->
<!--          flat-->
<!--          round-->
<!--          icon="menu"-->
<!--          @click="toggleDrawer"-->
<!--          class="q-mr-sm"-->
<!--          v-if="screenWidth < 450"-->
<!--        />-->
        <q-toolbar-title class="text-h4">Children's Hospital</q-toolbar-title>

        <div v-if="screenWidth > 450">
          <q-btn flat to="/" label="Home"/>
          <q-btn flat to="/patients" label="Patients"/>
          <q-btn flat to="/appointments" label="Appointments"/>
          <q-btn flat to="/doctors" label="Doctors"/>
          <q-btn flat to="/prescriptions" label="Prescriptions"/>
          <q-btn flat to="/medications" label="Medications"/>
          <q-btn fab-mini >
            <img src="../assets/images/loginLogo.svg" alt="login">
          </q-btn>
        </div>
      </q-toolbar>
    </q-header>

<!--    <q-drawer v-model="drawerOpen" side="left" bordered v-if="screenWidth < 450" >-->
<!--      <q-list >-->
<!--        <q-item to="/" clickable exact>-->
<!--          <q-item-section avatar>-->
<!--            <q-icon name="home"/>-->
<!--          </q-item-section>-->
<!--          <q-item-section >Home</q-item-section>-->
<!--        </q-item>-->
<!--        <q-item to="/patients" clickable>-->
<!--          <q-item-section avatar>-->
<!--            <q-icon name="healing"/>-->
<!--          </q-item-section>-->
<!--          <q-item-section>Patients</q-item-section>-->
<!--        </q-item>-->
<!--        <q-item to="/appointments" clickable>-->
<!--          <q-item-section avatar>-->
<!--            <q-icon name="event"/>-->
<!--          </q-item-section>-->
<!--          <q-item-section>Appointments</q-item-section>-->
<!--        </q-item>-->
<!--        <q-item to="/doctors" clickable>-->
<!--          <q-item-section avatar>-->
<!--            <q-icon name="health_and_safety"/>-->
<!--          </q-item-section>-->
<!--          <q-item-section>Doctors</q-item-section>-->
<!--        </q-item>-->
<!--        <q-item to="/prescriptions" clickable>-->
<!--          <q-item-section avatar>-->
<!--            <q-icon name="assignment"/>-->
<!--          </q-item-section>-->
<!--          <q-item-section>Prescriptions</q-item-section>-->
<!--        </q-item>-->
<!--        <q-item to="/medications" clickable>-->
<!--          <q-item-section avatar>-->
<!--            <q-icon name="medication"/>-->
<!--          </q-item-section>-->
<!--          <q-item-section>Medications</q-item-section>-->
<!--        </q-item>-->

<!--      </q-list>-->
<!--    </q-drawer>-->


    <q-page-container>
      <router-view/>
    </q-page-container>
  </q-layout>
</template>

<style scoped>

</style>
