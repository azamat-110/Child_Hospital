<script setup>
import NavBar from "components/NavBar.vue";
import FooterSection from "components/FooterSection.vue";
import HeaderSection from "components/HeaderSection.vue";
</script>

<template>
  <q-layout view="hHh lpR fFf">
    <HeaderSection />
    <NavBar />
    <q-page-container>
      <router-view v-slot="{ Component }">
        <transition name="fade" mode="out-in">
          <component :is="Component" />
        </transition>
      </router-view>
    </q-page-container>
    <FooterSection />
  </q-layout>
</template>

<style>
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.2s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>
