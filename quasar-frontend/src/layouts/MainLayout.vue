<script setup>
import NavBar from "components/NavBar.vue";
import FooterSection from "components/FooterSection.vue";
</script>

<template>
  <NavBar/>
  <q-layout view="hHh lpR fFf" style="padding-top: 82px;">
    <q-page-container>
      <router-view v-slot="{ Component }">
        <transition name="fade" mode="out-in">
          <component :is="Component"/>
        </transition>
      </router-view>
    </q-page-container>
  </q-layout>
  <FooterSection/>
</template>

<style>
.fade-enter-active,
.fade-leave-active {
  transition: opacity .2s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>
